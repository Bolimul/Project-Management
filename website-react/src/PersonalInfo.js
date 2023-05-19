import {useState} from "react";
import "./PersonalInfo.css";
var ExampleAccount = {
    image: "https://upload.wikimedia.org/wikipedia/en/c/cc/Wojak_cropped.jpg",
    firstName: "Sam",
    lastName: "Rogers",
    pStatus: "Student",
    bio: "I'm a student",
    email: "samrog@gmail.com"
}


export const PersonalInfo = (props) =>
{
    const [fName, setFirstName] = useState(ExampleAccount.firstName)
    const [lName, setLastName] = useState(ExampleAccount.lastName)
    const [pS, setPStatus] = useState(ExampleAccount.pStatus)
    const [pBio, setBio] = useState(ExampleAccount.bio)
    const [pEmail, setEmail] = useState(ExampleAccount.email)

    const handleSubmit = async(e) => {
        e.preventDafault()
        console.log(fName)
        console.log(lName)
        console.log(pS)
        console.log(pBio)
        console.log(pEmail)
        ExampleAccount.firstName = fName;
        ExampleAccount.lastName = lName;
        ExampleAccount.pStatus = pS;
        ExampleAccount.bio = pBio;
        ExampleAccount.email = pEmail;
        console.log(console.error())
    }
    
    return(
        <div>
            <div>
                <img src={ExampleAccount.image} alt=""/>
                <p>First name: {ExampleAccount.firstName}</p>
                <p>Last name: {ExampleAccount.lastName}</p>
                <p>Status: {ExampleAccount.pStatus}</p>
                <p>Bio: {ExampleAccount.bio}</p>
                <p>Email: {ExampleAccount.email}</p>
            </div>
            <form onSubmit={handleSubmit}>
                <p>Change First Name:</p>
                <input value={fName} onChange={(e) => setFirstName(e.target.value)}/>
                <p>Change Last Name:</p>
                <input value={lName} onChange={(e) => setLastName(e.target.value)}/>
                <p>Change Personal Status:</p>
                <input value={pS} onChange={(e) => setPStatus(e.target.value)}/>
                <p>Change Bio:</p>
                <input value={pBio} onChange={(e) => setBio(e.target.value)}/>
                <p>Change Email:</p>
                <input value={pEmail} onChange={(e) => setEmail(e.target.value)}/>
                <button type="submit">Submit Button</button>
            </form>
        </div>
        
    );
}

export default PersonalInfo;