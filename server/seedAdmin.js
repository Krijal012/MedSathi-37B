import { User } from "./model/userModel.js";
import bcrypt from "bcryptjs";
import { connection } from "./database/db.js";

const seedAdmin = async () => {
    try {
        // Ensure DB connection
        await connection();

        const adminEmail = "admin@medsathi.com";
        const adminPassword = "Admin@1234";

        // Check if admin exists
        const existingAdmin = await User.findOne({ where: { email: adminEmail } });

        if (existingAdmin) {
            console.log("Admin account already exists.");
            return;
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(adminPassword, 12);

        // Create admin
        await User.create({
            name: "MedSathi Admin",
            email: adminEmail,
            password: hashedPassword,
            role: "admin"
        });

        console.log("✅ Admin account seeded successfully!");
        console.log(`Email: ${adminEmail}`);
        console.log(`Password: ${adminPassword}`);
    } catch (error) {
        console.error("❌ Failed to seed admin:", error.message);
    } finally {
        // In a standalone script we might want to exit, 
        // but if imported in server.js we should not.
        if (process.argv[1].includes('seedAdmin.js')) {
            process.exit();
        }
    }
};

// Run if called directly
if (process.argv[1].includes('seedAdmin.js')) {
    seedAdmin();
}

export default seedAdmin;
