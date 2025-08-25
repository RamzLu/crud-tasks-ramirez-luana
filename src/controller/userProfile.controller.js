import { Op } from "sequelize";
import { Task } from "../models/task.model.js";
import { User } from "../models/user.model.js";
import { UserProfile } from "../models/userProfile.model.js";
import { Labels } from "../models/label.model.js";

export const getAllprofiles = async (req, res) => {
  try {
    const profile = await UserProfile.findAll({
      include: [
        {
          model: User,
          as: "user_associated",
          attributes: {
            exclude: ["password", "profile_id"],
          },
          include: [
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
                },
              ],
            },
          ],
        },
      ],
    });
    return res.json(profile);
  } catch (error) {
    console.error(error);
    return res.status(501).json({
      error: error.message,
    });
  }
};

export const createProfile = async (req, res) => {
  try {
    // //-------------------------------------VALIDACIONES---------------------------------------------------------------
    // const { real_name, bio, birthdate } = req.body;
    // // si el nombre está vacio o excede los 100 caracteres
    // if (!real_name || real_name.length > 100) {
    //   return res.status(400).json({
    //     error: "The name is empty or exceeds 100 characters.",
    //   });
    // }
    // // para que el nombre real sea único
    // const existName = await UserProfile.findOne({ where: { real_name } });
    // if (existName) {
    //   return res.status(500).json({
    //     msg: "This name already exist.",
    //   });
    // }
    // if (bio.length > 1000) {
    //   return res.status(400).json({
    //     error: "The biography exceeds 100 characters.",
    //   });
    // }
    // if (!birthdate) {
    //   return res.status(400).json({
    //     msg: "The birthdate is required.",
    //   });
    // }
    // // para verificar que lo ingresado sea válido
    // const date = new Date(birthdate);
    // if (isNaN(date.getTime())) {
    //   return res
    //     .status(400)
    //     .json({ error: "The birthdate is not a valid date." });
    // }
    // // para verificar que la fecha ingresada no sea mayor a la actual
    // const today = new Date();
    // if (date > today) {
    //   return res
    //     .status(400)
    //     .json({ msg: "The birthdate cannot be in the future." });
    // }
    //------------------------------------------------------------------------------------------------------------------
    const profile = await UserProfile.create(req.body);
    return res.status(201).json({
      msg: "The profile has been created successfully.",
      profile: profile,
    });
  } catch (error) {
    console.error(error);
    return res.status(501).json({
      error: error.message,
    });
  }
};

export const getProfileById = async (req, res) => {
  try {
    const profile = await UserProfile.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: "user_associated",
          attributes: {
            exclude: ["password", "profile_id"],
          },
        },
      ],
    });
    if (profile) {
      return res.json(profile);
    } else {
      return res.status(404).json({
        msg: "The profile could not be found or doesn't exist.",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(501).json({
      error: error.message,
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    // // ----------------------------------VALIDACIÓN------------------------------------------------------------------------------------------------------------
    // const { real_name, bio, birthdate } = req.body;
    // const { id } = req.params;
    // // si el nombre está vacio o excede los 100 carácteres
    // if (!real_name || real_name.length > 100) {
    //   return res.status(400).json({
    //     error: "The name is empty or exceeds 100 characters.",
    //   });
    // }
    // // para que el nombre real sea único, excluyendo el mismo id
    // const existName = await UserProfile.findOne({
    //   where: {
    //     real_name,
    //     id: { [Op.ne]: id }, // excluye este id actual
    //   },
    // });
    // if (existName) {
    //   return res.status(500).json({
    //     msg: "This name already exists.",
    //   });
    // }

    // if (bio && bio.length > 1000) {
    //   return res.status(400).json({
    //     error: "The biography exceeds 1000 characters.",
    //   });
    // }
    // if (!birthdate) {
    //   return res.status(400).json({
    //     msg: "The birthdate is required.",
    //   });
    // }
    // // para verificar que lo ingresado sea válido
    // const date = new Date(birthdate);
    // if (isNaN(date.getTime())) {
    //   return res
    //     .status(400)
    //     .json({ error: "The birthdate is not a valid date." });
    // }
    // // para verificar que la fecha ingresada no sea mayor a la actual
    // const today = new Date();
    // if (date > today) {
    //   return res
    //     .status(400)
    //     .json({ msg: "The birthdate cannot be in the future." });
    // }
    // ----------------------------------------------------------------------------------------------------------------------------------------------
    const [update] = await UserProfile.update(req.body, {
      where: { id: req.params.id },
    });
    if (update) {
      const profile = await UserProfile.findByPk(req.params.id);
      return res.status(201).json({
        msg: "The profile has been updated successfully.",
        profile: profile,
      });
    } else {
      return res.status(404).json({
        msg: "The profile to update has not been found or has already been updated",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(501).json({
      error: error.message,
    });
  }
};

export const daleteProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const profile = await UserProfile.findByPk(id);
    if (!profile) {
      return res.status(404).json({
        error: "Profile not found.",
      });
    }
    console.log(profile);
    await UserProfile.destroy({ where: { id: req.params.id } });
    return res.status(200).json({
      message: "Profile deleted successfully",
      profile: profile,
    });
  } catch (error) {
    return res.status(501).json({
      error: error.message,
    });
  }
};
