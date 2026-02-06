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

        // Add sample doctors
        const drRam = await fetch('http://localhost:5000/api/doctors', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: "Dr. Ram Shrestha",
                specialty: "Cardiologist",
                schedule: {
                    Sunday: "9AM-4PM", Monday: "9AM-4PM", Tuesday: "9AM-4PM",
                    Wednesday: "9AM-4PM", Thursday: "9AM-4PM", Friday: "9AM-4PM", Saturday: "Off"
                }
            })
        });
        await checkRes(drRam, "Dr. Ram");

        const drSita = await fetch('http://localhost:5000/api/doctors', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: "Dr. Sita Sharma",
                specialty: "Pediatrician",
                schedule: {
                    Sunday: "10AM-2PM", Monday: "10AM-2PM", Tuesday: "Off",
                    Wednesday: "10AM-2PM", Thursday: "10AM-2PM", Friday: "Off", Saturday: "10AM-2PM"
                }
            })
        });
        await checkRes(drSita, "Dr. Sita");

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
                doctorName: "Dr. Ram Shrestha",
                time: "10:30 AM",
                status: "waiting_for_pharmacist",
                date: new Date().toISOString().split('T')[0]
            })
        });
        await checkRes(appt1, "Appointment (Waiting for Pharmacist)");

        const appt2 = await fetch('http://localhost:5000/api/appointments', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                patientName: "Jane Doe",
                doctorName: "Pharm. Binod Chaudhary",
                providerType: "pharmacist",
                time: "11:00 AM",
                status: "confirmed",
                date: new Date().toISOString().split('T')[0]
            })
        });
        await checkRes(appt2, "Direct Pharmacist Appointment");

        console.log("Seeding complete! Please refresh the page.");
    } catch (error) {
        console.error("Seeding failed:", error.message);
    }
};

seedData();
