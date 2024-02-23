import client from '../../client';


export default async (req, res) => {
    const { chatThreadId } = req.query;
    const chatClient = client();
    const chatThreadClient = await chatClient.getChatThreadClient(chatThreadId);
    if (req.method === 'GET') { // Handle GET request
        const result = await chatClient.listParticipants(chatThreadClient);
        console.log(result);
        res.status(200).json(result);

    } else if (req.method === 'POST') { // Handle POST request

        // req.body contains the request body
        const data = req.body;
        const error = await chatClient.addParticipant(chatThreadClient, data);
        if (error) {
            res.status(500).json(error);

        } else {
            res.status(201).json({ message: 'Participant added' });
        }
    } else if (req.method === 'DELETE') { // Handle DELETE request
        const { participantID } = req.query;
        const result = await chatClient.deleteParticipants(chatThreadClient, participantID);
        res.status(200).json({ message: 'Participant deleted' });
    } else {
        res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};