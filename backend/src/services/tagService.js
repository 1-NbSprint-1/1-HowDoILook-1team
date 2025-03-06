import Style from "../models/style.js";

const getPopularTags = async () => {
  const popularTags = await Style.aggregate([
    { $unwind: "$tags" }, // tags 배열을 펼침
    { $group: { _id: "$tags", count: { $sum: 1 } } }, // 태그별로 그룹화하고 빈도 계산
    { $sort: { count: -1 } }, // 빈도 기준으로 내림차순 정렬
    { $limit: 10 }, // 상위 10개의 태그만 가져옴
  ]);

  return popularTags;
};

export default { getPopularTags };
