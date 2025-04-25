import express from "express"
import { registerUser } from "../controller/user.controller.js"
import { upload } from "../middleware/multer.middleware.js"
import { loginUser } from "../controller/user.controller.js"
const router = express.Router()

router.post('/register',upload.single('avatar'),registerUser)

router.post('/login',loginUser)

export default router;
