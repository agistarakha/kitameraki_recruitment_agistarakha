import { Task, TaskFunction } from "../../types";
import TaskItemComponent from "./TaskItemComponent";

type TaskListComponentProps = Pick<
  TaskFunction,
  "handleDelete" | "handleUpdate"
> & {
  tasks: Task[];
};
export default function TaskListComponent({
  tasks,
  handleDelete,
  handleUpdate,
}: TaskListComponentProps) {
  return (
    <>
      <div className="flex flex-col gap-2">
        {tasks.map((e) => (
          <TaskItemComponent
            key={e.id}
            task={e}
            handleDelete={handleDelete}
            handleUpdate={handleUpdate}
          />
        ))}
      </div>
    </>
  );
}
