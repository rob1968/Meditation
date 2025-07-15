# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a full-stack meditation audio generation application that:
- Takes user text input for meditation content
- Converts text to speech using Eleven Labs API
- Mixes speech with background nature sounds (ocean, forest, rain)
- Processes audio to slow down speech for a meditative effect
- Supports 5 languages (English, German, Spanish, French, Dutch)

## Architecture

### Backend (Node.js/Express)
- **Server**: `/backend/server.js` - Express server on port 5002
- **Routes**: `/backend/routes/meditation.js` - Handles audio generation
- **Database**: MongoDB via Mongoose (connection string in .env)
- **Audio Processing**: Uses FFmpeg for slowing speech and mixing audio
- **Logging**: Access logs to `backend/access.log`, errors to `routes/error.log`

### Frontend (React)
- **Entry**: `/frontend/src/App.jsx` - Main application component
- **Components**: 
  - `MeditationForm.jsx` - User input form
  - `AudioPlayer.jsx` - Audio playback interface
- **API URL**: Hardcoded to `http://localhost:5002`
- **i18n**: Multi-language support via react-i18next

## Common Commands

### Initial Setup
```bash
npm run install-all      # Install all dependencies (root, backend, and frontend)
```

### Running the Full Application
```bash
npm start               # Start both backend (port 5002) and frontend (port 3000) in production mode
npm run dev             # Start both in development mode (backend with auto-restart on changes)
```

### Individual Development
```bash
npm run backend         # Start only the backend server
npm run frontend        # Start only the frontend React app
```

### Manual Setup (if needed)
```bash
cd backend && npm install && npm start    # Backend only
cd frontend && npm install && npm start   # Frontend only
```

## Key Configuration

### Environment Variables (backend/.env)
- `ELEVEN_LABS_API_KEY`: API key for text-to-speech
- `MONGODB_URI`: MongoDB connection string
- `PORT`: Server port (defaults to 5002)

### Important Paths
- **FFmpeg**: Currently hardcoded to `C:\\Program Files\\ffmpeg-windows-x64\\bin\\ffmpeg.exe` in `routes/meditation.js`
- **Temp files**: Created in `/temp` directory
- **Audio assets**: Background sounds in `/assets` directory

## Critical Notes

1. **FFmpeg Path**: The FFmpeg executable path is Windows-specific and hardcoded. When deploying or running on different systems, update the path in `backend/routes/meditation.js`

2. **API Endpoint**: Frontend expects backend at `http://localhost:5002`. Update in `frontend/src/MeditationForm.jsx` for production.

3. **Temp File Cleanup**: The application creates temporary audio files in `/temp`. Ensure proper cleanup mechanisms are in place.

4. **No Tests**: Currently no test suite exists. Consider adding tests when implementing new features.

5. **Audio Processing Flow**:
   - User text → Eleven Labs TTS → Slow down audio with FFmpeg
   - Mix slowed speech with background sound → Return final audio file