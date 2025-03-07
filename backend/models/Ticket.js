const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
    title: String,
    description: String,
    status: { type: String, enum: ['Open', 'In Progress', 'Closed'], default: 'Open' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Ticket', TicketSchema);
