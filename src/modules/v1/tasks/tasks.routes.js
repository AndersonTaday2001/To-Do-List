import { Router } from "express";
import taskController from "./tasks.controller.js";

const router = Router();

router.get("/allTasks", taskController.getAllTasks);
router.post("/createTask", taskController.createTasks);
router.patch("/updateTask", taskController.updateTasks);
router.delete("/deleteTask", taskController.deleteTasks);

export default router;
