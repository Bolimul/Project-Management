import { useState } from "react";
import {auth,db} from "./firebase";
import {setDoc,doc,getDoc, updateDoc,arrayUnion,getDocs,collection} from "firebase/firestore";
const list_of_tags = [
    "Surgery",
    "Experiment",
    "Reserch",
    "Events",
    "Diseases"
]

var new_user_post = {
    Title: "",
    Tag: "",
    Content: ""
}
var posts = [];
export const AddForumPost = () => {
 const[postTitle,setPostTitle] = useState("");
 const[postContent,setPostContent]=useState("");
 const[postTag,setPostTag] = useState("");
 //const[postAuthor,setPostAuthor] = useState("");

 const setPostData = async () =>{
    var user_posts = (await getDoc(doc(db,"users-profile-data",auth.currentUser.uid))).data().forumPosts;
 }



 const handlePublish= () =>{
    const update = async() =>{
        const docRef = doc(db,"users-profile-data",auth.currentUser.uid);
        var existing_posts = (await getDoc(docRef)).data().forumPosts;
    
        console.log(existing_posts);
    
        await updateDoc(docRef,{
            "forumPosts":arrayUnion({
                Title:postTitle,
                Tag:postTag,
                Content:postContent}
        )
        })
    }
    update();
 }

 
    
 

 return(
    <center>
        <div className="Forum-Header"></div>
            <h1>Forum Page</h1>
            <form className="Enter your post">
              <label htmlFor="firstName">Title</label>
              <input
              value={postTitle}
              onChange={(e) => setPostTitle(e.target.value)}
              type="text"
              placeholder="Enter your title of post"
              id="postTitle"
              name="postTitle"
              />
              <select
                 value={postTag}
                 onChange={(e) => setPostTag(e.target.value)}
                 id="country"
                 name="country"
                >
                <option value="">Select Tag</option>
                {list_of_tags.map((tag) => (
                <option key={tag} value={tag}>
                {tag}
                </option>
                ))}
                </select>

                <textarea
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                type="text"
                placeholder="Enter your post content"
                id="postContent"
                name="postContent"
                />

               
                 
            </form>
            <button onClick={handlePublish}>Publish</button>
            <h1>Your Post Details</h1>
            <p>Title:{postTitle}</p>
            <p>Tag:{postTag}</p>
            <p>Content:{postContent}</p>
            
                          
        </center>

  )
};

export default AddForumPost;
