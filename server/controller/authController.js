import { User } from "../Model/userModel.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../security/jwt-utils.js";

// Register
export const register = async (req, res) => {
    try {
        const { fullName, email, password, registerAs } = req.body;

        if (!email || !password || !fullName || !registerAs)
            return res.status(400).json({ message: "All fields are required" });

        if (!email.includes("@") || !email.includes("."))
            return res.status(400).json({ message: "Invalid email format" });

        if (password.length < 6)
            return res.status(400).json({ message: "Password must be at least 6 characters" });

        const existing = await User.findOne({ where: { email } });
        if (existing)
            return res.status(409).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name: fullName,
            email,
            password: hashedPassword,
            role: registerAs
        });

        res.status(201).json({
            message: "User registered successfully",
            user: { id: user.id, email: user.email, name: user.name, role: user.role },
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password)
            return res.status(400).json({ message: "Email and password required" });

        const user = await User.findOne({ where: { email } });
        if (!user)
            return res.status(404).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(401).json({ message: "Incorrect password" });

        const token = generateToken({
            id: user.id,
            email: user.email,
            role: user.role
        });

        res.status(200).json({
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
        res.status(500).json({ message: error.message });
    }
};
