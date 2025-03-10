import * as curationService from "../services/curationService.js";

// 큐레이션 조회
const getCurations = async (req, res, next) => {
  const { styleId, page = 1, pageSize = 10, searchBy, keyword } = req.query;

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
      data: curations,
      pagination,
    });
  } catch (error) {
    next(error);
  }
};

// 큐레이션 등록
const createCuration = async (req, res, next) => {
  try {
    const curation = await curationService.createCuration(req.body);

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
  const { id } = req.params;
  const { passwd, ...updateFields } = req.body;

  try {
    const updatedCuration = await curationService.updateCuration(
      id,
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
  const { id } = req.params;

  try {
    const result = await curationService.deleteCuration(id);

    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    next(error);
  }
};

export { getCurations, createCuration, updateCuration, deleteCuration };
