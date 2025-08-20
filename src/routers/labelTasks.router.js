import { Router } from "express";
import {
  createLabelTasks,
  getAllLabelsTasks,
} from "../controller/labelTask.controller.js";

export const routerLabeltask = Router();

routerLabeltask.get("/labelsTasks", getAllLabelsTasks);
routerLabeltask.post("/labelTasks", createLabelTasks);
