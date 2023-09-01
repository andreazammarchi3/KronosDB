const mongoose = require('mongoose')

const chatSchema = new mongoose.Schema({
    topic: Number,
    messages: [{
        id: Number,
        senderId: Number,
        time: String,
        text: String,
    }],
});

module.exports = mongoose.model('chats', chatSchema);