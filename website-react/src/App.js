import './App.css';
import React from 'react';
import axios from 'axios';

function App() {
  const [username, setName] = React.useState('');
  const [password, setPass] = React.useState('');
  const [message, setData] = React.useState('');
    const handleSubmit = (e) =>{
      e.preventDefault();
      console.log(e.target.uname.value);
      console.log(e.target.pass.value);
      try{
        axios.post('https://exercise-project-management.onrender.com/react-app',{username, password});
        axios.get('https://exercise-project-management.onrender.com/react-app').then(resp => setData(resp.data.message));
      }catch(error)
      {
        console.log(error);
      }
        
    }
  return (
    <div className="App">
      <form onSubmit={handleSubmit} action="../../react-app" method="post"> 
      <h4>Enter nickname</h4>
        <input type="text" name="uname" placeholder="Username" value={username} onChange={(e) => setName(e.target.value)}/><br/>
        <h4>Enter password</h4>
        <input type="password" name="pass" placeholder="password" value={password} onChange={(e) => setPass(e.target.value)}/><br/>
        <button type="submit">Submit</button> 
      </form>
         <p>{message}</p>
    </div>
  );
}

export default App;
