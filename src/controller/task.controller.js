import { Labels } from "../models/label.model.js";
import { labelTask } from "../models/labelTask.model.js";
import { Task } from "../models/task.model.js";
import { User } from "../models/user.model.js";
import { UserProfile } from "../models/userProfile.model.js";

export const getAllTask = async (req, res) => {
  try {
    const task = await Task.findAll({
      attributes: {
        exclude: ["user_id"],
      },
      include: [
        {
          model: User,
          as: "author",
          attributes: {
            exclude: ["password", "profile_id"],
          },
          include: [
            {
              model: UserProfile,
              as: "profile",
            },
          ],
        },
        {
          model: Labels,
          as: "tags",
          through: {
            attributes: [],
          },
        },
      ],
    });

    return res.json(task);
  } catch (error) {
    return res.status(501).json({
      error: error.mesagge,
    });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (task) {
      return res.json(task);
    } else {
      return res.status(404).json({
        error: "Task not found",
      });
    }
  } catch (error) {
    return res.status(501).json({
      error: error.mesagge,
    });
  }
};

export const createTask = async (req, res) => {
  try {
    // -----------------------------------------VALIDACIONES-----------------------------------------------------------
    console.log(req.body);
    const { title, description, isComplete } = req.body;
    if (!title || title.length > 100) {
      return res.status(400).json({
        error: "The title is empty or exceeds 100 characters",
      });
    }
    if (!description || description.length > 100) {
      return res.status(400).json({
        error: "The description is empty or exceeds 100 characters",
      });
    }

    if (typeof isComplete !== "boolean") {
      console.log("ERROR: The value must not be empty and must be boolean.");
      return res.status(400).json({
        error: "The value must not be empty and must be boolean.",
      });
    }
    // ----------------------------------------------------------------------------------------------------------------

    const task = await Task.create(req.body);
    console.log(task);
    return res.json(task);
  } catch (error) {
    return res.status(500).json({
      error: error.mesagge,
    });
  }
};

export const upDatetask = async (req, res) => {
  try {
    // ---------------------------------------VALIDACIONES-------------------------------------------------------------
    const { title, description, isComplete } = req.body;
    if (!title || title.length > 100) {
      return res.status(400).json({
        error: "The title is empty or exceeds 100 characters",
      });
    }
    if (!description || description.length > 100) {
      return res.status(400).json({
        error: "The description is empty or exceeds 100 characters",
      });
    }

    if (typeof isComplete !== "boolean") {
      console.log("ERROR: The value must not be empty and must be boolean.");
      return res.status(400).json({
        error: "The value must not be empty and must be boolean.",
      });
    }
    // ---------------------------------------------------------------------------------------------------------------

    const [update] = await Task.update(req.body, {
      where: { id: req.params.id },
    });
    if (update) {
      const task = await Task.findByPk(req.params.id);
      return res.status(200).json({
        mesagge: "The user has been updated successfully.",
        task: task,
      });
    } else {
      return res.status(404).json({
        msg: "The task to update has no been found",
      });
    }
  } catch (error) {
    return res.status(501).json({
      error: error.mesagge,
    });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) {
      return res.status(404).json({
        error: "Task not found.",
      });
    }
    console.log(task);
    await Task.destroy({ where: { id: req.params.id } });
    return res.status(200).json({
      mesagge: "User deleted successfully.",
      task: task,
    });
  } catch (error) {
    return res.status(501).json({
      error: error.mesagge,
    });
  }
};
