import { Task } from "../../types/Task";

type TaskItemComponentProps = {
  task: Task;
  handleDelete: (id: string) => void;
};

export default function TaskItemComponent({
  task,
  handleDelete,
}: TaskItemComponentProps) {
  return (
    <div key={task.id} className="p-2 shadow-md w-32 bg-slate-200">
      <div>{task.title}</div>
      <div className="text-xs font-light h-12 break-words overflow-y-hidden  hover:overflow-y-auto">
        {task.descriptions}
      </div>
      <button onClick={() => handleDelete(task.id)}>Delete</button>
    </div>
  );
}
