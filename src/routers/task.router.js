import { Router } from "express";
import { validator } from "../middleware/validator.js";
import {
  createTask,
  deleteTask,
  getAllTask,
  getTaskById,
  upDatetask,
} from "../controller/task.controller.js";
import {
  createTaskValidator,
  updateTaskValidator,
} from "../middleware/validations/taskValidations.js";
export const routerTask = Router();

routerTask.get("/task", getAllTask);
routerTask.post("/task", createTaskValidator, validator, createTask);
routerTask.get("/task/:id", getTaskById);
routerTask.put("/task/:id", updateTaskValidator, validator, upDatetask);
routerTask.delete("/task/:id", deleteTask);
