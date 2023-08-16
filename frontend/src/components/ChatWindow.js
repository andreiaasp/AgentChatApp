import React, { useEffect, useRef } from 'react';
import './ChatWindow.css'; 

function ChatWindow({ messages }) {
    
    const messageContainerRef = useRef(null);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        if (messageContainerRef.current) {
            messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
        }
    };

    return (
    <div  ref={messageContainerRef} className="message-container-wrapper">
        <div className="message-container">
            {messages.map((message, index) => (
            <div
                key={index}
                className={message.isUser ? 'outgoing-bubble' : 'incoming-bubble'}>
                {message.content}
            </div>
            ))}
        </div>
    </div>
    );
}

export default ChatWindow;
