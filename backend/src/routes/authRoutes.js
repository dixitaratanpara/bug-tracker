import express from "express";
import { registerUser , loginUser , getCurrentUser} from "../controllers/authController.js";
import authMiddleware from "../middleware/authMIddleware.js";
import { forgotPassword } from "../controllers/authController.js";
import { resetPassword } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/me",authMiddleware,getCurrentUser);

router.post("/forgot-password", forgotPassword);

router.post("/reset-password/:token", resetPassword);

export default router;