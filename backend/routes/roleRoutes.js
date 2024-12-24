const express = require('express');
const router = express.Router();
const Role = require('../models/Role');
const authenticateToken = require('../middlewares/auth');
const authorize = require('../middlewares/authorize');

// Create a new role (Admin only)
router.post('/', authenticateToken, authorize([1]), async (req, res) => {
    try {
        const { name, permissions } = req.body;
        const role = await Role.create({ name, permissions });
        res.status(201).json(role);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all roles
router.get('/', authenticateToken, authorize([1]), async (req, res) => {
    try {
        const roles = await Role.findAll();
        res.status(200).json(roles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a role
router.put('/:id', authenticateToken, authorize([1]), async (req, res) => {
    try {
        const { id } = req.params;
        const { name, permissions } = req.body;
        const role = await Role.findByPk(id);

        if (!role) return res.status(404).json({ error: 'Role not found' });

        await role.update({ name, permissions });
        res.status(200).json(role);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a role
router.delete('/:id', authenticateToken, authorize([1]), async (req, res) => {
    try {
        const { id } = req.params;
        const role = await Role.findByPk(id);

        if (!role) return res.status(404).json({ error: 'Role not found' });

        await role.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
