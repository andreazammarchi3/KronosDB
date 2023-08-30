const mongoose = require('mongoose')

const ticketSchema = new mongoose.Schema({
    idTicket: Number,
    openDate: String,
    closeDate: String,
    idClient: Number,
    fullNameClient: String,
    idTechnician: Number,
    clientRequest: String,
    workDone: String,
    logActivities: String,
    workingHours: Number,
    transferHours: Number,
    paymentMethod: {
        type: String,
        enum: ['TESSERA', 'SALDO', 'TESSERA + SALDO'],
        default: 'SALDO'
    },
    cardNumber: Number,
    cardUsedHours: Number,
    price: Number,
    signatureClient: String,
});

module.exports = mongoose.model('tickets', ticketSchema);