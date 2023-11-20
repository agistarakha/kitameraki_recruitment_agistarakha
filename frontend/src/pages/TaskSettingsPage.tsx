import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const initialTasks = [
  {
    id: 1,
    title: "Task 1",
    draggableId: "tasks",
  },
  {
    id: 2,
    title: "Task 2",
    draggableId: "tasks",
  },
  {
    id: 3,
    title: "Task 3",
    draggableId: "tasks",
  },
];

const initialTasks2 = [];

function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [tasks2, setTasks2] = useState(initialTasks2);

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    if (result.destination.droppableId == "tasks") {
      if (result.source.droppableId == "tasks2") {
        const items = Array.from(tasks2);
        const [reorderedItem] = items.splice(result.source.index, 1);
        setTasks2(items);
        const items2 = Array.from(tasks);
        items2.splice(result.destination.index, 0, reorderedItem);
        setTasks(items2);
      } else {
        const items = Array.from(tasks);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setTasks(items);
      }
    } else {
      if (result.source.droppableId == "tasks") {
        const items = Array.from(tasks);
        const [reorderedItem] = items.splice(result.source.index, 1);
        setTasks(items);
        const items2 = Array.from(tasks2);
        items2.splice(result.destination.index, 0, reorderedItem);
        setTasks2(items2);
      } else {
        const items = Array.from(tasks2);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        setTasks2(items);
      }
    }
  };

  return (
    <div className="App">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex justify-center gap-2">
          <Droppable1 tasks={tasks} />
          <Droppable2 tasks={tasks2} />
        </div>
      </DragDropContext>
    </div>
  );
}

function Droppable1({ tasks }: any) {
  return (
    <div className="bg-red-500 h-24 w-24">
      <Droppable droppableId="tasks">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="bg-red-500 w-full h-full"
          >
            {tasks.map((task, index) => (
              <Draggable
                key={task.id}
                draggableId={task.id.toString()}
                index={index}
              >
                {(provided) => (
                  <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                  >
                    <div>{task.title}</div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

function Droppable2({ tasks }: any) {
  return (
    <div className="bg-blue-500 h-24 w-24">
      <Droppable droppableId="tasks2">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="bg-blue-500 w-full h-full"
          >
            {tasks.map((task, index) => (
              <Draggable
                key={task.id}
                draggableId={task.id.toString()}
                index={index}
              >
                {(provided) => (
                  <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                  >
                    <div>{task.title}</div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default App;
