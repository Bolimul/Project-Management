// ImageComponent.js
import React from "react";

const ImageComponent = () => {
  return (
    <img
      className="rounded-lg shadow-xl shadow-blue-gray-900/50"
      style={{ width: "600px", height: "500px" }} // inline styles to adjust width and height
      src="https://images.pexels.com/photos/4226769/pexels-photo-4226769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      alt="nature image"
    />
  );
};

export default ImageComponent;
