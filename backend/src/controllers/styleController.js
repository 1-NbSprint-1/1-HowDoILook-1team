import styleService from "../services/styleService.js";

export const createStyle = async (req, res) => {
  try {
    const { styleData, tagNames } = req.body;
    const newStyle = await styleService.createStyle(styleData, tagNames);
    res.status(201).json(newStyle);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateStyle = async (req, res) => {
  try {
    const styleId = parseInt(req.params.id, 10);
    const { styleData, tagNames } = req.body;

    const updatedStyle = await styleService.updateStyle(
      styleId,
      styleData,
      tagNames
    );
    res.status(200).json(updatedStyle);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
