import { Router } from "express";
import {
  getAllUsers,
  createUser,
  deleteUser,
  getUserById,
  upDateUser,
} from "../controller/user.controller.js";
export const routerUser = Router();

routerUser.get("/user", getAllUsers);

routerUser.post("/user", createUser);

routerUser.get("/user/:id", getUserById);

routerUser.put("/user/:id", upDateUser);

routerUser.delete("/user/:id", deleteUser);
