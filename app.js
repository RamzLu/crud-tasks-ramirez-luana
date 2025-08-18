import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { routerUser } from "./src/routers/user.router.js";
import { startDB } from "./src/config/database.js";
import { routerTask } from "./src/routers/task.router.js";
import { labelTask } from "./src/models/labelTask.model.js";
import { Labels } from "./src/models/label.model.js";
import { UserProfile } from "./src/models/userProfile.model.js";
import { Task } from "./src/models/task.model.js";
import { User } from "./src/models/user.model.js";

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use("/api", routerUser);
app.use("/api", routerTask);

app.listen(PORT, async () => {
  await startDB();
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
