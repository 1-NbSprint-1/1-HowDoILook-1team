import express from "express";
import cors from "cors";
import 'dotenv/config'

const app = express();
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`서버가 실행되었습니다. PORT: ${PORT}`);
});