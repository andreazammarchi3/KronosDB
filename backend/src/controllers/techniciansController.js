const techniciansModel = require('../models/techniciansModel');
const index = require('../../src/index');
const ticketsModel = require("../models/ticketsModel");

exports.all_technicians = async(req, res) => {
    try{
        res.header("Access-Control-Allow-Origin", "*");
        res.json(await techniciansModel.find());
    }catch (e){
        res.json(e);
    }
}

exports.get_technician = async (req, res) => {
    try{
        res.header("Access-Control-Allow-Origin", "*");
        res.json(await techniciansModel.findOne({idTechnician: parseInt(req.params.id.split(":")[1])}));
    }catch (e) {
        res.json(e);
    }
}

exports.add_technician = async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Content-type,Accept,X-Custom-Header");

    const client = new techniciansModel(req.body);

    try{
        res.json(await client.save());
    }catch (e) {
        res.json(e);
    }
}

exports.remove_technician = async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Content-type,Accept,X-Custom-Header");

    try{
        res.json(await techniciansModel.deleteOne({idTechnician: parseInt(req.params.id.split(":")[1])}));
    }catch (e) {
        res.json(e);
    }
}

exports.update_technician = async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Content-type,Accept,X-Custom-Header");

    if (req.method === "OPTIONS") {
        res.header('Access-Control-Allow-Origin', req.headers.origin);
    } else {
        res.header('Access-Control-Allow-Origin', '*');
    }

    try{
        res.json(await techniciansModel.updateOne({idTechnician: parseInt(req.params.id.split(":")[1])}, req.body));
    }catch (e) {
        res.json(e);
    }
}
