import express from "express";
import {
    addMedicine,
    getAllMedicines,
    searchMedicines
} from "../controller/medicineController.js";

const router = express.Router();

router.post("/", addMedicine);
router.get("/", getAllMedicines);
router.get("/search", searchMedicines);

export { router as medicineRouter };
