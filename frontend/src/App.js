import './App.css';
import React, { useState,useEffect } from 'react';
import SendMessage from './components/SendMessage';
import ChatWindow from './components/ChatWindow';
import ChatBox from './components/ChatBox';
import ChallengeDetails from './components/ChallengeDetails';
import axios from 'axios';

function App() {

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleSendMessage = (message) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { ...message, lastMessage: true, timestamp: new Date().toISOString() },
    ]);
  };

  const fetchMessages = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/get-messages');
      const fetchedMessages = response.data;

      fetchedMessages.sort((a, b) => a.timestamp.localeCompare(b.timestamp));
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };


  return (
      <ChatBox windowChat={<ChatWindow messages={messages}/>} messageInput={<SendMessage onSendMessage={handleSendMessage}/>}
      details={<ChallengeDetails />}
      />
  );
}

export default App;
