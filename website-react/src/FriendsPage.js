import React from 'react';
import './FriendsPage.css';


const FriendsPage = () => {
  // Existing list of friends
  const friendsList = [
      { id: 1, firstName: 'Maya', lastName: 'Rozenberg'},
      { id: 2, firstName: 'Anna', lastName: 'Sol'},
      { id: 3, firstName: 'Netanel', lastName: 'Fadlon'},
    // Add more friends to the list as needed
  ];

  return (
    <div>
      <h1>Friends</h1>
      {friendsList.length > 0 ? (
        <ul>
          {friendsList.map((friend) => (
            <li key={friend.id}>
              <button>{`${friend.firstName} ${friend.lastName}`}</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No friends added yet.</p>
      )}
    </div>
  );
};


export default FriendsPage;
