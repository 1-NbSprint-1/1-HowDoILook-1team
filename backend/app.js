import express from "express";
import cors from "cors";
import "dotenv/config";
import tagRoutes from "../backend/src/routes/tagRoute.js";
import imageRoutes from "../backend/src/routes/imageRoute.js";
import styleRoutes from "../backend/src/routes/styleRoute.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/images", express.static("images"));

app.use("/api", tagRoutes);
app.use("/api/images", imageRoutes);
app.use("/api", styleRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`서버가 실행되었습니다. PORT: ${PORT}`);
});
