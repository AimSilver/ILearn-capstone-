console.log("Node.js version:", process.version);

import dotenv from "dotenv";
dotenv.config();
import path from "path";
import express from "express";
import cors from "cors";

import authRouter from "./routes/auth.routes";
import courseRouter from "./routes/course.routes";
import adminRouter from "./routes/admin.routes";
import facultyRouter from "./routes/faculty.routes";
import learnersRouter from "./routes/learners.routes";
import { dbConnect } from "./configs/database.config";

// import cookieSession from "cookie-session";
dbConnect();
const app = express();
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:4200"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRouter);
app.use("/api", courseRouter);
app.use("/api/admin", adminRouter);
app.use("/api/faculty", facultyRouter);
app.use("/api/learners", learnersRouter);

// Error handling middleware
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error("Error:", err); // Log the error
    res.status(500).json({ error: "Internal server error" }); // Respond with an error message
  }
);

console.log(process.env.MONGODB_URL);
console.log(process.env.JWT_SECRET);
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started at http://localhost:` + port);
});
