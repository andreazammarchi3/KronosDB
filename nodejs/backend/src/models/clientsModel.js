const mongoose = require('mongoose')

const clientSchema = new mongoose.Schema({
    idClient: Number,
    fullName: String,
    society: String,
    address: String,
    cellphone: String,
    mail: String,
});

module.exports = mongoose.model('clients', clientSchema);