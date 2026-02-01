import Sequelize from "sequelize";

const sequelize = new Sequelize("MedSathi", "postgres", "admin123", {
    host: "localhost",
    dialect: "postgres"
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