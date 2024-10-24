import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Pusher from 'pusher-js';

import {
    MainContainer,
    ChatContainer,
    MessageList,
    Message,
    MessageInput,
    Sidebar,
    ConversationList,
    Conversation,
    Avatar,
    ConversationHeader,
    MessageSeparator,
} from "@chatscope/chat-ui-kit-react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";

const Chat = () => {
    const [messages, setMessages] = useState(null);
    const [user, setUser] = useState(null);
    const [conversations, setConversations] = useState([]);
    const [selectedConversation, setSelectedConversation] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user'));

        setUser(user);

        axios.get(`http://localhost:8000/api/myConversations`, { headers: { Authorization: `Bearer ${token}` } })
            .then(response => {
                setConversations(response.data);
                // console.log(response.data);
            })
            .catch(error => console.error('Error fetching conversations:', error));
        return;
    }, []);

    useEffect(() => {
        const pusher = new Pusher('3470f87625076b579c92', {
            cluster: 'mt1'
        });

        const channel = pusher.subscribe('chat');

        channel.bind('App\\Events\\MessageSent', function (data) {
            setMessages((prevMessages) => [...prevMessages, data.message]);
        });

        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        };
    }, []);

    const handleSelectedConversation = (conv) => {
        setSelectedConversation(conv);
        if (conv.messages) {
            setMessages(conv.messages);
        }
    }

    // Send message function
    const sendMessage = async (text) => {
        const token = localStorage.getItem('token');
        const payload = {
            conversation_id: selectedConversation.id,
            message: text,
        };

        try {
            const response = await axios.post(
                'http://localhost:8000/api/send-message',
                payload,
                { headers: { Authorization: `Bearer ${token}` } }
            );
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div style={{ height: '100vh' }}>
            <MainContainer>
                <Sidebar position='left'>
                    <ConversationList>
                        {conversations.map(conv => (
                            <Conversation key={conv.id} name={conv.receiver.id === user.id ? conv.sender.firstName : conv.receiver.firstName} lastSenderName={conv?.last_message_sender?.id === user.id ? 'You' : conv.last_message_sender?.firstName} info={conv?.latest_message} onClick={() => handleSelectedConversation(conv)}>
                                <Avatar name={conv.receiver.firstName} src="/images/user-profile.png" />
                            </Conversation>
                        ))}
                    </ConversationList>
                </Sidebar>

                {selectedConversation !== null ? (
                    <ChatContainer>
                        <ConversationHeader>
                            <ConversationHeader.Back onClick={() => window.location.href = '/'} />
                            <Avatar name={selectedConversation.receiver.id === user.id ? selectedConversation.sender.firstName : selectedConversation.receiver.firstName} src={"/images/user-profile.png"} />
                            <ConversationHeader.Content userName={selectedConversation.receiver.id === user.id ? selectedConversation.sender.firstName : selectedConversation.receiver.firstName} />
                        </ConversationHeader>

                        <MessageList>
                            {messages !== null && messages.length > 0 ? (
                                messages.map((msg) => (
                                    <Message key={msg.id} model={{
                                        message: msg.message,
                                        sender: msg.sender?.firstName,
                                        sentTime: new Date(msg.created_at).toLocaleTimeString(),
                                        direction: msg.sender_id === user.id ? 'outgoing' : 'incoming',
                                        position: 'single',
                                    }}>
                                        <Avatar name={msg.sender?.firstName} src="/images/user-profile.png" />
                                    </Message>
                                ))
                            ) : (
                                <MessageSeparator as="h2" content='No messages found.' />
                            )}
                        </MessageList>

                        <MessageInput placeholder="Type a message..." onSend={sendMessage} attachButton={true} />
                    </ChatContainer>
                ) : <p className='text-gray-500 flex mx-auto items-center font-serif'>No Conversation found </p>}
            </MainContainer>
        </div>
    );
};

export default Chat;
