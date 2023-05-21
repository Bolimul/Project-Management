const  post_saved = [
    "New Research about the human genetics",
    "Structure of heart",
    "Common mistakes when trying the heal from cold",
    "New Alergies this season",
    "Protect your ears from the cold"
];

const post_liked = [
    "New technologies for cancer treatments",
    "You are brushing your teeth wrong",
    "Protect your eyes from the sun",
    "Inovations in insoles"

];

function PersonalAreaPostsSaved(){
    return(
                <div className='Saved Posts'>
                    <div>
                        <h1>Posts you Saved</h1>
                        <h2>{post_saved[0]}</h2>
                        <h2>{post_saved[1]}</h2>
                        <h2>{post_saved[2]}</h2>
                        <h2>{post_saved[3]}</h2>
                        <h2>{post_saved[4]}</h2>
       
                    </div>

                <div>
                    <h1>Posts you Liked</h1>
                    <h2>{post_liked[0]}</h2>
                    <h2>{post_liked[1]}</h2>
                    <h2>{post_liked[2]}</h2>
                    <h2>{post_liked[3]}</h2>
                    <h2>{post_liked[4]}</h2> 
                </div>

                </div>
 
    )
}

export default PersonalAreaPostsSaved;
