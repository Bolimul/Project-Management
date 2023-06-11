import {db,auth} from "./firebase"
import {doc, getDoc} from "firebase/firestore";
import {getAuth} from "firebase/auth";
import { useEffect } from "react";





var  post_saved = [];

const post_liked = [
    "New technologies for cancer treatments",
    "You are brushing your teeth wrong",
    "Protect your eyes from the sun",
    "Inovations in insoles"

];

const getData = async() => {
    const docRef =  doc(db, 'users-profile-data', auth.currentUser.uid);
    const userDoc =  await getDoc(docRef);
    post_saved = await userDoc.data().savedPosts;
    console.log(post_saved[0].PostTitle)
}

export function PersonalAreaPostsSaved(){
    // const auth = getAuth();
    // const user = auth.currentUser;
    // if (user != null) { 
    //     var savedUserPosts = user.savedPosts;
    // }
    getData();
     
    
    return(
                <div className='Saved Posts'>
                    
                    <>Posts</>
                    <></>

                </div>
 
    )
}

export default PersonalAreaPostsSaved;
