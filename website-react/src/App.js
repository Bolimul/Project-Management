import NavBar_Signed from "./NavBar_Signed"
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import PersonalAreaPostsSaved from "./PersonalAreaPostsSaved"
import FriendSearch from "./FriendSearch";
import FriendsPage from "./FriendsPage";
import AddPost from "./AddPost";


import "./Styles.css";
import {BrowserRouter, Routes, Route, Redirect} from "react-router-dom";
import {useState, Fragment} from "react";

import PersonalInfo from "./PersonalInfo";
import NavbarStart from "./NavbarStart";
import StatisticalInfo from "./StatisticalInfo";



export default function App() {

  const [isPersonalPage, setIsPersonalPage] = useState(1);

  const handlePersonalPage = () => {
    setIsPersonalPage(isPersonalPage => !isPersonalPage);
  };
  return (
    <div className="App" onClick={handlePersonalPage}>
      
      <BrowserRouter>
      <NavbarStart/>
        <Routes>
            <Route path="/home" element={<Home />}/>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />}/>
            <Route path="/add friend" element={<FriendSearch />}/>
            <Route path="/personalInfo" element={<PersonalInfo/>}/>
            <Route path="/Blog" element={<AddPost />} />
            <Route path="/friends" element={<FriendsPage />}/>
            <Route path="/savedPosts" element={<PersonalAreaPostsSaved />}/>
            <Route path="/analitycs" element={<StatisticalInfo/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}



