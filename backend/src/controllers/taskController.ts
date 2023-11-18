import { Request, Response } from "express";
import { z } from "zod";
import * as fs from "fs";
import * as path from "path";

const taskSchema = z.object({
  id: z.number().min(1),
  title: z.string().min(1),
  description: z.string().optional(),
});
type Task = z.infer<typeof taskSchema>;

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

export const getAllTasks = (req: Request, res: Response) => {
  const tasks = readTasksFromFile();
  res.json(tasks);
};
