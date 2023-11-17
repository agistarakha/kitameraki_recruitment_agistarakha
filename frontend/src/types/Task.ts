import { z } from "zod";

export const taskSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  descriptions: z.string().nullable(),
});
export type Task = z.infer<typeof taskSchema>;
