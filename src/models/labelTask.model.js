import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const labelTask = sequelize.define(
  "labelTask",
  {},
  {
    timestamps: false,
  }
);
