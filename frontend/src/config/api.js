// API Configuration
const getApiUrl = () => {
  // Use environment variable if available
  if (process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL;
  }
  
  // Auto-detect based on current window location
  const hostname = window.location.hostname;
  const port = 5002;
  
  // If accessing via localhost, use localhost
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return `http://localhost:${port}`;
  }
  
  // Otherwise use the same hostname as the frontend
  return `http://${hostname}:${port}`;
};

export const API_BASE_URL = getApiUrl();

// API endpoints
export const API_ENDPOINTS = {
  // Auth endpoints
  REGISTER: '/api/auth/register',
  LOGIN: '/api/auth/login',
  USER_MEDITATIONS: (userId) => `/api/auth/user/${userId}/meditations`,
  USER_STATS: (userId) => `/api/auth/user/${userId}/stats`,
  UPLOAD_IMAGE: (meditationId) => `/api/auth/meditation/${meditationId}/upload-image`,
  DELETE_IMAGE: (meditationId) => `/api/auth/meditation/${meditationId}/custom-image`,
  
  // Meditation endpoints
  GENERATE_TEXT: '/api/meditation/generate-text',
  GENERATE_MEDITATION: '/api/meditation',
  GET_VOICES: '/api/meditation/voices',
  VOICE_PREVIEW: '/api/meditation/voice-preview',
  
  // Asset endpoints
  MEDITATION_AUDIO: (filename) => `/assets/meditations/${filename}`,
  CUSTOM_IMAGE: (filename) => `/assets/images/custom/${filename}`,
  DEFAULT_IMAGE: (type) => `/assets/images/${type}.jpg`,
};

// Helper function to get full URL
export const getFullUrl = (endpoint) => {
  return `${API_BASE_URL}${endpoint}`;
};

// Helper function to get asset URL
export const getAssetUrl = (assetPath) => {
  return `${API_BASE_URL}${assetPath}`;
};