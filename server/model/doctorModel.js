import { DataTypes } from "sequelize";
import { sequelize } from "../database/db.js";

export const Doctor = sequelize.define("Doctor", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    specialty: {
        type: DataTypes.STRING,
        allowNull: false
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
    }
});
