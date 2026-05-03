import React from 'react';

export const Input = ({ label, icon: Icon, error, ...props }) => {
  const wrapperStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    width: '100%',
    marginBottom: '1.25rem'
  };

  const labelStyle = {
    fontSize: '0.875rem',
    fontWeight: '500',
    color: 'var(--text-muted)'
  };

  const inputContainerStyle = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center'
  };

  const inputStyle = {
    width: '100%',
    padding: '0.75rem 1rem',
    paddingLeft: Icon ? '2.5rem' : '1rem',
    backgroundColor: 'rgba(15, 23, 42, 0.4)',
    border: `1px solid ${error ? 'var(--error)' : 'var(--glass-border)'}`,
    borderRadius: '0.75rem',
    color: 'var(--text-main)',
    fontSize: '1rem',
    transition: 'all 0.2s ease',
    outline: 'none'
  };

  const iconStyle = {
    position: 'absolute',
    left: '0.75rem',
    color: 'var(--text-muted)',
    width: '1.25rem',
    height: '1.25rem'
  };

  return (
    <div style={wrapperStyle}>
      {label && <label style={labelStyle}>{label}</label>}
      <div style={inputContainerStyle}>
        {Icon && <Icon style={iconStyle} />}
        <input 
          style={inputStyle}
          onFocus={(e) => {
            e.target.style.borderColor = 'var(--primary)';
            e.target.style.backgroundColor = 'rgba(15, 23, 42, 0.6)';
            e.target.style.boxShadow = '0 0 0 3px rgba(79, 70, 229, 0.2)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = error ? 'var(--error)' : 'var(--glass-border)';
            e.target.style.backgroundColor = 'rgba(15, 23, 42, 0.4)';
            e.target.style.boxShadow = 'none';
          }}
          {...props} 
        />
      </div>
      {error && <span style={{ color: 'var(--error)', fontSize: '0.75rem', marginTop: '-0.25rem' }}>{error}</span>}
    </div>
  );
};
