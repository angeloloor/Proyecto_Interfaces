// Login.js
import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', { email, password });
      localStorage.setItem('token', response.data.token);
      window.location.href = '/library';
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
    }
  };

  return (
    <div className="container" style={{ width: '400px' }}>
      <h1 className="text-center">Iniciar Sesión</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Correo Electrónico</label>
          <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Ingresa tu correo" />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Contraseña</label>
          <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Ingresa tu contraseña" />
        </div>
        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-custom">Iniciar Sesión</button>
          <a href="/register">Crear cuenta</a>
        </div>
      </form>
    </div>
  );
}

export default Login;
