import { body, param } from "express-validator";
import { Task } from "../../models/task.model.js";
import { Labels } from "../../models/label.model.js";
import { labelTask } from "../../models/labelTask.model.js";

export const createLabelTaskValidations = [
  body("task_id")
    .notEmpty()
    .withMessage("El id de la tarea es obligatorio.")
    .isInt()
    .withMessage("El id debe ser un numero entero positivo.")
    .custom(async (value) => {
      const task = await Task.findByPk(value);
      if (!task) {
        throw new Error("La tarea no existe.");
      }
      return true;
    }),
  body().custom(async (value) => {
    const { task_id, label_id } = value;
    const exist = await labelTask.findOne({
      where: { task_id, label_id },
    });
    if (exist) {
      throw new Error("La relación entre esta tarea y etiqueta ya existe");
    }

    return true;
  }),
  body("label_id")
    .notEmpty()
    .withMessage("El id no puede estar vacio")
    .isInt({ gt: 0 }) //gt es "mayor que"
    .withMessage("El id debe ser un numero entero positivo.")
    .custom(async (value) => {
      const label = await Labels.findByPk(value);
      if (!label) {
        throw new Error("La etiqueta no existe.");
      }
      return true;
    }),
];

export const updateLabelTaskValidations = [
  param("id")
    .isInt()
    .withMessage("El id debe ser entero")
    .custom(async (value) => {
      const taskLabel = await labelTask.findByPk(value);
      if (!taskLabel) {
        throw new Error("Esta relacion no existe o no ha sido encontrada");
      }
      return true;
    }),
  body("task_id")
    .optional()
    .notEmpty()
    .withMessage("El id de la tarea es obligatorio.")
    .isInt({ gt: 0 })
    .withMessage("El id debe ser un numero entero positivo.")
    .custom(async (value) => {
      const task = await Task.findByPk(value);
      if (!task) {
        throw new Error("La tarea no existe.");
      }
      return true;
    }),
  body("label_id")
    .optional()
    .notEmpty()
    .withMessage("El id no puede estar vacio")
    .isInt({ gt: 0 }) //gt es "mayor que"
    .withMessage("El id debe ser un numero entero positivo.")
    .custom(async (value) => {
      const label = await Labels.findByPk(value);
      if (!label) {
        throw new Error("La etiqueta no existe.");
      }
      return true;
    }),
];

export const getLabelTaskByIDValidation = [
  param("id")
    .isInt()
    .withMessage("El id debe ser entero")
    .custom(async (value) => {
      const taskLabel = await labelTask.findByPk(value);
      if (!taskLabel) {
        throw new Error("Esta relacion no existe.");
      }
      return true;
    }),
];

export const deleteLabeltaskValidations = [
  param("id")
    .isInt()
    .withMessage("El id debe ser entero")
    .custom(async (value) => {
      const taskLabel = await labelTask.findByPk(value);
      if (!taskLabel) {
        throw new Error("Esta relacion no existe.");
      }
      return true;
    }),
];
