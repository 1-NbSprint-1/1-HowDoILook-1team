import tagService from "../services/tagService.js";

export const getPopularTags = async (req, res) => {
  try {
    const popularTags = await tagService.getPopularTags();
    res.json(popularTags);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
