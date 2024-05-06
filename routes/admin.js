const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController.js');
const { validateCreateUser, validateLoginUser } = require('../validations/adminValidation.js');
const { adminAuthorization } = require('../middleware/adminAuthorization.js');

router.post('/', validateCreateUser, adminController.createUser);
router.get('/user', adminController.getUser);
router.get('/user/:userId', adminAuthorization, adminController.getUserById);
router.post('/login', validateLoginUser, adminController.loginUser);

module.exports = router;