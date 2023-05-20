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
    const [password,setPassword]  = useState('');
    const [loginType, setLoginType] = useState('email'); // default login type is email
    const [message, setData] = useState('');
    const [forgotPassword, setForgotPassword] = useState(false);
    const [securityQuestion, setSecurityQuestion] = useState('');
    const [securityAnswer, setSecurityAnswer] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(username);
        try {
          let isValidEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(username); // check if username is a valid email
          let isValidPhone = /^\d{10}$/.test(username); // check if username is a 10-digit phone number
          if (isValidEmail || isValidPhone) {
            if (password_validation(password)) {
              await axios.post("https://localhost:5000/login", { username });
              axios
                .get("https://localhost:5000/login")
                .then((resp) => setData(resp.data.message));
            } else {
              setData("Invalid password. Please try again.");
            }
          } else {
            setData("Please enter a valid email or 10-digit phone number.");
          }
        } catch (error) {
          console.log(error);
        }
      };
      

    const handleForgotPassword = () => {
        setForgotPassword(true);
    }

    const handleSecurityQuestion = (e) => {
        setSecurityQuestion(e.target.value);
    }

    const handleSecurityAnswer = (e) => {
        setSecurityAnswer(e.target.value);
    }

    return (
        <div className="auth-form-container">
            <h2>Login page</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="loginType">Login Type:</label>
                <select id="loginType" name="loginType" value={loginType} onChange={(e) => setLoginType(e.target.value)}>
                    <option value="email">Email</option>
                    <option value="phone">Phone</option>
                </select>
                <label htmlFor={loginType}>Enter your {loginType}:</label>
                <input value={username} onChange={(e) => setUsername(e.target.value)} type={loginType} placeholder={`Enter your ${loginType} here`} id={loginType} name={loginType} /> 
                <label htmlFor="password">Password:</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password"  placeholder="Enter your password here" id="password" name="password" /> 
                <button type="submit">Log In</button>
            </form>
            {forgotPassword ? (
                <div>
                    <label htmlFor="securityQuestion">Security Question:</label>
                    <select id="securityQuestion" name="securityQuestion" value={securityQuestion} onChange={handleSecurityQuestion}>
                        <option value="What is your favorite color?">What is your favorite color?</option>
                        <option value="What is your mother's maiden name?">What is your mother's maiden name?</option>
                        <option value="What is your pet's name?">What is your pet's name?</option>
                    </select>
                    <label htmlFor="securityAnswer">Security Answer:</label>
                    <input type="text" id="securityAnswer" name="securityAnswer" value={securityAnswer} onChange={handleSecurityAnswer} />
                </div>
            ) : (
                <button onClick={handleForgotPassword}>Forgot Password?</button>
            )}

            <Link to="/register"><button className = "link-btn"> Don't have an account? Register here.</button></Link>
            <p>{message}</p>
        </div>
    );
}

export default Login;