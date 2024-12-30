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

// User and Role (Many-to-Many)
User.belongsToMany(Role, {
	through: UserRole,
	as: "roles",
	foreignKey: "user_id",
});
Role.belongsToMany(User, {
	through: UserRole,
	as: "users",
	foreignKey: "role_id",
});

// Role and Permission (Many-to-Many)
Role.belongsToMany(Permission, {
	through: RolePermission,
	as: "permissions", // Alias for permissions
	foreignKey: "role_id",
});
Permission.belongsToMany(Role, {
	through: RolePermission,
	as: "roles", // Alias for roles in permission
	foreignKey: "permission_id",
});

// User and Agent (One-to-One)
Agent.belongsTo(User, { as: "user", foreignKey: "user_id" });
User.hasOne(Agent, { as: "agent", foreignKey: "user_id" });

// Agent and Lead (One-to-Many)
Lead.belongsTo(Agent, { as: "agent", foreignKey: "agent_id" });
Agent.hasMany(Lead, { as: "leads", foreignKey: "agent_id" });

// Lead and Quote (One-to-Many)
Quote.belongsTo(Lead, { as: "lead", foreignKey: "lead_id" });
Lead.hasMany(Quote, { as: "quotes", foreignKey: "lead_id" });

// Agent and Quote (One-to-Many)
Quote.belongsTo(Agent, { as: "agent", foreignKey: "agent_id" });
Agent.hasMany(Quote, { as: "quotes", foreignKey: "agent_id" });

// Lead and Sale (One-to-Many)
Sale.belongsTo(Lead, { as: "lead", foreignKey: "lead_id" });
Lead.hasMany(Sale, { as: "sales", foreignKey: "lead_id" });

// Agent and Sale (One-to-Many)
Sale.belongsTo(Agent, { as: "agent", foreignKey: "agent_id" });
Agent.hasMany(Sale, { as: "sales", foreignKey: "agent_id" });

// Lead and Ticket (One-to-Many)
Ticket.belongsTo(Lead, { as: "lead", foreignKey: "lead_id" });
Lead.hasMany(Ticket, { as: "tickets", foreignKey: "lead_id" });

// Agent and Ticket (One-to-Many)
Ticket.belongsTo(Agent, { as: "agent", foreignKey: "agent_id" });
Agent.hasMany(Ticket, { as: "tickets", foreignKey: "agent_id" });

// User and Notification (One-to-Many)
Notification.belongsTo(User, { as: "user", foreignKey: "user_id" });
User.hasMany(Notification, { as: "notifications", foreignKey: "user_id" });

// Lead and PaymentHistory (One-to-Many)
PaymentHistory.belongsTo(Lead, { as: "lead", foreignKey: "lead_id" });
Lead.hasMany(PaymentHistory, { as: "paymentHistories", foreignKey: "lead_id" });

// PaymentGatewayTransaction and PaymentHistory (One-to-Many)
PaymentHistory.belongsTo(PaymentGatewayTransaction, {
	as: "transaction",
	foreignKey: "transaction_id",
});
PaymentGatewayTransaction.hasMany(PaymentHistory, {
	as: "paymentHistories",
	foreignKey: "transaction_id",
});

// User and Session (One-to-Many)
Session.belongsTo(User, { as: "user", foreignKey: "user_id" });
User.hasMany(Session, { as: "sessions", foreignKey: "user_id" });

// User and Notes (One-to-Many)
Note.belongsTo(User, { as: "user", foreignKey: "user_id" });
User.hasMany(Note, { as: "notes", foreignKey: "user_id" });

// Lead and Notes (One-to-Many)
Note.belongsTo(Lead, { as: "lead", foreignKey: "lead_id" });
Lead.hasMany(Note, { as: "notes", foreignKey: "lead_id" });

// User and Reminders (One-to-Many)
Reminder.belongsTo(User, { as: "user", foreignKey: "user_id" });
User.hasMany(Reminder, { as: "reminders", foreignKey: "user_id" });

// Sync models with database
sequelize
	.sync({ alter: true }) // Adjust the database schema to match the models
	.then(() => console.log("All models synchronized successfully."))
	.catch((err) => console.error("Error synchronizing models:", err));

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
