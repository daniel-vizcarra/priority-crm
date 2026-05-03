import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { LogOut, LayoutDashboard, User } from 'lucide-react';

export const DashboardPage = () => {
  const { user, logout } = useAuth();

  return (
    <div className="fade-in" style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', paddingBottom: '1rem', borderBottom: '1px solid var(--glass-border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ padding: '0.75rem', background: 'var(--glass-bg)', borderRadius: '0.75rem', border: '1px solid var(--glass-border)' }}>
            <LayoutDashboard color="var(--primary)" />
          </div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: '600' }}>Priority CRM</h1>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
              {user?.nombre?.charAt(0).toUpperCase()}
            </div>
            <div>
              <p style={{ fontWeight: '500', fontSize: '0.875rem' }}>{user?.nombre}</p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{user?.rol}</p>
            </div>
          </div>
          <Button variant="outline" onClick={logout} style={{ padding: '0.5rem 1rem', width: 'auto' }}>
            <LogOut size={16} style={{ marginRight: '0.5rem' }} /> Salir
          </Button>
        </div>
      </header>

      <div className="glass-panel slide-up" style={{ padding: '3rem', textAlign: 'center' }}>
        <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(79, 70, 229, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
          <User size={40} color="var(--primary)" />
        </div>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>¡Hola, {user?.nombre}!</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.125rem', maxWidth: '600px', margin: '0 auto' }}>
          Bienvenido al panel principal. Tu cuenta tiene nivel de acceso <strong>{user?.rol}</strong>.
        </p>
      </div>
    </div>
  );
};
