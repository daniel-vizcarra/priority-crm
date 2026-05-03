const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // Obtener el token del header (Bearer token)
  const authHeader = req.header('Authorization');

  if (!authHeader) {
    return res.status(401).json({ status: 'error', message: 'No hay token, autorización denegada' });
  }

  // Comprobar formato Bearer token
  if (!authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ status: 'error', message: 'Formato de token inválido' });
  }

  const token = authHeader.replace('Bearer ', '');

  try {
    // Verificar token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Asignar el usuario al request
    req.usuario = decoded;
    next();
  } catch (error) {
    res.status(401).json({ status: 'error', message: 'Token no es válido o ha expirado' });
  }
};
