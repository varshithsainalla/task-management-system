import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import mongoose from "mongoose";

import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";

import {
  notFound,
  errorHandler
} from "./middleware/errorMiddleware.js";

dotenv.config();

const app = express();

app.use(helmet());

app.use(
  cors({
    origin:
      process.env.CLIENT_URL ||
      "http://localhost:5173",

    credentials: true
  })
);

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true
  })
);

app.use(morgan("dev"));

app.get(
  "/api/health",
  (req, res) => {

    res.json({
      success: true,
      message:
        "Task Management API is running"
    });

  }
);

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/tasks",
  taskRoutes
);

app.use(
  "/api/analytics",
  analyticsRoutes
);

app.use(notFound);

app.use(errorHandler);

const PORT =
  process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)

  .then(() => {

    console.log(
      "MongoDB connected successfully"
    );

    app.listen(
      PORT,
      () => {

        console.log(
          `Server running on http://localhost:${PORT}`
        );

      }
    );

  })

  .catch((error) => {

    console.error(
      "MongoDB connection failed:",
      error.message
    );

    process.exit(1);

  });