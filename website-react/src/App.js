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
          <Route path="/Home" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/FriendsSearch" element={<FriendSearch />} />
          <Route path="/PersonalInfo" element={<PersonalInfo />} />
          <Route path="/blog" element={<AddPost />} />
          <Route path="/FriendsPage" element={<FriendsPage />} />
          <Route path="/savedPosts" element={<PersonalAreaPostsSaved />} />
          <Route path="/analytics" element={<StatisticalInfo />} />
          <Route path="/following_users" element={<FollowingUsers />} />
        </Routes>
        <footer>
          © {new Date().getFullYear()} Doctor Web. All rights reserved.
        </footer>
      </Router>
    </div>
  );
}

export default App;
