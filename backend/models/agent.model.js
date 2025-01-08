const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

const Agent = sequelize.define(
	"Agent",
	{
		id: {
			type: DataTypes.BIGINT,
			autoIncrement: true,
			primaryKey: true,
		},
		user_id: {
			type: DataTypes.BIGINT,
			allowNull: false,
		},
		firstName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		lastName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		gender: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		dob: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		phone: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		address: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		aadharCard: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		panCard: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		bankPassbook: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		bankName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		branchName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		accountNumber: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		reEnterAccountNumber: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		ifscCode: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		bankAddress: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		monthly_target: {
			type: DataTypes.DECIMAL(10, 2),
			defaultValue: 0.0,
		},
		quarterly_target: {
			type: DataTypes.DECIMAL(10, 2),
			defaultValue: 0.0,
		},
		yearly_target: {
			type: DataTypes.DECIMAL(10, 2),
			defaultValue: 0.0,
		},
	},
	{
		timestamps: true,
		createdAt: "createdAt",
		updatedAt: "updatedAt",
	}
);

module.exports = Agent;
