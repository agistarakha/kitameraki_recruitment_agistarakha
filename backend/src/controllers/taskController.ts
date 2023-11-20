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

const fixedPageSize = 5;

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
  try {
    const pageQueryParam = req.query.page;
    const page = pageQueryParam ? parseInt(pageQueryParam as string, 10) : 1;

    if (isNaN(page) || page < 1) {
      throw new Error("Invalid page parameter");
    }

    const tasks = readTasksFromFile();
    const startIndex = (page - 1) * fixedPageSize;
    const endIndex = page * fixedPageSize;

    const paginatedTasks = tasks.slice(startIndex, endIndex);

    res.json({
      tasks: paginatedTasks,
      totalPages: Math.ceil(tasks.length / fixedPageSize),
      currentPage: page,
    });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(400).json({ error: "Invalid pagination parameters" });
  }
};

export const addTask = (req: Request, res: Response) => {
  try {
    const { title, description } = taskSchema.parse(req.body);
    const tasks = readTasksFromFile();
    const newTask: Task = {
      id: tasks.length > 0 ? tasks[0].id + 1 : 1,
      title,
      description,
    };
    tasks.unshift(newTask);
    writeTasksToFile(tasks);
    res.status(201).json(newTask);
  } catch (error) {
    console.error("Error adding task", error);
    res.status(400).json({ error: "Invalid data provided" });
  }
};
export const deleteTask = (req: Request, res: Response) => {
  try {
    const taskId = parseInt(req.params.id, 10);
    const tasks = readTasksFromFile();
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    writeTasksToFile(updatedTasks);
    res.status(204).end();
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateTask = (req: Request, res: Response) => {
  try {
    const taskId = parseInt(req.params.id, 10);
    const updatedTaskData = req.body;
    const tasks = readTasksFromFile();
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, ...updatedTaskData } : task
    );
    writeTasksToFile(updatedTasks);
    res.json({ success: true, updatedTask: updatedTaskData });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
