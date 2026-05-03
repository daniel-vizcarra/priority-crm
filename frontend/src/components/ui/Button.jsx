import React from 'react';

export const Button = ({ children, variant = 'primary', className = '', isLoading, ...props }) => {
  const baseStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0.75rem 1.5rem',
    borderRadius: '0.75rem',
    fontWeight: '500',
    fontSize: '1rem',
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: 'pointer',
    border: 'none',
    outline: 'none',
    width: '100%'
  };

  const variants = {
    primary: {
      backgroundColor: 'var(--primary)',
      color: 'white',
      boxShadow: '0 4px 6px -1px rgba(79, 70, 229, 0.4)',
    },
    outline: {
      backgroundColor: 'transparent',
      color: 'var(--text-main)',
      border: '1px solid var(--glass-border)',
    }
  };

  return (
    <button
      style={{ ...baseStyles, ...variants[variant] }}
      className={`btn ${className}`}
      disabled={isLoading || props.disabled}
      onMouseOver={(e) => {
        if(variant === 'primary') e.currentTarget.style.backgroundColor = 'var(--primary-hover)';
        if(variant === 'outline') e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)';
      }}
      onMouseOut={(e) => {
        if(variant === 'primary') e.currentTarget.style.backgroundColor = 'var(--primary)';
        if(variant === 'outline') e.currentTarget.style.backgroundColor = 'transparent';
      }}
      {...props}
    >
      {isLoading ? (
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <svg style={{ animation: 'spin 1s linear infinite', height: '1.25rem', width: '1.25rem' }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" strokeOpacity="0.3"></circle>
            <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Cargando...
        </span>
      ) : children}
      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .btn:disabled { opacity: 0.7; cursor: not-allowed; }
      `}</style>
    </button>
  );
};
