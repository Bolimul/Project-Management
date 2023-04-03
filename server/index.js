import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const port = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
//solving bug with latency getting signal
var username1 = '';
app.post('/login', (req, res) => {
    var {username, password} = req.body;
    username1 = username;
});
app.get('/login', (req, res) => {
    while(true)
    {
        if(username1 != null)
        {
            res.json({message: 'welcome, '+username1});
            break;
        }
    }
    username1 = '';
})

app.listen(port, () => {
    console.log(`Server is up and running at port: ${port}`);
});
