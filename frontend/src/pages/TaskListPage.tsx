import TaskForm from "../components/TaskList/TaskForm";
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
      {tasks.map((e) => (
        <div key={e.id}>
          <div>{e.title}</div>
          <div>{e.descriptions}</div>
        </div>
      ))}
    </>
  );
}

export default App;
