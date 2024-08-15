import React from 'react';
import { BrowserRouter, Route,Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './components/Login';
import Register from './components/Register';
import Playlist from './components/Playlist';
import Library from './components/Library';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from './components/Home';

function App() {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column min-vh-100 justify-content-between">
        <Navbar />
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/playlist" element={<Playlist />} />
          <Route path="/library" element={<Library />} />
          </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
