const mongoose = require('mongoose')

const ticketSchema = new mongoose.Schema({
    idTicket: Number,
    openDate: String,
    closeDate: String,
    idClient: Number,
    fullNameClient: String,
    idTechnician: Number,
    fullNameTechnician: String,
    clientRequest: String,
    workDone: String,
    logActivities: String,
    workingHours: Number,
    transferHours: Number,
    price: Number
});

module.exports = mongoose.model('tickets', ticketSchema);