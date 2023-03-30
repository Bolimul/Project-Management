import express from 'express';

const port = process.env.PORT || 3000;
const app = express();

app.get('/', (req, res)=>{
    console.log('A new request has a arrived to index.js');
    res.send('Hello from the server main page');
});

app.listen(port, () => {
    console.log(`Server is up and running at port: ${port}`);
});
