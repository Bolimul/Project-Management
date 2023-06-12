import { useState } from "react";
import "./PersonalAreaPostsSaved.css";
import { db } from "./firebase";

const post_saved = [
  "New Research about the human genetics",
  "Structure of heart",
  "Common mistakes when trying the heal from cold",
  "New Alergies this season",
  "Protect your ears from the cold",
];

const post_liked = [
  "New technologies for cancer treatments",
  "You are brushing your teeth wrong",
  "Protect your eyes from the sun",
  "Inovations in insoles",
];

function PersonalAreaPostsSaved() {
  return (
    <div className="Saved-Posts">
      <div>
        <h1>Posts you Saved</h1>
        {post_saved.map((post, index) => (
          <h2 key={index}>* {post}</h2>
        ))}
      </div>

      <div>
        <h1>Posts you Liked</h1>
        {post_liked.map((post, index) => (
          <h2 key={index}>* {post}</h2>
        ))}
      </div>
    </div>
  );
}

export default PersonalAreaPostsSaved;
