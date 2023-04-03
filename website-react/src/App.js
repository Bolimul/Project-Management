
import Navbar from "./Navbar";
import Home from "./Home";
import "./Styles.css";

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
