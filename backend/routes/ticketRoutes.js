const express = require('express');
const Ticket = require('../models/Ticket');

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const ticket = new Ticket(req.body);
        await ticket.save();
        res.status(201).send(ticket);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/', async (req, res) => {
    const tickets = await Ticket.find();
    res.send(tickets);
});

router.get('/:id', async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.id);
        if (!ticket) return res.status(404).send();
        res.send(ticket);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const ticket = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!ticket) return res.status(404).send();
        res.send(ticket);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const ticket = await Ticket.findByIdAndDelete(req.params.id);
        if (!ticket) return res.status(404).send();
        res.send(ticket);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
