import NavbarProfile from "./NavbarProfile";
import PersonalInfo from "./PersonalInfo";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import "./Styles.css";
import {BrowserRouter, Routes, Route} from "react-router-dom";

export default function AppProfile() {
  return (
      <div className="AppProfile">
        <NavbarProfile/>
      <BrowserRouter>
      
        <Routes>
          <Route to="/" element={<Home />}/>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />}/>
          <Route path="/personalInfo" element={<PersonalInfo />}/>
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}