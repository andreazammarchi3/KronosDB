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

exports.get_ticket = async (req, res) => {
    try{
        res.header("Access-Control-Allow-Origin", "*");
        res.json(await ticketsModel.findOne({idTicket: parseInt(req.params.id.split(":")[1])}));
    }catch (e) {
        res.json(e);
    }
}

function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

function getBiggestTicketId() {
    return ticketsModel.find().sort({ idTicket: -1 }).limit(1).then(tickets => {
        if (tickets.length > 0) {
            return tickets[0].idTicket;
        } else {
            return 0;
        }
    });
}

exports.add_ticket = async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Content-type,Accept,X-Custom-Header");

    const { idClient, fullNameClient, clientRequest, idTechnician, fullNameTechnician } = req.body;
    const biggestId = await getBiggestTicketId();

    const newTicket = new ticketsModel({
        idTicket: biggestId + 1,
        openDate: formatDate(new Date()),
        closeDate: "",
        idClient: idClient,
        fullNameClient: fullNameClient,
        idTechnician: idTechnician === 0 ? null : idTechnician,
        fullNameTechnician: fullNameTechnician === null ? "Nessuno" : fullNameTechnician,
        clientRequest: clientRequest,
        workDone: null,
        logActivities: null,
        workingHours: null,
        transferHours: null,
        price: null
    });

    try{
        res.json(await newTicket.save());
    }catch (e) {
        res.json(e);
    }
}

exports.remove_ticket = async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Content-type,Accept,X-Custom-Header");

    try{
        res.json(await ticketsModel.deleteOne({idTicket: parseInt(req.params.id.split(":")[1])}));
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
        res.json(await ticketsModel.updateOne({idTicket: req.params.id}, req.body));
    }catch (e) {
        res.json(e);
    }
}
