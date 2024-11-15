import React from 'react';
import './SongResult.css'; // Create or update CSS for consistent formatting

const SongResult = ({ bpm, spm1, songData, timeSignature }) => {
  if (!songData) return null;

  const getSpmClass = (spm) => {
    if (spm >= 15 && spm <= 21) {
      return 'spm-low';
    } else if (spm > 21 && spm <= 27) {
      return 'spm-medium';
    } else if (spm > 27) {
      return 'spm-high';
    }
  };

  const SpmDisplay = ({ spm }) => (
    <span className={getSpmClass(spm)}>
      {spm} SPM
    </span>
  );
  

  return (
    <div className="song-container">
      <h2>Song Data</h2>
      <div className="song-details">
        <img src={songData.albumArt} alt={songData.title} className="album-art" />
        <div className="song-info">
          <p className="title">{songData.title}</p>
          <p className="artist-album">{songData.artist} - {songData.album}</p>
          <p className="time-bpm">{timeSignature}/4 - {bpm} BPM</p>
        <SpmDisplay spm={spm1.toFixed(1)} />
        </div>
      </div>
    </div>
  );
};

export default SongResult;
