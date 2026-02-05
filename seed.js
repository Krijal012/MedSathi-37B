const seedData = async () => {
    try {
        console.log("Starting seeding...");

        // Add sample doctors
        await fetch('http://localhost:5000/api/doctors', {
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

        await fetch('http://localhost:5000/api/doctors', {
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

        // Add sample pharmacist
        await fetch('http://localhost:5000/api/pharmacists', {
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

        // Add sample appointment in pharmacist queue
        await fetch('http://localhost:5000/api/appointments', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                patientName: "John Doe",
                doctorName: "Dr. Ram Shrestha",
                appointmentTime: "10:30 AM",
                status: "waiting_for_pharmacist",
                date: new Date().toISOString().split('T')[0]
            })
        });

        console.log("Seeding complete! Please refresh the page.");
    } catch (error) {
        console.error("Seeding failed:", error.message);
    }
};

seedData();
