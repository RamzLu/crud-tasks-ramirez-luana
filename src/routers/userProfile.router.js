import { Router } from "express";
import {
  createProfile,
  getAllprofiles,
} from "../controller/userProfile.controller.js";

export const routerProfile = Router();

routerProfile.get("/profiles", getAllprofiles);
routerProfile.post("/profiles", createProfile);
