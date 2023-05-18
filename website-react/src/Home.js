import React, { useState } from "react";
import "./HomeStyle.css";

function Home() {
  const [posts, setPosts] = useState([]);

  const handlePostSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const postContent = formData.get("content");

    if (postContent.trim() !== "") {
      const newPost = {
        id: Date.now(),
        content: postContent.trim(),
        timestamp: new Date().toISOString(),
      };

      setPosts([newPost, ...posts]);
      e.target.reset();
    }
  };

  return (
    <>
      <div className="home">
        <h1>HOME PAGE :-)</h1>
        <h3>WEB PROJECT</h3>
        <form onSubmit={handlePostSubmit}>
          <textarea name="content" placeholder="Add Post.." />
          <button type="POST IT!">Post</button>
        </form>
        {posts.map((post) => (
          <div key={post.id} className="post">
            <p>{post.content}</p>
            <small>{post.timestamp}</small>
          </div>
        ))}
      </div>
    </>
  );
}

export default Home;
