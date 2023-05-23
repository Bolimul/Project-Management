import React, { useState } from 'react';
import './FriendSearch.css'; // Import the CSS file
import { db } from "./firebase";
import { collection, getDocs } from 'firebase/firestore';

const FriendSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [friendsList, setFriendsList] = useState([]);
  const [isFriendListOpen, setIsFriendListOpen] = useState(false);

  const handleSearch = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'users-profile-data'));

      const existingPeople = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log(existingPeople); // Log the retrieved data to the console

      // Perform the search based on the search query
      const searchResults = existingPeople.filter((person) => {
        const fullName = `${person.firstName} ${person.lastName}`;
        const search = searchQuery.toLowerCase();

        // Search by first name or last name
        return (
          person.firstName.toLowerCase().includes(search) ||
          person.lastName.toLowerCase().includes(search)
        );
      });

      // Set the searchResults state with the matching results
      setSearchResults(searchResults);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleAddFriend = async (person) => {
    const { firstName, lastName } = person;

    // Check if the entered first name and last name are valid
    const nameRegex = /^[a-zA-Z]+$/;
    if (!firstName.match(nameRegex) || !lastName.match(nameRegex)) {
      alert('Please enter a valid first and last name (only letters are allowed).');
      return;
    }

    try {
      // Check if the person already exists in the friends list
      const friendsQuerySnapshot = await db
        .collection('friends')
        .where('firstName', '==', firstName)
        .where('lastName', '==', lastName)
        .get();

      if (!friendsQuerySnapshot.empty) {
        alert('This person is already in your friends list.');
        return;
      }

      // Add the person to the friends collection
      await db.collection('friends').add({
        firstName,
        lastName,
      });

      // Add the person to the friends list
      setFriendsList((prevFriendsList) => [...prevFriendsList, person]);
    } catch (error) {
      console.error('Error adding friend:', error);
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
      </div>
      <div className="search-results">
        {searchResults.length > 0 ? (
          <ul>
            {searchResults.map((person) => (
              <li key={person.id}>
                {person.firstName} {person.lastName}
                <button
                  className="add-friend-button"
                  onClick={() => handleAddFriend(person)}
                  disabled={friendsList.some(
                    (friend) =>
                      friend.firstName === person.firstName && friend.lastName === person.lastName
                  )}
                >
                  {friendsList.some(
                    (friend) =>
                      friend.firstName === person.firstName && friend.lastName === person.lastName
                  ) ? (
                    <span>&#10003;</span>
                  ) : (
                    'Add Friend'
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
            {isFriendListOpen ? 'Close' : 'See'}
          </button>
        </h2>
        {isFriendListOpen && (
          <>
            {friendsList.length > 0 ? (
              <ul>
                {friendsList.map((friend) => (
                  <li key={friend.id}>
                    {friend.firstName} {friend.lastName}
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
