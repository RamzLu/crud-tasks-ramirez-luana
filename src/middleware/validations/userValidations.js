import { body, param } from "express-validator";
import { User } from "../../models/user.model.js";
import { Op, where } from "sequelize";

export const createUserValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("El campo nombre no puede estar vacío.")
    .isString()
    .withMessage("El nombre debe ser un campo de string.")
    .isLength({ min: 3, max: 100 })
    .withMessage("El nombre debe ser de mínimo 3 caracteres y máximo de 100.")
    .custom(async (value) => {
      const existName = await User.findOne({ where: { name: value } });
      if (existName) {
        throw new Error("Este nombre ya se está utilizando.");
      }
    }),
  body("email")
    .trim()
    .isEmail()
    .withMessage("El email debe ser válido.")
    .notEmpty()
    .withMessage("El email no puede estar vacío.")
    .custom(async (value) => {
      const emailExist = await User.findOne({ where: { email: value } });
      if (emailExist) {
        throw new Error("Este email ya se está utilizando.");
      }
    }),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("El campo password no puede estar vacío.")
    .isStrongPassword()
    .withMessage(
      "La contraseña debe tener al menos 8 caracteres, 1 mayúscula, 1 minúcula, 1 número y al menos 1 signo especial."
    ),
  ,
];

export const updateUserValidation = [
  param("id")
    .isInt()
    .withMessage("El id debe ser un entero.")
    .custom(async (value) => {
      const user = await User.findByPk(value);
      if (!user) {
        throw new Error("El user no se pudo encontrar.");
      }
    }),
  body("name")
    .trim()
    .optional()
    .isString()
    .withMessage("El nombre debe ser un campo de string.")
    .notEmpty()
    .withMessage("El campo nombre no puede estar vacio .")
    .isLength({ min: 3, max: 25 })
    .withMessage("El nombre tiene un mínimo de 3 y máximo de 25 caracteres")
    .custom(async (value, { req }) => {
      const { id } = req.params;
      const existName = await User.findOne({
        where: { name: value, id: { [Op.ne]: id } },
      });
      if (existName) {
        throw new Error("Este nombre ya esta siendo utilizado.");
      }
    }),
  body("email")
    .isEmail()
    .withMessage("El email debe ser válido.")
    .notEmpty()
    .withMessage("El email no puede estar vacío.")
    .optional()
    .isLength({ min: 3, max: 30 })
    .withMessage("El nombre tieneun mínimo de 3 y máximo de 25 caracteres"),
  body("password")
    .optional()
    .isEmpty()
    .withMessage("El campo password no puede estar vacío.")
    .isStrongPassword()
    .withMessage(
      "La contraseña debe tener al menos 8 caracteres, 1 mayúscula, 1 minúcula, 1 número y al menos 1 signo especial."
    ),
];

export const getUserByValidator = [
  param("id")
    .isInt()
    .withMessage("El id debe ser un entero.")
    .custom(async (value) => {
      const user = await User.findByPk(value);
      if (!user) {
        throw new Error("El user no se pudo encontrar.");
      }
    }),
];

export const daleteuserValidation = [
  param("id")
    .isInt()
    .withMessage("El id debe ser un entero.")
    .custom(async (value) => {
      const user = await User.findByPk(value);
      if (!user) {
        throw new Error("El user no se pudo encontrar.");
      }
    }),
];
