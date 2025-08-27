import { body, param } from "express-validator";
import { Labels } from "../../models/label.model.js";
import { Op } from "sequelize";

export const createLabelValidation = [
  body("name_Label")
    .isString()
    .withMessage("El nombre debe ser una cadena de caracteres.")
    .notEmpty()
    .withMessage("El nombre de la etiqueta no pueda estar vacio.")
    .isLength({ max: 20 })
    .withMessage("El nombre de la etiqueta sobrepasa los 20 caracteres.")
    .custom(async (value) => {
      const existName = await Labels.findOne({ where: { name_Label: value } });
      if (existName) {
        throw new Error("Este nombre ya se está utilizando.");
      }
    }),
];

export const updateLabelValidation = [
  param("id")
    .isInt()
    .withMessage("El id debe ser un entero.")
    .custom(async (value) => {
      const label = await Labels.findByPk(value);
      if (!label) {
        throw new Error("El label no se pudo encontrar.");
      }
    }),
  body("name_Label")
    .isString()
    .withMessage("El nombre debe ser una cadena de caracteres.")
    .notEmpty()
    .withMessage("El nombre de la etiqueta no puede estar vacia.")
    .isLength({ max: 20 })
    .withMessage("El nombre de la etiqueta sobrepasa los 20 caracteres.")
    .custom(async (value, { req }) => {
      const { id } = req.params;
      const existName = await Labels.findOne({
        where: { name_Label: value, id: { [Op.ne]: id } },
      });
      if (existName) {
        throw new Error("Este nombre ya se está utilizando.");
      }
    }),
];

export const getLabelByIdValidation = [
  param("id")
    .isInt()
    .withMessage("El id debe ser entero.")
    .custom(async (value) => {
      const label = await Labels.findByPk(value);
      if (!label) {
        throw new Error("El label no se pudo encontrar.");
      }
    }),
];

export const deleteLabelValidation = [
  param("id")
    .isInt()
    .withMessage("El id debe ser entero.")
    .custom(async (value) => {
      const label = await Labels.findByPk(value);
      if (!label) {
        throw new Error("El label no se pudo encontrar.");
      }
    }),
];
