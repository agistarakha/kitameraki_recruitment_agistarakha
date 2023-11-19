import { z } from "zod";
import { taskApiResSchema, taskSchema } from "../schemas";

export type Task = z.infer<typeof taskSchema>;

export type TaskApiRes = z.infer<typeof taskApiResSchema>;
