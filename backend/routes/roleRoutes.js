const express = require('express');
const router = express.Router();
const Role = require('../models/Role');

// Get all roles
router.get('/', async (req, res) => {
    try {
        const roles = await Role.findAll();
        res.status(200).json(roles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
