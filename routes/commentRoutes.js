const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

// 답글 등록
router.post('/curatings/:curatingId/comments', commentController.createComment);

// 답글 수정
router.put('/comments/:commentId', commentController.updateComment);

// 답글 삭제
router.delete('/comments/:commentId', commentController.deleteComment);

// 답글 목록 조회
router.get('/curatings/:curatingId/comments', commentController.getComments);

module.exports = router;