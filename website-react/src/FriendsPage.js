import React from 'react';
import './FriendsPage.css'; // Import the CSS file

const FriendsPage = () => {
  // Existing list of friends
  const friendsList = [
    { id: 1, firstName: 'Maya', lastName: 'Rozenberg' },
    { id: 2, firstName: 'Anna', lastName: 'Sol' },
    { id: 3, firstName: 'Netanel', lastName: 'Fadlon' },
    // Add more friends to the list as needed
  ];

  return (
    <div className="container"> {/* Apply the 'container' class */}
      <h1 className="title">Friends List</h1> {/* Apply the 'title' class */}
      {friendsList.length > 0 ? (
        <ul className="list"> {/* Apply the 'list' class */}
          {friendsList.map((friend) => (
            <li className="list-item" key={friend.id}> {/* Apply the 'list-item' class */}
              <button className="button">{`${friend.firstName} ${friend.lastName}`}</button> {/* Apply the 'button' class */}
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