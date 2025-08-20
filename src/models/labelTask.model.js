import { sequelize } from "../config/database.js";
import { Labels } from "./label.model.js";
import { Task } from "./task.model.js";

export const labelTask = sequelize.define(
  "labelTask",
  {},
  {
    timestamps: false,
  }
);
// las tareas pueden tener muchas etiquetas
Task.belongsToMany(Labels, {
  through: labelTask,
  foreignKey: "task_id",
  as: "tags",
});
// y las etiquetas pueden pertenecer a muchas tareas
Labels.belongsToMany(Task, {
  through: labelTask,
  foreignKey: "label_id",
  as: "tasks",
});
