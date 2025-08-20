import { Labels } from "../models/label.model.js";
import { labelTask } from "../models/labelTask.model.js";
import { Task } from "../models/task.model.js";

export const getAllLabelsTasks = async (req, res) => {
  try {
    const tl = await labelTask.findAll(req.body);
    return res.json(tl);
  } catch (error) {
    res.status(501).json({
      error: error.mesagge,
    });
  }
};

export const createLabelTasks = async (req, res) => {
  try {
    const { task_id, label_id } = req.body;

    if (!task_id || !label_id) {
      return res.status(400).json({
        error: "task_id and label_id are required",
      });
    }

    const newRelation = await labelTask.create(req.body);
    return res.status(201).json({
      msg: "The new relationship has been successfully created.",
      newRelation: newRelation,
    });
  } catch (error) {
    res.status(501).json({
      error: error.mesagge,
    });
  }
};
