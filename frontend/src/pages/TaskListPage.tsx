import TaskForm from "../components/TaskList/TaskFormComponent";
import TaskListComponent from "../components/TaskList/TaskListComponent";
import { useState, useEffect } from "react";
import { Task, TaskApiRes, TaskContent } from "../types";
import { taskApiResSchema } from "../schemas";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);

  useEffect(() => {
    if (!isLastPage) {
      setIsLoading(true);
      fetchTasks(page);
      setIsLoading(false);
      window.addEventListener("scroll", handleScroll);
    }
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [page]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop <
        document.documentElement.offsetHeight - 2 ||
      isLoading
    ) {
      return;
    }
    setPage((prev) => prev + 1);
  };
  const fetchTasks = async (currentPage?: number) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/tasks?page=${currentPage || ""}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }
      const data: TaskApiRes = taskApiResSchema.parse(await response.json());
      if (currentPage) {
        if (currentPage >= data.totalPages) {
          setIsLastPage(true);
        }
        setTasks((prev) => [...prev, ...data.tasks]);
      } else {
        setTasks(data.tasks);
        setIsLastPage(false);
        if (data.totalPages > 1) {
          setPage(2);
        }
      }
    } catch (error) {
      console.error("Error fetching tasks", error);
    }
  };
  const addTask = async (newTask: TaskContent) => {
    try {
      const response = await fetch("http://localhost:3000/api/tasks", {
        method: "POST",
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
    } finally {
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
    } catch (error) {
      console.error("Error updating task:", error);
    } finally {
      setTasks((prev) =>
        prev.map((e) =>
          e.id === updatedTask.id ? { ...e, ...updatedTask } : e
        )
      );
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
