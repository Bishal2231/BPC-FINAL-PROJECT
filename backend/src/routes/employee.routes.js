import express from "express"
import { handleEmployeeRegister } from "../controller/employee.controller.js";
import { getAllEmployees } from "../controller/employee.controller.js";
import User from "../model/user.model.js";
import { getEmployInfo } from "../controller/employee.controller.js";
import { removeEmployee } from "../controller/employee.controller.js";
import { upload } from "../middleware/multer.middleware.js";
const router = express.Router()


const authMiddleware = async (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "");
        if (!token) {
            return res.status(401).json({ message: "No token provided, authorization denied" });
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }
        
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};

router.post('/register', upload.single('image'),handleEmployeeRegister)
router.get('/getallemployee', getAllEmployees)
router.get('/detail/:id', getEmployInfo)
router.delete('/remove',removeEmployee );
export default router