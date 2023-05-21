

const  post_saved = [
    {title_1: "New Research about the human genetics"},
    {title_2: "Structure of heart"},
    {title_3: "Common mistakes when trying the heal from cold"},
    {title_4:"New Alergies this season"},
    {title_5:"Protect your ears from the cold"}
];

const post_liked = [
    {title_1: "New technologies for cancer treatments"},
    {title_2: "You are brushing your teeth wrong"},
    {title_3: "Protect your eyes from the sun"},
    {title_4:"Inovations in insoles"},

];

function userSavedPosts(){
    return(
        <div className="Posts you liked">
           <h2>{post_saved[0]}</h2>
           <h2>{post_saved[1]}</h2>
           <h2>{post_saved[2]}</h2>
           <h2>{post_saved[3]}</h2>
           <h2>{post_saved[4]}</h2>

           <div className = "Posts you liked"> 
            <h2>{post_liked[0]}</h2>
            <h2>{post_liked[1]}</h2>
            <h2>{post_liked[2]}</h2>
            <h2>{post_liked[3]}</h2>
            <h2>{post_liked[4]}</h2> 
            </div>

        </div>
    )
}


export default userSavedPosts()