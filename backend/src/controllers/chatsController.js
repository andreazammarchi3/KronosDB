const chatsModel = require('../models/chatsModel');
const index = require('../../src/index');

exports.all_chats = async(req, res) => {
    try{
        res.header("Access-Control-Allow-Origin", "*");
        res.json(await chatsModel.find());
    }catch (e){
        res.json(e);
    }
}

exports.get_chat = async (req, res) => {
    try{
        res.header("Access-Control-Allow-Origin", "*");
        res.json(await chatsModel.findOne({topic: req.params.topic.slice(1)}));
    }catch (e) {
        res.json(e);
    }
}

exports.add_chat = async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Content-type,Accept,X-Custom-Header");

    const { topic } = req.body;

    const newChat = new chatsModel({
        topic: String,
        messages: []
    });

    try{
        res.json(await newChat.save());
    }catch (e) {
        res.json(e);
    }
}

exports.remove_chat = async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Content-type,Accept,X-Custom-Header");

    try{
        res.json(await chatsModel.deleteOne({topic: req.params.topic.slice(1)}));
    }catch (e) {
        res.json(e);
    }
}

exports.new_message = async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Content-type,Accept,X-Custom-Header");

    if (req.method === "OPTIONS") {
        res.header('Access-Control-Allow-Origin', req.headers.origin);
    } else {
        res.header('Access-Control-Allow-Origin', '*');
    }

    const { messages } = req.body;

    try{
        res.json(await chatsModel.updateOne({topic: req.params.topic.slice(1)}, {messages: messages}));
        index.sendUpdatedChat(await chatsModel.findOne({topic: req.params.topic.slice(1)}.messages));
    }catch (e) {
        res.json(e);
    }
}
