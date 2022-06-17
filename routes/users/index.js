const express = require('express');
const router = express.Router();
const userController = require('../../controllers/users');
const { check, body } = require('express-validator');

router.get('/test', userController.test);
router.post('/', [ 
  check('name', 'Name key is not present').not().isEmpty(),
  body('email').isEmail()
], userController.create);
router.post('/login', userController.login);

module.exports = router;






