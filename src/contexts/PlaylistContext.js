// src/contexts/PlaylistContext.js
import React, { createContext, useState, useContext } from 'react';

// Crear el contexto
const PlaylistContext = createContext();

// Proveedor del contexto
export const PlaylistProvider = ({ children }) => {
  const [temporaryPlaylist, setTemporaryPlaylist] = useState([]);

  return (
    <PlaylistContext.Provider value={{ temporaryPlaylist, setTemporaryPlaylist }}>
      {children}
    </PlaylistContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const usePlaylist = () => useContext(PlaylistContext);
