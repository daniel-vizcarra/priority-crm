import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Shield, ArrowLeft } from 'lucide-react';
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
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    const result = await register(formData.nombre, formData.email, formData.password, formData.rol);
    
    if (result.success) {
      setSuccess('Usuario creado exitosamente.');
      setFormData({ nombre: '', email: '', password: '', rol: 'ASESOR' });
    } else {
      setError(result.message || 'Error al crear la cuenta');
    }
    setIsLoading(false);
  };

  return (
    <div className="fade-in" style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <button 
        onClick={() => navigate('/')} 
        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', marginBottom: '2rem' }}
      >
        <ArrowLeft size={20} /> Volver al Dashboard
      </button>

      <AuthLayout 
        title="Crear Nuevo Empleado" 
        subtitle="Administración de cuentas - Priority CRM"
      >
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {error && (
            <div style={{ padding: '0.75rem', backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid var(--error)', borderRadius: '0.5rem', color: 'var(--error)', fontSize: '0.875rem', marginBottom: '1rem', textAlign: 'center' }}>
              {error}
            </div>
          )}
          {success && (
            <div style={{ padding: '0.75rem', backgroundColor: 'rgba(16, 185, 129, 0.1)', border: '1px solid var(--success)', borderRadius: '0.5rem', color: 'var(--success)', fontSize: '0.875rem', marginBottom: '1rem', textAlign: 'center' }}>
              {success}
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
              Registrar Empleado
            </Button>
          </div>
        </form>
      </AuthLayout>
    </div>
  );
};
