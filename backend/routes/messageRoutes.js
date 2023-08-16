const express = require('express');
const router = express.Router();
const { google } = require('googleapis');
const axios = require('axios');
const Message = require('../models/Message'); 

// Create a new message
router.post('/send-message', async (req, res) => {
    console.log('Request to /send-message received\n');
  try {
    const { content, isUser  } = req.body;
    const newMessage = new Message({ content, isUser });
    await newMessage.save();

    const dialogflowResponse = await sendMessageToDialogflow(content); 
    
    // Save Dialogflow response to MongoDB
    const botMessage = new Message({ content: dialogflowResponse, isUser: false }); 
    await botMessage.save();

    res.status(201).json({ sent:newMessage, received:botMessage });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
    return { content: 'An error occurred while processing the bot response.', isUser: false };
  }
});

// Fetch all messages
router.get('/get-messages', async (req, res) => {
  try {
    const messages = await Message.find().sort('-timestamp');
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

const sendMessageToDialogflow = async (userMessage) => {
   
    try {
        const projectId = 'chatbotagent-uele';
        const languageCode = 'en';

        const credentials = require('../serviceAccountKey.json'); 

        const auth = new google.auth.GoogleAuth({
            credentials,
            scopes: ['https://www.googleapis.com/auth/dialogflow'],
        });

        const authClient = await auth.getClient();
        const accessToken = await authClient.getAccessToken();

        const dialogflowEndpoint = `https://dialogflow.googleapis.com/v2/projects/${projectId}/agent/sessions/${Date.now()}:detectIntent`;
  
        const requestBody = {
            queryInput: {
            text: {
                text: userMessage,
                languageCode: languageCode,
            },
            },
        };
    
        const response = await axios.post(dialogflowEndpoint, requestBody, {
            headers: {
            Authorization: `Bearer ${accessToken.token}`,
            },
        });
  
        return response.data.queryResult.fulfillmentText;

    } catch (error) {
        console.error('Error sending message to Dialogflow:', error);
        return 'An error occurred while processing your request.';
    }
  };
  

module.exports = router;
