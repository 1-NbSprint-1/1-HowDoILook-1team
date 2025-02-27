import Curation from "../models/curation.js";

// 큐레이션 조회
const getCurations = async (req, res) => {
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
const createCuration = async (req, res) => {
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

// 큐레이션 수정 (PUT)
const updateCuration = async (req, res) => {
  const { id } = req.params; // URL로 받은 id를 사용
  const {
    content,
    nickname,
    passwd,
    trendy,
    personality,
    practicality,
    costEffectiveness,
  } = req.body;

  try {
    const curation = await Curation.findById(id);

    if (!curation) {
      return res.status(404).json({
        success: false,
        message: "큐레이션을 찾을 수 없습니다.",
      });
    }

    // 큐레이션 정보 수정
    curation.content = content || curation.content;
    curation.nickname = nickname || curation.nickname;
    curation.passwd = passwd || curation.passwd;
    curation.trendy = trendy || curation.trendy;
    curation.personality = personality || curation.personality;
    curation.practicality = practicality || curation.practicality;
    curation.costEffectiveness =
      costEffectiveness || curation.costEffectiveness;

    await curation.save(); // 변경사항 저장

    res.status(200).json({
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
    console.error("큐레이션 수정 에러:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// 큐레이션 삭제 (DELETE)
const deleteCuration = async (req, res) => {
  const { id } = req.params; // URL로 받은 id를 사용

  try {
    const curation = await Curation.findById(id);

    if (!curation) {
      return res.status(404).json({
        success: false,
        message: "큐레이션을 찾을 수 없습니다.",
      });
    }

    await curation.deleteOne(); // 큐레이션 삭제

    res.status(200).json({
      success: true,
      message: "큐레이션이 성공적으로 삭제되었습니다.",
    });
  } catch (error) {
    console.error("큐레이션 삭제 에러:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export { getCurations, createCuration, updateCuration, deleteCuration };
