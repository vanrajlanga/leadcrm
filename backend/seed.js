const sequelize = require('./config/database');
const Role = require('./models/Role');
const User = require('./models/User');
const bcrypt = require('bcrypt');

(async () => {
    try {
        // Disable foreign key checks
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 0', { raw: true });

        // Sync database and force drop all tables
        await sequelize.sync({ force: true });

        // Enable foreign key checks
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 1', { raw: true });

        // Add roles
        const roles = [
            { name: 'Super Admin' },
            { name: 'Admin' },
            { name: 'Sales Team' },
            { name: 'Customer Support' },
        ];

        const createdRoles = await Role.bulkCreate(roles);

        // Add users for each role
        const users = [
            {
                email: 'superadmin@example.com',
                password_hash: await bcrypt.hash('password123', 10),
                role_id: createdRoles.find((role) => role.name === 'Super Admin').id,
            },
            {
                email: 'admin@example.com',
                password_hash: await bcrypt.hash('password123', 10),
                role_id: createdRoles.find((role) => role.name === 'Admin').id,
            },
            {
                email: 'sales@example.com',
                password_hash: await bcrypt.hash('password123', 10),
                role_id: createdRoles.find((role) => role.name === 'Sales Team').id,
            },
            {
                email: 'support@example.com',
                password_hash: await bcrypt.hash('password123', 10),
                role_id: createdRoles.find((role) => role.name === 'Customer Support').id,
            },
        ];

        await User.bulkCreate(users);

        console.log('Roles and users seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
})();
