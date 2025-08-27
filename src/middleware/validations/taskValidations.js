import { body, param } from "express-validator";
import { Task } from "../../models/task.model.js";
import { Op } from "sequelize";

export const createTaskValidator = [
  body("title")
    .notEmpty()
    .withMessage("El título no puede ser vacío.")
    .isString()
    .withMessage("El título debe ser una cadena de caracteres.")
    .isLength({ max: 100 })
    .withMessage("El título no puede superar los 100 caracteres.")
    .custom(async (value) => {
      const existTitle = await Task.findOne({
        where: { title: value },
      });
      if (existTitle) {
        throw new Error("Este titulo ya se está utilizando.");
      }
    }),
  ,
  body("description")
    .notEmpty()
    .withMessage("La descripcion no puede estar vacía")
    .isString()
    .withMessage("La descripcion debe ser una cadena de caracteres.")
    .isLength({ min: 4, max: 100 })
    .withMessage(
      "La descripcion debe tener una longitud de mínimo 4 y máximo 100 caracteres"
    ),
  body("isComplete")
    .optional()
    .isBoolean()
    .withMessage("El valor del complete debe ser boolean true/false o 1/0.")
    .toBoolean(),
];

export const updateTaskValidator = [
  param("id")
    .isInt()
    .withMessage("El id debe ser un entero.")
    .custom(async (value) => {
      const task = await Task.findByPk(value);
      if (!task) {
        throw new Error("La task no se pudo encontrar.");
      }
    }),
  body("title")
    .optional()
    .notEmpty()
    .withMessage("El título no puede ser vacío.")
    .isString()
    .withMessage("El título debe ser una cadena de caracteres.")
    .custom(async (value, { req }) => {
      const { id } = req.params;
      const existTitle = await Task.findOne({
        where: { title: value, id: { [Op.ne]: id } },
      });
      if (existTitle) {
        throw new Error("Este título ya se está utilizando.");
      }
    }),
  body("description")
    .optional()
    .notEmpty()
    .withMessage("La descripcion no puede estar vacía")
    .isLength({ min: 4, max: 70 })
    .withMessage(
      "La descripcion debe tener una longitud de mínimo 4 y máximo 70 caracteres"
    )
    .isString()
    .withMessage("La descripcion debe ser una cadena de caracteres."),
  body("isComplete")
    .optional()
    .isBoolean()
    .withMessage("El valor del complete debe ser boolean true/false o 1/0."),
];

export const getTaskByIdValidations = [
  param("id")
    .isInt()
    .withMessage("El id debe ser un entero.")
    .custom(async (value) => {
      const task = await Task.findByPk(value);
      if (!task) {
        throw new Error("La task no se pudo encontrar.");
      }
    }),
];

export const deleteTaskValidations = [
  param("id")
    .isInt()
    .withMessage("El id debe ser un entero.")
    .custom(async (value) => {
      const task = await Task.findByPk(value);
      if (!task) {
        throw new Error("La task no se pudo encontrar.");
      }
    }),
];
