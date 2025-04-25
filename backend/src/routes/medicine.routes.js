import express from "express";
import { Medicine } from "../model/medicine.model.js";
import { addmedicine, getAllMedicines } from "../controller/medicine.controller.js";
import { upload } from "../middleware/multer.middleware.js";
const router = express.Router();

router.post("/add",upload.single('image'), addmedicine);
router.get("/",getAllMedicines );


export default router;


    