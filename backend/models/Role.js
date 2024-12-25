const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Role = sequelize.define('Role', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    permissions: {
        type: DataTypes.JSON, // Store permissions as JSON
        allowNull: true,
    },
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt
});

module.exports = Role;
