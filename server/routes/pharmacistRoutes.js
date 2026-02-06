import express from "express";
import {
    createPharmacist,
    getAllPharmacists,
    getPharmacistById,
    getPharmacistByEmail,
    deletePharmacist,
    getMePharmacist,
    updateMePharmacist,
    updatePharmacist
} from "../controller/pharmacistController.js";
import { authenticate } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.get("/me", authenticate, getMePharmacist);
router.put("/me", authenticate, upload.single("profileImage"), updateMePharmacist);

router.post("/", createPharmacist);
router.get("/", getAllPharmacists);
router.get("/:id", getPharmacistById);
router.get("/email/:email", getPharmacistByEmail);
router.put("/:id", updatePharmacist);
router.delete("/:id", deletePharmacist);

export { router as pharmacistRouter };
