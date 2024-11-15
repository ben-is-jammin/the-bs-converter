import React, { useContext, useState } from 'react';
import { HistoryContext } from '../state/historyContext';
import './RequestHistory.css';

const RequestHistory = ({ onSelectHistoryItem, isActive, onClose }) => {
  const { history } = useContext(HistoryContext);

  return (
    <div className={`request-history-sidebar ${isActive ? 'active' : ''}`}>
      <button className="close-button" onClick={onClose}>Hide History</button>
      <h2>Request History</h2>
      <div className="history-list">
        {history.map((entry, index) => (
          entry.type === 'playlist' ? (
            <PlaylistHistoryItem key={index} entry={entry} onSelect={() => { onSelectHistoryItem(entry); onClose(); }} />
          ) : (
            <TrackHistoryItem key={index} entry={entry} onSelect={() => { onSelectHistoryItem(entry); onClose(); }} />
          )
        ))}
      </div>
    </div>
  );
};

const TrackHistoryItem = ({ entry, onSelect }) => (
  <div className="track-history-item" onClick={onSelect}>
    <img src={entry.songData.albumArt} alt={entry.songData.title} className="track-art" />
    <div className="track-info">
      <p className="track-title">{entry.songData.title}</p>
      <p className="track-spm">SPM: {entry.spm1.toFixed(1)}</p>
    </div>
  </div>
);

const PlaylistHistoryItem = ({ entry, onSelect }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="playlist-history-item">
      <div className="playlist-header" onClick={() => { setIsExpanded(!isExpanded); onSelect(); }}>
        <img src={entry.image} alt={entry.name} className="playlist-art" />
        <div className="playlist-info">
          <p className="playlist-title">{entry.name}</p>
          <p className="playlist-track-count">{entry.tracks.length} tracks</p>
        </div>
      </div>
      {isExpanded && (
        <div className="playlist-tracks">
          {entry.tracks.map((track, idx) => (
            <div key={idx} className="playlist-track">
              <p className="track-title">{track.title}</p>
              <p className="track-spm">SPM: {track.spm1.toFixed(1)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RequestHistory;
