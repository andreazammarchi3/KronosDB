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
        enum: ['TESSERA', 'SALDO', 'NON PAGATO'],
        default: 'NON PAGATO'
    },
    cardNumber: Number,
    cardTotalHours: Number,
    cardLeftHours: Number,
    cardRemainingHours: Number,
    signatureClient: String,
    workingHourPrice: Number,
    transferHourPrice: Number,
    discount: Number,
});

module.exports = mongoose.model('tickets', ticketSchema);