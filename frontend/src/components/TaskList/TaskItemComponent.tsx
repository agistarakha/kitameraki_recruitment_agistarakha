import { useRef, useState } from "react";
import { Task, TaskFunction } from "../../types";
import { TextField } from "@fluentui/react/lib/TextField";
import { DefaultButton } from "@fluentui/react/lib/Button";
import { Text } from "@fluentui/react/lib/Text";

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
      className="p-2 border border-black shadow shadow-black"
      onSubmit={(e) => {
        e.preventDefault();
        handleUpdate({ id: task.id, title, description });
        setIsEdit(false);
      }}
    >
      {!isEdit ? (
        <div>
          <div>{task.id}</div>
          <Text className="block font-semibold text-lg">{title}</Text>
          <Text className="block  h-12 break-words overflow-y-hidden  hover:overflow-y-auto">
            {description}
          </Text>
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
            <DefaultButton
              text="Cancel"
              type="button"
              onClick={() => {
                setIsEdit(false);
                if (title != prevTitle.current) setTitle(prevTitle.current);
                if (description != prevDescription.current)
                  setDescription(prevDescription.current);
              }}
            />
          </div>
        ) : (
          <DefaultButton
            type="button"
            text="Edit"
            onClick={() => {
              setIsEdit(true);
              prevTitle.current = title;
              prevDescription.current = description;
            }}
          />
        )}
        {isEdit || (
          <DefaultButton text="Delete" onClick={() => handleDelete(task.id)} />
        )}
      </div>
    </form>
  );
}
