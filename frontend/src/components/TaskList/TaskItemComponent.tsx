import { useRef, useState } from "react";
import { Task, TaskFunction } from "../../types";
import { TextField } from "@fluentui/react/lib/TextField";
import { DefaultButton } from "@fluentui/react/lib/Button";

type TaskItemComponentProps = Pick<
  TaskFunction,
  "handleDelete" | "handleUpdate"
> & {
  task: Task;
};
export default function TaskItemComponent({
  task,
  handleDelete,
  handleUpdate,
}: TaskItemComponentProps) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [isEdit, setIsEdit] = useState(false);
  const prevTitle = useRef("");
  const prevDescription = useRef<string | undefined>("");
  return (
    <form
      className="p-2 shadow-md w-32 bg-slate-200"
      onSubmit={(e) => {
        e.preventDefault();
        handleUpdate({ id: task.id, title, description });
        setIsEdit(false);
      }}
    >
      {!isEdit ? (
        <div>
          <div>{task.id}</div>
          <div>{title}</div>
          <div className="text-xs font-light h-12 break-words overflow-y-hidden  hover:overflow-y-auto">
            {description}
          </div>
        </div>
      ) : (
        <div>
          <TextField
            value={title}
            label="Title"
            // onChange={onChangeTitle}
            onChange={(event, newValue) => setTitle(newValue || "")}
            required
          />
          <TextField
            value={description || ""}
            label="Description"
            multiline
            rows={3}
            onChange={(event, newValue) => setDescription(newValue || "")}
          />
        </div>
      )}
      <div>
        {isEdit ? (
          <div>
            <DefaultButton text="Save" type="submit" />
            <button
              type="button"
              onClick={() => {
                setIsEdit(false);
                if (title != prevTitle.current) setTitle(prevTitle.current);
                if (description != prevDescription.current)
                  setDescription(prevDescription.current);
              }}
            >
              Cancel
            </button>
          </div>
        ) : (
          //   <DefaultButton
          //     type="button"
          //     text="Edit"
          //     onClick={() => setIsEdit(true)}
          //   />
          <button
            type="button"
            onClick={() => {
              setIsEdit(true);
              prevTitle.current = title;
              prevDescription.current = description;
            }}
          >
            Edit
          </button>
        )}
      </div>
      <DefaultButton text="Delete" onClick={() => handleDelete(task.id)} />
    </form>
  );
}
