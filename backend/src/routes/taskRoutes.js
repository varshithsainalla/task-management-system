import { Router } from "express";

import {
  createTask,
  getTasks,
  getTask,
  updateTask,
  completeTask,
  deleteTask
} from "../controllers/taskController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "Task routes are working"
  });
});

router.post("/", protect, createTask);

router.get("/", protect, getTasks);

router.get("/:id", protect, getTask);

router.put("/:id", protect, updateTask);

router.patch("/:id/complete", protect, completeTask);

router.delete("/:id", protect, deleteTask);

export default router;