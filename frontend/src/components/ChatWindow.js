import React, { useEffect, useRef } from 'react';
import './ChatWindow.css'; 

function ChatWindow({ messages }) {
    
     // create a reference to the message container element
    const messageContainerRef = useRef(null);
    // to store messages grouped by day
    const messagesByDay = {};

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // scroll the scrollbar to the bottom of the message container
    const scrollToBottom = () => {
        if (messageContainerRef.current) {
            messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
        }
    };

    // format timestamp of the message in time only
    function formatTimestamp(timestamp) {
        return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    // format the timestamp to display date
    function formatDate(timestamp) {
        return new Date(timestamp).toLocaleDateString([], {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });
    }

    // group messages by day using the formatDate function
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
            {/* loop through the messages grouped by day */}
            {Object.entries(messagesByDay).map(([date, messages]) => (
                <div key={date} className="message-group">
                    <div className="date">{date}</div>
                     {/* loop through messages within each date group */}
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
