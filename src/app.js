import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import curationRoutes from "./routes/curationRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/style", curationRoutes);

app.use(errorHandler);

app.listen(process.env.PORT || 3000, () => {
  console.log(`서버가 실행 되었습니다. PORT:${process.env.PORT || 3000}`);
});
