const mongoose = require('mongoose')

const ticketSchema = new mongoose.Schema({
    idTicket: Number,
    openDate: String,
    closeDate: String,
    idClient: Number,
    username: String,
    clientRequest: String,
    workDone: String,
    logActivities: String,
    workingHours: Number,
    transferRange: Number,
    paymentMethod: {
        type: String,
        enum: ['TESSERA', 'SALDO', 'TESSERA + SALDO', 'NON PAGATO'],
        default: 'NON PAGATO'
    },
    cardNumber: Number,
    cardTotalHours: Number,
    cardRemainingHours: Number,
    price: Number,
    signatureClient: String,
});

module.exports = mongoose.model('tickets', ticketSchema);