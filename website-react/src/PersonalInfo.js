import {useState} from "react";
import "./PersonalInfo.css";
import {db} from "./firebase";
import { doc, getDocs, collection, query, where } from "firebase/firestore";
import {auth} from "./firebase"
var ExampleAccount = {
    image: "https://upload.wikimedia.org/wikipedia/en/c/cc/Wojak_cropped.jpg",
    firstName: "",
    lastName: "",
    spec: "",
    bio: "",
    phoneNum: "",
    pQuestion:"",
    pAnswer: "",
    email: "",
    status: ""
}

const useEffect = async()=>{
    const ref = await collection(db, "users-profile-data")
    const q = await query(ref, where("UserId", "==", auth.currentUser.uid))
    const data = await getDocs(q)
    const user = await data.docs.map((doc) => ({...doc.data(), id: doc.id,}))[0];
    ExampleAccount.firstName = user.FirstName;
    ExampleAccount.lastName = user.LastName;
    ExampleAccount.spec = user.Specialty;
    ExampleAccount.bio = user.BioInfo;
    ExampleAccount.phoneNum = user.PhoneNumber;
    ExampleAccount.pQuestion = user.PQuestion;
    ExampleAccount.pAnswer = user.AnswerToQ;
    ExampleAccount.email = user.Email;
    ExampleAccount.status = user.UserType;
}

export const PersonalInfo = (props) =>
{
    useEffect()

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
                <p>Status: {ExampleAccount.spec}</p>
                <p>Bio: {ExampleAccount.bio}</p>
                <p>Speciality: {ExampleAccount.status}</p>
                <p>Personal question: {ExampleAccount.pQuestion}</p>
                <p>Personal Answer: {ExampleAccount.pAnswer}</p>
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