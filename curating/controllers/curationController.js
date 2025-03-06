import Curation from "../models/curation.js";

// 큐레이션 조회
const getCurations = async (req, res, next) => {
  const { styleId, page = 1, pageSize = 10, searchBy, keyword } = req.query;
  const query = {};

  if (styleId) query.styleId = styleId;
  if (searchBy && keyword) {
    query[searchBy] = { $regex: keyword, $options: "i" };
  }

  try {
    const skip = (page - 1) * pageSize;
    const curations = await Curation.find(query)
      .skip(skip)
      .limit(Number(pageSize));
    const totalCurations = await Curation.countDocuments(query);

    res.status(200).json({
      success: true,
      data: curations,
      pagination: {
        currentPage: page,
        pageSize: Number(pageSize),
        totalItems: totalCurations,
        totalPages: Math.ceil(totalCurations / pageSize),
      },
    });
  } catch (error) {
    next(error); // 에러 핸들러로 넘김
  }
};

// 큐레이션 등록
const createCuration = async (req, res, next) => {
  try {
    const curation = await Curation.create(req.body);

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
    const curation = await Curation.findById(id);

    if (!curation) {
      const error = new Error("큐레이션을 찾을 수 없습니다.");
      error.status = 404;
      return next(error);
    }

    if (curation.passwd !== passwd) {
      const error = new Error("비밀번호가 일치하지 않습니다.");
      error.status = 401;
      return next(error);
    }

    Object.assign(curation, updateFields);
    await curation.save();

    res.status(200).json({
      success: true,
      data: curation,
    });
  } catch (error) {
    next(error);
  }
};

// 큐레이션 삭제
const deleteCuration = async (req, res, next) => {
  const { id } = req.params;

  try {
    const curation = await Curation.findById(id);

    if (!curation) {
      const error = new Error("큐레이션을 찾을 수 없습니다.");
      error.status = 404;
      return next(error);
    }

    await curation.deleteOne();
    res
      .status(200)
      .json({ success: true, message: "큐레이션이 삭제되었습니다." });
  } catch (error) {
    next(error);
  }
};

export { getCurations, createCuration, updateCuration, deleteCuration };
