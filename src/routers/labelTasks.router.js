import { Router } from "express";
import { validator } from "../middleware/validator.js";
import {
  createLabelTasks,
  deleteLabelTask,
  getAllLabelsTasks,
  upDateLabelTask,
  getlabelTaskById,
} from "../controller/labelTask.controller.js";
import {
  createLabelTaskValidations,
  deleteLabeltaskValidations,
  getLabelTaskByIDValidation,
  updateLabelTaskValidations,
} from "../middleware/validations/labelTaskValidations.js";

export const routerLabeltask = Router();

routerLabeltask.get("/labelsTasks", getAllLabelsTasks);
routerLabeltask.post(
  "/labelTasks",
  createLabelTaskValidations,
  validator,
  createLabelTasks
);
routerLabeltask.put(
  "/labelTasks/:id",
  updateLabelTaskValidations,
  validator,
  upDateLabelTask
);
routerLabeltask.get(
  "/labelTasks/:id",
  getLabelTaskByIDValidation,
  validator,
  getlabelTaskById
);
routerLabeltask.delete(
  "/labelTasks/:id",
  deleteLabeltaskValidations,
  validator,
  deleteLabelTask
);
