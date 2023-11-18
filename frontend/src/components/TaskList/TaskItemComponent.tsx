import { Task } from "../../types/Task";

export default function TaskItemComponent({ id, title, descriptions }: Task) {
  return (
    <div key={id} className="p-2 shadow-md w-32 bg-slate-200">
      <div>{title}</div>
      <div className="text-xs font-light h-12 break-words overflow-y-hidden  hover:overflow-y-auto">
        {descriptions}
      </div>
    </div>
  );
}
