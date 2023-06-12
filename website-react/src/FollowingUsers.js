import React from "react";
import "./FollowingUsers.css";

export const FollowingUsers = (props) => {
  var theUsers = [
    { FirstName: "Maya", LastName: "Rosenberg" },
    { FirstName: "Nikita", LastName: "Solonets" },
    { FirstName: "Ilan", LastName: "Shklover" }
  ];

  return (
    <div className="container">
      <h1 className="title">Following List</h1>
      <ul className="list">
        {theUsers.map((friend, index) => (
          <li key={index}>
            <button>{`${friend.FirstName} ${friend.LastName}`}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FollowingUsers;