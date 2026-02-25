const seedData = async () => {
    try {
        console.log("Starting seeding...");

        // Helper to log response
        const checkRes = async (res, name) => {
            const data = await res.json();
            if (res.ok) {
                console.log(`✅ ${name} added successfully`);
            } else {
                console.error(`❌ Failed to add ${name}:`, data.message);
            }
        };

        // Add sample pharmacist
        const pharmBinod = await fetch('http://localhost:5000/api/pharmacists', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: "Pharm. Binod Chaudhary",
                email: "binod@example.com",
                licenseNumber: "PH-12345",
                schedule: {
                    Sunday: "9AM-6PM", Monday: "9AM-6PM", Tuesday: "9AM-6PM",
                    Wednesday: "9AM-6PM", Thursday: "9AM-6PM", Friday: "9AM-6PM", Saturday: "Off"
                }
            })
        });
        await checkRes(pharmBinod, "Pharm. Binod");

        // Add sample appointment in pharmacist queue
        const appt1 = await fetch('http://localhost:5000/api/appointments', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                patientName: "John Smith",
                pharmacistName: "Pharm. Binod Chaudhary",
                time: "10:30 AM",
                status: "confirmed",
                date: new Date().toISOString().split('T')[0]
            })
        });
        await checkRes(appt1, "Appointment (Pharmacist)");

        console.log("Seeding complete! Please refresh the page.");
    } catch (error) {
        console.error("Seeding failed:", error.message);
    }
};

seedData();
