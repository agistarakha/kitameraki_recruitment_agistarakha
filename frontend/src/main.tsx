import ReactDOM from "react-dom/client";
import TaskListPage from "./pages/TaskListPage.tsx";
import TaskSettingsPage from "./pages/TaskSettingsPage.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { initializeIcons } from "@fluentui/react";

initializeIcons();
const router = createBrowserRouter([
  {
    path: "/",
    element: <TaskListPage />,
  },
  {
    path: "/settings",
    element: <TaskSettingsPage />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
