const express = require('express');
const ticketsController = require('../controllers/ticketsController');
const router = express.Router();

router.route('/allTickets')
    .get((req, res) => ticketsController.all_tickets(req, res));

router.route('/addTicket')
    .post((req, res) => ticketsController.add_ticket(req, res));

router.route('/removeTicket:id')
    .post((req, res) => ticketsController.remove_ticket(req, res));

router.route('/updateTicket:id')
    .post((req, res) => ticketsController.update_ticket(req, res));

module.exports = router;
