// Controller/authController.js
import { User } from "../model/userModel.js";
import { Staff } from "../model/staffModel.js";
import { Pharmacist } from "../model/pharmacistModel.js";
import { Patient } from "../model/patientModel.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../security/jwt-utils.js";

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Register
export const register = async (req, res) => {
    try {
        const { fullName, email, password, registerAs } = req.body;

        // Validation
        if (!email || !password || !fullName || !registerAs) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email format"
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters"
            });
        }

        // Validate role
        const validRoles = ['patient', 'staff', 'pharmacist', 'admin'];
        const role = registerAs.toLowerCase();
        if (!validRoles.includes(role)) {
            return res.status(400).json({
                success: false,
                message: "Invalid role. Must be patient, staff, pharmacist, or admin"
            });
        }

        // Check if user exists
        const existing = await User.findOne({ where: { email } });
        if (existing) {
            return res.status(409).json({
                success: false,
                message: "User already exists with this email"
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create user
        const user = await User.create({
            name: fullName,
            email: email.toLowerCase(),
            password: hashedPassword,
            role: role
        });

        // Create role-specific record
        if (role === 'staff') {
            await Staff.create({
                name: fullName,
                email: email.toLowerCase(),
                department: 'General', // Default for now
                designation: 'Staff'
            });
        } else if (role === 'pharmacist') {
            await Pharmacist.create({
                name: fullName,
                email: email.toLowerCase(),
                licenseNumber: 'TEMP-' + Date.now() // Temporary license if not provided
            });
        } else if (role === 'patient') {
            await Patient.create({
                name: fullName,
                email: email.toLowerCase(),
                age: 0,
                gender: 'Not Specified'
            });
        }

        // Generate token
        const token = generateToken({
            id: user.id,
            email: user.email,
            role: user.role
        });

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role
            }
        });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({
            success: false,
            message: "Registration failed",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// Login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email format"
            });
        }

        // Find user
        const user = await User.findOne({ where: { email: email.toLowerCase() } });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        // Verify password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        // Generate token
        const token = generateToken({
            id: user.id,
            email: user.email,
            role: user.role
        });

        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role
            }
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({
            success: false,
            message: "Login failed",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// Get current user (protected route)
export const getMe = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id, {
            attributes: { exclude: ['password'] }
        });

        res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch user data",
            error: error.message
        });
    }
};

// Logout (client-side token removal, but this can log the action)
export const logout = async (req, res) => {
    res.status(200).json({
        success: true,
        message: "Logged out successfully"
    });
};