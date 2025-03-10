import prisma from "../config/database.js";

// 큐레이션 조회
const getCurations = async ({
  styleId,
  page = 1,
  pageSize = 10,
  searchBy,
  keyword,
}) => {
  const query = {};

  if (styleId) query.styleId = styleId;
  if (searchBy && keyword) {
    query[searchBy] = {
      contains: keyword,
      mode: "insensitive", // 대소문자 구분없이 검색
    };
  }

  const skip = (page - 1) * pageSize;
  const curations = await prisma.curation.findMany({
    where: query,
    skip: skip,
    take: Number(pageSize),
  });

  const totalCurations = await prisma.curation.count({
    where: query,
  });

  return {
    curations,
    pagination: {
      currentPage: page,
      pageSize: Number(pageSize),
      totalItems: totalCurations,
      totalPages: Math.ceil(totalCurations / pageSize),
    },
  };
};

// 큐레이션 등록
const createCuration = async (curationData) => {
  return await prisma.curation.create({
    data: curationData,
  });
};

// 큐레이션 수정
const updateCuration = async (id, updateFields, passwd) => {
  const curation = await prisma.curation.findUnique({
    where: { id: Number(id) },
  });

  if (!curation) throw new Error("큐레이션을 찾을 수 없습니다.");
  if (curation.passwd !== passwd)
    throw new Error("비밀번호가 일치하지 않습니다.");

  return await prisma.curation.update({
    where: { id: Number(id) },
    data: updateFields,
  });
};

// 큐레이션 삭제
const deleteCuration = async (id) => {
  const curation = await prisma.curation.findUnique({
    where: { id: Number(id) },
  });

  if (!curation) throw new Error("큐레이션을 찾을 수 없습니다.");

  await prisma.curation.delete({
    where: { id: Number(id) },
  });

  return { message: "큐레이션이 삭제되었습니다." };
};

export { getCurations, createCuration, updateCuration, deleteCuration };
