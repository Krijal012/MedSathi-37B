import express from "express";
import {
    addMedicine,
    getAllMedicines,
    searchMedicines,
    updateMedicine,
    deleteMedicine
} from "../controller/medicineController.js";

const router = express.Router();

router.post("/", addMedicine);
router.get("/", getAllMedicines);
router.get("/search", searchMedicines);
router.put("/:id", updateMedicine);
router.delete("/:id", deleteMedicine);

export { router as medicineRouter };
