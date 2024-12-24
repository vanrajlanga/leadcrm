const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authenticateToken = require('../middlewares/auth');
const authorize = require('../middlewares/authorize');

// Register a new user
router.post('/register', async (req, res) => {
    try {
        const { email, password, role_id } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            email,
            password_hash: hashedPassword,
            role_id,
        });

        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Login a user
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });

        if (!user) return res.status(404).json({ error: 'User not found' });

        const validPassword = await bcrypt.compare(password, user.password_hash);
        if (!validPassword) return res.status(401).json({ error: 'Invalid credentials' });

        const token = jwt.sign({ id: user.id, role_id: user.role_id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all users (Admin only)
router.get('/', authenticateToken, authorize([1]), async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a user (Admin and Manager only)
router.put('/:id', authenticateToken, authorize([1, 2]), async (req, res) => {
    try {
        const { id } = req.params;
        const { email, password_hash, role_id } = req.body;
        const user = await User.findByPk(id);

        if (!user) return res.status(404).json({ error: 'User not found' });

        await user.update({ email, password_hash, role_id });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a user (Admin only)
router.delete('/:id', authenticateToken, authorize([1]), async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);

        if (!user) return res.status(404).json({ error: 'User not found' });

        await user.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
