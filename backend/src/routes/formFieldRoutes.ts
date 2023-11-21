import express from "express";
import {
  getFormFields,
  updateTasksFormat,
  writeFormFields,
} from "../controllers/formFieldController";
export const router = express.Router();
router.post("/", writeFormFields);

// Endpoint to get labels from FormFields.json
router.get("/", getFormFields);

// Endpoint to update Tasks data based on the label
router.post("/updatetasks", updateTasksFormat);
