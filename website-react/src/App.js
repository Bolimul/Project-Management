
import Navbar from "./Navbar";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import "./Styles.css";
import {BrowserRouter, Routes, Route, Outlet} from "react-router-dom";

export default function App() {
  return (
    <div className="App">
      <Home />
      <Navbar/>
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
