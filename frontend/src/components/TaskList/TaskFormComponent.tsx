import { TextField } from "@fluentui/react/lib/TextField";
import { DefaultButton } from "@fluentui/react/lib/Button";
import { Task } from "../../types";
import { useState } from "react";

interface TaskFormProps {
  handleSubmit: (task: Task) => void;
}
export default function TaskForm({ handleSubmit }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [descriptions, setDescriptions] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const newTask: Task = {
          id: crypto.randomUUID(),
          title,
          descriptions,
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
        onChange={(event, newValue) => setDescriptions(newValue || "")}
      />
      <DefaultButton text="Create Task" type="submit" />
    </form>
  );
}
