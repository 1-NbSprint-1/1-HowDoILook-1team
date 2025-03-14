import * as curationService from "../services/curationService.js";

// 큐레이션 조회
const getCurations = async (req, res, next) => {
  const { styleId, page = 1, pageSize = 10, searchBy, keyword } = req.query; // 요청된 쿼리 파라미터 받기

  try {
    const { curations, pagination } = await curationService.getCurations({
      styleId,
      page,
      pageSize,
      searchBy,
      keyword,
    });

    res.status(200).json({
      success: true,
      data: curations, // 큐레이션 리스트
      pagination, // 페이지네이션 정보
    });
  } catch (error) {
    next(error); // 에러가 발생하면 다음 미들웨어로 전달
  }
};

// 큐레이션 등록
const createCuration = async (req, res, next) => {
  try {
    const curation = await curationService.createCuration(req.body); // 요청 바디에 있는 큐레이션 데이터를 서비스로 전달하여 생성

    res.status(201).json({
      success: true,
      data: curation,
    });
  } catch (error) {
    next(error);
  }
};

// 큐레이션 수정
const updateCuration = async (req, res, next) => {
  const { curationId } = req.params; // URL 파라미터에서 id 가져오기
  const { passwd, ...updateFields } = req.body; // 비밀번호와 수정할 필드를 구분하여 받기

  try {
    const updatedCuration = await curationService.updateCuration(
      curationId,
      updateFields,
      passwd
    );

    res.status(200).json({
      success: true,
      data: updatedCuration,
    });
  } catch (error) {
    next(error);
  }
};

// 큐레이션 삭제
const deleteCuration = async (req, res, next) => {
  const { curationId } = req.params;

  try {
    const result = await curationService.deleteCuration(curationId); // 큐레이션 삭제 처리

    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    next(error);
  }
};

export { getCurations, createCuration, updateCuration, deleteCuration };
