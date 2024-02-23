import { ChatClient } from '@azure/communication-chat';
import { AzureCommunicationTokenCredential } from '@azure/communication-common';
require('dotenv').config();

const client = () => {
    // Your unique Azure Communication service endpoint
    const endpointUrl = process.env.COMMUNICATION_SERVICES_ENDPOINT;
    // The user access token generated as part of the pre-requisites
    const userAccessToken = process.env.USER_ACCESS_TOKEN;

    const chatClient = new ChatClient(endpointUrl, new AzureCommunicationTokenCredential(userAccessToken));
    console.log('Azure Communication Chat client created!');

    const createChatThread = async (topic: string, participants?: any) => {
        const createChatThreadRequest = {
            topic: topic
        };
        const createChatThreadOptions = {
            // participants: participants
            // [
            //     {
            //         id: { communicationUserId: '8:acs:ae25707b-9f6c-44b3-a846-92e03291bfe0_0000001e-69bc-47dd-8876-c93a0d003440' },
            //         displayName: 'Quy'
            //     }
            // ]
        };
        const createChatThreadResult = await chatClient.createChatThread(createChatThreadRequest, createChatThreadOptions);
        const threadId = createChatThreadResult?.chatThread?.id;
        return threadId;
    }

    const listChatThreads = async () => {
        try {
            const threads = chatClient.listChatThreads();
            const threadsArray = [];
            for await (const thread of threads) {
                // console.log(thread.id);
                threadsArray.push(thread);
            }
            return threadsArray;
        }
        catch (error) {
            console.error('Failed to list chat threads:', error);
        }

    }
    const deleteChatThread = async (threadId) => { //not working yet
        try {
            await chatClient.deleteChatThread(threadId);
            console.log('Chat thread deleted successfully');
        } catch (error) {
            console.error('Error deleting chat thread: ', error);
        }

    }

    const deleteAllChatThreads = async () => { //not working yet
        const threads = await chatClient.listChatThreads();
        for await (const thread of threads) {
            console.log(thread);
            await chatClient.deleteChatThread(thread.id);
        }
    }

    const getChatThreadClient = async (threadId) => {
        const chatThreadClient = chatClient.getChatThreadClient(threadId);
        return chatThreadClient;
    };



    const notification = async () => {
        // open notifications channel
        await chatClient.startRealtimeNotifications();
        // subscribe to new notification
        chatClient.on("chatMessageReceived", (e) => {
            console.log("Notification chatMessageReceived!");
            // your code here
        });
    };



    const sendMessage = async (chatThreadClient, message) => {
        const sendMessageRequest = {
            content: message
        };
        let sendMessageOptions = {
            senderDisplayName: 'Quy',
            type: 'text',
            // metadata: {
            //     'hasAttachment': 'true',
            //     'attachmentUrl': 'https://contoso.com/files/attachment.docx'
            //   }
        };
        const sendChatMessageResult = await chatThreadClient.sendMessage(sendMessageRequest, sendMessageOptions);
        return sendChatMessageResult;
        const messageId = sendChatMessageResult.id;
        // console.log(`Message sent!, message id:${messageId}`);
    };

    const receiveMessage = async (chatThreadClient) => {
        const messages = await chatThreadClient.listMessages();
        const messagesArray = [];
        for await (const message of messages) {
            console.log('message sent: ', message.content.message);
            if (message.content.message != null) messagesArray.push(message.content.message);
        }
        return messagesArray;
    };

    const listParticipants = async (chatThreadClient) => {
        const participants = chatThreadClient.listParticipants();
        const participantsArray = [];
        for await (const participant of participants) {
            // console.log('participants:', participant);
            participantsArray.push(participant);
        }
        return participantsArray;
    };

    const addParticipant = async (chatThreadClient, participant) => {
        const addParticipantsRequest =
        {
            participants: participant
            // [
            //     {
            //         id: { communicationUserId: participant.id },
            //         displayName: participant.displayName
            //     }
            // ]
        };
        try {
            await chatThreadClient.addParticipants(addParticipantsRequest);
        } catch (error) {
            console.error('Failed to add participants:', error);
            return error;
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
    return {
        createChatThread,
        listChatThreads,
        getChatThreadClient,
        deleteChatThread,
        notification,
        deleteAllChatThreads,
        sendMessage,
        receiveMessage,
        listParticipants,
        addParticipant,
        deleteParticipants
    }




}
export default client;














