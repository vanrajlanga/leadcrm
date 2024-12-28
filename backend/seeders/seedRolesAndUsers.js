const { Role, User, UserRole } = require("../models");
const bcrypt = require("bcrypt");

const seedRolesAndUsers = async () => {
	try {
		// Seed roles
		const roles = await Role.bulkCreate([
			{
				name: "Super Admin",
				description: "Has full access to all features and settings.",
			},
			{
				name: "Admin",
				description:
					"Can manage most resources but has limited access to certain settings.",
			},
			{
				name: "Sales Team",
				description: "Can view and manage leads, quotes, and sales.",
			},
			{
				name: "Customer Support",
				description: "Can view and manage tickets and customer issues.",
			},
		]);
		console.log("Roles seeded successfully.");

		// Seed users
		const users = await User.bulkCreate([
			{
				name: "John Doe",
				email: "superadmin@example.com",
				password: await bcrypt.hash("password1", 10),
				status: "active",
			},
			{
				name: "Jane Smith",
				email: "admin@example.com",
				password: await bcrypt.hash("password2", 10),
				status: "active",
			},
			{
				name: "Bob Brown",
				email: "sales@example.com",
				password: await bcrypt.hash("password3", 10),
				status: "active",
			},
			{
				name: "Alice Johnson",
				email: "support@example.com",
				password: await bcrypt.hash("password4", 10),
				status: "active",
			},
		]);
		console.log("Users seeded successfully.");

		// Map roles to users
		const userRoles = [
			{ user_id: users[0].id, role_id: roles[0].id }, // John Doe -> Super Admin
			{ user_id: users[1].id, role_id: roles[1].id }, // Jane Smith -> Admin
			{ user_id: users[2].id, role_id: roles[2].id }, // Bob Brown -> Sales Team
			{ user_id: users[3].id, role_id: roles[3].id }, // Alice Johnson -> Customer Support
		];

		await UserRole.bulkCreate(userRoles);
		console.log("User roles mapped successfully.");
	} catch (error) {
		console.error("Error seeding roles and users:", error);
	}
};

seedRolesAndUsers();
