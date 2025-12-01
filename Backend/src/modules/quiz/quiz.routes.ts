import { Router } from "express";
import { 
  submitAnswer, 
  updateAnswer,
  getQuestionsWithAnswers
} from "./quiz.controller";
import { authenticate } from "../../middleware/auth";

const router = Router();

router.get("/questions-answers", authenticate, getQuestionsWithAnswers);
router.post("/answer", authenticate, submitAnswer);
router.put("/answer", authenticate, updateAnswer);

export { router as quizRouter };