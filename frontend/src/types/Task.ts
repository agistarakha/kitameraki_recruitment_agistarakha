import { z } from "zod";

export const taskSchema = z.object({
  id: z.number().int().min(1),
  title: z.string().min(1),
  descriptions: z.string().optional(),
});
export type Task = z.infer<typeof taskSchema>;
