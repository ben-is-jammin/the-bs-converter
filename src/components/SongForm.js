import React, { useState } from 'react';

const SongForm = ({ onFetchSong, onFetchPlaylist }) => {
  const [url, setUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (url.includes('playlist')) {
      onFetchPlaylist(url); // Calls handleFetchPlaylist for playlist URLs
    } else {
      onFetchSong(url); // Calls handleFetchSong for track URLs
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter Spotify URL"
      />
      <button type="submit">Analyze Tracks</button>
    </form>
  );
};

export default SongForm;
