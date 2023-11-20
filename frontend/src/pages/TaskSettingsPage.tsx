import { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  OnDragEndResponder,
  DropResult,
} from "react-beautiful-dnd";

import {
  DefaultButton,
  SpinButton,
  TextField,
  DatePicker,
} from "@fluentui/react";

type FieldTypes = "DatePicker" | "SpinButton" | "TextField";

type OptionalField = {
  id: number;
  label: string;
  type: FieldTypes;
};

const initialOptionalFields: OptionalField[] = [
  {
    id: 1,
    label: "Text Field",
    type: "TextField",
  },
  {
    id: 2,
    label: "Spin Button",
    type: "SpinButton",
  },
  {
    id: 3,
    label: "Date Picker",
    type: "DatePicker",
  },
];

const initialFormFields: OptionalField[] = [];

function App() {
  const [optionalFields, setOptionalFields] = useState(initialOptionalFields);
  const [formFields, setFormFields] = useState(initialFormFields);

  const onDragEnd: OnDragEndResponder = (result: DropResult) => {
    if (
      !result.destination ||
      result.destination.droppableId === "optionalFields"
    ) {
      return;
    }

    if (result.destination.droppableId === "formFields") {
      if (result.source.droppableId === "optionalFields") {
        const optionalFieldsCopy = [...optionalFields];
        const [reorderedItem] = optionalFieldsCopy.splice(
          result.source.index,
          1
        );
        optionalFieldsCopy.splice(result.source.index, 0, {
          ...reorderedItem,
          id: 3 + formFields.length + 1,
        });
        setOptionalFields(optionalFieldsCopy);

        const formFieldsCopy = [...formFields];
        formFieldsCopy.splice(result.destination.index, 0, reorderedItem);
        setFormFields(formFieldsCopy);
      } else {
        const formFieldsCopy = [...formFields];
        const [reorderedItem] = formFieldsCopy.splice(result.source.index, 1);
        formFieldsCopy.splice(result.destination.index, 0, reorderedItem);
        setFormFields(formFieldsCopy);
      }
    }
  };

  const updateFormFieldsLabel = (fieldId: number, newLabel: string) => {
    setFormFields((prevFormFields) =>
      prevFormFields.map((field) =>
        field.id === fieldId ? { ...field, label: newLabel } : field
      )
    );
  };

  const deleteFormField = (fieldId: number) => {
    setFormFields((prevFormFields) =>
      prevFormFields.filter((field) => field.id !== fieldId)
    );
  };

  return (
    <div className="App">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-2">
          <DroppableList fields={optionalFields} droppableId="optionalFields" />
          <DroppableList
            fields={formFields}
            droppableId="formFields"
            updateLabel={updateFormFieldsLabel}
            deleteField={deleteFormField}
          />
        </div>
      </DragDropContext>
    </div>
  );
}

function DroppableList({
  fields,
  droppableId,
  updateLabel,
  deleteField,
}: {
  fields: OptionalField[];
  droppableId: string;
  updateLabel?: (fieldId: number, newLabel: string) => void;
  deleteField?: (fieldId: number) => void;
}) {
  const bgColor =
    droppableId === "optionalFields" ? "bg-red-500" : "bg-blue-500";

  return (
    <div className={`w-64 min-h-24 border border-black`}>
      <Droppable droppableId={droppableId}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="h-full flex flex-col gap-2 p-2"
          >
            {fields.map((task: OptionalField, index: number) => (
              <DraggableItem
                key={task.id}
                field={task}
                index={index}
                updateLabel={updateLabel}
                deleteField={deleteField}
                droppableId={droppableId}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

function DraggableItem({
  field,
  index,
  updateLabel,
  deleteField,
  droppableId,
}: {
  field: OptionalField;
  index: number;
  updateLabel?: (fieldId: number, newLabel: string) => void;
  deleteField?: (fieldId: number) => void;
  droppableId: string;
}) {
  return (
    <Draggable key={field.id} draggableId={field.id.toString()} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {droppableId === "formFields" ? (
            <EditableFieldComponent
              field={field}
              updateLabel={updateLabel}
              deleteField={deleteField}
            />
          ) : (
            <div>{field.label}</div>
          )}
        </div>
      )}
    </Draggable>
  );
}

function EditableFieldComponent({
  field,
  updateLabel,
  deleteField,
}: {
  field: OptionalField;
  updateLabel?: (fieldId: number, newLabel: string) => void;
  deleteField?: (fieldId: number) => void;
}) {
  const [editableLabel, setEditableLabel] = useState(field.label);
  const [isEditing, setIsEditing] = useState(false);

  const handleLabelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditableLabel(event.target.value);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);

    // Call the callback function to update the label in the parent component
    if (updateLabel) {
      updateLabel(field.id, editableLabel);
    }
  };

  const handleDeleteClick = () => {
    if (deleteField) {
      deleteField(field.id);
    }
  };

  switch (field.type) {
    case "DatePicker":
      return (
        <div>
          {isEditing ? (
            <div className="flex">
              <TextField
                className="flex-1"
                value={editableLabel}
                onChange={(event, newValue) => {
                  setEditableLabel(newValue || "");
                }}
              />
              <DefaultButton onClick={() => handleSaveClick()}>
                Save
              </DefaultButton>
              <DefaultButton onClick={() => handleDeleteClick()}>
                Delete
              </DefaultButton>
            </div>
          ) : (
            <div onClick={handleEditClick}>
              <DatePicker label={editableLabel} />
              <DefaultButton onClick={() => handleDeleteClick()}>
                Delete
              </DefaultButton>
            </div>
          )}
        </div>
      );
    case "SpinButton":
      return (
        <div>
          {isEditing ? (
            <div className="flex">
              <TextField
                className="flex-1"
                value={editableLabel}
                onChange={(event, newValue) => {
                  setEditableLabel(newValue || "");
                }}
              />
              <DefaultButton onClick={() => handleSaveClick()}>
                Save
              </DefaultButton>
              <DefaultButton onClick={() => handleDeleteClick()}>
                Delete
              </DefaultButton>
            </div>
          ) : (
            <div onClick={handleEditClick}>
              <SpinButton label={editableLabel} labelPosition={0} />
              <DefaultButton onClick={() => handleDeleteClick()}>
                Delete
              </DefaultButton>
            </div>
          )}
        </div>
      );
    default:
      return (
        <div>
          {isEditing ? (
            <div className="flex">
              <TextField
                className="flex-1"
                value={editableLabel}
                onChange={(event, newValue) => {
                  setEditableLabel(newValue || "");
                }}
              />
              <DefaultButton onClick={() => handleSaveClick()}>
                Save
              </DefaultButton>
              <DefaultButton onClick={() => handleDeleteClick()}>
                Delete
              </DefaultButton>
            </div>
          ) : (
            <div onClick={handleEditClick}>
              <TextField label={editableLabel} />
              <DefaultButton onClick={() => handleDeleteClick()}>
                Delete
              </DefaultButton>
            </div>
          )}
        </div>
      );
  }
}

export default App;
