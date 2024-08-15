import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

function Navbar() {
  const { auth, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/library">
          <i className="fa fa-music"></i> DMusic
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item"><Link className="nav-link" to="/library">Biblioteca</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/playlist">Playlist</Link></li>
            {!auth.isAuthenticated ? (
              <>
                <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
              </>
            ) : (
              <li className="nav-item">
                <button className="btn btn-danger" onClick={logout}>Logout</button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
