import express from "express";
import {
    addMedicine,
    getAllMedicines,
    searchMedicines,
    updateMedicine,
    deleteMedicine,
    bulkUpdateStock
} from "../controller/medicineController.js";
import { upload } from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post("/", upload.single("medicineImage"), addMedicine);
router.patch("/bulk-update-stock", bulkUpdateStock);
router.get("/", getAllMedicines);
router.get("/search", searchMedicines);
router.put("/:id", updateMedicine);
router.delete("/:id", deleteMedicine);

export { router as medicineRouter };
