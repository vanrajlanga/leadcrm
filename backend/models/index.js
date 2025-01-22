const sequelize = require("../config/db.config");

// Import Models
const User = require("./user.model");
const Role = require("./role.model");
const Permission = require("./permission.model");
const RolePermission = require("./rolePermission.model");
const UserRole = require("./userRole.model");
const Agent = require("./agent.model");
const Lead = require("./lead.model");
const Quote = require("./quote.model");
const Sale = require("./sale.model");
const Ticket = require("./ticket.model");
const Notification = require("./notification.model");
const PaymentHistory = require("./paymentHistory.model");
const Session = require("./session.model");
const SystemAnalytics = require("./systemAnalytics.model");
const Template = require("./template.model");
const Note = require("./note.model");
const Reminder = require("./reminder.model");
const Vendor = require("./vendor.model");
const CallLog = require("./callLog.model");
// Associations

// User and Role (Many-to-Many)
User.belongsToMany(Role, {
	through: UserRole,
	as: "roles",
	foreignKey: {
		name: "user_id",
		allowNull: false,
		index: false,
	},
});
Role.belongsToMany(User, {
	through: UserRole,
	as: "users",
	foreignKey: {
		name: "role_id",
		allowNull: false,
		index: false,
	},
});

// User and Agent (One-to-One)
Agent.belongsTo(User, {
	as: "user",
	foreignKey: {
		name: "user_id",
		allowNull: false,
		index: false,
	},
});
User.hasOne(Agent, {
	as: "agent",
	foreignKey: {
		name: "user_id",
		allowNull: false,
		index: false,
	},
});

Quote.belongsTo(Agent, {
	as: "agent",
	foreignKey: {
		name: "agent_id",
		allowNull: false,
		index: false,
	},
});

Quote.belongsTo(Lead, {
	as: "lead",
	foreignKey: {
		name: "lead_id",
		allowNull: false,
		index: false,
	},
});

// Lead and Ticket (One-to-Many)
Ticket.belongsTo(Lead, {
	as: "lead",
	foreignKey: {
		name: "lead_id",
		allowNull: false,
		index: false,
	},
});
Lead.hasMany(Ticket, {
	as: "tickets",
	foreignKey: "lead_id",
});

Lead.hasMany(Quote, {
	as: "quote",
	foreignKey: "lead_id",
});

Lead.belongsTo(Agent, {
	foreignKey: {
		name: "agent_id",
		allowNull: false,
		index: false,
	},
	as: "agent",
});

Agent.hasMany(Lead, {
	foreignKey: {
		name: "agent_id",
		allowNull: false,
		index: false,
	},
	as: "leads",
});

Agent.hasMany(Quote, {
	foreignKey: {
		name: "agent_id",
		allowNull: false,
		index: false,
	},
	as: "quotes",
});

// Sync models with the database
sequelize
	.authenticate()
	.then(() => {
		console.log("Database connection established successfully.");
		return sequelize.sync({ alter: true });
	})
	.then(() => {
		console.log("All models synchronized successfully.");
	})
	.catch((err) => {
		console.error("Error during model synchronization:", err);
	});

// Export models and sequelize
module.exports = {
	sequelize,
	User,
	Role,
	Permission,
	RolePermission,
	UserRole,
	Agent,
	Lead,
	Quote,
	Sale,
	Ticket,
	Notification,
	PaymentHistory,
	Session,
	SystemAnalytics,
	Template,
	Note,
	Reminder,
	Vendor,
	CallLog,
};
