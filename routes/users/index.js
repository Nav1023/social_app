const express = require('express');
const router = express.Router();
const userController = require('../../controllers/users');

router.get('/test', userController.test);
router.post('/', userController.create);
router.post('/login', userController.login);

module.exports = router;






