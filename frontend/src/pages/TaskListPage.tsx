import TaskForm from "../components/TaskList/TaskFormComponent";
import TaskItemComponent from "../components/TaskList/TaskItemComponent";
import { useEffect, useState } from "react";
import { Task, TaskApiRes } from "../types";
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
      console.error("Error fetching tasks");
    }
  };
  function addTask(task: Task) {
    setTasks((prev) => [...prev, task]);
  }
  function deleteTask(id: number) {
    setTasks((prev) => prev.filter((e) => e.id != id));
  }
  function updateTask(updatedTask: Task) {
    setTasks((prev) =>
      prev.map((e) => {
        if (e.id == updatedTask.id) {
          return updatedTask;
        }
        return e;
      })
    );
  }
  return (
    <>
      <div className="text-center">Task Manager</div>
      <TaskForm handleSubmit={addTask} />
      <div className="flex flex-wrap gap-2">
        {tasks.map((e) => (
          <TaskItemComponent
            key={e.id}
            task={e}
            handleDelete={deleteTask}
            handleUpdate={updateTask}
          />
        ))}
      </div>
    </>
  );
}

export default App;
