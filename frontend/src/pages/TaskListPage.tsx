import TaskForm from "../components/TaskList/TaskFormComponent";
import TaskItemComponent from "../components/TaskList/TaskItemComponent";
import { useState } from "react";
import { Task } from "../types/Task";
function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  function addTask(task: Task) {
    setTasks((prev) => [...prev, task]);
  }
  function deleteTask(id: string) {
    setTasks((prev) => [...prev.filter((e) => e.id != id)]);
  }
  return (
    <>
      <div className="text-center">Task Manager</div>
      <TaskForm handleSubmit={addTask} />
      <div className="flex flex-wrap gap-2">
        {tasks.map((e) => (
          <TaskItemComponent task={e} handleDelete={deleteTask} />
        ))}
      </div>
    </>
  );
}

export default App;
