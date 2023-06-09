import React, { useState } from "react";
import "./FriendSearch.css"; // Import the CSS file
import { db } from "./firebase";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";

const FriendSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [friendsList, setFriendsList] = useState([]);
  const [isFriendListOpen, setIsFriendListOpen] = useState(false);
  const [error, setError] = useState(null); // New error state

  const handleSearch = async () => {
    try {
      // Reset error state before each search
      setError(null);

      const colRef = collection(db, "users-profile-data");
      const querySnapshot = await getDocs(colRef);

      const existingPeople = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log(existingPeople); // Log the retrieved data to the console

      // Perform the search based on the search query
      const searchResults = existingPeople.filter((person) => {
        const fullName = `${person.FirstName} ${person.LastName}`;
        const search = searchQuery.toLowerCase();

        // Search by first name or last name
        return (
          person.FirstName.toLowerCase().includes(search) ||
          person.LastName.toLowerCase().includes(search)
        );
      });

      // Set the searchResults state with the matching results
      setSearchResults(searchResults);
    } catch (error) {
      console.error("Error fetching users:", error);
      setError(
        "An error occurred while fetching users. Please try again later."
      );
    }
  };

  const handleAddFriend = async (person) => {
    const { FirstName, LastName } = person;

    // Check if the entered first name and last name are valid
    const nameRegex = /^[a-zA-Z]+$/;
    if (!FirstName.match(nameRegex) || !LastName.match(nameRegex)) {
      alert(
        "Please enter a valid first and last name (only letters are allowed)."
      );
      return;
    }

    try {
      // Check if the person already exists in the friends list
      const friendsQuerySnapshot = await db
        .collection("users-profile-data")
        .where("FirstName", "==", FirstName)
        .where("LastName", "==", LastName)
        .get();

      if (!friendsQuerySnapshot.empty) {
        alert("This person is already in your friends list.");
        return;
      }

      // Add the person to the friends collection
      const newFriendRef = await db.collection("Friends").add({
        FirstName,
        LastName,
      });

      // Add the person to the friends list
      setFriendsList((prevFriendsList) => [...prevFriendsList, person]); //The prevFriendsList variable is automatically provided by React's state management
    } catch (error) {
      console.error("Error adding friend:", error);
    }
  };

  const toggleFriendList = () => {
    setIsFriendListOpen((prevIsFriendListOpen) => !prevIsFriendListOpen);
  };

  return (
    <div className="friend-search-container">
      <h1>Friend Search</h1>
      <div className="search-container">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        {error && <p className="error-message">{error}</p>}{" "}
        {/* Render the error message */}
      </div>
      <div className="search-results">
        {searchResults.length > 0 ? (
          <ul>
            {searchResults.map((person) => (
              <li key={person.id}>
                {person.FirstName} {person.LastName}
                <button
                  className="add-friend-button"
                  onClick={() => handleAddFriend(person)}
                  disabled={friendsList.some(
                    (friend) =>
                      friend.FirstName === person.FirstName &&
                      friend.LastName === person.LastName
                  )}
                >
                  {friendsList.some(
                    (friend) =>
                      friend.FirstName === person.FirstName &&
                      friend.LastName === person.LastName
                  ) ? (
                    <span>&#10003;</span>
                  ) : (
                    "Add Friend"
                  )}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          searchQuery && <p>No results found.</p>
        )}
      </div>
      <div className="friends-list">
        <h2>
          Friends List
          <button onClick={toggleFriendList}>
            {isFriendListOpen ? "Close" : "See"}
          </button>
        </h2>
        {isFriendListOpen && (
          <>
            {friendsList.length > 0 ? (
              <ul>
                {friendsList.map((friend) => (
                  <li key={friend.id}>
                    {friend.FirstName} {friend.LastName}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No friends added yet.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default FriendSearch;
