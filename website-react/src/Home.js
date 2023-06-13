import React, { useState, useEffect } from "react";
import { db, auth } from "./firebase";
import {
  collection,
  onSnapshot,
  FieldValue,
  updateDoc,
  doc,
  getDoc,
  arrayUnion,
  postTitlet,
  query,
  where,
  getDocs
} from "firebase/firestore";

import AddPostHome from "./AddPostHome";
import "./HomeStyle.css";

const Home = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    let unsubscribe;

    const fetchPosts = async () => {
      try {
        const postsCollection = collection(db, "users-profile-data");
        unsubscribe = onSnapshot(postsCollection, (snapshot) => {
          const posts = snapshot.docs.map((doc) => doc.data().myPosts);
          let arr = [];
          posts.forEach((element) => {
            if (Array.isArray(element)) {
              element.forEach((e) => {
                arr.push(e);
              });
            }
          });
          setAllPosts(arr);
        });
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    if (auth.currentUser) {
      fetchPosts();
    }

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const handleFollow = async (postId, postUserName) => {
    try {
      const follower = {
        id: Date.now(),
        userName: postUserName,
        dateStartFollow: new Date().toISOString(),
      };
  
      // const postIndex = allPosts.findIndex((post) => post.id === postId);
      // if (postIndex !== -1) {
      //   const updatedPosts = [...allPosts];
      //   updatedPosts[postIndex].Followers.push(follower);
      //   setAllPosts(updatedPosts);
  
         const userRef = doc(db, "users-profile-data", auth.currentUser.uid);
      //   const userDoc = await getDoc(userRef);
      //   const userPosts = userDoc.data().Followers;
      //   console.log(userPosts)
      //   userPosts[postIndex].followers.push(follower);
        await updateDoc(userRef, {
          "Followers": arrayUnion(follower),
        });
      }catch (error) {
        console.error("Error adding follow:", error);
    } 
    }
;
  
  
  
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


  const handleSave = async (postId) => {
    const updatedPosts = allPosts.map((post) =>
      post.id == postId ? { ...post, saved: !post.saved }  :  post
 );
    setAllPosts(updatedPosts);
  
    try {
      const postToSave = updatedPosts.find((post) => post.id === postId);
      if (postToSave) {
        const postRef = doc(
          db,
          "users-profile-data",
          auth.currentUser.uid
        );
        const st = postToSave.idPost +" "+ postToSave.text
        await updateDoc(postRef, {
          savedPosts: arrayUnion(st)
        });
        console.log("Post saved:", postId);
      }
    } catch (error) {
      console.error("Error saving post:", postId, error);
    }
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

      const docRef = doc(
        db,
        "users-profile-data",
        auth.currentUser.uid,
        "myPosts",
        String(post.id)
      );
      await updateDoc(docRef, post);

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
                className="follow-button"
                onClick={() => handleFollow(post.id, post.userName)}
                >
                Follow
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

                <button
                  className={`save-button${post.saved ? " saved" : ""}`}
                  // onClick={() => handleSave(post.)}
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
