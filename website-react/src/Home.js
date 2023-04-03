import "./HomeStyle.css";
import Login from "./Login";
import Register from "./Register";
//import Layout from "./Layout";
import {BrowserRouter, Routes, Route, Outlet} from "react-router-dom";

function Home() {
  return (
    <>
      <div className="home">
        <h1>HOME PAGE :-)</h1>
        <h3>WEB PROJECT</h3>
        <BrowserRouter>
          <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />}/>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default Home;
