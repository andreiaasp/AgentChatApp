# Chatbot Application

Welcome to my Chatbot Application! This project allows you to communicate with an agent from the Dialogflow API and stores data in a MongoDB Atlas database. The application is built with React.js for the frontend and Node.js/Express.js for the backend.

# Getting Started

To get started with the application, follow these steps:

## Prerequisites

* Node.js and npm installed on your system.
* Dialogflow account and a Dialogflow agent set up.
* MongoDB Atlas account with a configured cluster.

# Installation 

1. Clone the repository.

```bash
git clone https://github.com/andreiaasp/AgentChatApp
```

2. Navigate to the project directory:

```bash
cd chatbot-app
```
3. Install backend dependencies:

```bash
cd backend
npm install
```
4. Install frontend dependencies:

```bash
cd ../frontend
npm install
```

# Installation

1. Install frontend dependencies:
* Create a .env file in the backend directory.
* Add your MongoDB Atlas connection string:

```bash
MONGODB_URI=your-mongodb-uri
```

2. Frontend Configuration:
* In the frontend/src directory, create a .env file.
* Add your Dialogflow API key:

```bash
REACT_APP_DIALOGFLOW_API_KEY=your-dialogflow-api-key
```

# Running the Application

1. Start the backend server:
```bash
cd backend
node server.js
```

2. Start the frontend development server:
```bash
cd frontend
npm start
```

2. Access the application in your browser at `http://localhost:3000`.

# Features

* Real-time chat interface using React.js.
* Dialogflow API integration for interactive chatbot responses.
* MongoDB Atlas for data storage and retrieval.

## Troubleshooting

* If you encounter issues with the Dialogflow API, ensure your API key is correctly configured.
* If MongoDB Atlas connection fails, verify your connection string.

## Troubleshooting

For questions or support, feel free to contact me at andreiaasousap@gmail.com.