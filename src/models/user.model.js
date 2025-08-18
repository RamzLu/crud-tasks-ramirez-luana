import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { UserProfile } from "./userProfile.model.js";

export const User = sequelize.define(
  "User",
  {
    name: {
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

// Al user le pertenece UN perfil
User.belongsTo(UserProfile, { foreignKey: "profile_id", as: "profile" });
// el perfil le pertenece a UN usuario
UserProfile.hasOne(User, { foreignKey: "profile_id" });
