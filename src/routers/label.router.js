import { Router } from "express";
import { validator } from "../middleware/validator.js";
import {
  getAllLabels,
  getLabelById,
  createLabel,
  deleteLabel,
  updateLabel,
} from "../controller/label.controller.js";
import {
  createLabelValidation,
  deleteLabelValidation,
  getLabelByIdValidation,
  updateLabelValidation,
} from "../middleware/validations/labelValidations.js";

export const routerLabel = Router();

routerLabel.get("/labels", getAllLabels);
routerLabel.get("/labels/:id", getLabelByIdValidation, validator, getLabelById);
routerLabel.delete(
  "/labels/:id",
  deleteLabelValidation,
  validator,
  deleteLabel
);
routerLabel.put("/labels/:id", updateLabelValidation, validator, updateLabel);
routerLabel.post("/labels", createLabelValidation, validator, createLabel);
