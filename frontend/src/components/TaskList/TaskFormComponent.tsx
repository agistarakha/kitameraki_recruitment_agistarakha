import { TextField } from "@fluentui/react/lib/TextField";
import { DefaultButton } from "@fluentui/react/lib/Button";
import { TaskContent, TaskFunction } from "../../types";
import { useState } from "react";

type TaskFormProps = Pick<TaskFunction, "handleSubmit">;

export default function TaskForm({ handleSubmit }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const newTask: TaskContent = {
          title,
          description,
        };
        handleSubmit(newTask);
      }}
    >
      <TextField
        label="Title"
        className="w-8/12"
        value={title}
        // onChange={onChangeTitle}
        onChange={(event, newValue) => setTitle(newValue || "")}
        required
      />
      <TextField
        label="Description"
        multiline
        rows={3}
        className="w-8/12"
        onChange={(event, newValue) => setDescription(newValue || "")}
      />
      <DefaultButton text="Create Task" type="submit" />
    </form>
  );
}
