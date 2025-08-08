import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { routerUser } from "./src/routers/user.router.js";
import { startDB } from "./src/config/database.js";
import { routerTask } from "./src/routers/task.router.js";

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use("/api", routerUser);
app.use("/api", routerTask);

app.listen(PORT, async () => {
  await startDB();
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
