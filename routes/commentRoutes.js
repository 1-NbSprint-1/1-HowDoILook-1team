const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

// 답글 등록 라우트
router.post('/curatings/:curatingId/comments', commentController.createComment);

module.exports = router;