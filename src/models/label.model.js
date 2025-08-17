import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

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
