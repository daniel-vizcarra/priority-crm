import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { AuthLayout } from '../components/AuthLayout';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const result = await login(email, password);
    
    if (result.success) {
      navigate('/');
    } else {
      setError(result.message || 'Error al iniciar sesión');
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout 
      title="Bienvenido de nuevo" 
      subtitle="Ingresa tus credenciales para acceder al CRM"
    >
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {error && (
          <div style={{ padding: '0.75rem', backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid var(--error)', borderRadius: '0.5rem', color: 'var(--error)', fontSize: '0.875rem', marginBottom: '1rem', textAlign: 'center' }}>
            {error}
          </div>
        )}
        
        <Input 
          label="Correo Electrónico"
          type="email"
          placeholder="admin@priority.com"
          icon={Mail}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        
        <Input 
          label="Contraseña"
          type="password"
          placeholder="••••••••"
          icon={Lock}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        
        <div style={{ marginTop: '1rem' }}>
          <Button type="submit" isLoading={isLoading}>
            Iniciar Sesión
            {!isLoading && <ArrowRight size={18} style={{ marginLeft: '0.5rem' }} />}
          </Button>
        </div>
      </form>
      
    </AuthLayout>
  );
};
