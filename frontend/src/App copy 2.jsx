import React, { useState, useEffect } from 'react';
import Pusher from 'pusher-js';
import axios from 'axios';

const App = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

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

    const sendMessage = async () => {
        if (message) {
            await axios.post('http://localhost:8000/api/send-message', { message });
            setMessage('');
        }
    };

    return (
        <div>
            <h1>Chat App</h1>
            <div>
                {messages.map((msg, index) => (
                    <div key={index}>{msg}</div>
                ))}
            </div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default App;
