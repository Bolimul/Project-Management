import React, { useState } from 'react';
import './FriendSearch.css'; // Import the CSS file

const FriendSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [friendsList, setFriendsList] = useState([]);
  const [isFriendListOpen, setIsFriendListOpen] = useState(false);

  const handleSearch = () => {
    // Existing list of people
    const existingPeople = [
      { id: 1, firstName: 'Maya', lastName: 'Rozenberg' },
      { id: 2, firstName: 'Anna', lastName: 'Sol' },
      { id: 3, firstName: 'Netanel', lastName: 'Fadlon' },
      // Add more people to the list as needed
    ];

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
  };

  const handleAddFriend = (person) => {
    const { firstName, lastName } = person;

    // Check if the entered first name and last name are valid
    const nameRegex = /^[a-zA-Z]+$/;
    if (!firstName.match(nameRegex) || !lastName.match(nameRegex)) {
      alert('Please enter a valid first and last name (only letters are allowed).');
      return;
    }

    // Check if the person already exists in the friends list
    const isFriendExist = friendsList.some(
      (friend) => friend.firstName === firstName && friend.lastName === lastName
    );
    if (isFriendExist) {
      alert('This person is already in your friends list.');
      return;
    }

    // Add the person to the friends list
    setFriendsList((prevFriendsList) => [...prevFriendsList, person]);
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
                  )
                    ? <span>&#10003;</span>
                    : 'Add Friend'}
                </button>
              </li>
            ))}
          </ul>
        )
        : (
          searchQuery && <p>No results found.</p>
        )
    }
  </div>
  <div className="friends-list">
    <h2>
      Friends List
      <button onClick={toggleFriendList}>
        {isFriendListOpen ? 'Close' : 'See'}
      </button>
    </h2>
    {
      isFriendListOpen && (
        <>
          {
            friendsList.length > 0 ? (
              <ul>
                {friendsList.map((friend) => (
                  <li key={friend.id}>
                    {friend.firstName} {friend.lastName}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No friends added yet.</p>
            )
          }
        </>
      )
    }
  </div>
</div>
);
};

export default FriendSearch;
