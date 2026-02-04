import Sequelize from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD, 
    {
    host: process.env.DB_HOST,
    dialect: "postgres",
    port: process.env.DB_PORT,
    logging: process.env.NODE_ENV === "development" ? console.log : false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    }

});

const connection = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully");
        await sequelize.sync(); // Sync models with database
        console.log("Database synced successfully");
    } catch (e) {
        console.error("Unable to connect to the database", e);
    }
};
export { sequelize, connection };