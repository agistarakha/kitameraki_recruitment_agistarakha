import express from "express";
export const router = express.Router();
import {
  getAllTasks,
  addTask,
  deleteTask,
} from "../controllers/taskController";

router.get("/", getAllTasks);

router.post("/", addTask);
router.delete("/:id", deleteTask);
