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
User.belongsToMany(Role, { through: UserRole, foreignKey: "user_id" });
Role.belongsToMany(User, { through: UserRole, foreignKey: "role_id" });

// Role and Permission (Many-to-Many)
Role.belongsToMany(Permission, {
	through: RolePermission,
	foreignKey: "role_id",
});
Permission.belongsToMany(Role, {
	through: RolePermission,
	foreignKey: "permission_id",
});

// User and Agent (One-to-One)
Agent.belongsTo(User, { foreignKey: "user_id" });
User.hasOne(Agent, { foreignKey: "user_id" });

// Agent and Lead (One-to-Many)
Lead.belongsTo(Agent, { foreignKey: "agent_id" });
Agent.hasMany(Lead, { foreignKey: "agent_id" });

// Lead and Quote (One-to-Many)
Quote.belongsTo(Lead, { foreignKey: "lead_id" });
Lead.hasMany(Quote, { foreignKey: "lead_id" });

// Agent and Quote (One-to-Many)
Quote.belongsTo(Agent, { foreignKey: "agent_id" });
Agent.hasMany(Quote, { foreignKey: "agent_id" });

// Lead and Sale (One-to-Many)
Sale.belongsTo(Lead, { foreignKey: "lead_id" });
Lead.hasMany(Sale, { foreignKey: "lead_id" });

// Agent and Sale (One-to-Many)
Sale.belongsTo(Agent, { foreignKey: "agent_id" });
Agent.hasMany(Sale, { foreignKey: "agent_id" });

// Lead and Ticket (One-to-Many)
Ticket.belongsTo(Lead, { foreignKey: "lead_id" });
Lead.hasMany(Ticket, { foreignKey: "lead_id" });

// Agent and Ticket (One-to-Many)
Ticket.belongsTo(Agent, { foreignKey: "agent_id" });
Agent.hasMany(Ticket, { foreignKey: "agent_id" });

// User and Notification (One-to-Many)
Notification.belongsTo(User, { foreignKey: "user_id" });
User.hasMany(Notification, { foreignKey: "user_id" });

// Lead and PaymentHistory (One-to-Many)
PaymentHistory.belongsTo(Lead, { foreignKey: "lead_id" });
Lead.hasMany(PaymentHistory, { foreignKey: "lead_id" });

// PaymentGatewayTransaction and PaymentHistory (One-to-Many)
PaymentHistory.belongsTo(PaymentGatewayTransaction, {
	foreignKey: "transaction_id",
});
PaymentGatewayTransaction.hasMany(PaymentHistory, {
	foreignKey: "transaction_id",
});

// User and Session (One-to-Many)
Session.belongsTo(User, { foreignKey: "user_id" });
User.hasMany(Session, { foreignKey: "user_id" });

// User and Notes (One-to-Many)
Note.belongsTo(User, { foreignKey: "user_id" });
User.hasMany(Note, { foreignKey: "user_id" });

// Lead and Notes (One-to-Many)
Note.belongsTo(Lead, { foreignKey: "lead_id" });
Lead.hasMany(Note, { foreignKey: "lead_id" });

// User and Reminders (One-to-Many)
Reminder.belongsTo(User, { foreignKey: "user_id" });
User.hasMany(Reminder, { foreignKey: "user_id" });

sequelize
	.sync({ alter: true }) // Adjust the database schema to match the models
	.then(() => console.log("All models synchronized successfully."))
	.catch((err) => console.error("Error synchronizing models:", err));

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
