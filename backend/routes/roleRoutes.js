const express = require('express');
const router = express.Router();
const Role = require('../models/Role');

// Get all roles
router.get('/', async (req, res) => {
    try {
        const roles = await Role.findAll({
            attributes: ['id', 'name'], // Fetch only necessary fields
        });

        if (!roles.length) {
            return res.status(404).json({ message: 'No roles found' });
        }

        res.status(200).json(roles);
    } catch (error) {
        console.error('Error fetching roles:', error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
