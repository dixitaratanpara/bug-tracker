import express from "express";
import { registerUser , loginUser , getCurrentUser} from "../controllers/authController.js";
import authMiddleware from "../middleware/authMIddleware.js";

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/me",authMiddleware,getCurrentUser);

export default router;