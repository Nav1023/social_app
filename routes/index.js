const express = require('express');
const router = express.Router();
const userRoute = require('./users/');
const profileRoute = require('./profile');
const postsRoute = require('./posts');
const authMiddleware = require('../middleware');

// router.get('/user', userRoute);
router.use('/user', userRoute);
router.use('/profile', authMiddleware, profileRoute);
router.use('/posts', authMiddleware, postsRoute);


module.exports = router;






