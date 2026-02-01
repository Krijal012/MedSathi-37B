import express from "express";
import cors from "cors";
import { connection } from "./Database/db.js";
import { router } from "./routes/userRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", router);

connection();
const port = 5000;

app.listen(port, () => {
    console.log("Server is running");
})
