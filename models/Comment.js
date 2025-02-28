const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: [true, '내용을 입력해주세요'],
        maxLength: [150, '150자 이내로 작성해주세요']
    },
    nickname: {
        type: String,
        required: [true, '닉네임을 입력해주세요'],
        maxLength: [20, '20자 이내로 작성해주세요']
    },
    password: {
        type: String,
        required: [true, '비밀번호를 입력해주세요']
    },
    curatingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Curating',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// 큐레이팅당 하나의 답글만 허용하는 unique 인덱스
commentSchema.index({ curatingId: 1 }, { unique: true });

module.exports = mongoose.model('Comment', commentSchema);
