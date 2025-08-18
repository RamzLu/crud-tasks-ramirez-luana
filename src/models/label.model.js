import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { Task } from "./task.model.js";
import { labelTask } from "./labelTask.model.js";

export const Labels = sequelize.define(
  "Labels",
  {
    name_Label: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
  },
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
