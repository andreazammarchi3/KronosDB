const express = require('express');
const clientsController = require('../controllers/clientsController');
const router = express.Router();

router.route('/allClients')
    .get((req, res) => clientsController.all_clients(req, res));

router.route('/addClient')
    .post((req, res) => clientsController.add_client(req, res));

router.route('/removeClient:id')
    .post((req, res) => clientsController.remove_client(req, res));

router.route('/updateClient:id')
    .post((req, res) => clientsController.update_client(req, res));

module.exports = router;
