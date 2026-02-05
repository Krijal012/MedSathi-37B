import express from "express";
import {
    createPharmacist,
    getAllPharmacists,
    getPharmacistById,
    getPharmacistByEmail,
    updatePharmacist,
    deletePharmacist
} from "../controller/pharmacistController.js";

const router = express.Router();

router.post("/", createPharmacist);
router.get("/", getAllPharmacists);
router.get("/:id", getPharmacistById);
router.get("/email/:email", getPharmacistByEmail);
router.put("/:id", updatePharmacist);
router.delete("/:id", deletePharmacist);

export { router as pharmacistRouter };
