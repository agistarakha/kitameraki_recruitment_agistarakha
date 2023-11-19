import { z } from "zod";

export const taskSchema = z.object({
  id: z.number().int().min(1),
  title: z.string().min(1),
  description: z.string().optional(),
});

export const taskApiResSchema = z.object({
  tasks: z.array(taskSchema),
  totalPages: z.number().int(),
  currentPage: z.number().int(),
});
