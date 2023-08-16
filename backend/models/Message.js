const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  content: String,
  timestamp: { type: Date, default: Date.now },
  isUser: Boolean
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
