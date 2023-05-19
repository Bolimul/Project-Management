import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import  PersonalInfo  from "./PersonalInfo";
import NavbarProfile from "./NavbarProfile";
import "./Styles.css";
import {BrowserRouter, Routes, Route} from "react-router-dom";

export default function AppProfile() {
  return (
      <div className="AppProfile">
      <BrowserRouter>
      <NavbarProfile />
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
