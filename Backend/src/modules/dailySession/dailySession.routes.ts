import { Router } from "express";
import { createSession, getSessions, getSessionByDate } from "./dailySession.controller";
import { getDailySessionQuestions } from "./dailySessionQuestion.controller";
import { authenticate } from "../../middleware/auth";
import { authenticateAdmin } from "../../middleware/adminAuth";
import { validate } from "../../lib/validation/validateRequest";
import { createDailySessionSchema } from "./dailySession.schemas";

const router = Router();

router.get("/questions", getDailySessionQuestions);
router.post("/", authenticate, validate(createDailySessionSchema), createSession);
router.get("/", authenticateAdmin, getSessions);
router.get("/by-date", authenticateAdmin, getSessionByDate);

export { router as dailySessionRouter };