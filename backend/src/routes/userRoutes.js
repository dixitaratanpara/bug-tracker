import express from "express";
import { getAllUsers, getAssignableUsers ,updateUserRole} from "../controllers/userController.js";
import authMiddleware from "../middleware/authMIddleware.js";
import authorizeRole from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get(
    "/",
    authMiddleware,
    authorizeRole("Admin"),
    getAllUsers
);

router.get(
    "/assignable",
    authMiddleware,
    authorizeRole("Admin"),
    getAssignableUsers
);

router.put(
    "/:id/role",
    authMiddleware,
    authorizeRole("Admin"),
    updateUserRole
);

export default router;