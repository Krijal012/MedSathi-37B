import { DataTypes } from "sequelize";
import { sequelize } from "../database/db.js";

export const MedicalHistory = sequelize.define("MedicalHistory", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    patientName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    diagnosis: {
        type: DataTypes.STRING,
        allowNull: false
    },
    treatment: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    doctorName: {
        type: DataTypes.STRING,
        allowNull: true
    }
});
