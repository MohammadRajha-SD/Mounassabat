import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import api from '../../api';
const socket = io('http://localhost:6001');

function Chat({ user }) {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        fetchMessages();

        socket.on(`chat.${user.id}`, (message) => {
            setMessages((prev) => [...prev, message]);
        });
    }, []);

    const fetchMessages = async () => {
        const response = await api.get(`/messages/${user.id}`);
        setMessages(response.data);
    };

    const sendMessage = async () => {
        await api.post('/messages', { receiver_id: user.id, message: newMessage });
        setNewMessage('');
    };

    return (
        <div>
            <div>
                {messages.map((msg, index) => (
                    <div key={index}>
                        <strong>{msg.sender_id === user.id ? 'Them' : 'You'}:</strong> {msg.message}
                    </div>
                ))}
            </div>
            <input value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
}

export default Chat;
