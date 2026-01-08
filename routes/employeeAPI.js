import express from "express";
import { archiveEmployee, createEmployee, getEmployees, getPerformanceStats, getRecentEmployees, updateEmployee } from "../controllers/employeeControllers.js";
import upload from "../middlewares/uploadMiddlewares.js";
import { adminAuth } from "../middlewares/authMiddlewares.js";

const employeeRouter = express.Router();

employeeRouter.post("/employees/create",upload.single("image"),adminAuth, createEmployee);
employeeRouter.get("/employees",adminAuth, getEmployees);
employeeRouter.put("/employees/update/:id",adminAuth, updateEmployee);
employeeRouter.patch("/employees/:id/archive",adminAuth, archiveEmployee);

employeeRouter.get("/employees/recent/list",adminAuth, getRecentEmployees);
employeeRouter.get("/employees/performance/stats",adminAuth, getPerformanceStats);

export default employeeRouter;
