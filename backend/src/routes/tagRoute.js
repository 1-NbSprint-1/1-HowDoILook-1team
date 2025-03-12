import express from "express";
import { getPopularTags } from "../controllers/tagController.js";

const router = express.Router();

router.get("/popular-tags", getPopularTags);

export default router;
