module.exports = (roles) => {
  return (req, res, next) => {
    if (!req.usuario) {
      return res.status(401).json({ status: 'error', message: 'No hay token de sesión' });
    }
    
    if (!roles.includes(req.usuario.rol)) {
      return res.status(403).json({ 
        status: 'error', 
        message: `Acceso denegado. Se requiere el rol: ${roles.join(', ')}` 
      });
    }
    
    next();
  };
};
