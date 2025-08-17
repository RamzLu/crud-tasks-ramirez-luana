import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const timeTask = sequelize.define("timeTask", {
  minute: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  Date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
});
