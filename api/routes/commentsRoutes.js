const express = require('express');
const commentsController = require('../controllers/commentsController');

const router = express.Router();

/**
 * Comments API endpoints
 */
router.get('/comments', commentsController.getComments);
router.get('/comments/:id', commentsController.getCommentById);
router.post('/comments', commentsController.createComment);
router.delete('/comments/:id', commentsController.deleteComment);


module.exports = router;
