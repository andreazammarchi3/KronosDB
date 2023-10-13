const mongoose = require('mongoose')

const technicianSchema = new mongoose.Schema({
    idTechnician: Number,
    fullName: String,
    password: String,
    admin: Boolean
});

module.exports = mongoose.model('technicians', technicianSchema);