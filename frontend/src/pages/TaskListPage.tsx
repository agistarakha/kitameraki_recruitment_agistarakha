import { TextField } from "@fluentui/react/lib/TextField";
import { DefaultButton } from "@fluentui/react/lib/Button";

function App() {
  return (
    <>
      <div className="text-center">Task Manager</div>
      <form className="px-2">
        <TextField label="Title" className="w-8/12" />
        <TextField label="Description" multiline rows={3} className="w-8/12" />
        <DefaultButton text="Create Task" />
      </form>
    </>
  );
}

export default App;
