const Comment = require('../models/Comment');
const bcrypt = require('bcryptjs');

// 답글 등록
exports.createComment = async (req, res) => {
    try {
        const { content, nickname, password } = req.body;
        const { curatingId } = req.params;

        // 비밀번호 해시화
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const comment = await Comment.create({
            content,
            nickname,
            password: hashedPassword,
            curatingId
        });

        res.status(201).json({
            success: true,
            data: {
                id: comment._id,
                content: comment.content,
                nickname: comment.nickname,
                createdAt: comment.createdAt
            }
        });
    } catch (error) {
        if (error.code === 11000) {  // duplicate key error
            return res.status(400).json({
                success: false,
                error: '이미 답글이 존재합니다'
            });
        }
        console.error('답글 생성 에러:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// 답글 수정
exports.updateComment = async (req, res) => {
    try {
        const { content, password } = req.body;
        const { commentId } = req.params;

        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({
                success: false,
                error: '답글을 찾을 수 없습니다'
            });
        }

        // 비밀번호 확인
        const isPasswordValid = await bcrypt.compare(password, comment.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                error: '비밀번호가 일치하지 않습니다'
            });
        }

        comment.content = content;
        await comment.save();

        res.json({
            success: true,
            data: {
                id: comment._id,
                content: comment.content,
                nickname: comment.nickname,
                createdAt: comment.createdAt
            }
        });
    } catch (error) {
        console.error('답글 수정 에러:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// 답글 삭제
exports.deleteComment = async (req, res) => {
    try {
        const { password } = req.body;
        const { commentId } = req.params;

        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({
                success: false,
                error: '답글을 찾을 수 없습니다'
            });
        }

        // 비밀번호 확인
        const isPasswordValid = await bcrypt.compare(password, comment.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                error: '비밀번호가 일치하지 않습니다'
            });
        }

        await comment.deleteOne();

        res.json({
            success: true,
            message: '답글이 삭제되었습니다'
        });
    } catch (error) {
        console.error('답글 삭제 에러:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// 답글 목록 조회
exports.getComments = async (req, res) => {
    try {
        const { curatingId } = req.params;
        
        const comments = await Comment.find({ curatingId })
            .select('content nickname createdAt')
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            data: comments
        });
    } catch (error) {
        console.error('답글 조회 에러:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};