const mongoose = require('mongoose')

const technicianSchema = new mongoose.Schema({
    idTechnician: Number,
    fullName: String,
    role: {
        type: String,
        enum: ['BASE', 'JUNIOR', 'SENIOR', 'ADMIN'],
        default: 'BASE'
    },
    costPerHour: Number
});

module.exports = mongoose.model('technicians', technicianSchema);