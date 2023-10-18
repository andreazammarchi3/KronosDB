const techniciansModel = require('../models/techniciansModel');
const index = require('../../src/index');

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
        res.json(await techniciansModel.findOne({username: req.params.username.split(":")[1]}));
    }catch (e) {
        res.json(e);
    }
}

exports.add_technician = async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Content-type,Accept,X-Custom-Header");

    const { username, fullName, password, admin } = req.body;

    const newTechnician = new techniciansModel({
        username: username,
        password: password,
        fullName: fullName,
        admin: admin
    });

    try{
        res.json(await newTechnician.save());
        index.sendUpdatedTechnicians(await techniciansModel.find());
    }catch (e) {
        res.json(e);
    }
}

exports.remove_technician = async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Content-type,Accept,X-Custom-Header");

    try{
        res.json(await techniciansModel.deleteOne({username: req.params.username.split(":")[1]}));
        index.sendUpdatedTechnicians(await techniciansModel.find());
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
        res.json(await techniciansModel.updateOne({username: req.params.username.split(":")[1]}, req.body));
        index.sendUpdatedTechnicians(await techniciansModel.find());
    }catch (e) {
        res.json(e);
    }
}
