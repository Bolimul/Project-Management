import {useState,useEffect} from "react";
import "./PersonalInfo.css";
import {db} from "./firebase";
import { doc, getDocs, collection, query, where, updateDoc, ref, getDoc } from "firebase/firestore";
import {auth} from "./firebase"
var ExampleAccount = {
    image: "",
    firstName: "",
    lastName: "",
    spec: "",
    bio: "",
    phoneNum: "",
    pQuestion:"",
    pAnswer: "",
    email: "",
    status: "",
    country: "",
    city: "",
    gender: "",
    licenceNumber: "",
    workplaceName: "",
    nameCEO: "",
    organisationName: "",
    organisationAddress: "",
    organisationPhone: "",
    studentNumber: "",
    universityName: ""
}

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


// const setDataInfo = async()=>{
//     var user = (await getDoc(doc(db,"users-profile-data",auth.currentUser.uid))).data().personalInfo;
//     // onSnapshot(doc(db,"users-profile-data",auth.currentUser.uid), (doc)=> {
//     //   user = doc.data().personalInfo;
//     //})
//     ExampleAccount.firstName = user.FirstName;
//     ExampleAccount.lastName = user.LastName;
//     ExampleAccount.spec = user.Specialty;
//     ExampleAccount.bio = user.BioInfo;
//     ExampleAccount.phoneNum = user.PhoneNumber;
//     ExampleAccount.pQuestion = user.PQuestion;
//     ExampleAccount.pAnswer = user.AnswerToQ;
//     ExampleAccount.email = user.Email;
//     ExampleAccount.status = user.UserType;
//     ExampleAccount.city = user.City;
//     ExampleAccount.country = user.Country;
//     ExampleAccount.gender = user.Gender;
//     ExampleAccount.licenceNumber = user.LicenceNumber;
//     ExampleAccount.workplaceName = user.WorkplaceName;
//     ExampleAccount.nameCEO = user.nameCEO;
//     ExampleAccount.organisationName = user.organisationName;
//     ExampleAccount.organisationAddress = user.organisationAddress;
//     ExampleAccount.organisationPhone = user.organisationPhone;
//     ExampleAccount.studentNumber = user.studentNumber;
//     ExampleAccount.universityName = user.universityName;
//     ExampleAccount.image = user.ImageRef
//     console.log(ExampleAccount);
//     setFirstName(ExampleAccount.firstName);
//     setLastName(ExampleAccount.lastName);
// }

