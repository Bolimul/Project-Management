import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const port = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

var username1 = '';
app.post('/react-app', (req, res) => {
    var {username, password} = req.body;
    username1 = username;
});
app.get('/react-app', (req, res) => {
    res.json({message: 'welcome, '+username1});
})
app.get('/orange', (req, res) => {
    res.json({message : 'Hello from the server main page Orange'});
});

app.listen(port, () => {
    console.log(`Server is up and running at port: ${port}`);
});
