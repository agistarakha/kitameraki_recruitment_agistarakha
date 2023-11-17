import React from "react";
import ReactDOM from "react-dom/client";
import TaskListPage from "./pages/TaskListPage.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <TaskListPage />
  </React.StrictMode>
);
