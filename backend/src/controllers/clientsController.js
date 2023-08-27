const clientsModel = require('../models/clientsModel');
const index = require('../../src/index');

exports.all_clients = async(req, res) => {
    try{
        res.header("Access-Control-Allow-Origin", "*");
        res.json(await clientsModel.find());
    }catch (e){
        res.json(e);
    }
}

exports.get_client = async (req, res) => {
    try{
        res.header("Access-Control-Allow-Origin", "*");
        res.json(await clientsModel.findOne({idClient: parseInt(req.params.id.split(":")[1])}));
    }catch (e) {
        res.json(e);
    }
}

exports.add_client = async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Content-type,Accept,X-Custom-Header");

    const client = new clientsModel(req.body);

    try{
        res.json(await client.save());
    }catch (e) {
        res.json(e);
    }
}

exports.remove_client = async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Content-type,Accept,X-Custom-Header");

    try{
        res.json(await clientsModel.deleteOne({idClient: parseInt(req.params.id.split(":")[1])}));
    }catch (e) {
        res.json(e);
    }
}

exports.update_client = async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Content-type,Accept,X-Custom-Header");

    if (req.method === "OPTIONS") {
        res.header('Access-Control-Allow-Origin', req.headers.origin);
    } else {
        res.header('Access-Control-Allow-Origin', '*');
    }

    try{
        res.json(await clientsModel.updateOne({idClient: parseInt(req.params.id.split(":")[1])}, req.body));
    }catch (e) {
        res.json(e);
    }
}
