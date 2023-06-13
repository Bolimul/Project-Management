import React, { useState, useEffect } from "react";
import { db, auth } from "./firebase";
import {
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
} from "firebase/firestore";
import AddPostHome from "./AddPostHome";
import "./HomeStyle.css";

const Home = () => {
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    let unsubscribe;

    const fetchPosts = async () => {
      try {
        const postsCollection = collection(
          db,
          "users-profile-data",
          auth.currentUser.uid,
          "myPosts"
        );
        const q = query(postsCollection, orderBy("likes", "desc"), limit(10));
        unsubscribe = onSnapshot(q, (snapshot) => {
          const posts = snapshot.docs.map((doc) => doc.data());
          setAllPosts(posts);
          console.log(allPosts);
        });
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    if (auth.currentUser) {
      fetchPosts();
    }

    // Cleanup function to unsubscribe from the Firestore listener
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []); // adding an empty dependency array to ensure the effect runs only once on component mount

  const handleShare = (postId) => {
    const postToShare = allPosts.find((post) => post.id === postId);
    if (postToShare) {
      const sharedPost = {
        id: Date.now(),
        text: postToShare.text,
        userName: "Shared from: " + postToShare.userName,
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

  const handlePost = async (postText, userName) => {
    try {
      const post = {
        id: Date.now(),
        text: postText,
        userName: userName,
        likes: 0,
        shares: 0,
        saved: false,
      };

      const docRef = collection(
        db,
        "users-profile-data",
        auth.currentUser.uid,
        "myPosts"
      );
      await db.doc(docRef, String(post.id)).set(post);

      setAllPosts((prevPosts) => [post, ...prevPosts]);
    } catch (error) {
      console.error("Error posting:", error);
    }
  };

  return (
    <div className="home-container">
      <h1>Posts</h1>
      <AddPostHome onPost={handlePost} />
      {allPosts.length > 0 && (
        <div className="post-list">
          {allPosts.map((post) => (
            <div
              className={`post-container${post.shared ? " shared" : ""}`}
              key={post.id}
            >
              <h3>{post.userName}</h3>
              <p>{post.text}</p>
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
                  className={`save-button${post.saved ? " saved" : ""}`}
                  onClick={() => handleSave(post.id)}
                >
                  {post.saved ? "Saved" : "Save"}
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
