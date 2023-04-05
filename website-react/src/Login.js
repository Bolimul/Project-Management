import React,{useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import "./LoginStyle.css";

function password_validation(password){
    var password_user = 'abc234!';
    return password_user === password;
  }

export const Login = (props) => {
    const [username,setUsername] = useState('');
    const [password,setPassword]  =useState('');
    const [message, setData] = React.useState('');
    const handleSubmit = async(e) =>{
        e.preventDefault();
        console.log(username);
        try{
            if(password_validation(password))
            {
                await axios.post('https://exercise-project-management.onrender.com/login',{username, password})
                axios.get('https://exercise-project-management.onrender.com/login').then(resp => setData(resp.data.message));
            }
          }catch(error)
          {
            console.log(error);
          }
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