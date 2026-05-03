const pool = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { nombre, email, password, rol } = req.body;

  try {
    // Verificar si el usuario ya existe
    const userExist = await pool.query('SELECT id FROM Usuarios WHERE email = $1', [email]);
    if (userExist.rows.length > 0) {
      return res.status(400).json({ status: 'error', message: 'El correo ya está registrado' });
    }

    // Hashear la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insertar nuevo usuario
    const result = await pool.query(
      'INSERT INTO Usuarios (nombre, email, password, rol) VALUES ($1, $2, $3, $4) RETURNING id, nombre, email, rol',
      [nombre, email, hashedPassword, rol || 'ASESOR'] // Asesor por defecto
    );

    res.status(201).json({
      status: 'success',
      message: 'Usuario registrado exitosamente',
      data: {
        usuario: result.rows[0]
      }
    });

  } catch (error) {
    console.error('Error en el registro:', error);
    res.status(500).json({ status: 'error', message: 'Error del servidor' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Buscar el usuario
    const result = await pool.query('SELECT * FROM Usuarios WHERE email = $1', [email]);
    const usuario = result.rows[0];

    if (!usuario) {
      return res.status(400).json({ status: 'error', message: 'Credenciales inválidas' });
    }

    // Validar contraseña
    const isMatch = await bcrypt.compare(password, usuario.password);
    if (!isMatch) {
      return res.status(400).json({ status: 'error', message: 'Credenciales inválidas' });
    }

    // Generar JWT
    const payload = {
      id: usuario.id,
      rol: usuario.rol
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(200).json({
      status: 'success',
      message: 'Autenticación exitosa',
      data: {
        token,
        usuario: {
          id: usuario.id,
          nombre: usuario.nombre,
          email: usuario.email,
          rol: usuario.rol
        }
      }
    });

  } catch (error) {
    console.error('Error en el login:', error);
    res.status(500).json({ status: 'error', message: 'Error del servidor' });
  }
};
