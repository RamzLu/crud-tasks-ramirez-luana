import { Router } from "express";
import {
  getAllUsers,
  createUser,
  deleteUser,
  getUserById,
  upDateUser,
} from "../controller/user.controller.js";
import { validator } from "../middleware/validator.js";
import {
  createUserValidation,
  updateUserValidation,
} from "../middleware/validations/userValidations.js";
export const routerUser = Router();

routerUser.get("/user", getAllUsers);
routerUser.post("/user", createUserValidation, validator, createUser);
routerUser.get("/user/:id", getUserById);
routerUser.put("/user/:id", updateUserValidation, validator, upDateUser);
routerUser.delete("/user/:id", deleteUser);
