import React, { useState, useEffect } from 'react';
import AddPostHome from './AddPostHome';
import './HomeStyle.css';
import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import { db } from './firebase';

const Home = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [followedPosts, setFollowedPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState('');

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'posts'), (querySnapshot) => {
      const postsData = querySnapshot.docs.map((doc) => doc.data());
      setAllPosts(postsData);
    });

    // Set the current user's username here
    setCurrentUser('Sam Rogers');//we wiil have to connect to data to import the username 

    return () => unsubscribe();
  }, []);

  const handleShare = (postId) => {
    const postToShare = allPosts.find((post) => post.id === postId);
    if (postToShare) {
      const sharedPost = {
        id: Date.now(),
        text: postToShare.text,
        userName: 'Shared by: ' + currentUser,
        likes: 0,
        shares: 0,
        saved: false,
        shared: true,
      };

      setAllPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId ? { ...post, shares: post.shares + 1, shared: true } : post
        )
      );
      setAllPosts((prevPosts) => [sharedPost, ...prevPosts]);
    }
  };

  const handleLike = (postId) => {
    if (likedPosts.includes(postId)) {
      return;
    }

    setLikedPosts((prevLikedPosts) => [...prevLikedPosts, postId]);

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

  const handleFollow = (postId) => {
    if (followedPosts.includes(postId)) {
      setFollowedPosts((prevFollowedPosts) =>
        prevFollowedPosts.filter((followedPost) => followedPost !== postId)
      );
    } else {
      setFollowedPosts((prevFollowedPosts) => [...prevFollowedPosts, postId]);
    }
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

  // Add two posts to the initial state
  useEffect(() => {
    handlePost('Splash', 'Dr Steph Curry');
    handlePost('Lest go', 'Dr Jayson Tatum');
    setAllPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.userName === 'Dr Jayson Tatum') {
          return { ...post, likes: 3 };
        }
        if (post.userName === 'Dr Steph Curry') {
          return { ...post, likes: 1 };
        }
        return post;
      })
    );
  }, []);

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
                <button
                  className="like-button"
                  onClick={() => handleLike(post.id)}
                  disabled={likedPosts.includes(post.id)}
                >
                  Like ({post.likes})
                </button>
                <button className="share-button" onClick={() => handleShare(post.id)}>
                  {post.shared ? 'Shared' : `Share (${post.shares})`}
                </button>
                <button
                  className={`save-button${post.saved ? ' saved' : ''}`}
                  onClick={() => handleSave(post.id)}
                >
                  {post.saved ? 'Saved' : 'Save'}
                </button>
                <button
                  className={`follow-button${followedPosts.includes(post.id) ? ' followed' : ''}`}
                  onClick={() => handleFollow(post.id)}
                >
                  {followedPosts.includes(post.id) ? 'Unfollow' : 'Follow'}
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
