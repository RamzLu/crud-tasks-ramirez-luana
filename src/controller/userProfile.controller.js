import { Task } from "../models/task.model.js";
import { User } from "../models/user.model.js";
import { UserProfile } from "../models/userProfile.model.js";

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
    //-------------------------------------VALIDACIONES---------------------------------------------------------------
    const { real_name, bio, birttdate } = req.body;
    if (!real_name || real_name.length > 100) {
      return res.status(400).json({
        error: "The name is empty or exceeds 100 characters.",
      });
    }
    //------------------------------------------------------------------------------------------------------------------
    const profile = await UserProfile.create(req.body);
    console.log(profile);
    return res.status(201).json({
      msg: "The profile has been created successfully.",
      profile: profile,
    });
  } catch (error) {}
};
