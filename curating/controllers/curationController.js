import prisma from "../config/database.js";

// 큐레이션 조회
const getCurations = async (req, res, next) => {
  const { styleId, page = 1, pageSize = 10, searchBy, keyword } = req.query;
  const query = {};

  if (styleId) query.styleId = styleId;
  if (searchBy && keyword) {
    query[searchBy] = {
      contains: keyword, // Prisma의 contains 연산자를 사용
      mode: "insensitive", // 대소문자 구분없이 검색
    };
  }

  try {
    const skip = (page - 1) * pageSize;

    const curations = await prisma.curation.findMany({
      where: query, // Prisma에서는 `where`를 사용하여 조건을 걸어
      skip: skip, // `skip`을 사용하여 페이지네이션 구현
      take: Number(pageSize), // `limit` 대신 `take` 사용
    });

    const totalCurations = await prisma.curation.count({
      where: query, // 조건에 맞는 총 데이터 수 계산
    });

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
    const curation = await prisma.curation.create({
      data: req.body, // Prisma의 `create`를 사용하여 새 데이터 추가
    });

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
    const curation = await prisma.curation.findUnique({
      where: { id: Number(id) }, // `findUnique`로 해당 `id` 조회
    });

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

    const updatedCuration = await prisma.curation.update({
      where: { id: Number(id) }, // `id`를 기준으로 업데이트
      data: updateFields, // 수정할 데이터
    });

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
    const curation = await prisma.curation.findUnique({
      where: { id: Number(id) }, // `id`로 큐레이션 조회
    });

    if (!curation) {
      const error = new Error("큐레이션을 찾을 수 없습니다.");
      error.status = 404;
      return next(error);
    }

    await prisma.curation.delete({
      where: { id: Number(id) }, // `id`로 큐레이션 삭제
    });

    res
      .status(200)
      .json({ success: true, message: "큐레이션이 삭제되었습니다." });
  } catch (error) {
    next(error);
  }
};

export { getCurations, createCuration, updateCuration, deleteCuration };
