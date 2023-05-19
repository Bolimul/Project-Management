
import Navbar from "./Navbar";
import NavBar_Signed from "./NavBar_Signed"
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import FriendSearch from "./FriendSearch";
import AddPost from "./AddPost";

import "./Styles.css";
import {BrowserRouter, Routes, Route} from "react-router-dom";

export default function App() {
  return (
      <div className="App">
      <BrowserRouter>
      <NavBar_Signed/>
        <Routes>
          <Route path="/home" element={<Home />}/>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />}/>
          <Route path="/add friend" element={<FriendSearch />}/>
          <Route path="/Blog" element={<AddPost />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}
