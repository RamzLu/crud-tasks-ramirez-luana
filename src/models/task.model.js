import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { User } from "./user.model.js";

export const Task = sequelize.define(
  "Task",
  {
    title: {
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    isComplete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: false,
  }
);

// las tareas le pueden pertenecer a un único usuario
Task.belongsTo(User, {
  foreignKey: "user_id",
  as: "author",
  onDelete: "CASCADE",
});
// un usuario puede tener muchas tareas
User.hasMany(Task, { foreignKey: "user_id", as: "tasks" });
