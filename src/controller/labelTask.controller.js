import { Labels } from "../models/label.model.js";
import { labelTask } from "../models/labelTask.model.js";
import { Task } from "../models/task.model.js";
import { User } from "../models/user.model.js";

export const getAllLabelsTasks = async (req, res) => {
  try {
    const tl = await labelTask.findAll({
      attributes: {
        exclude: ["task_id", "label_id"],
      },
      include: [
        {
          model: Task,
          as: "tasks",
          attributes: { exclude: ["user_id"] },
          include: [
            {
              model: User,
              as: "author",
            },
          ],
        },
        { model: Labels, as: "tags" },
      ],
    });
    return res.json(tl);
  } catch (error) {
    res.status(501).json({
      error: error.mesagge,
    });
  }
};

export const getlabelTaskById = async (req, res) => {
  try {
    const lt = await labelTask.findByPk(req.params.id, {
      attributes: {
        exclude: ["task_id", "label_id"],
      },
      include: [
        {
          model: Task,
          as: "tasks",
          attributes: { exclude: ["user_id"] },
          include: [{ model: User, as: "author" }],
        },
        {
          model: Labels,
          as: "tags",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
    });
    if (lt) {
      return res.json(lt);
    } else {
      return res.status(404).json({
        error: "relation not found",
      });
    }
  } catch (error) {
    return res.status(501).json({
      error: error.mesagge,
    });
  }
};
export const createLabelTasks = async (req, res) => {
  try {
    const newRelation = await labelTask.create(req.body);
    const relationToReturn = await labelTask.findByPk(newRelation.id, {
      attributes: {
        exclude: ["task_id", "label_id"],
      },
      include: [
        {
          model: Task,
          as: "tasks",
          attributes: { exclude: ["user_id"] },
          include: [
            {
              model: User,
              as: "author",
            },
          ],
        },
        { model: Labels, as: "tags" },
      ],
    });
    return res.status(201).json({
      msg: "The new relationship has been successfully created.",
      relationToReturn: relationToReturn,
    });
  } catch (error) {
    res.status(501).json({
      error: error.message,
    });
  }
};

export const upDateLabelTask = async (req, res) => {
  try {
    const [update] = await labelTask.update(req.body, {
      where: { id: req.params.id },
    });
    if (update) {
      const relation = await labelTask.findByPk(req.params.id, {
        attributes: {
          exclude: ["task_id", "label_id"],
        },
        include: [
          {
            model: Task,
            as: "tasks",
            attributes: { exclude: ["user_id"] },
            include: [
              {
                model: User,
                as: "author",
              },
            ],
          },
          { model: Labels, as: "tags" },
        ],
      });
      return res.status(200).json({
        mesagge: "The realtion has been updated successfully.",
        relation: relation,
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
  0;
};

export const deleteLabelTask = async (req, res) => {
  try {
    const lt = await labelTask.findByPk(req.params.id, {
      attributes: {
        exclude: ["task_id", "label_id"],
      },
      include: [
        {
          model: Task,
          as: "tasks",
          attributes: { exclude: ["user_id"] },
          include: [
            {
              model: User,
              as: "author",
            },
          ],
        },
        { model: Labels, as: "tags" },
      ],
    });
    if (!lt) {
      return res.status(404).json({
        error: "Relation not found.",
      });
    }
    await labelTask.destroy({ where: { id: req.params.id } });
    return res.status(200).json({
      mesagge: "Realtion deleted successfully.",
      lt: lt,
    });
  } catch (error) {
    return res.status(501).json({
      error: error.mesagge,
    });
  }
};
