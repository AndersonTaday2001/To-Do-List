import { Router } from "express";
import taskController from "./tasks.controller.js";
import verifyToken from "../../../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyToken);
router.get("/allTasks",taskController.getAllTasks);
router.post("/createTask", taskController.createTasks);
router.patch("/updateTask/:taskId", taskController.updateTasks);
router.delete("/deleteTask/:taskId", taskController.deleteTasks);

export default router;
