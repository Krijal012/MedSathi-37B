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
    },
    schedule: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: {
            Monday: "Off",
            Tuesday: "Off",
            Wednesday: "Off",
            Thursday: "Off",
            Friday: "Off",
            Saturday: "Off",
            Sunday: "Off"
        }
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true
    }
});
