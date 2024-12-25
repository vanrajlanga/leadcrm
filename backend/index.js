const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Server } = require('socket.io');
const http = require('http');
const userRoutes = require('./routes/userRoutes');
const roleRoutes = require('./routes/roleRoutes');
const leadRoutes = require('./routes/leadRoutes');
require('dotenv').config();
const sequelize = require('./config/database');
const Role = require('./models/Role');
const Lead = require('./models/Lead');

// Initialize Express app
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/leads', leadRoutes);

// Create HTTP server
const server = http.createServer(app);

// Set up WebSocket
const io = new Server(server, {
    cors: {
        origin: '*',
    },
});

io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

// Sync database and start server
sequelize.sync({ alter: true })
    .then(() => {
        console.log('Database synchronized');
        const PORT = process.env.PORT || 5000;
        server.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => console.error('Error syncing database:', error));

// Export io for broadcasting events
module.exports = io;
