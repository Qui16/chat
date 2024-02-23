import client from '../../client';

export default async (req, res) => {
    const { chatThreadId } = req.query;
    const chatClient = client();
    const chatThreadClient = await chatClient.getChatThreadClient(chatThreadId);
    if (req.method === 'GET') {
        const result = await chatClient.receiveMessage(chatThreadClient);
        res.status(200).json(result);
    } else if (req.method == 'POST') {
        const { content } = req.body;
        console.log('aaaaaaaaaaaaaaaaaaaaa', content);
        const result = await chatClient.sendMessage(chatThreadClient, content);
        res.status(201).json(result);
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}