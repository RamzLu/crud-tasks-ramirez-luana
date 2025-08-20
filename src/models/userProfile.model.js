import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const UserProfile = sequelize.define(
  "UserProfile",
  {
    real_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bio: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    birthdate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);
