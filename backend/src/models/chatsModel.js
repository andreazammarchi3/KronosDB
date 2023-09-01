const mongoose = require('mongoose')

const chatSchema = new mongoose.Schema({
    topic: Number,
    messages: [],
});

module.exports = mongoose.model('chats', chatSchema);