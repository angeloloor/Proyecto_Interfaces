import React, { useEffect, useState } from 'react';
import { usePlaylist } from '../contexts/PlaylistContext';
import axios from 'axios';

function Playlist() {
  const { temporaryPlaylist } = usePlaylist();
  const [songs, setSongs] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/playlist', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setSongs(response.data);
      } catch (error) {
        console.error('Error al obtener las canciones:', error);
      }
    };

    if (token) {
      fetchSongs();
    }
  }, [token]);

  const fetchSongs = async () => {
    try {
      const response = await axios.get('http://localhost:5000/playlist', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSongs(response.data);
    } catch (error) {
      console.error('Error al obtener las canciones:', error);
    }
  };

  const handleDeleteSong = async (id) => {
    const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar esta canción?');
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/playlist/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchSongs();
      } catch (error) {
        console.error('Error al eliminar la canción:', error);
      }
    }
  };

  const handleSaveTemporaryPlaylist = async () => {
    if (!token) {
      alert('Por favor, inicie sesión para guardar la playlist.');
      return;
    }

    try {
      for (const { song, artist } of temporaryPlaylist) {
        await axios.post('http://localhost:5000/playlist', { song, artist }, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      alert('Playlist temporal guardada en la base de datos');
    } catch (error) {
      console.error('Error al guardar la playlist temporal:', error);
    }
  };

  return (
    <div className="container">
      <h1 className="text-center">Playlist</h1>
      <div className="row">
        {songs.map((song) => (
          <div key={song.id} className="col-md-4">
            <div className="card mb-4">
              <img src="https://via.placeholder.com/150" className="card-img-top" alt={song.song} />
              <div className="card-body">
                <h5 className="card-title">{song.song}</h5>
                <p className="card-text">{song.artist}</p>
                <button onClick={() => handleDeleteSong(song.id)} className="btn btn-danger">Eliminar</button>
                <button className="btn btn-primary ms-2">Play</button>
              </div>
            </div>
          </div>
        ))}
        {temporaryPlaylist.map((song, index) => (
          <div key={index} className="col-md-4">
            <div className="card mb-4">
              <img src="https://via.placeholder.com/150" className="card-img-top" alt={song.song} />
              <div className="card-body">
                <h5 className="card-title">{song.song}</h5>
                <p className="card-text">{song.artist}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {temporaryPlaylist.length > 0 && (
        <button className="btn btn-success mt-3" onClick={handleSaveTemporaryPlaylist}>Guardar Playlist</button>
      )}
    </div>
  );
}

export default Playlist;
