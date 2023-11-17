import { TextField } from "@fluentui/react/lib/TextField";
import { DefaultButton } from "@fluentui/react/lib/Button";

export default function TaskForm() {
  return (
    <form className="px-2">
      <TextField label="Title" className="w-8/12" />
      <TextField label="Description" multiline rows={3} className="w-8/12" />
      <DefaultButton text="Create Task" />
    </form>
  );
}
