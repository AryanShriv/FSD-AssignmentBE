const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { validateCreateUser, validateLoginUser } = require('../validations/userValidation');
const { userAuthenticateToken } = require('../middleware/userAuthorization.js');

router.post('/', validateCreateUser, userController.createUser);
router.get('/', userController.getUser);
router.get('/userByToken', userAuthenticateToken, userController.getUserByToken);
router.post('/login', validateLoginUser, userController.loginUser);
router.delete('/logout/:loginHistoryId', userAuthenticateToken, userController.logoutId);

module.exports = router;