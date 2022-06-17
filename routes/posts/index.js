const express = require('express');
const router = express.Router();
const postsController = require('../../controllers/posts');
const { check, body } = require('express-validator');

router.get('/test', postsController.test);
router.post('/', postsController.create);
router.get('/', postsController.fetchPosts);
// TODO delete API and fetch by id API

router.put('/like/:id', postsController.likePost);
router.post('/comment/:id', postsController.addComment);
router.delete('/comment/:id/:commentId', postsController.deleteComment);




module.exports = router;

