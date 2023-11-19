import TaskForm from "../components/TaskList/TaskFormComponent";
import TaskListComponent from "../components/TaskList/TaskListComponent";
import { useEffect, useState } from "react";
import { Task, TaskApiRes, TaskContent } from "../types";
import { taskApiResSchema } from "../schemas";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/tasks");
      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }
      const data: TaskApiRes = taskApiResSchema.parse(await response.json());
      setTasks(data.tasks);
    } catch (error) {
      console.error("Error fetching tasks", error);
    }
  };
  const addTask = async (newTask: TaskContent) => {
    try {
      const response = await fetch("http://localhost:3000/api/tasks", {
        method: "POSt",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });
      if (!response.ok) {
        throw new Error("Failed to add task");
      }

      await fetchTasks();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const deleteTask = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3000/api/tasks/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete task");
      }

      await fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };
  const updateTask = async (updatedTask: Task) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/tasks/${updatedTask.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: updatedTask.title,
            description: updatedTask.description,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update task");
      }

      await fetchTasks();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };
  return (
    <>
      <div className="text-center">Task Manager</div>
      <TaskForm handleSubmit={addTask} />
      <TaskListComponent
        handleDelete={deleteTask}
        handleUpdate={updateTask}
        tasks={tasks}
      />
    </>
  );
}

export default App;
