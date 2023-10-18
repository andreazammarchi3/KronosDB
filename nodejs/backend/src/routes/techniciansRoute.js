const express = require('express');
const techniciansController = require('../controllers/techniciansController');
const router = express.Router();

router.route('/allTechnicians')
    .get((req, res) => techniciansController.all_technicians(req, res));

router.route('/getTechnician:username')
    .get((req, res) => techniciansController.get_technician(req, res));

router.route('/addTechnician')
    .post((req, res) => techniciansController.add_technician(req, res));

router.route('/removeTechnician:username')
    .post((req, res) => techniciansController.remove_technician(req, res));

router.route('/updateTechnician:username')
    .post((req, res) => techniciansController.update_technician(req, res));

module.exports = router;
