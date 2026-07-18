import express from "express";
import { createBug, getAllBugs, getSingleBug, updateBug ,deleteBug } from "../controllers/bugController.js";
import authMiddleware from "../middleware/authMIddleware.js";
import authorizeRole from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post(
    "/",
    authMiddleware,
    authorizeRole("Admin", "Developer"),
    createBug
);

router.get("/",authMiddleware,getAllBugs);

router.get("/:id", authMiddleware, getSingleBug);

router.put("/:id", authMiddleware,authorizeRole("Admin", "Developer"), updateBug);

router.delete("/:id",authMiddleware, authorizeRole("Admin"),deleteBug);

export default router;
