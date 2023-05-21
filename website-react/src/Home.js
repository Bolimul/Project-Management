import React, { useState } from 'react';
import AddPostHome from './AddPostHome';
import './HomeStyle.css';

const Home = () => {
  const [allPosts, setAllPosts] = useState([]);

  const handleShare = (postId) => {
    const postToShare = allPosts.find((post) => post.id === postId);
    if (postToShare) {
      const sharedPost = {
        id: Date.now(),
        text: postToShare.text,
        userName: 'Shared from: ' + postToShare.userName,
        likes: 0,
        shares: 0,
        saved: false,
        shared: true,
      };
      setAllPosts((prevPosts) => [sharedPost, ...prevPosts]);
    }
  };

  const handleLike = (postId) => {
    setAllPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  const handleSave = (postId) => {
    setAllPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, saved: !post.saved } : post
      )
    );
  };

  const handlePost = (postText, userName) => {
    const newPost = {
      id: Date.now(),
      text: postText,
      userName: userName,
      likes: 0,
      shares: 0,
      saved: false,
    };
    setAllPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  return (
    <div className="home-container">
      <h1>Posts</h1>
      <AddPostHome onPost={handlePost} />
      {allPosts.length > 0 && (
        <div className="post-list">
          {allPosts.map((post) => (
            <div className={`post-container${post.shared ? ' shared' : ''}`} key={post.id}>
              <h3>{post.userName}</h3>
              <p>{post.text}</p>
              <div className="post-actions">
                <button className="like-button" onClick={() => handleLike(post.id)}>
                  Like ({post.likes})
                </button>
                <button className="share-button" onClick={() => handleShare(post.id)}>
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
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;

