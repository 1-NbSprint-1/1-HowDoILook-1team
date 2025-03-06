import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./src/config/database.js";
import tagRoutes from "../backend/src/routes/tagRoute.js";

const app = express();
app.use(cors());

connectDB();


app.use("/tags", tagRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`서버가 실행되었습니다. PORT: ${PORT}`);
});