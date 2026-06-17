const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { authenticate } = require('../middleware/auth.middleware');
const validate = require('../middleware/validation.middleware');
const { registerSchema, loginSchema } = require('../validators/auth.validation');

router.post('/register', validate(registerSchema), authController.register);
router.post('/login', validate(loginSchema), authController.login);
router.get('/me', authenticate, authController.getMe);

module.exports = router;
