import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar si hay token en localStorage al cargar la app
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await fetch('http://localhost:3000/api/usuarios/me', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          const result = await response.json();
          if (response.ok && result.status === 'success') {
            setUser(result.data.usuario);
          } else {
            localStorage.removeItem('token');
          }
        } catch (error) {
          console.error("Error validando sesión:", error);
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    const response = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    
    const result = await response.json();
    if (response.ok && result.status === 'success') {
      localStorage.setItem('token', result.data.token);
      setUser(result.data.usuario);
      return { success: true };
    }
    return { success: false, message: result.message };
  };

  const register = async (nombre, email, password, rol) => {
    const response = await fetch('http://localhost:3000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, email, password, rol })
    });

    const result = await response.json();
    if (response.ok && result.status === 'success') {
      return { success: true };
    }
    return { success: false, message: result.message };
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
