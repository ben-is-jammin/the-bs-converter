import React, { useState, useContext, useEffect } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { getTrackBPMs, getTrackDetails, getPlaylistTrackIds, extractSpotifyId, getPlaylistDetails } from './services/spotify';
import { getSPMData } from './services/airtable';
import SongForm from './components/SongForm';
import SongResult from './components/SongResult';
import PlaylistResult from './components/PlaylistResult';
import RequestHistory from './components/RequestHistory';
import { HistoryContext } from './state/historyContext';
import './App.css';

const getAverageColor = (imgElement) => {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  canvas.width = imgElement.width;
  canvas.height = imgElement.height;
  context.drawImage(imgElement, 0, 0, canvas.width, canvas.height);
  const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  const { data } = imageData;

  let r = 0, g = 0, b = 0, count = 0;
  for (let i = 0; i < data.length; i += 4) {
    r += data[i];
    g += data[i + 1];
    b += data[i + 2];
    count++;
  }

  r = Math.floor(r / count);
  g = Math.floor(g / count);
  b = Math.floor(b / count);

  return `rgb(${r}, ${g}, ${b})`;
};

function App() {
  const [bpm, setBpm] = useState(null);
  const [spm1, setSpm1] = useState(null);
  const [songData, setSongData] = useState(null);
  const [timeSignature, setTimeSignature] = useState(null);
  const [playlistData, setPlaylistData] = useState(null);
  const [backgroundGradient, setBackgroundGradient] = useState("linear-gradient(135deg, #1DB954, #191414)");
  const { dispatch } = useContext(HistoryContext);
  const [showHistory, setShowHistory] = useState(false);

  const handleSelectHistoryItem = (item) => {
    if (item.type === 'playlist') {
      setPlaylistData(item);
      setSongData(null);
    } else {
      setSongData(item.songData);
      setBpm(item.bpm);
      setSpm1(item.spm1);
      setTimeSignature(item.timeSignature);
      setPlaylistData(null);
    }
    setShowHistory(false);
  };

  useEffect(() => {
    const updateBackgroundGradient = (imageUrl) => {
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.src = imageUrl;

      img.onload = () => {
        const avgColor = getAverageColor(img);
        setBackgroundGradient(`linear-gradient(135deg, ${avgColor}, #191414)`);
      };
    };

    if (playlistData && playlistData.image) {
      updateBackgroundGradient(playlistData.image);
    } else if (songData && songData.albumArt) {
      updateBackgroundGradient(songData.albumArt);
    } else {
      setBackgroundGradient("linear-gradient(135deg, #1DB954, #191414)");
    }
  }, [playlistData, songData]);

  const handleFetchSong = async (url) => {
    try {
      setPlaylistData(null);
      const trackId = extractSpotifyId(url);
      if (!trackId) return;

      const [{ bpm, timeSignature }] = await getTrackBPMs([trackId]);
      const [trackDetails] = await getTrackDetails([trackId]);
      const [spm1] = await getSPMData(bpm, timeSignature);

      setBpm(bpm);
      setSpm1(spm1);
      setSongData(trackDetails);
      setTimeSignature(timeSignature);

      dispatch({
        type: 'ADD_TO_HISTORY',
        payload: { url, bpm, spm1, timeSignature, songData: trackDetails, type: 'track' }
      });
    } catch (error) {
      console.error("Error fetching song information:", error);
    }
  };

  const handleFetchPlaylist = async (playlistUrl) => {
    try {
      setSongData(null);

      const playlistDetails = await getPlaylistDetails(playlistUrl);
      const trackIds = await getPlaylistTrackIds(playlistUrl);
      const trackBPMData = await getTrackBPMs(trackIds);
      const trackDetailsData = await getTrackDetails(trackIds);

      const combinedTrackData = await Promise.all(
        trackBPMData.map(async (bpmData) => {
          const details = trackDetailsData.find((detail) => detail.trackId === bpmData.trackId);
          const [spm1] = await getSPMData(bpmData.bpm, bpmData.timeSignature);
          return {
            ...bpmData,
            spm1,
            ...details,
          };
        })
      );

      const playlistData = {
        ...playlistDetails,
        tracks: combinedTrackData,
        type: 'playlist',
      };

      setPlaylistData(playlistData);

      dispatch({
        type: 'ADD_TO_HISTORY',
        payload: playlistData,
      });
    } catch (error) {
      console.error("Error fetching playlist information:", error);
    }
  };

  return (
    <Router>
    <div className="app-container" style={{ background: backgroundGradient }}>
      <div className="main-content">
        <div className="header">
          <img src="./logo512.png" alt="The BS Converter Logo" className="app-logo" />
          <h1>The BS Converter</h1>
          <SongForm onFetchSong={handleFetchSong} onFetchPlaylist={handleFetchPlaylist} />
        </div>
        {playlistData ? (
          <PlaylistResult playlistData={playlistData} />
        ) : (
          bpm && songData && <SongResult bpm={bpm} spm1={spm1} songData={songData} timeSignature={timeSignature} />
        )}
        <div>
        <button className="history-toggle-button" onClick={() => setShowHistory(!showHistory)}>
        {showHistory ? 'Hide History' : 'Show History'}
      </button>
        </div>
      </div>
  
      <RequestHistory
        isActive={showHistory}
        onSelectHistoryItem={handleSelectHistoryItem}
        onClose={() => setShowHistory(false)}
      />
    </div>
    </Router>
  );
}

export default App;
