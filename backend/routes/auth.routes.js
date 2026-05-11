const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

const authMiddleware = require('../middlewares/auth.middleware');
const roleMiddleware = require('../middlewares/role.middleware');

// @route   POST /api/auth/register
// @desc    Registrar un nuevo usuario (Solo ADMIN)
// @access  Private (Admin)
router.post('/register', authMiddleware, roleMiddleware(['ADMIN']), authController.register);

// @route   POST /api/auth/login
// @desc    Iniciar sesión y obtener token
// @access  Public
router.post('/login', authController.login);

module.exports = router;
