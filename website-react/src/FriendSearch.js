import React, { useEffect, useState } from "react";
import { db, auth } from "./firebase";
import {
  collection,
  doc,
  setDoc,
  getDocs,
  query,
  where,
  onSnapshot,
  getDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import "./FriendSearch.css"; // Import the CSS file

const FriendSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [friendsList, setFriendsList] = useState([]);
  const [isFriendListOpen, setIsFriendListOpen] = useState(false);

  useEffect(() => {
    fetchFriends();
  }, []); // fetch friends once when component is mounted

  const fetchFriends = async () => {
    try {
      const docRef = doc(db, "users-profile-data", auth.currentUser.uid);
    } catch (error) {
      console.error("Error fetching friends:", error);
    }
  };

  const addFriend = async (friend) => {
    try {
      const friendsUpdated = [...friendsList, friend];
      const docRef = doc(db, "users-profile-data", auth.currentUser.uid);

      await updateDoc(docRef, { friends: arrayUnion(friend) });
      setFriendsList(friendsUpdated); // update friends in local state
    } catch (error) {
      console.error("Error adding friend:", error);
    }
  };

  const handleSearch = async () => {
    const colRef = collection(db, "users-profile-data");
    const q = query(
      colRef,
      where("personalInfo.Email", "!=", auth.currentUser.email)
    );
    const querySnapshot = await getDocs(q);

    const searchResults = [];
    querySnapshot.forEach((doc) => {
      const user = doc.data().personalInfo;
      const regex = new RegExp(searchQuery.replace(/[^a-zA-Z0-9]/g, ""), "i");

      if (regex.test(user.FirstName) || regex.test(user.LastName)) {
        // If user is already in friend list, add a check mark
        searchResults.push({
          FirstName: user.FirstName,
          LastName: user.LastName,
          Email: user.Email,
          idFriend: user.UserId,
        });
      }
    });

    setSearchResults(searchResults);
  };

  return (
    <div className="FriendSearch">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search Friends"
      />
      <button onClick={handleSearch}>Search</button>
      <div className="SearchResults">
        {searchResults.map((user, index) => (
          <div key={index}>
            <span>
              {user.FirstName} {user.LastName}
            </span>
            {user.isFriend ? (
              <span>✔️</span>
            ) : (
              <button onClick={() => addFriend(user)}>Add Friend</button>
            )}
          </div>
        ))}
      </div>
      {isFriendListOpen && (
        <div className="FriendsList">
          <h2>Your Friends</h2>
          {friendsList.map((friend, index) => (
            <div key={index}>
              <span>
                {friend.FirstName} {friend.LastName}
              </span>
            </div>
          ))}
        </div>
      )}
      <button onClick={() => setIsFriendListOpen(!isFriendListOpen)}>
        {isFriendListOpen ? "Hide Friends List" : "Show Friends List"}
      </button>
    </div>
  );
};

export default FriendSearch;
