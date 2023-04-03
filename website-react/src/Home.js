import "./HomeStyle.css";
import Login from "./Login";
import Register from "./Register";
import Layout from "./Layout";
import {BrowserRouter, Routes, Route} from "react-router-dom";

function Home() {
  return (
    <>
      <div className="home">
        <h1>HOME PAGE :-)</h1>
        <h3>WEB PROJECT</h3>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route>
          </Routes>
        </BrowserRouter>
        
      </div>
    </>
  );
}

export default Home;
