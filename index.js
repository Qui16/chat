import express from 'express';
import client from './client.js';


const app = express();

//get the chat thread client
app.get('/chat-thread-client', (req, res) => {
    {threadId}=req;
    client.getChatThreadClient().then((result) => {
        res.send(result);
    });
});

app.listen(3000, () => {
    console.log('Server running at http://127.0.0.1:3000/');
});















