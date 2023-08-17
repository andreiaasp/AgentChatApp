import React, { useState } from 'react';
import axios from 'axios';
import './SendMessage.css'; 

function SendMessage({ onSendMessage }) {
  const [message, setMessage] = useState('');

  // handle input change in the message input field
  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  // handle sending a message when the send icon button is clicked
  const handleSendClick = async () => {
    const userMessage = { content: message, isUser: true };

    // send user message and receive bot response
    const botResponse = await sendMessage(message);
    const botMessage = { content: botResponse.received.content, isUser: false };
    
    // call onSendMessage with both user and bot messages to send back to App.js
    onSendMessage(userMessage);
    onSendMessage(botMessage);

    // clear the message input field
    setMessage('');
  };

  //send message when user presses Enter key
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); 
      handleSendClick(); 
    }
  };

  // send message to the backend
  const sendMessage = async (content, isUser = true) => {
    try {
      const response = await axios.post('http://localhost:5000/api/send-message', {
        content,
        isUser
      });

      return response.data; 
    } catch (error) {
        console.error('Error sending message:', error);
        return { content: 'An error occurred while sending the message.', isUser };
    }
  };

  return (
    <div className="input-area">
      
      <input
        type="text"
        placeholder="Type your message..."
        value={message}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className="message-input"
      />
      
      <button onClick={handleSendClick} className="send-button">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path d="M24 12l-24-12v24z" fill="none" />
          <path d="M9 20l2 2 8-8-8-8-2 2 6 6z" />
        </svg>
      </button>
    </div>
  );
}

export default SendMessage;
