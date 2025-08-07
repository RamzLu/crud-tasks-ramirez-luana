import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { routerUser } from "./src/routers/user.router.js";
import { startDB } from "./src/config/database.js";
const PORT = process.env.PORT;
const app = express();

app.use("/api", routerUser);

app.listen(PORT, async () => {
  await startDB();
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
