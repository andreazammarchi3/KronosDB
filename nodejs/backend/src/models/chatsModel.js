const mongoose = require('mongoose')

const chatSchema = new mongoose.Schema({
    topic: String,
    messages: [{
        id: Number,
        sender: String,
        time: String,
        text: String,
    }],
});

module.exports = mongoose.model('chats', chatSchema);