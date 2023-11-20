import express from "express";
import { taskRoutes, formFieldRoutes } from "./routes";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use("/api/tasks", taskRoutes);
app.use("/api/form-fields", formFieldRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
