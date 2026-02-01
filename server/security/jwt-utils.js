import jwt from "jsonwebtoken";

export const generateToken = (payload) => {
    return jwt.sign(payload, "secret_key", { expiresIn: "1h" });
};
