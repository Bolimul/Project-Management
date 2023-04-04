import React,{useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import "./LoginStyle.css";
import Home from "./Home";
export const Login = (props) => {
    const [username,setUsername] = useState('');
    const [password,setPassword]  =useState('');
    const [message, setData] = React.useState('');
    //Code paste 3
    }
    return (
        <div className="auth-form-container">
            <h2>Login page</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlform = "username">username</label>
                <input value = {username} onChange={(e) =>setUsername(e.target.value)} type="username" placeholder= "Enter your username here" id="username" name="username" /> 
                <label htmlform = "password">password</label>
                <input value = {password} onChange={(e) =>setPassword(e.target.value)} type = "password"  placeholder= "Enter your password here" id="password" name="password" /> 
                <button type = "submit">Log In</button>
            </form>
            <Link to="/register"><button className = "link-btn"> Don't have an account? Register here.</button></Link>
            <p>{message}</p>
        </div>
    );
}

export default Login;