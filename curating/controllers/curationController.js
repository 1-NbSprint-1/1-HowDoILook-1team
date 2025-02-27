import Curation from "../models/curation.js";

// 큐레이션 조회
export const getCurations = async (req, res) => {
  try {
    const curations = await Curation.find(); // 모든 데이터 조회

    res.status(200).json({
      success: true,
      data: curations,
    });
  } catch (error) {
    console.error("큐레이션 조회 에러:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
// 큐레이션 등록
export const createCuration = async (req, res) => {
  try {
    const {
      content,
      nickname,
      passwd,
      trendy,
      personality,
      practicality,
      costEffectiveness,
    } = req.body;

    const curation = await Curation.create({
      content,
      nickname,
      passwd,
      trendy,
      personality,
      practicality,
      costEffectiveness,
    });

    res.status(201).json({
      success: true,
      data: {
        id: curation._id,
        content: curation.content,
        nickname: curation.nickname,
        trendy: curation.trendy,
        personality: curation.personality,
        practicality: curation.practicality,
        costEffectiveness: curation.costEffectiveness,
        createdAt: curation.createdAt,
      },
    });
  } catch (error) {
    console.error("큐레이션 생성 에러:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
