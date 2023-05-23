import React, { useState } from "react";
import { Link } from "react-router-dom";
import {auth, db, storage} from "./firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const countries = [
    "Australia",
    "Brazil",
    "Canada",
    "China",
    "France",
    "Germany",
    "India",
    "Israel",
    "Italy",
    "Japan",
    "Mexico",
    "Russia",
    "South Korea",
    "Spain",
    "United Kingdom",
    "United States",

];
const specialties = [
    "Allergy and Immunology",
    "Anesthesiology",
    "Cardiology",
    "Dermatology",
    "Endocrinology",
    "Emergency Medicine",
    "Family Medicine",
    "Gastroenterology",
    "Geriatrics",
    "Hematology",
    "Infectious Disease",
    "Internal Medicine",
    "Nephrology",
    "Neurology",
    "Obstetrics and Gynecology",
    "Oncology",
    "Ophthalmology",
    "Orthopedics",
    "Otolaryngology",
    "Pathology",
    "Pediatrics",
    "Physical Medicine and Rehabilitation",
    "Plastic Surgery",
    "Psychiatry",
    "Pulmonology",
    "Radiology",
    "Rheumatology",
    "Sports Medicine",
    "Surgery",
    "Urology"
  ];
  

export const Register = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [userType, setUserType] = useState("");
  const [email, setEmail] = useState("");
  const [workplaceName, setWorkplaceName] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [OrganizationName, setOrganizationName] = useState("");
  const [OrganizationAdress, setOrganizationAdress] = useState("");
  const [OrganizationPhone, setOrganizationPhone] = useState("");
  const [StudentNumber, setStudentNumber] = useState("");
  const [UniversityName, setUniversityName] = useState("");
  const [NameCEO, setNameCEO] = useState("");
  const [gender, setGender] = useState("");
  const [bioInfo, setBioInfo] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [personalQuestion, setPersonalQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [image, setImage] = useState(null);
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log({
      firstName,
      lastName,
      country,
      city,
      specialty,
      email,
      gender,
      bioInfo,
      phoneNumber,
      personalQuestion,
      answer,
      image,
    });
    var userId = ""
    await createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
      userId = userCredential.user.uid
    }).then(() => {alert("The user has been registered to the system")})
    const IR = ref(storage, "profileImages/" + userId);
    const imageRef = await uploadBytes(IR, image).then((snapshot) => getDownloadURL(snapshot.ref))

    const data = {
      FirstName: firstName,
      LastName: lastName,
      Country: country,
      City: city,
      Specialty: specialty,
      UserType: userType,
      Email: email,
      WorkplaceName: workplaceName,
      LicenseNumber: licenseNumber,
      organizationName: OrganizationName,
      organizationAddress: OrganizationAdress,
      organizationPhone: OrganizationPhone,
      studentNumber: StudentNumber,
      universityName: UniversityName,
      nameCEO: NameCEO,
      Gender: gender,
      BioInfo: bioInfo,
      PhoneNumber: phoneNumber,
      PQuestion: personalQuestion,
      AnswerToQ: answer,
      UserId: userId,
      ImageRef: imageRef,
      UserName: username
    }
    const colRef = collection(db, "users-profile-data")
    await addDoc(colRef, data)
  };

  return (
    <div className="auth-form-container">
      <h2>Register page</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <label htmlFor="firstName">First Name</label>
        <input
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          type="text"
          placeholder="Enter your first name here"
          id="firstName"
          name="firstName"
          maxLength={20}
        />
        <label htmlFor="lastName">Last Name</label>
        <input
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          type="text"
          placeholder="Enter your last name here"
          id="lastName"
          name="lastName"
          maxLength={20}
        />
        <label htmlFor="country">Country</label>
        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          id="country"
          name="country"
        >
          <option value="">Select country</option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
        <label htmlFor="city">City</label>
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          type="text"
          placeholder="Enter your city here"
          id="city"
          name="city"
          maxLength={20}
        />


        <label htmlFor="specialty">Specialty</label>
        <select
          value={specialty}
          onChange={(e) => setSpecialty(e.target.value)}
          id="specialty"
          name="specialty"
        >
          <option value="">Select specialty</option>
          {specialties.map((specialty) => (
            <option key={specialty} value={specialty}>
              {specialty}
            </option>
          ))}
        </select>

        <label htmlFor="user-type">User type</label>
        <select
          value={userType}
          onChange={(e) => setUserType(e.target.value)}
          id="user-type"
          name="user-type"
        >
          <option value="">Select user type</option>
          {['Doctor','Student', 'Organization'].map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        {/* {(userType === 'Doctor') && <label htmlFor="condition">condition</label>}
        {(userType === 'Doctor') && <input
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
          type="condition"
          placeholder="Enter your condition here"
          id="condition"
          name="condition"
        />}

 {(userType === 'Pro') ? <><label htmlFor="condition">condition</label>
         <input
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
          type="condition"
          placeholder="Enter your condition here"
          id="condition"
          name="condition"
        /></> : <label htmlFor="condition">no condition</label>} */}

        {(userType === 'Doctor') && <><label htmlFor="workplace-name">Workplace Name</label>
         <input
          value={workplaceName}
          onChange={(e) => setWorkplaceName(e.target.value)}
          type="condition"
          placeholder="Enter your workplace name here"
          id="workplaceName"
          name="workplaceName"
          maxLength={20} // Added maxlength attribute
        /></>}

        {(userType === 'Doctor') && <><label htmlFor="license-number">License Number</label>
         <input
          value={licenseNumber}
          onChange={(e) => setLicenseNumber(e.target.value)}
          type="licenseNumber"
          placeholder="Enter your license number here"
          id="licenseNumber"
          name="licenseNumber"
          pattern="[0-9]*" // Added pattern attribute for numbers only
        /></>}

        {(userType === 'Organization') && <><label htmlFor="Organization-Name">Organization Name</label>
         <input
          value={OrganizationName}
          onChange={(e) => setOrganizationName(e.target.value)}
          type="OrganizationName"
          placeholder="Enter your organization name here"
          id="OrganizationName"
          name="OrganizationName"
          maxLength={20} // Added maxlength attribute
        /></>}

        {(userType === 'Organization') && <><label htmlFor="Organization-Adress">Organization Adress</label>
         <input
          value={OrganizationAdress}
          onChange={(e) => setOrganizationAdress(e.target.value)}
          type="OrganizationAdress"
          placeholder="Enter your organization adress here"
          id="OrganizationAdress"
          name="OrganizationAdress"
          maxLength={30} // Added maxlength attribute
        /></>}

        {(userType === 'Organization') && <><label htmlFor="Organization-Phone">Organization Phone</label>
         <input
          value={OrganizationPhone}
          onChange={(e) => setOrganizationPhone(e.target.value)}
          type="OrganizationPhone"
          placeholder="Enter your organization phone here"
          id="OrganizationPhone"
          name="OrganizationPhone"
          pattern="[0-9]{0,10}" // Added pattern attribute for numbers only and up to 10 digits
          maxLength={10} // Added maxlength attribute for 10 digits limit
        /></>}

        {(userType === 'Organization') && <><label htmlFor="NameCEO">Name of CEO</label>
         <input
          value={NameCEO}
          onChange={(e) => setNameCEO(e.target.value)}
          type="NameCEO"
          placeholder="Enter your name of CEO here"
          id="NameCEO"
          name="NameCEO"
          maxLength={20} // Added maxlength attribute
        /></>}

        {(userType === 'Student') && <><label htmlFor="Student Number">Student Number</label>
         <input
          value={StudentNumber}
          onChange={(e) => setStudentNumber(e.target.value)}
          type="StudentNumber"
          placeholder="Enter your student number here"
          id="StudentNumber"
          name="StudentNumber"
          pattern="[0-9]{0,10}" // Added pattern attribute for numbers only and up to 10 digits
        /></>}

        {(userType === 'Student') && <><label htmlFor="University Name">University Name</label>
         <input
          value={UniversityName}
          onChange={(e) => setUniversityName(e.target.value)}
          type="UniversityName"
          placeholder="Enter your university name here"
          id="UniversityName"
          name="UniversityName"
          maxLength={20} // Added maxlength attribute
        /></>}

        <label htmlFor="email">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Enter your email here"
          id="email"
          name="email"
        />



        <label htmlFor="gender">Gender</label>
        <select value={gender} onChange={(e) => setGender(e.target.value)} id="gender" name="gender">
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
        </select>
        <label htmlFor="bioInfo">Bio Info</label>
        <textarea
          value={bioInfo}
          onChange={(e) => setBioInfo(e.target.value)}
          placeholder="Enter your bio information here"
          id="bioInfo"
          name="bioInfo"
          maxLength={100}
        />
         <label htmlFor="phoneNumber">Phone Number</label>
        <input
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          type="tel"
          placeholder="Enter your phone number here"
          id="phoneNumber"
          name="phoneNumber"
          pattern="[0-9]{10}"
        />

        <label htmlFor="personalQuestion">Personal Question</label>
        <select
          value={personalQuestion}
          onChange={(e) => setPersonalQuestion(e.target.value)}
          id="personalQuestion"
          name="personalQuestion"
        >
          <option value="">--Select a personal question--</option>
          <option value="What is your favorite color?">
            What is your favorite color?
          </option>
          <option value="What is your favorite movie?">
            What is your favorite movie?
          </option>
          <option value="What is your favorite food?">
            What is your favorite food?
          </option>
        </select>
        <input
            value = {answer}
            onChange={(e) => setAnswer(e.target.value)}
            type="text"
            placeholder="Answer to Personal Question"
            id="answer"
            name="answer"
            maxLength={20}
        />

        <label htmlFor="image">Image</label>
        <input
            type="file"
            accept=".png,.jpg,.jpeg"
            onChange={(e) => setImage(e.target.files[0])}
            id="image"
            name="image"
        />

        <label htmlFor="password">Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="text"
          placeholder="Enter your password here"
          id="password"
          name="password"
        />

        <label htmlFor="password">Username</label>
        <input
          value={username}
          onChange={(e) => setPassword(e.target.value)}
          type="text"
          placeholder="Enter your username here"
          id="username"
          name="username"
        />
        <button type = "submit">Log In</button>
            </form>
            
            <Link to="/login"><button className = "link-btn">Already have an account? Log in here.</button></Link>
        </div>
    );
}

export default Register;



