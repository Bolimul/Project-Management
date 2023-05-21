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


function StatisticalInfo(){
return(
        <div className="Info">
            <div>
            <h1>Your usage of the website</h1>
            <h2>{data_surgery[0]}</h2>
            <h2>{data_surgery[1]}</h2>
            <h2>{data_surgery[2]}</h2>
            <h2>{data_surgery[3]}</h2>
            <h2>{data_surgery[4]}</h2>
            <h2>{data_research[0]}</h2>
            <h2>{data_research[1]}</h2>
            <h2>{data_research[2]}</h2>
            <h2>{data_research[3]}</h2>
            <h2>{data_research[4]}</h2>
            <h2>{data_experiment[0]}</h2>
            <h2>{data_experiment[1]}</h2>
            <h2>{data_experiment[2]}</h2>
            <h2>{data_experiment[3]}</h2>
            <h2>{data_experiment[4]}</h2>
            <h2>{data_events[0]}</h2>
            <h2>{data_events[1]}</h2>
            <h2>{data_events[2]}</h2>
            <h2>{data_events[3]}</h2>
            <h2>{data_events[4]}</h2>
            <h2>{data_diseases[0]}</h2>
            <h2>{data_diseases[1]}</h2>
            <h2>{data_diseases[2]}</h2>
            <h2>{data_diseases[3]}</h2>
            <h2>{data_diseases[4]}</h2>
            </div>
            
        </div>
)   
}

export default StatisticalInfo;