export const PersonalInfo = (props) =>
{
    const [firstName, setFirstName] = useState(ExampleAccount.firstName);
    const [lastName, setLastName] = useState(ExampleAccount.lastName);
    const [country, setCountry] = useState(ExampleAccount.country);
    const [city, setCity] = useState(ExampleAccount.city);
    const [specialty, setSpecialty] = useState(ExampleAccount.spec);
    const [userType, setUserType] = useState(ExampleAccount.status);
    const [email, setEmail] = useState(ExampleAccount.email);
    const [workplaceName, setWorkplaceName] = useState(ExampleAccount.workplaceName);
    const [licenseNumber, setLicenseNumber] = useState(ExampleAccount.licenceNumber);
    const [OrganizationName, setOrganizationName] = useState(ExampleAccount.organisationName);
    const [OrganizationAdress, setOrganizationAdress] = useState(ExampleAccount.organisationAddress);
    const [OrganizationPhone, setOrganizationPhone] = useState(ExampleAccount.organisationPhone);
    const [StudentNumber, setStudentNumber] = useState(ExampleAccount.studentNumber);
    const [UniversityName, setUniversityName] = useState(ExampleAccount.universityName);
    const [NameCEO, setNameCEO] = useState(ExampleAccount.nameCEO);
    const [gender, setGender] = useState(ExampleAccount.gender);
    const [bioInfo, setBioInfo] = useState(ExampleAccount.bio);
    const [phoneNumber, setPhoneNumber] = useState(ExampleAccount.phoneNum);
    const [personalQuestion, setPersonalQuestion] = useState(ExampleAccount.pQuestion);
    const [answer, setAnswer] = useState(ExampleAccount.pAnswer);

    useEffect(()=>{setDataInfo()},[firstName,lastName]);

    const setDataInfo = async()=>{
        var user = (await getDoc(doc(db,"users-profile-data",auth.currentUser.uid))).data().personalInfo;
        // onSnapshot(doc(db,"users-profile-data",auth.currentUser.uid), (doc)=> {
        //   user = doc.data().personalInfo;
        //})
        ExampleAccount.firstName = user.FirstName;
        ExampleAccount.lastName = user.LastName;
        ExampleAccount.spec = user.Specialty;
        ExampleAccount.bio = user.BioInfo;
        ExampleAccount.phoneNum = user.PhoneNumber;
        ExampleAccount.pQuestion = user.PQuestion;
        ExampleAccount.pAnswer = user.AnswerToQ;
        ExampleAccount.email = user.Email;
        ExampleAccount.status = user.UserType;
        ExampleAccount.city = user.City;
        ExampleAccount.country = user.Country;
        ExampleAccount.gender = user.Gender;
        ExampleAccount.licenceNumber = user.LicenseNumber;
        ExampleAccount.workplaceName = user.WorkplaceName;
        ExampleAccount.nameCEO = user.nameCEO;
        ExampleAccount.organisationName = user.organizationName;
        ExampleAccount.organisationAddress = user.organizationAddress;
        ExampleAccount.organisationPhone = user.organizationPhone;
        ExampleAccount.studentNumber = user.studentNumber;
        ExampleAccount.universityName = user.universityName;
        ExampleAccount.image = user.ImageRef
        console.log(ExampleAccount);
        setFirstName(ExampleAccount.firstName);
        setLastName(ExampleAccount.lastName);
        setCountry(ExampleAccount.country)
        setCity(ExampleAccount.city)
        setSpecialty(ExampleAccount.spec)
        setUserType(ExampleAccount.status)
        setEmail(ExampleAccount.email)
        setWorkplaceName(ExampleAccount.workplaceName)
        setLicenseNumber(ExampleAccount.licenceNumber)
        setOrganizationName(ExampleAccount.organisationName)
        setOrganizationAdress(ExampleAccount.organisationAddress)
        setOrganizationPhone(ExampleAccount.organisationPhone)
        setStudentNumber(ExampleAccount.studentNumber)
        setUniversityName(ExampleAccount.universityName)
        setNameCEO(ExampleAccount.nameCEO)
        setGender(ExampleAccount.gender)
        setBioInfo(ExampleAccount.bio)
        setPhoneNumber(ExampleAccount.phoneNum)
        setPersonalQuestion(ExampleAccount.pQuestion)
        setAnswer(ExampleAccount.pAnswer)
    }
    const handleSubmit = async(e) => {
        const data = {
            FirstName: firstName,
            LastName: lastName,
            Country: country,
            City: city,
            Specialty: specialty,
            UserType: userType,
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
            AnswerToQ: answer
        }
        
          if(data.UserType === "Student")
          {
            data.LicenseNumber = ""
            data.WorkplaceName = ""
            data.organizationName = ""
            data.organizationAddress = ""
            data.organizationPhone = ""
            data.nameCEO = ""
          }
          else if(data.UserType === "Doctor")
          {
            data.organizationName = ""
            data.organizationAddress = ""
            data.organizationPhone = ""
            data.nameCEO = ""
            data.studentNumber = ""
            data.universityName = ""
          }
          else if(data.UserType === "Organization")
          {
            data.studentNumber = ""
            data.universityName = ""
            data.LicenseNumber = ""
            data.WorkplaceName = ""
          }
          const refCol = await collection(db, "users-profile-data")
        const q = await query(refCol, where("UserId", "==", auth.currentUser.uid))
        const newDocs = await getDocs(q)
        const docRef = doc(db,"users-profile-data",auth.currentUser.uid);
        await updateDoc(docRef, {
            "personalInfo.FirstName" : data.FirstName,
            "personalInfo.LastName" : data.LastName,
            "personalInfo.Country" : data.Country,
            "personalInfo.City": data.City,
            "personalInfo.Specialty": data.Specialty,
            "personalInfo.UserType": data.UserType,
            "personalInfo.WorkplaceName":data.WorkplaceName,
            "personalInfo.LicenseNumber":data.LicenseNumber,
            "personalInfo.organizationName":data.organizationName,
            "personalInfo.organizationAddress":data.organizationAddress,
            "personalInfo.organizationPhone":data.organizationPhone,
            "personalInfo.studentNumber":data.studentNumber,
            "personalInfo.universityName":data.universityName,
            "personalInfo.nameCEO" : data.nameCEO,
            "personalInfo.Gender":data.Gender,
            "personalInfo.BioInfo":data.BioInfo,
            "personalInfo.PhoneNumber": data.PhoneNumber,
            "personalInfo.PQuestion":data.PQuestion,
            "personalInfo.AnswerToQ":data.AnswerToQ
             }
            
        ).then(() => {alert("Data has been updated")});
        setDataInfo();
        // setFirstName(data.FirstName)
        // setLastName(data.LastName)
        // setCountry(data.Country)
        // setCity(data.City)
        // setSpecialty(data.Specialty)
        // setUserType(data.UserType)
        // setEmail(data.Email)
        // setWorkplaceName(data.WorkplaceName)
        // setLicenseNumber(data.LicenseNumber)
        // setOrganizationName(data.organizationName)
        // setOrganizationAdress(data.organizationAddress)
        // setOrganizationPhone(data.organizationPhone)
        // setStudentNumber(data.studentNumber)
        // setUniversityName(data.universityName)
        // setNameCEO(data.NameCEO)
        // setGender(data.Gender)
        // setBioInfo(data.BioInfo)
        // setPhoneNumber(data.PhoneNumber)
        // setPersonalQuestion(data.PQuestion)
        // setAnswer(data.AnswerToQ)
    }
        return(
            <div>
                <div>
                    <img src={ExampleAccount.image} alt=""/>
                    <p>First name: {firstName}</p>
                    <p>Last name: {lastName}</p>
                    <p>Speciality: {specialty}</p>
                    <p>Bio: {bioInfo}</p>
                    <p>Phone Number: {phoneNumber}</p>
                    <p>Personal question: {personalQuestion}</p>
                    <p>Personal Answer: {answer}</p>
                    <p>Email: {email}</p>
                    <p>Status: {userType}</p>
                    <p>Country: {country}</p>
                    <p>City: {city}</p>
                    <p>Gender: {gender}</p>
                    {(ExampleAccount.status === "Student") && <>
                    <p>Student Number: {StudentNumber}</p>
                    <p>University name: {UniversityName}</p>
                    </>}
                    {(ExampleAccount.status === "Doctor") && <>
                        <p>License Number: {licenseNumber}</p>
                        <p>Workplace: {workplaceName}</p>
                    </>}
                    {(ExampleAccount.status === "Organization") && <>
                        <p>Organization Name: {OrganizationName}</p>
                        <p>Organization Address: {OrganizationAdress}</p>
                        <p>Organization Phone Number: {OrganizationPhone}</p>
                        <p>Name of CEO: {NameCEO}</p>
                    </>}
                    
                    
                    
                </div>
                <form onSubmit={handleSubmit}>
                    <p>Change First Name:</p>
                    <input value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                    <p>Change Last Name:</p>
                    <input value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                    <p htmlFor="country">Change Country:</p>
                    <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    id="country"
                    name="country"
                    >
                    <option value="">{ExampleAccount.country}</option>
                    {countries.map((country) => (
                        <option key={country} value={country}>
                        {country}
                        </option>
                    ))}
                    </select>
                    <p htmlFor="city">Change City:</p>
                    <input
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    type="text"
                    placeholder="Enter your city here"
                    id="city"
                    name="city"
                    maxLength={20}
                    />
                    <p htmlFor="speciality">Change Speciality:</p>
                    <select
                    value={specialty}
                    onChange={(e) => setSpecialty(e.target.value)}
                    id="speciality"
                    name="speciality"
                    >
                    <option value="">{ExampleAccount.spec}</option>
                    {specialties.map((specialty) => (
                        <option key={specialty} value={specialty}>
                        {specialty}
                        </option>
                    ))}
                    </select>
                    <p>Change Bio:</p>
                    <input value={bioInfo} onChange={(e) => setBioInfo(e.target.value)}/>
                    {/* <p>Change Email:</p>
                    <input value={email} onChange={(e) => setEmail(e.target.value)}/> */}
                    <p htmlFor="gender">Gender</p>
                    <select value={gender} onChange={(e) => setGender(e.target.value)} id="gender" name="gender">
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                    <p htmlFor="bioInfo">Bio Info</p>
                    <textarea
                    value={bioInfo}
                    onChange={(e) => setBioInfo(e.target.value)}
                    placeholder="Enter your bio information here"
                    id="bioInfo"
                    name="bioInfo"
                    maxLength={100}
                    />
                    <p htmlFor="phoneNumber">Phone Number</p>
                    <input
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    type="tel"
                    placeholder="Enter your phone number here"
                    id="phoneNumber"
                    name="phoneNumber"
                    pattern="[0-9]{10}"
                    />

                    <p htmlFor="personalQuestion">Personal Question</p>
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
                    <p htmlFor="personalQuestion">Choose</p>
                    <input
                        value = {answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        type="text"
                        placeholder="Answer to Personal Question"
                        id="answer"
                        name="answer"
                        maxLength={20}
                    />
                    <p htmlFor="user-type">Change Personal Status:</p>
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
                {(userType === "Student") && <>
                    <p htmlFor="Student Number">Student Number</p>
                    <input
                    value={StudentNumber}
                    onChange={(e) => setStudentNumber(e.target.value)}
                    type="StudentNumber"
                    placeholder="Enter your student number here"
                    id="StudentNumber"
                    name="StudentNumber"
                    pattern="[0-9]{0,10}" // Added pattern attribute for numbers only and up to 10 digits
                    />
                    <p htmlFor="University Name">University Name</p>
                    <input
                     value={UniversityName}
                     onChange={(e) => setUniversityName(e.target.value)}
                     type="UniversityName"
                     placeholder="Enter your university name here"
                     id="UniversityName"
                     name="UniversityName"
                     maxLength={20} // Added maxlength attribute
                   />
                   </>
                }
                {(userType === "Organization") && <>
                    <p htmlFor="NameCEO">Name of CEO</p>
                    <input
                    value={NameCEO}
                    onChange={(e) => setNameCEO(e.target.value)}
                    type="NameCEO"
                    placeholder="Enter your name of CEO here"
                    id="NameCEO"
                    name="NameCEO"
                    maxLength={20} // Added maxlength attribute
                    />
                    <p htmlFor="Organization-Phone">Organization Phone</p>
                    <input
                    value={OrganizationPhone}
                    onChange={(e) => setOrganizationPhone(e.target.value)}
                    type="OrganizationPhone"
                    placeholder="Enter your organization phone here"
                    id="OrganizationPhone"
                    name="OrganizationPhone"
                    pattern="[0-9]{0,10}" // Added pattern attribute for numbers only and up to 10 digits
                    maxLength={10} // Added maxlength attribute for 10 digits limit
                    />
                    <p htmlFor="Organization-Adress">Organization Adress</p>
                    <input
                    value={OrganizationAdress}
                    onChange={(e) => setOrganizationAdress(e.target.value)}
                    type="OrganizationAdress"
                    placeholder="Enter your organization adress here"
                    id="OrganizationAdress"
                    name="OrganizationAdress"
                    maxLength={30} // Added maxlength attribute
                    />
                    <p htmlFor="Organization-Name">Organization Name</p>
                    <input
                    value={OrganizationName}
                    onChange={(e) => setOrganizationName(e.target.value)}
                    type="OrganizationName"
                    placeholder="Enter your organization name here"
                    id="OrganizationName"
                    name="OrganizationName"
                    maxLength={20} // Added maxlength attribute
                    />
                    </>
                }
                {(userType === "Doctor") && <>
                    <p htmlFor="workplace-name">Workplace Name</p>
                    <input
                    value={workplaceName}
                    onChange={(e) => setWorkplaceName(e.target.value)}
                    type="condition"
                    placeholder="Enter your workplace name here"
                    id="workplaceName"
                    name="workplaceName"
                    maxLength={20} // Added maxlength attribute
                    />
                    <p htmlFor="license-number">License Number</p>
                    <input
                    value={licenseNumber}
                    onChange={(e) => setLicenseNumber(e.target.value)}
                    type="licenseNumber"
                    placeholder="Enter your license number here"
                    id="licenseNumber"
                    name="licenseNumber"
                    pattern="[0-9]*" // Added pattern attribute for numbers only
                    />
                    </>
                }
                </form>
                <button type="submit" onClick={handleSubmit}>Submit Button</button>
                </div>
            );
    
}

export default PersonalInfo;
/*

*/
