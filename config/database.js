const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/reply';
        await mongoose.connect(uri);
        console.log('MongoDB 연결 성공');
    } catch (error) {
        console.error('MongoDB 연결 실패:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;