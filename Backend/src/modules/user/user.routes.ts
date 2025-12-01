import { Router } from "express";
import { getUsers, getUser, blockUser, heartbeat } from "./user.controller";
import { authenticateAdmin } from "../../middleware/adminAuth";
import { authenticate } from "../../middleware/auth";

const router = Router();

router.post("/heartbeat", authenticate, heartbeat);
router.get("/", authenticateAdmin, getUsers);
router.get("/:id", authenticateAdmin, getUser);
router.put("/:id/block", authenticateAdmin, blockUser);

export { router as userRouter };