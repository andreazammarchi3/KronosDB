const ticketsModel = require('../models/ticketsModel');
const index = require('../../src/index');

exports.all_tickets = async(req, res) => {
    try{
        res.header("Access-Control-Allow-Origin", "*");
        res.json(await ticketsModel.find());
    }catch (e){
        res.json(e);
    }
}

exports.add_ticket = async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Content-type,Accept,X-Custom-Header");

    const client = new ticketsModel(req.body);

    try{
        res.json(await client.save());
    }catch (e) {
        res.json(e);
    }
}

exports.remove_ticket = async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Content-type,Accept,X-Custom-Header");

    try{
        res.json(await ticketsModel.deleteOne({idClient: req.params.id}));
    }catch (e) {
        res.json(e);
    }
}

exports.update_ticket = async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Content-type,Accept,X-Custom-Header");

    if (req.method === "OPTIONS") {
        res.header('Access-Control-Allow-Origin', req.headers.origin);
    } else {
        res.header('Access-Control-Allow-Origin', '*');
    }

    try{
        res.json(await ticketsModel.updateOne({idClient: req.params.id}, req.body));
    }catch (e) {
        res.json(e);
    }
}
