import express from "express";
export const router = express.Router();
import { getAllTasks } from "../controllers/taskController";

router.get("/", getAllTasks);

router.post("/", (req, res) => {
  const data = req.body;
  console.log(data);
  res.status(201).json({ message: "Success adding task" });
});
