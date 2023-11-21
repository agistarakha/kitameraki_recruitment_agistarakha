import { TaskContent, TaskFunction } from "../../types";
import { useState } from "react";
import {
  DefaultButton,
  SpinButton,
  TextField,
  DatePicker,
} from "@fluentui/react";

type TaskFormProps = Pick<TaskFunction, "handleSubmit"> & {
  optionalFields: any;
  fieldType: any;
};

export default function TaskForm({
  handleSubmit,
  optionalFields,
  fieldType,
}: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [optFelds, setOptFields] = useState(optionalFields);

  console.log(optionalFields);
  console.log(fieldType);

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
        value={title}
        // onChange={onChangeTitle}
        onChange={(event, newValue) => setTitle(newValue || "")}
        required
      />
      <TextField
        label="Description"
        multiline
        rows={3}
        onChange={(event, newValue) => setDescription(newValue || "")}
      />
      {!optionalFields ||
        optionalFields.map((e) => {
          const key = Object.keys(e)[0];
          const val = e[key];
          console.log(key);
          console.log(val);
          const currentType = fieldType.current.find((type) => {
            console.log(type);
            return type[key];
          });
          console.log(currentType);
          if (currentType[key] == "TextField") {
            return <TextField label={key} key={key} value={val} />;
          }
        })}
      <DefaultButton text="Create Task" type="submit" />
    </form>
  );
}
