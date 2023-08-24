const mongoose = require('mongoose')

const ticketSchema = new mongoose.Schema({
    idTicket: Number,
    openDate: String,
    closeDate: String,
    idClient: Number,
    idTechnician: Number,
    workDone: String,
    notes: String,
    workingHours: Number,
    transferHours: Number,
    price: Number
});

module.exports = mongoose.model('tickets', ticketSchema);