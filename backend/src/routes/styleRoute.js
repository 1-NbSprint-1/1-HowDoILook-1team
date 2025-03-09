import express from "express";
import { createStyle, updateStyle } from "../controllers/styleController.js";

const router = express.Router();

router.post("/styles", createStyle);
router.put("/styles/:id", updateStyle);

export default router;
