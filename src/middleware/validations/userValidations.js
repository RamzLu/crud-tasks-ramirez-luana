import { body, param } from "express-validator";
import { User } from "../../models/user.model.js";

export const createUserValidation = [
  body("name")
    .notEmpty()
    .withMessage("El campo nombre no puede estar vacío.")
    .isString()
    .withMessage("El nombre debe ser un campo de string.")
    .isLength({ min: 3, max: 100 })
    .withMessage("El nombre debe ser de mínimo 3 caracteres y máximo de 100."),
  body("email")
    .isEmail()
    .withMessage("El email debe ser válido.")
    .notEmpty()
    .withMessage("El email no puede estar vacío."),
  body("password")
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
    .optional()
    .isString()
    .withMessage("El nombre debe ser un campo de string.")
    .notEmpty()
    .withMessage("El campo nombre no puede estar vacio .")
    .isLength({ min: 3, max: 25 })
    .withMessage("El nombre tieneun mínimo de 3 y máximo de 25 caracteres"),
  body("email")
    .isEmail()
    .withMessage("El email debe ser válido.")
    .notEmpty()
    .withMessage("El email no puede estar vacío.")
    .optional(),
  body("password")
    .optional()
    .isEmpty()
    .withMessage("El campo password no puede estar vacío.")
    .isStrongPassword()
    .withMessage(
      "La contraseña debe tener al menos 8 caracteres, 1 mayúscula, 1 minúcula, 1 número y al menos 1 signo especial."
    ),
];
