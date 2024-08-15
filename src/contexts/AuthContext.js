import React, { createContext, useState, useEffect, useContext } from 'react';

// Crear el contexto de autenticación
const AuthContext = createContext();

// Proveedor del contexto de autenticación
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    token: null,
    user: null
  });

  // Verificar si hay un token en el almacenamiento local
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuth({ isAuthenticated: true, token });
      fetchUserData(token);
    }
  }, []);

  const fetchUserData = async (token) => {
    try {
      const response = await fetch('http://localhost:5000/user', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      setAuth(prevAuth => ({ ...prevAuth, user: data }));
    } catch (error) {
      console.error('Error al obtener los datos del usuario:', error);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      localStorage.setItem('token', data.token);
      setAuth({ isAuthenticated: true, token: data.token });
      fetchUserData(data.token);
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuth({ isAuthenticated: false, token: null, user: null });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar el contexto de autenticación
export const useAuth = () => {
  return useContext(AuthContext);
};
