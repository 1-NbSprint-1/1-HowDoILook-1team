import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import specs from "./swagger/swagger.js"; // Swagger 설정 파일 import
import curationRoutes from "./routes/curationRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Swagger UI 설정
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use("/styles", curationRoutes);

app.use(errorHandler);

app.listen(process.env.PORT || 3000, () => {
  console.log(`서버가 실행되었습니다. PORT:${process.env.PORT || 3000}`);
  console.log(
    `Swagger 문서: http://localhost:${process.env.PORT || 3000}/api-docs`
  );
});
