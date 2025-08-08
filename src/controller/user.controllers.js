import { User } from "../models/user.model.js";

export const getAllUsers = async (req, res) => {
  try {
    const user = await User.findAll(req.body);
    return res.json(user);
  } catch (error) {
    res.status(501).json({
      error: error.mesagge,
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({
        msg: "Personaje no encontrado",
      });
    }
  } catch (error) {
    res.status(501).json({
      error: error.mesagge,
    });
  }
};

export const createUser = async (req, res) => {
  console.log(req.body);
  try {
    const { name, email, password } = req.body;

    console.log(name, email, password);
    const user = await User.create(req.body);
    console.log(user);
    return res.json(user);
  } catch (error) {
    res.status(501).json({
      error: error.mesagge,
    });
    console.log(error);
  }
};

export const upDateUser = async (req, res) => {
  try {
    console.log(
      "---------------------------------------------------------------------"
    );
    console.log("ID recibido:", req.params.id);
    console.log("Datos a actualizar:", req.body);
    console.log(
      "---------------------------------------------------------------------"
    );
    const [update] = await User.update(req.body, {
      where: { id: req.params.id },
    });

    if (update) {
      const user = await User.findByPk(req.params.id);
      console.log(user);
      return res.status(201).json({
        msg: "The user has been updated successfully.",
        user: user,
      });
    } else {
      console.log("The user to update has not been found.");
      return res.status(404).json({
        msg: "The user to update has not been found.",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(501).json({
      error: error.message,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({
        error: "User not found.",
      });
    }
    console.log(user);
    await User.destroy({ where: { id: req.params.id } });
    return res.status(200).json({
      mesagge: "User deleted successfully.",
      user: user,
    });
  } catch (error) {
    return res.status(501).json({
      error: error.mesagge,
    });
  }
};
