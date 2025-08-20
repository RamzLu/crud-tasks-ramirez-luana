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
import { routerProfile } from "./src/routers/userProfile.router.js";
import { routerLabel } from "./src/routers/label.router.js";
import { routerLabeltask } from "./src/routers/labelTasks.router.js";

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use("/api", routerUser);
app.use("/api", routerProfile);
app.use("/api", routerLabel);
app.use("/api", routerTask);
app.use("/api", routerLabeltask);
app.listen(PORT, async () => {
  await startDB();
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
