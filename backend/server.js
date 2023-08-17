const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(cors());
app.use(express.json());

const MONGODB_URI = 'mongodb+srv://admin-user:bOr737pLhPLKiV26@cluster0.howmywd.mongodb.net/?retryWrites=true&w=majority';

// connect to MongoDB using Mongoose
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
// handle MongoDB connection errors
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// import and use messageRoutes from the 'routes' directory
const messageRoutes = require('./routes/messageRoutes');
app.use('/api', messageRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
