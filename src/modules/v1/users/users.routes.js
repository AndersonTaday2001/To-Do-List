import { Router } from "express";
import userController from "./users.controller.js";

const router = Router();

router.post("/registerUser", userController.registerUser);
router.post("/loginUser", userController.loginUser);
router.post("/logoutUser", userController.logoutUser);
router.delete("/deleteUser", userController.deleteUser);

export default router;
