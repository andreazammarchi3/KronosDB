const express = require('express');
const techniciansController = require('../controllers/techniciansController');
const router = express.Router();

router.route('/allTechnicians')
    .get((req, res) => techniciansController.all_technicians(req, res));

router.route('/addTechnician')
    .post((req, res) => techniciansController.add_technician(req, res));

router.route('/removeTechnician:id')
    .post((req, res) => techniciansController.remove_technician(req, res));

router.route('/updateTechnician:id')
    .post((req, res) => techniciansController.update_technician(req, res));

module.exports = router;
