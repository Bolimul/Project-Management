import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { auth } from "./firebase";

import NavBarSigned from "./NavBarSigned";
import NavbarStart from "./NavbarStart";

import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import PersonalAreaPostsSaved from "./PersonalAreaPostsSaved";
import FriendSearch from "./FriendSearch";
import FriendsPage from "./FriendsPage";
import AddPost from "./AddPost";
import PersonalInfo from "./PersonalInfo";
import StatisticalInfo from "./StatisticalInfo";
import FollowingUsers from "./FollowingUsers";


import "./Styles.css";
import AddForumPost from "./AddForumPost";

function App() {
  const [isPersonalPage, setIsPersonalPage] = useState(1);

  const handlePersonalPage = () => {
    setIsPersonalPage(!isPersonalPage);
  };

  return (
    <div className="App" onClick={handlePersonalPage}>
      <Router>
        {auth?.currentUser?.uid ? <NavBarSigned /> : <NavbarStart />}
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add_friend" element={<FriendSearch />} />

          <Route path="/blog" element={<AddPost />} />
          <Route path="/friends" element={<FriendsPage />} />
          <Route path="/savedPosts" element={<PersonalAreaPostsSaved />} />
          <Route path="/analytics" element={<StatisticalInfo />} />
          <Route path="/following_users" element={<FollowingUsers />} />
          <Route path="/personalInfo" element={<PersonalInfo />} />
          <Route path="/forumPage" element={<AddForumPost/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

/*          <Route path="/personalInfo" element={<PersonalInfo />} />
 */
