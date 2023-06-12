import React, { useState, useEffect } from "react";
import { firestore } from "./firebase"; // your Firebase config file
import "./notification.css";

const Notifications = () => {
  const [notifications, setUpdates] = useState([]);

  // Fetch updates on mount and whenever they change
  useEffect(() => {
    const userID = "currentUserID"; // replace with the actual user id
    firestore
      .collection("users-profile-data")
      .doc(userID)
      .onSnapshot((snapshot) => {
        setUpdates(snapshot.data().notifications || []);
      });
  }, []);

  const deleteNotification = (index) => {
    const userID = "currentUserID"; // replace with the actual user id
    const newNotifications = [...notifications];
    newNotifications.splice(index, 1);
    firestore.collection("users-profile-data").doc(userID).update({
      notifications: newNotifications,
    });
  };

  return (
    <div className="notifications">
      {notifications.map((update, index) => (
        <div key={index} className="notification">
          <p>
            A post has been uploaded on topic {update.Subject} that you are
            following, the name of the post is: {update.Title} The name of the
            uploader of the post is: {update.Username}
          </p>
          <button onClick={() => deleteNotification(index)}>
            Delete Alert
          </button>
        </div>
      ))}
    </div>
  );
};

export default Notifications;
