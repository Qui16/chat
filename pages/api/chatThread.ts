import client from '../../client';


export default async (req, res) => {
    const chatClient = client();
    if (req.method === 'GET') { // Handle GET request
        const result = await chatClient.listChatThreads();
        console.log(result);
        res.status(200).json(result);

    } else if (req.method === 'POST') { // Handle POST request
        
        // req.body contains the request body
        const {topic} = req.body;
        // console.log(topic);
        const newThread = await chatClient.createChatThread(topic);
        res.status(201).json(newThread);
    }  else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};
