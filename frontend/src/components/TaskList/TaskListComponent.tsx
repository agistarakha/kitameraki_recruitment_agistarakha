import { Task, TaskFunction } from "../../types";
import TaskItemComponent from "./TaskItemComponent";
import { useState, useEffect } from "react";

type TaskListComponentProps = Omit<TaskFunction, "handleSubmit"> & {
  tasks: Task[];
};
export default function TaskListComponent({
  tasks,
  handleDelete,
  handleUpdate,
}: TaskListComponentProps) {
  return (
    <>
      <div className="flex flex-wrap gap-2">
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
