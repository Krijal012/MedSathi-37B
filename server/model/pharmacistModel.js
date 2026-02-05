import { DataTypes } from "sequelize";
import { sequelize } from "../database/db.js";

export const Pharmacist = sequelize.define("Pharmacist", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    licenseNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
});
