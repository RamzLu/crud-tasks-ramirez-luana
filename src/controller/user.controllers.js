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
    const user = User.findByPk(req.body.id);
    if (movie) {
      res.json(user);
    } else {
      return res.status(404).json({
        mesagge: "User not found.",
      });
    }
  } catch (error) {
    return res.status(501).json({
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
    const [update] = User.update(req.body, { where: { id: req.params.id } });
    if (update) {
      const user = User.findByPk(req.params.id);
      return res.status(201).json(user);
    } else {
      return res.status(404).json({
        mesagge: "User not found.",
      });
    }
  } catch (error) {
    return res.status(501).json({
      error: error.mesagge,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const deleted = User.destroy({ where: { id: req.params.id } });
    if (deleted) {
      return res.status(201).json({
        mesagge: "User deleted successfully.",
      });
    }
  } catch (error) {}
};
