import cors from "cors";
import express from "express";
import { authRouter } from "./routes/auth";
import { subscriptionRouter } from "./routes/subscription";
import { adminAuthRouter } from "./routes/adminAuth";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/auth", authRouter);
app.use("/subscription", subscriptionRouter);
app.use("/admin/auth", adminAuthRouter);

app.use((_req, res) => {
  res.status(404).json({ error: "Not found" });
});

export { app };

