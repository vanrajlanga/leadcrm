const Lead = require("../models/lead.model"); // Adjust the path as needed

const seedLeads = async () => {
	try {
		await Lead.bulkCreate([
			{
				name: "John Doe",
				phone: "1234567890",
				email: "john.doe@example.com",
				comments: "Looking for spare parts for sedans",
				parts: "Sedan Parts",
				makeModels: "Toyota, Honda",
				years: "2015-2020",
				states: "California",
				subscription: true,
				trackingId: "TR123456",
				eventTimestamp: new Date(),
				recordAudio: null,
				cost_price: 1200.0,
				selling_price: 1500.0,
				reference: "website",
				agent_id: 1,
				followup_date: new Date("2025-01-20"),
			},
			{
				name: "Jane Smith",
				phone: "9876543210",
				email: "jane.smith@example.com",
				comments: "Need vintage car parts",
				parts: "Vintage Parts",
				makeModels: "Ford, Chevrolet",
				years: "1970-1980",
				states: "New York",
				subscription: false,
				trackingId: "TR789123",
				eventTimestamp: new Date(),
				recordAudio: null,
				cost_price: 5000.0,
				selling_price: 6000.0,
				reference: "manual",
				agent_id: 2,
				followup_date: new Date("2025-02-15"),
			},
			{
				name: "Alice Johnson",
				phone: "2345678901",
				email: "alice.johnson@example.com",
				comments: "Requesting SUV spare parts",
				parts: "SUV Parts",
				makeModels: "Nissan, Jeep",
				years: "2018-2022",
				states: "Texas",
				subscription: true,
				trackingId: "TR456789",
				eventTimestamp: new Date(),
				recordAudio: null,
				cost_price: 3000.0,
				selling_price: 3500.0,
				reference: "website",
				agent_id: 3,
				followup_date: new Date("2025-01-25"),
			},
		]);
		console.log("Dummy leads inserted successfully!");
	} catch (error) {
		console.error("Error seeding leads:", error);
	}
};

// Run the seeder script
seedLeads();
