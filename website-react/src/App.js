
import Navbar from "./Navbar";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import PersonalAreaPostsSaved from "./PersonalAreaPostsSaved";

import "./Styles.css";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import PersonalAreaPostsSaved from "./PersonalAreaPostsSaved";

export default function App() {
  return (
      <div className="App">
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route to="/" element={<Home />}/>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />}/>
          <Route path="/savedPosts" element={<PersonalAreaPostsSaved />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
