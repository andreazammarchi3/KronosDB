const express = require('express');
const chatsController = require('../controllers/chatsController');
const router = express.Router();

router.route('/allChats')
    .get((req, res) => chatsController.all_chats(req, res));

router.route('/getChat:topic')
    .get((req, res) => chatsController.get_chat(req, res));

router.route('/addChat')
    .post((req, res) => chatsController.add_chat(req, res));

router.route('/removeChat:topic')
    .post((req, res) => chatsController.remove_chat(req, res));

router.route('/newMessage')
    .post((req, res) => chatsController.new_message(req, res));

module.exports = router;
