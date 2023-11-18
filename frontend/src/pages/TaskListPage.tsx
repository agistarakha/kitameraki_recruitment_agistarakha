import TaskForm from "../components/TaskList/TaskFormComponent";
import TaskItemComponent from "../components/TaskList/TaskItemComponent";
import { useState } from "react";
import { Task } from "../types/Task";
function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  function addTask(task: Task) {
    setTasks((prev) => [...prev, task]);
  }
  return (
    <>
      <div className="text-center">Task Manager</div>
      <TaskForm handleSubmit={addTask} />
      <div className="flex flex-wrap gap-2">
        {tasks.map((e) => (
          <TaskItemComponent {...e} />
        ))}
      </div>
    </>
  );
}

export default App;
