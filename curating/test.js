import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./config/database.js";
import curationRoutes from "./routes/curationRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();
app.use(cors());
connectDB();
app.use(express.json());

app.use("/api", curationRoutes);

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`서버가 실행되었습니다! PORT: ${PORT}`);
});
