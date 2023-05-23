import { useState, useEffect } from "react";
import { db } from "./firebase";
import {
  doc,
  getDocs,
  collection,
  query,
  where,
} from "firebase/firestore";
import { auth } from "./firebase";

const PersonalInfo = () => {
  const [ExampleAccount, setExampleAccount] = useState({
    image: "https://upload.wikimedia.org/wikipedia/en/c/cc/Wojak_cropped.jpg",
    firstName: "",
    lastName: "",
    spec: "",
    bio: "",
    phoneNum: "",
    pQuestion: "",
    pAnswer: "",
    email: "",
    status: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const ref = collection(db, "users-profile-data");
        const q = query(ref, where("UserId", "==", auth.currentUser.uid));
        const data = await getDocs(q);
        const user = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))[0];

        setExampleAccount((prevAccount) => ({
          ...prevAccount,
          firstName: user.FirstName,
          lastName: user.LastName,
          spec: user.Specialty,
          bio: user.BioInfo,
          phoneNum: user.PhoneNumber,
          pQuestion: user.PQuestion,
          pAnswer: user.AnswerToQ,
          email: user.Email,
          status: user.UserType,
        }));
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const [fName, setFirstName] = useState(ExampleAccount.firstName);
  const [lName, setLastName] = useState(ExampleAccount.lastName);
  const [pS, setPStatus] = useState(ExampleAccount.pStatus);
  const [pBio, setBio] = useState(ExampleAccount.bio);
  const [pEmail, setEmail] = useState(ExampleAccount.email);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(fName);
    console.log(lName);
    console.log(pS);
    console.log(pBio);
    console.log(pEmail);
    setExampleAccount((prevAccount) => ({
      ...prevAccount,
      firstName: fName,
      lastName: lName,
      pStatus: pS,
      bio: pBio,
      email: pEmail,
    }));
    console.log(console.error());
  };

  return (
    <div>
      <div>
        <img src={ExampleAccount.image} alt="" />
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
        <input value={fName} onChange={(e) => setFirstName(e.target.value)} />
        <p>Change Last Name:</p>
        <input value={lName} onChange={(e) => setLastName(e.target.value)} />
        <p>Change Personal Status:</p>
        <input value={pS} onChange={(e) => setPStatus(e.target.value)} />
        <p>Change Bio:</p>
        <input value={pBio} onChange={(e) => setBio(e.target.value)} />
        <p>Change Email:</p>
        <input value={pEmail} onChange={(e) => setEmail(e.target.value)} />
        <button type="submit">Submit Button</button>
      </form>
    </div>
  );
};

export default PersonalInfo;
