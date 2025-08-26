import { Router } from "express";
import {
  createProfile,
  getAllprofiles,
  getProfileById,
  updateProfile,
  daleteProfile,
} from "../controller/userProfile.controller.js";

import { validator } from "../middleware/validator.js";
import {
  createProfileValidation,
  updateProfileValidation,
  deleteProfileValidations,
  getProfileByIdValidations,
} from "../middleware/validations/profileValidations.js";

export const routerProfile = Router();

routerProfile.get("/profiles", getAllprofiles);
routerProfile.get(
  "/profiles/:id",
  getProfileByIdValidations,
  validator,
  getProfileById
);
routerProfile.put(
  "/profiles/:id",
  updateProfileValidation,
  validator,
  updateProfile
);
routerProfile.post(
  "/profiles",
  createProfileValidation,
  validator,
  createProfile
);
routerProfile.delete(
  "/profiles/:id",
  deleteProfileValidations,
  validator,
  daleteProfile
);
