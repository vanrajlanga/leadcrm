const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Lead = sequelize.define('Lead', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    status: {
        type: DataTypes.ENUM('open', 'pending', 'closed'),
        allowNull: false,
        defaultValue: 'open',
    },
    assigned_agent_id: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
}, {
    timestamps: true,
});

Lead.belongsTo(User, { foreignKey: 'assigned_agent_id', as: 'assignedAgent' });

module.exports = Lead;
