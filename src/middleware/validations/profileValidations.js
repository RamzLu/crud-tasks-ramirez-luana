import { body, param } from "express-validator";
import { UserProfile } from "../../models/userProfile.model.js";
import { Op } from "sequelize";

export const createProfileValidation = [
  body("real_name")
    .isLength({ min: 3, max: 25 })
    .withMessage("El nombre tieneun mínimo de 3 y máximo de 25 caracteres")
    .isString()
    .withMessage("real_name debe ser un string")
    .trim()
    .notEmpty()
    .withMessage("El campo nombre no puede estar vacío.")
    .custom(async (value) => {
      const existName = await UserProfile.findOne({
        where: { real_name: value },
      });
      if (existName) {
        throw new Error("Este nombre ya se está utilizando.");
      }
    }),

  body("birthdate")
    .isISO8601()
    .withMessage("La fecha debe tener el formato AAAA-MM-DD.")
    .isDate()
    .withMessage("La fecha de nacimiento debe ser una fecha válida.")
    .custom((value) => {
      const inputDate = new Date(value);
      const today = new Date();

      if (inputDate >= today) {
        throw new Error("La fecha de nacimiento debe ser anterior a hoy");
      }
      return true;
    }),
  ,
  body("bio")
    .optional()
    .isLength({ min: 3, max: 100 })
    .withMessage(
      "la biografía debe ser de mínimo 3 caracteres y máximo de 100."
    ),
];
// -------------------------------------------------------------------------------------------------------------------
export const updateProfileValidation = [
  param("id")
    .isInt()
    .withMessage("El id debe ser un entero.")
    .custom(async (value) => {
      const profile = await UserProfile.findByPk(value);
      if (!profile) {
        throw new Error("El perfil no se pudo encontrar.");
      }
    }),
  body("real_name")
    .optional()
    .isString()
    .withMessage("El nombre debe ser un campo de string.")
    .notEmpty()
    .withMessage("El campo nombre no puede estar vaciooooo .")
    .isLength({ min: 3, max: 25 })
    .withMessage("El nombre tieneun mínimo de 3 y máximo de 25 caracteres")
    .custom(async (value, { req }) => {
      const { id } = req.params;

      const existName = await UserProfile.findOne({
        where: { real_name: value, id: { [Op.ne]: id } },
      });

      if (existName) {
        throw new Error("Este nombre ya se está utilizando.");
      }
    }),
  ,
  body("bio")
    .optional()
    .isLength({ min: 3, max: 100 })
    .withMessage(
      "la biografía debe ser de mínimo 3 caracteres y máximo de 100."
    ),
  body("birthdate")
    .isISO8601()
    .withMessage("La fecha debe tener el formato AAAA-MM-DD.")
    .optional()
    .notEmpty()
    .withMessage("La fecha de nacimiento no puede estar vacia.")
    .custom((value) => {
      const inputDate = new Date(value);
      const today = new Date();

      if (inputDate >= today) {
        throw new Error("La fecha de nacimiento debe ser anterior a hoy");
      }
      return true;
    }),
  ,
];

export const getProfileByIdValidations = [
  param("id")
    .isInt()
    .withMessage("El id debe ser un entero.")
    .custom(async (value) => {
      const profile = await UserProfile.findByPk(value);
      if (!profile) {
        throw new Error("El perfil no se pudo encontrar.");
      }
    }),
];

export const deleteProfileValidations = [
  param("id")
    .isInt()
    .withMessage("El id debe ser un entero.")
    .custom(async (value) => {
      const profile = await UserProfile.findByPk(value);
      if (!profile) {
        throw new Error("El perfil no se pudo encontrar.");
      }
    }),
];
