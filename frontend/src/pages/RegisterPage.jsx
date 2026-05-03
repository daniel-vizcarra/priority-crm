import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Lock, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { AuthLayout } from '../components/AuthLayout';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

export const RegisterPage = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    rol: 'ASESOR'
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register, login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const result = await register(formData.nombre, formData.email, formData.password, formData.rol);
    
    if (result.success) {
      // Auto-login after register
      await login(formData.email, formData.password);
      navigate('/');
    } else {
      setError(result.message || 'Error al crear la cuenta');
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout 
      title="Crear una cuenta" 
      subtitle="Únete a Priority - Seguros Ideal"
    >
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {error && (
          <div style={{ padding: '0.75rem', backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid var(--error)', borderRadius: '0.5rem', color: 'var(--error)', fontSize: '0.875rem', marginBottom: '1rem', textAlign: 'center' }}>
            {error}
          </div>
        )}
        
        <Input 
          label="Nombre Completo"
          name="nombre"
          type="text"
          placeholder="Juan Pérez"
          icon={User}
          value={formData.nombre}
          onChange={handleChange}
          required
        />
        
        <Input 
          label="Correo Electrónico"
          name="email"
          type="email"
          placeholder="juan@priority.com"
          icon={Mail}
          value={formData.email}
          onChange={handleChange}
          required
        />
        
        <Input 
          label="Contraseña"
          name="password"
          type="password"
          placeholder="Mínimo 6 caracteres"
          icon={Lock}
          value={formData.password}
          onChange={handleChange}
          required
          minLength={6}
        />

        <div style={{ marginBottom: '1.25rem' }}>
          <label style={{ fontSize: '0.875rem', fontWeight: '500', color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>Rol del Usuario</label>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <Shield style={{ position: 'absolute', left: '0.75rem', color: 'var(--text-muted)', width: '1.25rem', height: '1.25rem' }} />
            <select 
              name="rol"
              value={formData.rol}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                paddingLeft: '2.5rem',
                backgroundColor: 'rgba(15, 23, 42, 0.4)',
                border: '1px solid var(--glass-border)',
                borderRadius: '0.75rem',
                color: 'var(--text-main)',
                fontSize: '1rem',
                outline: 'none',
                appearance: 'none'
              }}
            >
              <option value="ASESOR">Asesor Comercial</option>
              <option value="GERENTE">Gerente</option>
              <option value="ADMIN">Administrador</option>
            </select>
          </div>
        </div>
        
        <div style={{ marginTop: '0.5rem' }}>
          <Button type="submit" isLoading={isLoading}>
            Registrarse
          </Button>
        </div>
      </form>
      
      <p style={{ marginTop: '2rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
        ¿Ya tienes cuenta? {' '}
        <Link to="/login" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: '500' }}>
          Inicia Sesión
        </Link>
      </p>
    </AuthLayout>
  );
};
