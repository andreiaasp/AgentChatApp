import React, { useEffect, useRef } from 'react';
import './ChatWindow.css'; 

function ChatWindow({ messages }) {
    
    const messageContainerRef = useRef(null);
    const messagesByDay = {};


    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    //scroll the scrollbar to the bottom
    const scrollToBottom = () => {
        if (messageContainerRef.current) {
            messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
        }
    };

    //format timestamp of the message in time only
    function formatTimestamp(timestamp) {
        return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    function formatDate(timestamp) {
        return new Date(timestamp).toLocaleDateString([], {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });
    }

    messages.forEach((message) => {
        const date = formatDate(message.timestamp);
        if (!messagesByDay[date]) {
            messagesByDay[date] = [];
        }
        messagesByDay[date].push(message);
    });

    return (
    <div  ref={messageContainerRef} className="message-container-wrapper">
        <div className="message-container">
            {Object.entries(messagesByDay).map(([date, messages]) => (
                <div key={date} className="message-group">
                    <div className="date">{date}</div>
                    {messages.map((message, index) => (
                        <div key={index} className={`message-info ${message.isUser ? 'align-right' : 'align-left'}`}>
                            <div style={{ margin: '4px'}}>
                                {message.isUser ? 'Me' : 'Visor.ai Assistant'}
                            </div>
                            <div className={message.isUser ? 'outgoing-bubble' : 'incoming-bubble'}>
                                {message.content}
                            </div>
                            <div className={`timestamp ${message.isUser ? 'align-right' : 'align-left'}`}>
                                {formatTimestamp(message.timestamp)}
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    </div>
    );
}

export default ChatWindow;
