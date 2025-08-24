import { Router } from "express";
import {
  createLabel,
  getAllLabels,
  getLabelById,
  deleteLabel,
} from "../controller/label.controller.js";

export const routerLabel = Router();

routerLabel.get("/labels", getAllLabels);
routerLabel.get("/labels/:id", getLabelById);
routerLabel.post("/labels", createLabel);
routerLabel.delete("/labels/:id", deleteLabel);
