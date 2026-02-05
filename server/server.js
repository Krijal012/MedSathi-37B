// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connection } from "./database/db.js";
import { router } from "./routes/userRoutes.js";
import { patientRouter } from "./routes/patientRoutes.js";
import { staffRouter } from "./routes/staffRoutes.js";
import { pharmacistRouter } from "./routes/pharmacistRoutes.js";
import { appointmentRouter } from "./routes/appointmentRoutes.js";
import { historyRouter } from "./routes/historyRoutes.js";

// Load environment variables FIRST
dotenv.config();

const app = express();

// CORS configuration
app.use(cors({
    origin: [process.env.FRONTEND_URL, "http://localhost:5173", "http://localhost:5174", "http://localhost:3000"].filter(Boolean),
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test route
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "MedSathi API is running!",
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV
    });
});

// Health check route
app.get("/health", (req, res) => {
    res.json({
        success: true,
        status: "Server is healthy",
        database: "Connected"
    });
});

// API Routes
app.use("/api/auth", router);
app.use("/api/patients", patientRouter);
app.use("/api/staff", staffRouter);
app.use("/api/pharmacists", pharmacistRouter);
app.use("/api/appointments", appointmentRouter);
app.use("/api/history", historyRouter);

// 404 handler - Must be AFTER all routes
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.originalUrl} not found`
    });
});

// Error handling middleware - Must be LAST
app.use((err, req, res, next) => {
    console.error("Error:", err);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
        error: process.env.NODE_ENV === 'development' ? err : {}
    });
});

// Get port from environment variable
const PORT = process.env.PORT || 5000;

// Start server and connect to database
const startServer = async () => {
    try {
        // Connect to database first
        await connection();

        // Then start the server
        app.listen(PORT, () => {
            console.log(`✅ Server running on port ${PORT}`);
            console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
            console.log(`🔗 API: http://localhost:${PORT}`);
            console.log(`🌐 Frontend URL: ${process.env.FRONTEND_URL}`);
        });
    } catch (error) {
        console.error("❌ Failed to start server:", error);
        process.exit(1);
    }
};

// Start the server
startServer();

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.error('❌ Unhandled Promise Rejection:', err);
    process.exit(1);
});