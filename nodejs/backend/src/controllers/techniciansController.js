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
        res.json(await techniciansModel.findOne({idTechnician: parseInt(req.params.id.split(":")[1])}));
    }catch (e) {
        res.json(e);
    }
}

function getBiggestTechnicianId() {
    return techniciansModel.find().sort({ idTechnician: -1 }).limit(1).then(technicians => {
        if (technicians.length > 0) {
            return technicians[0].idTechnician;
        } else {
            return 0;
        }
    });
}

exports.add_technician = async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Content-type,Accept,X-Custom-Header");

    const { fullName, password, admin } = req.body;
    const biggestId = await getBiggestTechnicianId();

    const newTechnician = new techniciansModel({
        idTechnician: biggestId + 1,
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
        res.json(await techniciansModel.deleteOne({idTechnician: parseInt(req.params.id.split(":")[1])}));
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
        res.json(await techniciansModel.updateOne({idTechnician: parseInt(req.params.id.split(":")[1])}, req.body));
        index.sendUpdatedTechnicians(await techniciansModel.find());
    }catch (e) {
        res.json(e);
    }
}
