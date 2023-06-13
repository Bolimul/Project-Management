import React, { useState } from "react";
import "./AddPostHome.css";
import { auth } from "./firebase";
import "firebase/auth";
import {
  FieldValue,
  addDoc,
  arrayUnion,
  arrayRemove,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { useEffect } from "react";
import { db } from "./firebase";
import { collection, getDocs, onSnapshot } from "firebase/firestore";

const AddPostHome = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editPostId, setEditPostId] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState("");
  const [myPosts, setMyPosts] = useState([]);
  const [posts, setPosts] = useState([]);
  const [postTitle, setPostTitle] = useState(""); // Add this line
  const [savedPostTitles, setSavedPostTitles] = useState([]);

  const [likedPosts, setLikedPosts] = useState([]); // New state variable to keep track of liked posts

  const handleButtonClick = () => {
    setIsFormOpen(true);
    setEditMode(false);
    setEditPostId(null);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditMode(false);
    setEditPostId(null);
  };

  const handlePost = async (postText, userName) => {
    if (editMode && editPostId) {
      // Editing an existing post
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === editPostId
            ? {
                ...post,
                title: postTitle, // Add this line
                text: `${selectedTopic}: ${postText}`,
                userName: userName,
                image: postImage,
                textColor: textColor,
              }
            : post
        )
      );
    } else {
      // Creating a new post
      const newPost = {
        title: postTitle, // Add this line
        idPost: Date.now(),
        text: `${selectedTopic}: ${postText}`,
        userName: userName,
        image: postImage,
        textColor: textColor,
        likes: 0,
        shares: false,
        saved: false,
        isFollowing: false,
      };
      

      try {
        // Save the post to Firestore
        const docRef = await updateDoc(
          doc(db, "users-profile-data", auth.currentUser.uid),
          { myPosts: arrayUnion(newPost) }
        );
        console.log("Post added with ID: ", docRef.id);
      } catch (error) {
        console.error("Error adding post: ", error);
      }

      setPosts((prevPosts) => [newPost, ...prevPosts]);
    }

    handleFormClose();
  };

  
  const handleEdit = (postId) => {
    const post = posts.find((p) => p.id === postId);
    if (post) {
      setIsFormOpen(true);
      setEditMode(true);
      setEditPostId(post.id);
      setSelectedTopic(getTopicFromPostText(post.text));
      setPostImage(post.image);
      setTextColor(post.textColor);
    }
  };

  const handleDelete = async (postId) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
  
    try {
      // Remove the post from the 'myPosts' array in Firestore
      const postRef = doc(db, "users-profile-data", auth.currentUser.uid);
      await updateDoc(postRef, { myPosts: arrayRemove(postId) });
      console.log("Post deleted:", postId);
    } catch (error) {
      console.error("Error deleting post:", postId, error);
    }
  };

  const handleShare = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              shares: post.shares + (post.shared ? -1 : 1),
              shared: !post.shared,
            }
          : post
      )
    );
  };

  const handleSave = async (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, saved: !post.saved } : post
      )
    );
  };

  const handleFollow = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, isFollowing: !post.isFollowing } : post
      )
    );
  };

  const getTopicFromPostText = (postText) => {
    const topicEndIndex = postText.indexOf(":");
    if (topicEndIndex !== -1) {
      return postText.substring(0, topicEndIndex).trim();
    }
    return "";
  };

  const [postImage, setPostImage] = useState("");
  const [textColor, setTextColor] = useState("#000000");

  const handleTitleChange = (event) => {
    setPostTitle(event.target.value);
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        const image = new Image();
        image.src = reader.result;

        image.onload = () => {
          const maxWidth = 1000;
          const maxHeight = 1000;

          if (image.width <= maxWidth && image.height <= maxHeight) {
            setPostImage(reader.result);
          } else {
            // Display a pop-up message or show an error state
            alert("Picture is too big(1000 X 1000 max)");
          }
        };
      }
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleTextColorChange = (event) => {
    setTextColor(event.target.value);
  };

  return (
    <div className="home-container">
      <button className="add-post-button" onClick={handleButtonClick}>
        +
      </button>
      {isFormOpen && (
        <PostForm
          onClose={handleFormClose}
          onPost={handlePost}
          editMode={editMode}
          initialPostText={editMode && editPostId ? posts.text : ""}
          initialUserName={editMode && editPostId ? posts.userName : ""}
          selectedTopic={selectedTopic}
          onTopicChange={setSelectedTopic}
          postImage={postImage}
          onImageChange={handleImageChange}
          postTitle={postTitle} // Add this line
          onTitleChange={handleTitleChange} // Add this line
          textColor={textColor}
          onTextColorChange={handleTextColorChange}
        />
      )}

      {posts.length > 0 && (
        <div className="post-list">
          {posts.map((post) => (
            <div className="post-item" key={post.id}>
              <div className="post-title">{post.title}</div> {/* Add this line */}
              <div className="post-header">
                <div className="user-name">{post.userName}</div>
                <div className="post-actions">
                  <button
                    className={`share-button${post.shared ? " shared" : ""}`}
                    onClick={() => handleShare(post.id)}
                  >
                    {post.shared ? "Shared" : "Share"} {post.shared && ""}
                  </button>
                  <button
                    className={`save-button${post.saved ? " saved" : ""}`}
                    onClick={() => handleSave(post.id)}
                  >
                    {post.saved ? "Saved" : "Save"}
                  </button>
                  <button
                    className={`follow-button${
                      post.isFollowing ? " following" : ""
                    }`}
                    onClick={() => handleFollow(post.id)}
                  >
                    {post.isFollowing ? "Following" : "Follow"}
                  </button>
                </div>
              </div>
              {post.image && (
                <div className="post-image">
                  <img src={post.image} alt="Post" />
                </div>
              )}
              <div className="post-text" style={{ color: post.textColor }}>
                {post.text}
              </div>
              <button
                className="edit-button"
                onClick={() => handleEdit(post.id)}
              >
                Edit
              </button>
              <button
                className="delete-button"
                onClick={() => handleDelete(post.id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const PostForm = ({
  onClose,
  onPost,
  editMode,
  initialPostText,
  initialUserName,
  selectedTopic,
  onTopicChange,
  onImageChange,
  postTitle,
  onTitleChange,
  textColor,
  onTextColorChange,
}) => {
  const [postText, setPostText] = useState(initialPostText || "");
  const [userName, setUserName] = useState(initialUserName || "");

  const handlePostTextChange = (event) => {
    setPostText(event.target.value);
  };

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };


  const handleTopicChange = (event) => {
    onTopicChange(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      postText.trim() === "" ||
      userName.trim() === "" ||
      selectedTopic.trim() === ""
    ) {
      alert("Please fill in all fields"); // Display an alert message
      return; // Don't post if any field is empty
    }
    onPost(postText, userName);
    setPostText("");
    setUserName("");
  };

  return (
    <div className="post-form-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="user-name-input"
          placeholder="Your Name"
          value={userName} 
          onChange={handleUserNameChange} 
        />
        <select
          className="topic-select"
          value={selectedTopic}
          onChange={handleTopicChange}
        >
          <option value="">Select a Topic</option>
          <option value="Allergy and Immunology">Allergy and Immunology</option>
          <option value="Anesthesiology">Anesthesiology</option>
          <option value="Cardiology">Cardiology</option>
          <option value="Dermatology">Dermatology</option>
          <option value="Endocrinology">Endocrinology</option>
          <option value="Emergency Medicine">Emergency Medicine</option>
          <option value="Family Medicine">Family Medicine</option>
          <option value="Gastroenterology">Gastroenterology</option>
          <option value="Geriatrics">Geriatrics</option>
          <option value="Hematology">Hematology</option>
          <option value="Infectious Disease">Infectious Disease</option>
          <option value="Internal Medicine">Internal Medicine</option>
          <option value="Nephrology">Nephrology</option>
          <option value="Obstetrics and Gynecology">
            Obstetrics and Gynecology
          </option>
          <option value="Oncology">Oncology</option>
          <option value="Ophthalmology">Ophthalmology</option>
          <option value="Orthopedics">Orthopedics</option>
          <option value="Otolaryngology">Otolaryngology</option>
          <option value="Pathology">Pathology</option>
          <option value="Pediatrics">Pediatrics</option>
          <option value="Physical Medicine and Rehabilitation">
            Physical Medicine and Rehabilitation
          </option>
          <option value="Plastic Surgery">Plastic Surgery</option>
          <option value="Psychiatry">Psychiatry</option>
          <option value="Pulmonology">Pulmonology</option>
          <option value="Radiology">Radiology</option>
          <option value="Rheumatology">Rheumatology</option>
          <option value="Sports Medicine">Sports Medicine</option>
          <option value="Surgery">Surgery</option>
          <option value="Urology">Urology</option>
          <option value="Other">Other</option>
        </select>
        <textarea
          className="post-textarea"
          placeholder="Write a post..."
          value={postText}
          onChange={handlePostTextChange} 
        />
        <input
          type="file"
          accept="image/*"
          className="image-input"
          onChange={onImageChange}
        />
        <input
          type="color"
          className="text-color-input"
          value={textColor}
          onChange={onTextColorChange}
        />
        <input
          type="text"
          className="post-title-input"
          placeholder="Post Title"
          value={postTitle}
          onChange={onTitleChange} 
        />
        <button className="post-button" type="submit">
          {editMode ? "Update" : "Post"}
        </button>
        {editMode && (
          <button className="cancel-button" onClick={onClose}>
            Cancel
          </button>
        )}
      </form>
    </div>
  );
};

export default AddPostHome;
