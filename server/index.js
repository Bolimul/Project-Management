import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const port = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
let username1 = '';
app.post('/login', async(req, res) => {
    const { username } = await req.body;
    username1 = await username;
});
app.get('/login', async(req, res) => {
    await res.json({ message: `welcome, ${username1}` });
    username1 = await '';
});
app.listen(port, () => {
    console.log(`Server is up and running at port: ${port}`);
});
