import { User } from "../Model/userModel.js";

// GET ALL USERS
export const getAllUsers = async (req, res) => {
    const users = await User.findAll();
    res.json(users);
};

// GET USER BY ID
export const getUserById = async (req, res) => {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
};

// UPDATE USER
export const updateUser = async (req, res) => {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    await user.update(req.body);
    res.json({ message: "User updated", user });
};

// DELETE USER
export const deleteUser = async (req, res) => {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    await user.destroy();
    res.json({ message: "User deleted" });
};
