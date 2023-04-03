import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const port = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
var username1 = '';
const delay = ms =>new Promise(resolve => setTimeout(resolve, ms));
app.post('/login', (req, res) => {
    var {username, password} = req.body;
    username1 = username;
    res.json({message: 'welcome, '+username1});
});
app.get('/login', (req, res) => {
    res.json({message: 'welcome, '+username1});
    username1 = '';

    
});
app.listen(port, () => {
    console.log(`Server is up and running at port: ${port}`);
});
