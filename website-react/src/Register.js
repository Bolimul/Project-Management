import React,{useState} from "react";
import {Link} from "react-router-dom";
export const Register = (props) =>{

    const [username,setUsername] = useState('');
    const [password,setPassword]  =useState('');
    const [name,setname]= useState('');

    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(username);

    }

    
    return (
        
        <div className="auth-form-container">
            <h2>Register page</h2>
            <form className="register-form" onSubmit={handleSubmit}>
                <label htmlForm = "name"> Full name</label>
                <input value = {name} onChange={(e) =>setname(e.target.value)} type="username"  placeholder="Full name"  id = "name"  name = "name"/>
                <label htmlform = "username">username</label>
                <input value = {username} onChange={(e) =>setUsername(e.target.value)} type="username" placeholder= "Enter your username here" id="username" name="username" /> 
                <label htmlform = "password">password</label>
                <input value = {password} onChange={(e) =>setPassword(e.target.value)} type = "password"  placeholder= "Enter your password here" id="password" name="password" /> 
                <button type = "submit">Log In</button>
            </form>
            
            <Link to="/login"><button className = "link-btn">Already have an account? Log in here.</button></Link>
        </div>
    );
}

export default Register;