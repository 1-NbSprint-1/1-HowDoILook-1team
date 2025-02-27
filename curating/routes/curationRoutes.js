import express from "express";
import {
  createCuration,
  getCurations,
} from "../controllers/curationController.js";

const router = express.Router();

// 큐레이션 조회 라우트
router.get("/curations", getCurations);
// 큐레이션 등록 라우트
router.post("/curations", createCuration);

export default router;
