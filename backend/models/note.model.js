const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

const Note = sequelize.define(
	"Note",
	{
		id: {
			type: DataTypes.BIGINT,
			autoIncrement: true,
			primaryKey: true,
		},
		user_id: {
			type: DataTypes.BIGINT,
		},
		lead_id: {
			type: DataTypes.BIGINT,
		},
		content: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
	},
	{
		timestamps: true,
		createdAt: "createdAt",
		updatedAt: "updatedAt",
	}
);

module.exports = Note;
