import {db,auth} from "./firebase"
import {doc, getDoc, onSnapshot} from "firebase/firestore";
import {getAuth} from "firebase/auth";
import { useEffect, useState } from "react";





// var  posts_liked = [
//     "New technologies for cancer treatments",
//     "You are brushing your teeth wrong",
//     "Protect your eyes from the sun",
//     "Inovations in insoles"
// ];



export function PersonalAreaPostsSaved(){
    // const auth = getAuth();
    // const user = auth.currentUser;
    // if (user != null) { 
    //     var savedUserPosts = user.savedPosts;
    // }
    var[posts_saved,setPosts_saved] = useState([]);
    var [posts_liked,setPosts_liked] = useState([]);

    const getData = async() => {
        const docRef =  doc(db, 'users-profile-data', auth.currentUser.uid);
        const userDoc = onSnapshot(docRef,async (doc)=>{
            setPosts_saved(await doc.data().savedPosts);
        setPosts_liked(await doc.data().LikedPosts);
        });
        // setPosts_saved(await userDoc.data().savedPosts);
        // setPosts_liked(await userDoc.data().LikedPosts);
        //console.log(posts_saved[0].PostTitle)
        //console.log(posts_liked[0])
    }
    
    
    useEffect(() => {
        getData();
        //doc(db, 'users-profile-data', auth.currentUser.uid)
        
       },[]);
   
    return(
                <div className='Saved Posts'>
                    
                  <h1>Posts You Saved</h1>
                  {posts_saved.map(post_s => <div>{post_s}</div>)}
                  <h1>Posts You Liked</h1>
                  {posts_liked.map(post_l => <div>{post_l}</div>)}
                  {/* {posts_liked.map(post_l =>  
                    <div>
                           <p>Title:{post_l.title}</p> 
                           <p>Topic:{post_l.topic}</p>
                           <p>Content:{post_l.content}</p>
                           <p>Image:{post_l.image}</p> 
                        </div>)}  */}
                </div>
 
    )
}

export default PersonalAreaPostsSaved;
