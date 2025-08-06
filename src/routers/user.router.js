import { Router } from "express";
import { getAllUsers } from "../controller/user.controllers.js";
export const routerUser = Router();

routerUser.get("/users", getAllUsers);
