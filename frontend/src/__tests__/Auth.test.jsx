import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';

// Mock de useAuth
vi.mock('../context/AuthContext', () => ({
  useAuth: () => ({
    login: vi.fn(),
    register: vi.fn(),
    user: null,
    loading: false
  }),
  AuthProvider: ({ children }) => <>{children}</>
}));

describe('Frontend Auth Security & UI', () => {
  it('1. Renderiza correctamente la pantalla de Login', () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );
    
    // Validar existencia de campos y textos clave
    expect(screen.getByText('Bienvenido de nuevo')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('admin@priority.com')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('••••••••')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Iniciar Sesión/i })).toBeInTheDocument();
  });

  it('2. Renderiza correctamente la pantalla de Registro', () => {
    render(
      <MemoryRouter>
        <RegisterPage />
      </MemoryRouter>
    );

    // Validar campos del registro
    expect(screen.getByText('Crear una cuenta')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Juan Pérez')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Registrarse/i })).toBeInTheDocument();
  });
});
