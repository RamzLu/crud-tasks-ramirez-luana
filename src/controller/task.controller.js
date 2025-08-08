import { Task } from "../models/task.model.js";

export const getAllTask = async (res, req) => {
  try {
    const task = await Task.findAll(req.body);
    return res.json(task);
  } catch (error) {
    return res.status(501).json({
      error: error.mesagge,
    });
  }
};

export const getTaskById = async (res, req) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (task) {
      return res.json(task);
    } else {
      return res.status(404).json({
        error: "User not found",
      });
    }
  } catch (error) {
    return res.status(501).json({
      error: error.mesagge,
    });
  }
};

export const createTask = async (res, req) => {
  try {
    const task = await Task.create(req.body);
    return res.status(200).json({
      msg: "The user has been created successfully.",
      task: task,
    });
  } catch (error) {
    return res.status(501).json({
      error: error.mesagge,
    });
  }
};

export const upDatetask = async (res, req) => {
  try {
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

export const deleteTask = async (res, req) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) {
      return res.status(404).json({
        error: "Task not found",
      });
    }
  } catch (error) {}
};
