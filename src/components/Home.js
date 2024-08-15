import React from 'react';

function Home() {
  return (
    <div className="container text-center">
      <h1>Bienvenido a DMusic</h1>
      <p>Tu mejor reproductor de música en la web.</p>
      <div className="d-flex justify-content-center">
        <a href="/register" className="btn btn-custom mx-2">Registrarse</a>
        <a href="/login" className="btn btn-custom mx-2">Iniciar Sesión</a>
      </div>
    </div>
  );
}

export default Home;
