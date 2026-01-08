import express from "express";
import { adminAuth } from "../middlewares/authMiddlewares.js";
import { adminLogout, loginAdmin, registerAdmin } from "../controllers/adminControllers.js";


const router = express.Router();

//Admin Registration
router.post('/admin/register', registerAdmin); 
router.post('/admin/login', loginAdmin); 
router.post('/admin/logout',adminAuth, adminLogout);



export default router;