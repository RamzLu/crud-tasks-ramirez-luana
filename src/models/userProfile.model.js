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
      allowNull: false,
    },
    birthdate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);
