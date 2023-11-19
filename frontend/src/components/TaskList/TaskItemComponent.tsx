import { useRef, useState } from "react";
import { Task } from "../../types/Task";
import { TextField } from "@fluentui/react/lib/TextField";
import { DefaultButton } from "@fluentui/react/lib/Button";

type TaskItemComponentProps = {
  task: Task;
  handleDelete: (id: number) => void;
  handleUpdate: (updatedTask: Task) => void;
};

export default function TaskItemComponent({
  task,
  handleDelete,
  handleUpdate,
}: TaskItemComponentProps) {
  const [title, setTitle] = useState(task.title);
  const [descriptions, setDescriptions] = useState(task.descriptions);
  const [isEdit, setIsEdit] = useState(false);
  const prevTitle = useRef("");
  const prevDescriptions = useRef<string | undefined>("");
  return (
    <form
      className="p-2 shadow-md w-32 bg-slate-200"
      onSubmit={(e) => {
        e.preventDefault();
        handleUpdate({ id: task.id, title, descriptions });
        setIsEdit(false);
      }}
    >
      {!isEdit ? (
        <div>
          <div>{title}</div>
          <div className="text-xs font-light h-12 break-words overflow-y-hidden  hover:overflow-y-auto">
            {descriptions}
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
            value={descriptions || ""}
            label="Descriptions"
            multiline
            rows={3}
            onChange={(event, newValue) => setDescriptions(newValue || "")}
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
                if (descriptions != prevDescriptions.current)
                  setDescriptions(prevDescriptions.current);
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
              prevDescriptions.current = descriptions;
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
