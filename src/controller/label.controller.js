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
    const newLabel = await Labels.create(req.body);
    const labelToReturn = await Labels.findByPk(newLabel.id, {
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    return res.status(200).json({
      msg: "Label creado correctamente.",
      labelToReturn: labelToReturn,
    });
  } catch (error) {
    res.status(501).json({
      error: error.message,
    });
  }
};

export const updateLabel = async (req, res) => {
  try {
    const [update] = await Labels.update(req.body, {
      where: { id: req.params.id },
    });
    if (update) {
      const label = await Labels.findByPk(req.params.id, {
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });
      return res.status(200).json({
        mesagge: "The label has been updated successfully.",
        label: label,
      });
    } else {
      return res.status(404).json({
        msg: "The Label to update has no been found",
      });
    }
  } catch (error) {
    res.status(501).json({
      error: error.message,
    });
  }
};

export const getLabelById = async (req, res) => {
  try {
    const label = await Labels.findByPk(req.params.id, {
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
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
    const label = await Labels.findByPk(req.params.id, {
      attributes: {
        exclude: ["updatedAt", "createdAt"],
      },
    });
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
