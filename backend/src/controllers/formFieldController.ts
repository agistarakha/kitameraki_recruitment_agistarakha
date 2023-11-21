import * as fs from "fs";
import { Request, Response } from "express";
import * as path from "path";

const tasksFilePath = path.join(__dirname, "../../data/tasks.json");
const formFieldsFilePath = path.join(__dirname, "../../data/formFields.json");

export const writeFormFields = (req: Request, res: Response) => {
  try {
    const formFields = req.body.filter(
      (obj, index, self) =>
        index === self.findIndex((o) => o["label"] === obj["label"])
    );
    fs.writeFileSync(
      formFieldsFilePath,
      JSON.stringify(formFields, null, 2),
      "utf-8"
    );
    let labels = formFields.map((e) => e.label);
    let tasks = JSON.parse(fs.readFileSync(tasksFilePath, "utf-8"));
    if (tasks.length > 0) {
      tasks = tasks.map((obj) => {
        // Remove properties that are not in the label array (excluding 'id', 'title', and 'description')
        Object.keys(obj.optionalFields).forEach((prop) => {
          if (!labels.includes(prop)) {
            delete obj.optionalFields[prop];
          }
        });

        // Add missing properties with empty values
        labels.forEach((prop) => {
          if (!obj.optionalFields.hasOwnProperty(prop)) {
            obj.optionalFields[prop] = "";
          }
        });

        return obj;
      });

      fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2), "utf-8");
    }

    res
      .status(201)
      .json({ success: true, message: "Successfully added formFields" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getFormFields = (req: Request, res: Response) => {
  try {
    // Read data from FormFields.json
    const data = fs.readFileSync(formFieldsFilePath, "utf-8");
    res.json({ success: true, data: JSON.parse(data) });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const updateTasksFormat = (req: Request, res: Response) => {
  try {
    const { label } = req.body;

    // Read existing data from Tasks.json
    const data = fs.readFileSync(tasksFilePath, "utf-8");
    const tasks = JSON.parse(data);

    // Check if the label exists in tasks
    const existingTask = tasks.find((task) => task[label] !== undefined);

    if (!existingTask) {
      // Add the new property to tasks with an empty string value
      tasks.forEach((task) => {
        task[label] = "";
      });

      // Write the updated data back to Tasks.json
      fs.writeFileSync(tasksFilePath, JSON.stringify(tasks), "utf-8");
      res.json({ success: true, message: "Tasks updated successfully." });
    } else {
      res.json({ success: false, message: "Label already exists in Tasks." });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
