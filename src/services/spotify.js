import axios from 'axios';

const getSpotifyToken = async () => {
  const response = await axios.post(
    'https://accounts.spotify.com/api/token',
    { grant_type: 'client_credentials' },
    {
      headers: {
        Authorization: `Basic ${btoa(
          process.env.REACT_APP_SPOTIFY_CLIENT_ID + ':' + process.env.REACT_APP_SPOTIFY_CLIENT_SECRET
        )}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  );
  return response.data.access_token;
};

// Helper function to extract the Playlist ID from a URL
const extractPlaylistID = (url) => {
  const regex = /(?:https:\/\/open\.spotify\.com\/playlist\/|spotify:playlist:)([a-zA-Z0-9]+)/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

// Helper function to extract the Track ID from a URL
export const extractSpotifyId = (url) => {
  const regex = /(?:https:\/\/open\.spotify\.com\/track\/|spotify:track:)([a-zA-Z0-9]+)/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

// Function to get playlist details (name, description, and cover image)
export const getPlaylistDetails = async (playlistUrl) => {
  try {
    const token = await getSpotifyToken();
    const playlistId = extractPlaylistID(playlistUrl);

    const response = await axios.get(`https://api.spotify.com/v1/playlists/${playlistId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const playlistData = {
      name: response.data.name,
      description: response.data.description,
      image: response.data.images[0]?.url, // Use the first image if available
    };

    console.log('Playlist Details:', playlistData); // Log for debugging
    return playlistData;
  } catch (error) {
    console.error('Error fetching playlist details from Spotify:', error);
    throw error;
  }
};

// Function to get track IDs from a playlist
export const getPlaylistTrackIds = async (playlistUrl) => {
  try {
    const token = await getSpotifyToken();
    const playlistId = extractPlaylistID(playlistUrl);

    const response = await axios.get(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const trackIds = response.data.items.map((item) => item.track.id);
    console.log('Track IDs from Spotify:', trackIds); // Log for debugging
    return trackIds;
  } catch (error) {
    console.error('Error fetching track IDs from Spotify:', error);
    throw error;
  }
};

// Function to get BPM (tempo) and time signature for a single track or multiple tracks
export const getTrackBPMs = async (trackIds) => {
  try {
    const token = await getSpotifyToken();

    // If trackIds is a single string, convert it to an array for consistency
    if (typeof trackIds === 'string') {
      trackIds = [trackIds];
    }

    const requests = trackIds.map((trackId) =>
      axios.get(`https://api.spotify.com/v1/audio-features/${trackId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    );

    const responses = await Promise.all(requests);
    const trackData = responses.map((response) => ({
      bpm: Math.round(response.data.tempo),
      timeSignature: response.data.time_signature,
      trackId: response.data.id,
    }));

    console.log('BPM and Time Signature Data:', trackData); // Log for debugging
    return trackData;
  } catch (error) {
    console.error('Error fetching BPM from Spotify:', error);
    throw error;
  }
};

// Function to get track details (title, artist, album, album art) for a single track or multiple tracks
export const getTrackDetails = async (trackIds) => {
  try {
    const token = await getSpotifyToken();

    // If trackIds is a single string, convert it to an array for consistency
    if (typeof trackIds === 'string') {
      trackIds = [trackIds];
    }

    const requests = trackIds.map((trackId) =>
      axios.get(`https://api.spotify.com/v1/tracks/${trackId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    );

    const responses = await Promise.all(requests);
    const trackDetails = responses.map((response) => ({
      title: response.data.name,
      artist: response.data.artists[0].name,
      album: response.data.album.name,
      albumArt: response.data.album.images[0].url,
      trackId: response.data.id,
    }));

    console.log('Track Details from Spotify:', trackDetails); // Log for debugging
    return trackDetails;
  } catch (error) {
    console.error('Error fetching track details from Spotify:', error);
    throw error;
  }
};
