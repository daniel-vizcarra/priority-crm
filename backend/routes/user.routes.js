const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.middleware');
const pool = require('../db');

// @route   GET /api/usuarios/me
// @desc    Obtener perfil del usuario autenticado
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, nombre, email, rol FROM Usuarios WHERE id = $1',
      [req.usuario.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ status: 'error', message: 'Usuario no encontrado' });
    }

    res.status(200).json({
      status: 'success',
      data: {
        usuario: result.rows[0]
      }
    });
  } catch (error) {
    console.error('Error obteniendo perfil:', error);
    res.status(500).json({ status: 'error', message: 'Error del servidor' });
  }
});

module.exports = router;
