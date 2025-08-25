import { body, param } from "express-validator";
import { Task } from "../../models/task.model.js";

export const createTaskValidator = [
  body("title")
    .notEmpty()
    .withMessage("El título no puede ser vacío.")
    .isString()
    .withMessage("El título debe ser una cadena de caracteres."),
  body("description")
    .notEmpty()
    .withMessage("La descripcion no puede estar vacía")
    .isLength({ min: 4, max: 70 })
    .withMessage(
      "La descripcion debe tener una longitud de mínimo 4 y máximo 70 caracteres"
    )
    .isString()
    .withMessage("La descripcion debe ser una cadena de caracteres."),
  body("isComplete")
    .isBoolean()
    .withMessage("El valor del complete debe ser boolean true/false o 1/0."),
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
    .withMessage("El título debe ser una cadena de caracteres."),
  body("description")
    .optional()
    .notEmpty()
    .withMessage("La descripcion no puede estar vacía")
    .isLength({ min: 4, max: 70 })
    .withMessage(
      "La descripcion debe tener una longityd de mínimo 4 y máximo 70 caracteres"
    )
    .isString()
    .withMessage("La descripcion debe ser una cadena de caracteres."),
  body("isComplete")
    .optional()
    .isBoolean()
    .withMessage("El valor del complete debe ser boolean true/false o 1/0."),
];
