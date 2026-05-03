import React from 'react';
import { Shield } from 'lucide-react';

export const AuthLayout = ({ children, title, subtitle }) => {
  const containerStyle = {
    display: 'flex',
    minHeight: '100vh',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1.5rem',
  };

  const cardStyle = {
    width: '100%',
    maxWidth: '440px',
    padding: '2.5rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const logoStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '4rem',
    height: '4rem',
    borderRadius: '1rem',
    background: 'linear-gradient(135deg, var(--primary), #818CF8)',
    boxShadow: '0 10px 25px -5px rgba(79, 70, 229, 0.5)',
    marginBottom: '1.5rem'
  };

  return (
    <div style={containerStyle} className="fade-in">
      <div className="glass-panel slide-up" style={cardStyle}>
        <div style={logoStyle}>
          <Shield color="white" size={32} />
        </div>
        
        <h1 style={{ fontSize: '1.75rem', marginBottom: '0.5rem', textAlign: 'center' }}>
          {title}
        </h1>
        
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', textAlign: 'center' }}>
          {subtitle}
        </p>
        
        <div style={{ width: '100%' }}>
          {children}
        </div>
      </div>
    </div>
  );
};
