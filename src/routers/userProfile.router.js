import { Router } from "express";
import {
  createProfile,
  getAllprofiles,
  getProfileById,
  updateProfile,
} from "../controller/userProfile.controller.js";

export const routerProfile = Router();

routerProfile.get("/profiles", getAllprofiles);
routerProfile.get("/profiles/:id", getProfileById);
routerProfile.put("/profiles/:id", updateProfile);
routerProfile.post("/profiles", createProfile);
