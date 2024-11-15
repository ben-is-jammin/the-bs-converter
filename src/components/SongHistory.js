import React, { useContext } from 'react';
import { HistoryContext } from '../state/historyContext';

const SongHistory = () => {
  const { history } = useContext(HistoryContext);

  return (
    <div>
      <h3>Request History</h3>
      <ul>
        {history.map((entry, index) => (
          <li key={index}>
            <p>URL: {entry.url}</p>
            <p>BPM: {entry.bpm}</p>
            <p>SPM Speed: {entry.spm1}</p>
            <p>Title: {entry.songData?.title}</p>
            <p>Artist: {entry.songData?.artist}</p>
            <p>Album: {entry.songData?.album}</p>
            {entry.songData?.albumArt && (
              <img src={entry.songData.albumArt} alt={`${entry.songData.title} album art`} width="50" />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SongHistory;
