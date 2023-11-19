import { z } from "zod";
import { taskApiResSchema, taskSchema } from "../schemas";

export type Task = z.infer<typeof taskSchema>;

export type TaskApiRes = z.infer<typeof taskApiResSchema>;
export type TaskContent = Omit<Task, "id">;
export type TaskFunction = {
  handleRead: (page?: number) => void;
  handleSubmit: (newTask: TaskContent) => void;
  handleDelete: (id: number) => void;
  handleUpdate: (updatedTask: Task) => void;
};
