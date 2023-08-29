const mongoose = require('mongoose')

const clientSchema = new mongoose.Schema({
    idClient: Number,
    fullName: String,
    address: String,
    cellphone: Number,
    mail: String,
    cards: [{
        totalHours: Number,
        usedHours: Number
    }]
});

module.exports = mongoose.model('clients', clientSchema);