const express = require('express');
const router = express.Router();
const userRoute = require('./users/');
const authMiddleware = require('../middleware');

// router.get('/user', userRoute);
router.use('/user', userRoute);


module.exports = router;






