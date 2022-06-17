const express = require('express');
const router = express.Router();
const profileController = require('../../controllers/profile');
const { check, body } = require('express-validator');

router.get('/test', profileController.test);
router.post('/', profileController.createUpdateProfile);
router.get('/', profileController.fetchAllProfiles);
router.get('/:id', profileController.fetchProfileById);
router.put('/education', profileController.updateEducation);
router.delete('/education/:id', profileController.deleteEducation);
// router.post('/login', userController.login);

module.exports = router;

