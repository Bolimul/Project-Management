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
        
        //Code paste 2
    );
}

export default Register;