import { ChatClient } from '@azure/communication-chat';
import { AzureCommunicationTokenCredential } from '@azure/communication-common';



    // Your unique Azure Communication service endpoint
    const endpointUrl = 'https://gmchat.asiapacific.communication.azure.com/';
    // The user access token generated as part of the pre-requisites
    const userAccessToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjYwNUVCMzFEMzBBMjBEQkRBNTMxODU2MkM4QTM2RDFCMzIyMkE2MTkiLCJ4NXQiOiJZRjZ6SFRDaURiMmxNWVZpeUtOdEd6SWlwaGsiLCJ0eXAiOiJKV1QifQ.eyJza3lwZWlkIjoiYWNzOmFlMjU3MDdiLTlmNmMtNDRiMy1hODQ2LTkyZTAzMjkxYmZlMF8wMDAwMDAxZS02ZjcxLWZkODEtNjBjMy1jODNhMGQwMGJkM2QiLCJzY3AiOjE3OTIsImNzaSI6IjE3MDg1ODQzNjAiLCJleHAiOjE3MDg2NzA3NjAsInJnbiI6ImFwYWMiLCJhY3NTY29wZSI6ImNoYXQiLCJyZXNvdXJjZUlkIjoiYWUyNTcwN2ItOWY2Yy00NGIzLWE4NDYtOTJlMDMyOTFiZmUwIiwicmVzb3VyY2VMb2NhdGlvbiI6ImFzaWFwYWNpZmljIiwiaWF0IjoxNzA4NTg0MzYwfQ.GnUuXoRgbYpy0xJE36DoRmZhWJ30a2FsRfdENSUleXhDCjkeE7CrxLZ0aqJBRJFHXir6j-cnalwl8poP71DnH0FOUvdjKa8UHeGy0cq8oAXd7UW5Hd8DV3yX3KxN_av67wjYuRmUaNVyGw3_eWATTDFRYvabkjt4tx-JefIN-6YAxkQLoYtV0alJUXD-7pULCF1DMr7qejIDL3fIrmxAE0ANwKkJ_wM4GZK6KRKKaArrT50MDDqPS9uLcVYA2ZkFshbc6vABNBNilFlJrtfMltb8rp25vj-qaPCRL-G6Zl7q-hJRgrKbNUPV9QzjC1WraxGEFBoM2asB7dAeEwPSPg';

    const chatClient = new ChatClient(endpointUrl, new AzureCommunicationTokenCredential(userAccessToken));
    console.log('Azure Communication Chat client created!');

    const createChatThread = async () => {
        const createChatThreadRequest = {
            topic: "test chat thread"
        };
        const createChatThreadOptions = {
            participants: [
                {
                    id: { communicationUserId: '8:acs:ae25707b-9f6c-44b3-a846-92e03291bfe0_0000001e-69bc-47dd-8876-c93a0d003440' },
                    displayName: 'Quy'
                }
            ]
        };
        const createChatThreadResult = await chatClient.createChatThread(
            createChatThreadRequest
        );
        const threadId = createChatThreadResult?.chatThread?.id;
        return threadId;
    }

     const listChatThreads= async () => {
        const threads = chatClient.listChatThreads();
        for await (const thread of threads) {
            console.log(thread.id);
        }
        return threads;
    }

    const getChatThreadClient = async (threadId) => {
        const chatThreadClient = chatClient.getChatThreadClient(threadId);
        return chatThreadClient;
    };

    const deleteChatThread = async (threadId) => {
        try {
            await chatClient.deleteChatThread(threadId);
            console.log('Chat thread deleted successfully');
        } catch (error) {
            console.error('Error deleting chat thread: ', error);
        }

    }

    const notification = async () => {
        // open notifications channel
        await chatClient.startRealtimeNotifications();
        // subscribe to new notification
        chatClient.on("chatMessageReceived", (e) => {
            console.log("Notification chatMessageReceived!");
            // your code here
        });
    };

    const deleteAllChatThreads = async () => {
        const threads = await chatClient.listChatThreads();
        for await (const thread of threads) {
            console.log(thread);
            await chatClient.deleteChatThread(thread.id);
        }
    }

    const sendMessage = async (chatThreadClient, message) => {
        const sendMessageRequest = {
            content: message
        };
        let sendMessageOptions = {
            senderDisplayName: 'Quy',
            type: 'text',
        };
        const sendChatMessageResult = await chatThreadClient.sendMessage(sendMessageRequest, sendMessageOptions);
        const messageId = sendChatMessageResult.id;
        // console.log(`Message sent!, message id:${messageId}`);
    };

    const receiveMessage = async (chatThreadClient) => {
        const messages = await chatThreadClient.listMessages();
        for await (const message of messages) {
            console.log('message sent: ', message.content.message);
        }
    };

    const listParticipants = async (chatThreadClient) => {
        const participants = chatThreadClient.listParticipants();
        for await (const participant of participants) {
            console.log('participants:', participant);
        }
    };

    const addParticipant = async (chatThreadClient, participant) => {
        const addParticipantsRequest =
        {
            participants: [
                {
                    id: { communicationUserId: participant.id },
                    displayName: participant.displayName
                }
            ]
        };
        try {
            await chatThreadClient.addParticipants(addParticipantsRequest);
        } catch (error) {
            console.error('Failed to add participants:', error);
        }
    };

    const deleteParticipants = async (chatThreadClient, participantID) => {
        return await chatThreadClient.removeParticipant({ communicationUserId: participantID });
    };

    // const chatThreadId = "19:XgoUEHN05aJEc3KBNYoLd8Uoful3dkJyMaPPkchNB_c1@thread.v2";
    // const chatThreadClient = await getChatThreadClient(chatThreadId);

    // sendMessage(chatThreadClient, '2');
    // sendMessage(chatThreadClient, '3');
    // sendMessage(chatThreadClient, '4');
    // sendMessage(chatThreadClient, '5');
    // sendMessage(chatThreadClient, '6');
    // receiveMessage(chatThreadClient);


const client = () => {
    listChatThreads;
}
export default client;














