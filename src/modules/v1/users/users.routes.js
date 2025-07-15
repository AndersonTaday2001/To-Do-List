import { Router } from "express";
import userController from "./users.controller.js";
import verifyToken from "../../../middlewares/auth.middleware.js";
const router = Router();

router.post("/registerUser", userController.registerUser);
router.post("/loginUser", userController.loginUser);
router.post("/logoutUser", verifyToken, userController.logoutUser);

export default router;
