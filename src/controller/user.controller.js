import { Labels } from "../models/label.model.js";
import { Task } from "../models/task.model.js";
import { User } from "../models/user.model.js";
import { UserProfile } from "../models/userProfile.model.js";

export const getAllUsers = async (req, res) => {
  try {
    const user = await User.findAll({
      attributes: {
        exclude: ["profile_id", "password"],
      },
      include: [
        {
          model: UserProfile,
          as: "profile",
        },
        {
          model: Task,
          as: "tasks",
          attributes: {
            exclude: ["user_id"],
          },
          include: [
            {
              model: Labels,
              as: "tags",
              through: {
                attributes: [],
              },
              attributes: {
                exclude: ["id"],
              },
            },
          ],
        },
      ],
    });
    return res.json(user);
  } catch (error) {
    res.status(501).json({
      error: error.mesagge,
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: {
        exclude: ["profile_id", "password"],
      },
      include: [
        {
          model: UserProfile,
          as: "profile",
        },
        {
          model: Task,
          as: "tasks",
          attributes: {
            exclude: ["user_id"],
          },
          include: [
            {
              model: Labels,
              as: "tags",
              through: {
                attributes: [],
              },
              attributes: {
                exclude: ["id"],
              },
            },
          ],
        },
      ],
    });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({
        msg: "The user could not be found or does not exist.",
      });
    }
  } catch (error) {
    res.status(501).json({
      error: error.mesagge,
    });
  }
};

export const createUser = async (req, res) => {
  try {
    // -------------------------------------VALIDACIONES---------------------------------------------------------------
    console.log(req.body);
    const { name, email, password } = req.body;
    if (!name || name.length > 100) {
      return res.status(400).json({
        error: "The name is empty or exceeds 100 characters.",
      });
    }
    if (!password || password.length > 100) {
      return res.status(400).json({
        error: "The password is empty or exceeds 100 characters.",
      });
    }
    // pa verificar si el email existe
    const emailExist = await User.findOne({ where: { email } });
    if (emailExist) {
      return res.status(500).json({
        msg: "This email already exist.",
      });
    }

    if (!email || email.length > 100) {
      return res.status(400).json({
        error: "The email is empty or exceeds 100 characters",
      });
    }
    // ----------------------------------------------------------------------------------------------------
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
    console.log("-------------------------------");
    console.log("ID recibido:", req.params.id);
    console.log("Datos a actualizar:", req.body);
    console.log("-------------------------------");

    // -----------------------------VALIDACIONES----------------------------------------
    const { name, email, password } = req.body;
    if (!name || name.length > 100) {
      return res.status(400).json({
        error: "The name is empty or exceeds 100 characters",
      });
    }
    // pa verificar si el email existe
    const emailExist = await User.findOne({ where: { email } });
    if (emailExist) {
      return res.status(500).json({
        msg: "This email already exist.",
      });
    }

    if (!email || email.length > 100) {
      return res.status(400).json({
        error: "The email is empty or exceeds 100 characters",
      });
    }

    if (!password || password.length > 100) {
      return res.status(400).json({
        error: "The password is empty or exceeds 100 characters.",
      });
    }
    // ---------------------------------------------------------------------------------------

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
