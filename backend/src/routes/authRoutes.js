import express from "express";
import { registerUser, loginUser, getCurrentUser } from "../controllers/authController.js";
import authMiddleware from "../middleware/authMIddleware.js";
import { forgotPassword } from "../controllers/authController.js";
import { resetPassword } from "../controllers/authController.js";
import { updateProfile } from "../controllers/authController.js";
import { changePassword } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/me", authMiddleware, getCurrentUser);

router.put(
    "/profile",
    authMiddleware,
    updateProfile
);

router.post("/forgot-password", forgotPassword);

router.post("/reset-password/:token", resetPassword);

router.put(
    "/change-password",
    authMiddleware,
    changePassword
);

export default router;