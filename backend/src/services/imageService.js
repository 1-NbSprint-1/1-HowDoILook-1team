import multer from "multer";
import path from "path";

// 이미지 저장 경로 및 파일명 설정
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images/"); // 이미지 저장 폴더
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // 파일명 설정
  },
});

// 파일 필터링 (이미지 파일만 허용)
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("이미지 파일만 업로드 가능합니다."), false);
  }
};

const upload = multer({ storage, fileFilter });

export const uploadSingleImage = upload.single("image");
