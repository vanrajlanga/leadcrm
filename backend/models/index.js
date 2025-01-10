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
const PaymentGatewayTransaction = require("./paymentGatewayTransaction.model");
const PaymentHistory = require("./paymentHistory.model");
const Session = require("./session.model");
const SystemAnalytics = require("./systemAnalytics.model");
const Template = require("./template.model");
const Note = require("./note.model");
const Reminder = require("./reminder.model");

// Associations

// User and Role (Many-to-Many)
User.belongsToMany(Role, {
	through: UserRole,
	as: "roles",
	foreignKey: {
		name: "user_id",
		allowNull: false,
		constraints: false, // Disable auto constraints to avoid redundancy
	},
});
Role.belongsToMany(User, {
	through: UserRole,
	as: "users",
	foreignKey: {
		name: "role_id",
		allowNull: false,
		constraints: false,
	},
});

// Role and Permission (Many-to-Many)
Role.belongsToMany(Permission, {
	through: RolePermission,
	as: "permissions",
	foreignKey: {
		name: "role_id",
		allowNull: false,
		constraints: false,
	},
});
Permission.belongsToMany(Role, {
	through: RolePermission,
	as: "roles",
	foreignKey: {
		name: "permission_id",
		allowNull: false,
		constraints: false,
	},
});

// User and Agent (One-to-One)
Agent.belongsTo(User, {
	as: "user",
	foreignKey: {
		name: "user_id",
		allowNull: false,
	},
});
User.hasOne(Agent, {
	as: "agent",
	foreignKey: {
		name: "user_id",
		allowNull: false,
	},
});

// Agent and Lead (One-to-Many)
Lead.belongsTo(Agent, {
	as: "agent",
	foreignKey: {
		name: "agent_id",
		allowNull: false,
		constraints: false,
	},
});
Agent.hasMany(Lead, {
	as: "leads",
	foreignKey: "agent_id",
});

// Lead and Quote (One-to-Many)
Quote.belongsTo(Lead, {
	as: "lead",
	foreignKey: {
		name: "lead_id",
		allowNull: false,
	},
});
Lead.hasMany(Quote, {
	as: "quotes",
	foreignKey: "lead_id",
});

// Lead and Sale (One-to-Many)
Sale.belongsTo(Lead, {
	as: "lead",
	foreignKey: {
		name: "lead_id",
		allowNull: false,
	},
});
Lead.hasMany(Sale, {
	as: "sales",
	foreignKey: "lead_id",
});

// Lead and Ticket (One-to-Many)
Ticket.belongsTo(Lead, {
	as: "lead",
	foreignKey: {
		name: "lead_id",
		allowNull: false,
	},
});
Lead.hasMany(Ticket, {
	as: "tickets",
	foreignKey: "lead_id",
});

// User and Notification (One-to-Many)
Notification.belongsTo(User, {
	as: "user",
	foreignKey: {
		name: "user_id",
		allowNull: false,
	},
});
User.hasMany(Notification, {
	as: "notifications",
	foreignKey: "user_id",
});

// PaymentGatewayTransaction and PaymentHistory (One-to-Many)
PaymentHistory.belongsTo(PaymentGatewayTransaction, {
	as: "transaction",
	foreignKey: {
		name: "transaction_id",
		allowNull: false,
	},
});
PaymentGatewayTransaction.hasMany(PaymentHistory, {
	as: "paymentHistories",
	foreignKey: "transaction_id",
});

// User and Session (One-to-Many)
Session.belongsTo(User, {
	as: "user",
	foreignKey: {
		name: "user_id",
		allowNull: false,
	},
});
User.hasMany(Session, {
	as: "sessions",
	foreignKey: "user_id",
});

// User and Notes (One-to-Many)
Note.belongsTo(User, {
	as: "user",
	foreignKey: {
		name: "user_id",
		allowNull: false,
	},
});
User.hasMany(Note, {
	as: "notes",
	foreignKey: "user_id",
});

// Lead and Notes (One-to-Many)
Note.belongsTo(Lead, {
	as: "lead",
	foreignKey: {
		name: "lead_id",
		allowNull: false,
	},
});
Lead.hasMany(Note, {
	as: "notes",
	foreignKey: "lead_id",
});

// Sync models with the database
sequelize
	.authenticate()
	.then(() => {
		console.log("Database connection established successfully.");
		return sequelize.sync({ alter: true }); // Use migrations in production
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
	PaymentGatewayTransaction,
	PaymentHistory,
	Session,
	SystemAnalytics,
	Template,
	Note,
	Reminder,
};
