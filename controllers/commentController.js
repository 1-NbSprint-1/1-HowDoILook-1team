const Comment = require('../models/Comment');

// 답글 등록
exports.createComment = async (req, res) => {
    try {
        const { content, nickname, password, curatingId } = req.body;
        
        const comment = await Comment.create({
            content,
            nickname,
            password,
            curatingId
        });

        res.status(201).json({
            success: true,
            data: {
                id: comment._id,
                content: comment.content,
                nickname: comment.nickname,
                curatingId: comment.curatingId,
                createdAt: comment.createdAt
            }
        });
    } catch (error) {
        console.error('답글 생성 에러:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};