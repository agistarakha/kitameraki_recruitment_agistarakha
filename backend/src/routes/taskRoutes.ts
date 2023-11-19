import express from "express";
export const router = express.Router();
import {
  getAllTasks,
  addTask,
  deleteTask,
  updateTask,
} from "../controllers/taskController";

router.get("/", getAllTasks);
router.post("/", addTask);
router.delete("/:id", deleteTask);
router.put("/:id", updateTask);
