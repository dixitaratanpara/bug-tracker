import express from "express";
import { createBug, getAllBugs, getSingleBug, updateBug ,deleteBug } from "../controllers/bugController.js";
import authMiddleware from "../middleware/authMIddleware.js"

const router = express.Router();

router.post("/", authMiddleware, createBug);

router.get("/",authMiddleware,getAllBugs);

router.get("/:id", authMiddleware, getSingleBug);

router.put("/:id", authMiddleware,updateBug);

router.delete("/:id",authMiddleware,deleteBug);

export default router;
