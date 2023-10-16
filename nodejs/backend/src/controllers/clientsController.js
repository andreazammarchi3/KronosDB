const clientsModel = require('../models/clientsModel');
const index = require('../../src/index');
const techniciansModel = require("../models/techniciansModel");

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

function getBiggestClientId() {
    return clientsModel.find().sort({ idClient: -1 }).limit(1).then(clients => {
        if (clients.length > 0) {
            return clients[0].idClient;
        } else {
            return 0;
        }
    });
}

exports.add_client = async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Content-type,Accept,X-Custom-Header");

    const { fullName, society, cellphone, mail, address } = req.body;
    const biggestId = await getBiggestClientId();

    const newClient = new clientsModel({
        idClient: biggestId + 1,
        fullName: fullName,
        society: society,
        address: address,
        cellphone: cellphone,
        mail: mail,
        cards: []
    });

    try{
        res.json(await newClient.save());
        index.sendUpdatedClients(await clientsModel.find());
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
        index.sendUpdatedClients(await clientsModel.find());
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
        index.sendUpdatedClients(await clientsModel.find());
    }catch (e) {
        res.json(e);
    }
}

exports.update_client_cards = async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Content-type,Accept,X-Custom-Header");

    if (req.method === "OPTIONS") {
        res.header('Access-Control-Allow-Origin', req.headers.origin);
    } else {
        res.header('Access-Control-Allow-Origin', '*');
    }

    const { cards } = req.body;

    try{
        res.json(await clientsModel.updateOne({idClient: parseInt(req.params.id.split(":")[1])}, {cards: cards}));
        index.sendUpdatedClients(await clientsModel.find());
    }catch (e) {
        res.json(e);
    }
}
