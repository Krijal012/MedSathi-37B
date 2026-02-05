import { DataTypes } from "sequelize";
import { sequelize } from "../database/db.js";

export const Medicine = sequelize.define("Medicine", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    manufacturer: {
        type: DataTypes.STRING,
        allowNull: false
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0.0
    },
    expiryDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    }
});
