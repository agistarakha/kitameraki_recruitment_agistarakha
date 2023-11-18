import express from "express";
export const router = express.Router();
import { getAllTasks, addTask } from "../controllers/taskController";

router.get("/", getAllTasks);

router.post("/", addTask);
