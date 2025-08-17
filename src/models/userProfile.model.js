import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { User } from "./user.model.js";

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
// el usuario solo tiene UN perfil
User.hasOne(UserProfile, { foreignKey: "user_id" });
// y un perfil se relaciona a UN usuario
UserProfile.belongsTo(User, { foreignKey: "user_id" });
