import React, { useEffect, useState } from "react";
import { db, auth } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import "./FriendSearch.css";

const FriendsPage = () => {
  const [friendsList, setFriendsList] = useState([]);
  const [isFriendListOpen, setIsFriendListOpen] = useState(false);

  useEffect(() => {
    fetchFriends();
  }, []);

  const fetchFriends = async () => {
    try {
      const docRef = doc(db, "users-profile-data", auth.currentUser.uid);
      const docSnap = await getDoc(docRef);
      const friends = docSnap.data()?.friends || [];
      setFriendsList(friends);
    } catch (error) {
      console.error("Error fetching friends:", error);
    }
  };

  return (
    <div className="FriendSearch">
      <div className="FriendsList">
        <h2>My Friends</h2>
        <ul>
          {friendsList.map((friend) => (
            <li key={friend.id}>
              {friend.profilePicture && (
                <img
                  src={friend.profilePicture}
                  alt={`${friend.fullName}'s profile picture`}
                />
              )}
              <span>
                {friend.FirstName} {friend.LastName}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FriendsPage;
