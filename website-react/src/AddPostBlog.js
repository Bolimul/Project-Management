import React, { useState } from 'react';
import './AddPostBlog.css';

const AddPostBlog = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editPostId, setEditPostId] = useState(null);
  const [posts, setPosts] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState('');

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

  const handlePost = (postText, userName) => {
    if (editMode && editPostId) {
      // Editing an existing post
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === editPostId
            ? {
                ...post,
                text: `${selectedTopic}: ${postText}`,
                userName: userName,
              }
            : post
        )
      );
    } else {
      // Creating a new post
      const newPost = {
        id: Date.now(),
        text: `${selectedTopic}: ${postText}`,
        userName: userName,
      };
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
    }
  };

  const handleDelete = (postId) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
  };

  const getTopicFromPostText = (postText) => {
    const topicEndIndex = postText.indexOf(':');
    if (topicEndIndex !== -1) {
      return postText.substring(0, topicEndIndex).trim();
    }
    return '';
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
          initialPostText={editMode && editPostId ? posts.text : ''}
          initialUserName={editMode && editPostId ? posts.userName : ''}
          selectedTopic={selectedTopic}
          onTopicChange={setSelectedTopic}
        />
      )}
      {posts.length > 0 && (
        <div className="post-list">
          {posts.map((post) => (
            <div className="post-item" key={post.id}>
              <div className="post-header">
                <div className="user-name">{post.userName}</div>
              </div>
              <div className="post-text">{post.text}</div>
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
}) => {
  const [postText, setPostText] = useState(initialPostText || '');
  const [userName, setUserName] = useState(initialUserName || '');

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
    if (postText.trim() === '' || userName.trim() === '') {
      return; // Don't post empty text or username
    }

    onPost(postText, userName);
    setPostText('');
    setUserName('');
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
          <option value="Cardiology">Cardiology</option>
          <option value="Dermatology">Dermatology</option>
          <option value="Endocrinology">Endocrinology</option>
          <option value="Gastroenterology">Gastroenterology</option>
          <option value="Hematology">Hematology</option>
          <option value="Nephrology">Nephrology</option>
          <option value="Neurology">Neurology</option>
          <option value="Oncology">Oncology</option>
          <option value="Orthopedics">Orthopedics</option>
          <option value="Pulmonology">Pulmonology</option>
          <option value="Urology">Urology</option>
          <option value="Other">Other</option>
        </select>
        <textarea
          className="post-textarea"
          placeholder="Write a post..."
          value={postText}
          onChange={handlePostTextChange}
        />
        <button className="post-button" type="submit">
          {editMode ? 'Update' : 'Post'}
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

export default AddPostBlog;
