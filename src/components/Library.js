// Library.js
import React from 'react';
import { usePlaylist } from '../contexts/PlaylistContext'; // Importar el hook del contexto

function Library() {
  const { temporaryPlaylist, setTemporaryPlaylist } = usePlaylist();
  const token = localStorage.getItem('token');

  const handleAddSong = (song, artist) => {
    if (!token) {
      setTemporaryPlaylist([...temporaryPlaylist, { song, artist }]);
      alert('Canción añadida temporalmente a la playlist');
    } else {
      addSongToDatabase(song, artist);
    }
  };

  const addSongToDatabase = async (song, artist) => {
    try {
      await fetch('http://localhost:5000/playlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ song, artist }),
      });
      alert('Canción añadida a la playlist');
    } catch (error) {
      console.error('Error:', error);
    }
  };


  return (
    <div className="container">
      <h1 className="text-center">Biblioteca</h1>
      <div className="row">
        {['Canción 1', 'Canción 2', 'Canción 3'].map((song, index) => (
          <div key={index} className="col-md-4">
            <div className="card mb-4">
              <img src="https://via.placeholder.com/150" className="card-img-top" alt={song} />
              <div className="card-body">
                <h5 className="card-title">{song}</h5>
                <p className="card-text">Artista {index + 1}</p>
                <button onClick={() => handleAddSong(song, `Artista ${index + 1}`)} className="btn btn-custom">Agregar</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Library;
