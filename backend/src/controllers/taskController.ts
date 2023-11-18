import { Request, Response } from "express";
import { z } from "zod";
import * as fs from "fs";
import * as path from "path";

const taskSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
});
type Task = z.infer<typeof taskSchema> & {
  id: number;
};

const dataFilePath = path.join(__dirname, "../../data/tasks.json");

const readTasksFromFile = (): Task[] => {
  try {
    const data = fs.readFileSync(dataFilePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading tasks from file:", error);
    return [];
  }
};

const writeTasksToFile = (task: Task[]) => {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(task, null, 2), "utf-8");
  } catch (error) {
    console.error("Error writing tasks to file", error);
  }
};

export const getAllTasks = (req: Request, res: Response) => {
  const tasks = readTasksFromFile();
  res.json(tasks);
};

export const addTask = (req: Request, res: Response) => {
  try {
    const { title, description } = taskSchema.parse(req.body);
    const tasks = readTasksFromFile();
    const newTask: Task = {
      id: tasks.length + 1,
      title,
      description,
    };
    tasks.push(newTask);
    writeTasksToFile(tasks);
    res.status(201).json(newTask);
  } catch (error) {
    console.error("Error adding task", error);
    res.status(400).json({ error: "Invalid data provided" });
  }
};
