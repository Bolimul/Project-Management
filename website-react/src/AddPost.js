import React, { useState } from 'react';
import './AddPost.css';

const AddPost = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editPostId, setEditPostId] = useState(null);
  const [posts, setPosts] = useState([]);

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
            ? { ...post, text: postText, userName: userName }
            : post
        )
      );
    } else {
      // Creating a new post
      const newPost = {
        id: Date.now(),
        text: postText,
        userName: userName,
        likes: 0,
        shares: 0,
        saved: false,
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
    }
  };

  const handleDelete = (postId) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
  };

  const handleLike = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  const handleShare = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, shares: post.shares + 1 } : post
      )
    );
  };

  const handleSave = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, saved: !post.saved } : post
      )
    );
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
        />
      )}
      {posts.length > 0 && (
        <div className="post-list">
          {posts.map((post) => (
            <div className="post-item" key={post.id}>
              <div className="post-header">
                <div className="user-name">{post.userName}</div>
                <div className="post-actions">
                  <button
                    className="like-button"
                    onClick={() => handleLike(post.id)}
                  >
                    Like ({post.likes})
                  </button>
                  <button
                    className="share-button"
                    onClick={() => handleShare(post.id)}
                  >
                    Share ({post.shares})
                  </button>
                  <button
                    className={`save-button${post.saved ? ' saved' : ''}`}
                    onClick={() => handleSave(post.id)}
                  >
                    {post.saved ? 'Saved' : 'Save'}
                  </button>
                </div>
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

const PostForm = ({ onClose, onPost, editMode, initialPostText, initialUserName }) => {
  const [postText, setPostText] = useState(initialPostText || '');
  const [userName, setUserName] = useState(initialUserName || '');

  const handlePostTextChange = (event) => {
    setPostText(event.target.value);
  };

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
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

export default AddPost;
