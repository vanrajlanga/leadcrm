const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

const Session = sequelize.define(
	"Session",
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
		token: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
		},
		expires_at: {
			type: DataTypes.DATE,
			allowNull: false,
		},
	},
	{
		timestamps: true,
		createdAt: "createdAt",
	}
);

module.exports = Session;
