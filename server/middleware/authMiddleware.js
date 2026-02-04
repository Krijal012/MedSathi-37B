// middleware/authMiddleware.js
import { verifyToken } from "../security/jwt-utils.js";
import { User } from "../Model/userModel.js";

export const authenticate = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        
        if (!token) {
            return res.status(401).json({ 
                success: false,
                message: "Access denied. No token provided." 
            });
        }

        const decoded = verifyToken(token);
        const user = await User.findByPk(decoded.id, {
            attributes: { exclude: ['password'] }
        });

        if (!user) {
            return res.status(404).json({ 
                success: false,
                message: "User not found" 
            });
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ 
            success: false,
            message: "Invalid token",
            error: error.message 
        });
    }
};

export const authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ 
                success: false,
                message: "Access denied. Insufficient permissions." 
            });
        }
        next();
    };
};