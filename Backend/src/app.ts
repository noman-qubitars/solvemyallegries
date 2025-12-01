import cors from "cors";
import express from "express";
import { authRouter } from "./modules/auth/auth.routes";
import { subscriptionRouter } from "./modules/subscription/subscription.routes";
import { adminAuthRouter } from "./modules/adminAuth/adminAuth.routes";
import { quizRouter } from "./modules/quiz/quiz.routes";
import { userRouter } from "./modules/user/user.routes";
import { dailySessionRouter } from "./modules/dailySession/dailySession.routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/auth", authRouter);
app.use("/subscription", subscriptionRouter);
app.use("/admin/auth", adminAuthRouter);
app.use("/api/quiz", quizRouter);
app.use("/api/users", userRouter);
app.use("/api/daily-session", dailySessionRouter);

app.use((_req, res) => {
  res.status(404).json({ error: "Not found" });
});

export { app };