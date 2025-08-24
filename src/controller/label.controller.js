import { Labels } from "../models/label.model.js";

export const getAllLabels = async (req, res) => {
  try {
    const label = await Labels.findAll(req.body);
    return res.json(label);
  } catch (error) {
    res.status(501).json({
      error: error.mesagge,
    });
  }
};

export const createLabel = async (req, res) => {
  try {
    const { name_Label } = req.body;
    const existLabel = await Labels.findOne({ where: { name_Label } });
    if (existLabel) {
      return res.status(400).json({
        msg: "This label already exists.",
      });
    }
    if (!name_Label || name_Label.length > 20) {
      return res.status(400).json({
        error: "The label name is empty or exceeds 20 characters",
      });
    }

    const label = await Labels.create(req.body);
    return res.status(201).json({
      msg: "The label has been created successfully.",
      label: label,
    });
  } catch (error) {
    res.status(501).json({
      error: error.mesagge,
    });
  }
};

export const getLabelById = async (req, res) => {
  try {
    const label = await Labels.findByPk(req.params.id);
    if (label) {
      res.json(label);
    } else {
      res.status(404).json({
        msg: "The label could not be found or does not exist.",
      });
    }
  } catch (error) {
    res.status(501).json({
      error: error.mesagge,
    });
  }
};

export const deleteLabel = async (req, res) => {
  try {
    const label = await Labels.findByPk(req.params.id);
    if (!label) {
      return res.status(404).json({
        error: "Label not found.",
      });
    }
    await label.destroy();
    return res.status(200).json({
      mesagge: "Label deleted successfully.",
      label: label,
    });
  } catch (error) {
    return res.status(501).json({
      error: error.mesagge,
    });
  }
};
