import React from 'react';
import './PlaylistResult.css'; // Import any custom CSS if needed

const PlaylistResult = ({ playlistData }) => {
  if (!playlistData || !playlistData.tracks) {
    return <div>No playlist data available</div>;
  }

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
      {spm}
    </span>
  );
  

  return (
    <div className="playlist-container">
      <h2>{playlistData.name}</h2>
      {playlistData.image && (
        <img src={playlistData.image} alt={`${playlistData.name} cover`} className="playlist-cover" />
      )}
      <table className="playlist-table">
        <tbody>
          {playlistData.tracks.map((track, index) => (
            <tr key={index} className="playlist-row">
              {/* Album Artwork */}
              <td className="artwork-cell">
                <img src={track.albumArt} alt={`${track.title} album art`} className="album-art" />
              </td>
              
              {/* Track Information */}
              <td className="track-info">
                <div className="title">{track.title}</div>
                <div className="artist-album">
                  {track.artist} - {track.album}
                </div>
                <div className="time-bpm">
                  {track.timeSignature}/4 - {track.bpm} BPM
                </div>
              </td>
              
              {/* SPM in bold and centered */}
              <td className="spm-cell">
                <SpmDisplay spm={track.spm1.toFixed(1)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlaylistResult;
