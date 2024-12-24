const express = require('express');
const router = express.Router();
const Lead = require('../models/Lead');
const authenticateToken = require('../middlewares/auth');
const authorize = require('../middlewares/authorize');
const io = require('../index'); // Import WebSocket instance

// Create a new lead
router.post('/', authenticateToken, authorize([1, 2]), async (req, res) => {
    try {
        const { name, email, phone, status, assigned_agent_id } = req.body;
        const lead = await Lead.create({ name, email, phone, status, assigned_agent_id });

        // Emit event to notify about lead creation
        io.emit('leadCreated', lead);

        res.status(201).json(lead);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all leads
router.get('/', authenticateToken, authorize([1, 2, 3]), async (req, res) => {
    try {
        const leads = await Lead.findAll();
        res.status(200).json(leads);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a specific lead
router.get('/:id', authenticateToken, authorize([1, 2, 3]), async (req, res) => {
    try {
        const { id } = req.params;
        const lead = await Lead.findByPk(id);

        if (!lead) return res.status(404).json({ error: 'Lead not found' });

        res.status(200).json(lead);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a lead
router.put('/:id', authenticateToken, authorize([1, 2]), async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, phone, status, assigned_agent_id } = req.body;
        const lead = await Lead.findByPk(id);

        if (!lead) return res.status(404).json({ error: 'Lead not found' });

        await lead.update({ name, email, phone, status, assigned_agent_id });

        // Emit event to notify about lead update
        io.emit('leadUpdated', lead);

        res.status(200).json(lead);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a lead
router.delete('/:id', authenticateToken, authorize([1]), async (req, res) => {
    try {
        const { id } = req.params;
        const lead = await Lead.findByPk(id);

        if (!lead) return res.status(404).json({ error: 'Lead not found' });

        await lead.destroy();

        // Emit event to notify about lead deletion
        io.emit('leadDeleted', { id });

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
