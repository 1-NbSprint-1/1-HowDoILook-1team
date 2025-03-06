import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./src/config/database.js";
import tagRoutes from "../backend/src/routes/tagRoute.js";
import imageRoutes from "../backend/src/routes/imageRoute.js";

const app = express();
app.use(cors());

connectDB();

app.use("/images", express.static("images"));

app.use("/tags", tagRoutes);
app.use("/images", imageRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`서버가 실행되었습니다. PORT: ${PORT}`);
});
