const express = require('express');
const connectDB = require('./config/database');
const commentRoutes = require('./routes/commentRoutes');
require('dotenv').config();

const app = express();

connectDB();

//미들웨어
app.use(express.json());

//연결 테스트용 라우트
app.get('/test', (req, res) => {
    res.json({ message: '서버가 정상적으로 실행중입니다!' });
});

app.use('/api', commentRoutes);

//에러 처리 미들웨어
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: '서버 에러가 발생했습니다'
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`서버가 ${PORT}번 포트에서 실행중입니다! 🚀`);
});