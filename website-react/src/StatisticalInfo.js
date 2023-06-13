import {getDoc,doc} from "firebase/firestore";
import {db,auth} from "./firebase";
import { useState,useEffect } from "react";
const data_surgery = [
    
    "Topic:Surgery",
    "Number of posts published: 10",
    "Number of posts you liked in topic:5",
    "Number of posts with this topic you shared:4",
    "cNumber of comments to posts of this topic:5"
];

const data_research = [

"Topic:Research",
"Number of posts published: 2",
"Number of posts you liked in topic:1",
"Number of posts with this topic you shared:1",
"cNumber of comments to posts of this topic:0"
];

const data_experiment = [

"Topic:Experiment",
"Number of posts published: 9",
"Number of posts you liked in topic:2",
"Number of posts with this topic you shared:0",
"cNumber of comments to posts of this topic:5"
];

const data_events = [

"Topic:Events",
"Number of posts published: 1",
"Number of posts you liked in topic:1",
"Number of posts with this topic you shared:0",
"cNumber of comments to posts of this topic:4"
];


const data_diseases = [

"Topic:Diseases",
"Number of posts published: 4",
"Number of posts you liked in topic:10",
"Number of posts with this topic you shared:2",
"cNumber of comments to posts of this topic:10"
];

var myPosts =
    {
        Title:"",
        Topic:"",
        Username:"",
        comments:[{
            UserName:"",
            idComment:"",
            textComment:""
        }],
        content:"",
        idPost:"",
        image:"",
        like:"",
        save:"",
        share:""
    }
;


export const StatisticalInfo = (props) => {
    const[title,setPostTitle]= useState(myPosts.Title);
    const[topic,setPostTopic]= useState(myPosts.Topic);
    const[username,setPostUsername]= useState(myPosts.Username);
    const[comments,setPostComments]= useState(myPosts.comments);
    const[content,setPostContent]= useState(myPosts.content);
    const[idPost,setPostId]= useState(myPosts.idPost);
    const[image,setPostImage]= useState(myPosts.image);
    const[like,setPostLikes]= useState(myPosts.like);
    const[save,setPostSaves]= useState(myPosts.save);
    const[share,setPostShares]= useState(myPosts.share);
    //var currUserPosts = {};
    useEffect(()=>{setInfoStat()},[title,topic,username,comments,content,idPost,image,like,save,share]);
    
    const setInfoStat = async() => {
        var currUserPosts = (await getDoc(doc(db,"users-profile-data",auth.currentUser.uid))).data().myposts;
        
        myPosts.Title = currUserPosts[0].Title;
        myPosts.Topic = currUserPosts[0].Topic;
        myPosts.Username = currUserPosts[0].Username;
        myPosts.comments = currUserPosts[0].comments;
        myPosts.content = currUserPosts[0].content;
        myPosts.idPost = currUserPosts[0].idPost;
        myPosts.image =  currUserPosts[0].image;
        myPosts.like =  currUserPosts[0].like;
        myPosts.save =  currUserPosts[0].save;
        myPosts.share = currUserPosts[0].share;
        
        setPostTitle(myPosts.Title);
        setPostTopic(myPosts.Topic);
        setPostUsername(myPosts.Username);
        setPostComments(myPosts.comments);
        setPostContent(myPosts.content);
        setPostId(myPosts.idPost);
        setPostImage(myPosts.image);
        setPostLikes(myPosts.like);
        setPostSaves(myPosts.save);
        setPostShares(myPosts.share);
        
    }

return(
        <div className="Info">
            <div>
            <h1>Information about your posts</h1>
            <h2>Total likes:{myPosts.like}
            </h2>
            <h2>Total Shares:{myPosts.share}</h2>
            <h2>Total saves:{myPosts.save}</h2>
            
            </div>
        </div>  
        )   

}
export default StatisticalInfo;