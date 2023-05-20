import NavbarProfile from "./NavbarProfile";
import NavBar_Signed from "./NavBar_Signed"
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import FriendSearch from "./FriendSearch";
import AddPost from "./AddPost";

import "./Styles.css";
import {BrowserRouter, Routes, Route, Redirect} from "react-router-dom";
import {useState, Fragment} from "react";

import PersonalInfo from "./PersonalInfo";
import AppProfile from "./AppProfile";
import NavbarStart from "./NavbarStart";


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
        </Routes>
      </BrowserRouter>
    </div>
  );
}
