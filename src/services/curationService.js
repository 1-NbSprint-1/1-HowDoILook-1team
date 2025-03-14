import prisma from "../config/database.js";

// 큐레이션 조회 함수
const getCurations = async ({
  styleId,
  page = 1,
  pageSize = 10,
  searchBy,
  keyword,
}) => {
  const query = {}; // 필터 조건 객체

  if (styleId) query.styleId = styleId; // styleId가 있으면 추가
  if (searchBy && keyword) {
    query[searchBy] = {
      contains: keyword, // keyword 포함된 데이터 검색
      mode: "insensitive", // 대소문자 구분 없이 검색
    };
  }

  const skip = (page - 1) * pageSize; // 페이지네이션을 위한 skip 값
  const curations = await prisma.curation.findMany({
    where: query, // 필터 조건에 맞는 큐레이션 찾기
    skip, // 페이지네이션 skip
    take: Number(pageSize), // 페이지당 항목 수
  });

  const totalCurations = await prisma.curation.count({ where: query }); // 전체 큐레이션 개수

  return {
    curations, // 큐레이션 리스트
    pagination: {
      currentPage: page, // 현재 페이지
      pageSize: Number(pageSize), // 페이지당 항목 수
      totalItems: totalCurations, // 전체 큐레이션 개수
      totalPages: Math.ceil(totalCurations / pageSize), // 전체 페이지 수
    },
  };
};

// 큐레이션 등록 함수
const createCuration = async (curationData) => {
  return await prisma.curation.create({ data: curationData }); // 큐레이션 생성
};

// 큐레이션 수정 함수
const updateCuration = async (id, updateFields, passwd) => {
  const curation = await prisma.curation.findUnique({
    where: { id: Number(id) }, // 주어진 id로 큐레이션 조회
  });

  if (!curation) {
    const error = new Error("큐레이션을 찾을 수 없습니다.");
    error.status = 404; // 큐레이션이 없으면 404 오류
    throw error;
  }
  if (curation.passwd !== passwd) {
    const error = new Error("비밀번호가 일치하지 않습니다.");
    error.status = 401; // 비밀번호가 다르면 401 오류
    throw error;
  }

  return await prisma.curation.update({
    where: { id: Number(id) }, // 큐레이션 수정
    data: updateFields, // 수정할 필드 값
  });
};

// 큐레이션 삭제 함수
const deleteCuration = async (id, passwd) => {
  const curation = await prisma.curation.findUnique({
    where: { id: Number(id) }, // 주어진 id로 큐레이션 조회
  });

  if (!curation) {
    const error = new Error("큐레이션을 찾을 수 없습니다.");
    error.status = 404; // 큐레이션이 없으면 404 오류
    throw error;
  }

  if (curation.passwd !== passwd) {
    const error = new Error("비밀번호가 일치하지 않습니다.");
    error.status = 401; // 비밀번호가 다르면 401 오류
    throw error;
  }

  await prisma.curation.delete({ where: { id: Number(id) } }); // 큐레이션 삭제

  return { message: "큐레이션이 삭제되었습니다." }; // 삭제 완료 메시지 반환
};

export { getCurations, createCuration, updateCuration, deleteCuration }; // 외부에서 사용할 함수들 export
