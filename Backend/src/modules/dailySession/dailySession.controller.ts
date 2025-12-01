import { Request, Response } from "express";
import { createDailySession, getDailySessions, getDailySessionByDate } from "./dailySession.service";
import { AuthRequest } from "../../middleware/auth";
import { AdminAuthRequest } from "../../middleware/adminAuth";

export const createSession = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User ID not found in token",
      });
    }

    const { date, answers, feedback } = req.body;

    if (!date) {
      return res.status(400).json({
        success: false,
        message: "Date is required",
      });
    }

    const dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Date must be a valid date string in format YYYY-MM-DD",
      });
    }

    if (!answers || !Array.isArray(answers)) {
      return res.status(400).json({
        success: false,
        message: "Answers must be an array",
      });
    }

    if (answers.length !== 6) {
      return res.status(400).json({
        success: false,
        message: "All 6 questions (question_1 to question_6) are required",
      });
    }

    const providedQuestionIds = answers.map(a => a.questionId);
    const requiredQuestions = ["question_1", "question_2", "question_3", "question_4", "question_5", "question_6"];
    const missingQuestions = requiredQuestions.filter(q => !providedQuestionIds.includes(q));
    
    if (missingQuestions.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required questions: ${missingQuestions.join(", ")}`,
      });
    }

    for (const answer of answers) {
      if (!answer.questionId) {
        return res.status(400).json({
          success: false,
          message: "Each answer must have a questionId",
        });
      }

      if (answer.answer === undefined || answer.answer === null) {
        return res.status(400).json({
          success: false,
          message: `Answer for ${answer.questionId} is required`,
        });
      }

      const ratingQuestions = ["question_2", "question_3", "question_4"];
      if (ratingQuestions.includes(answer.questionId)) {
        if (typeof answer.answer !== "number") {
          return res.status(400).json({
            success: false,
            message: `${answer.questionId} must be a number (rating type)`,
          });
        }
      }
    }

    const result = await createDailySession({
      userId,
      date: dateObj,
      answers,
      feedback,
    });

    res.status(201).json(result);
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to create daily session",
    });
  }
};

export const getSessions = async (req: AdminAuthRequest, res: Response) => {
  try {
    const { userId, startDate, endDate } = req.query;

    const params: any = {};
    if (userId) {
      params.userId = userId as string;
    }
    if (startDate) {
      params.startDate = new Date(startDate as string);
    }
    if (endDate) {
      params.endDate = new Date(endDate as string);
    }

    const result = await getDailySessions(params);

    res.status(200).json(result);
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to fetch daily sessions",
    });
  }
};

export const getSessionByDate = async (req: AdminAuthRequest, res: Response) => {
  try {
    const { userId, date } = req.query;

    if (!userId || !date) {
      return res.status(400).json({
        success: false,
        message: "User ID and date are required",
      });
    }

    const session = await getDailySessionByDate(userId as string, new Date(date as string));

    if (!session) {
      return res.status(404).json({
        success: false,
        message: "Session not found for this date",
      });
    }

    res.status(200).json({
      success: true,
      data: session,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to fetch daily session",
    });
  }
};

