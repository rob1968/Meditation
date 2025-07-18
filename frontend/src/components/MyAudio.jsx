import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const MyAudio = ({ user, isGenerating }) => {
  const [meditations, setMeditations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [playingMeditationId, setPlayingMeditationId] = useState(null);
  const { t } = useTranslation();
  const prevIsGenerating = useRef(isGenerating);

  useEffect(() => {
    if (user) {
      fetchUserMeditations();
    }
  }, [user]);

  // Refresh only when generation completes (goes from true to false)
  useEffect(() => {
    if (prevIsGenerating.current === true && isGenerating === false && user) {
      // Generation just completed, refresh the list
      const timer = setTimeout(() => {
        fetchUserMeditations();
      }, 1000);
      
      return () => clearTimeout(timer);
    }
    
    // Update the ref for next render
    prevIsGenerating.current = isGenerating;
  }, [isGenerating, user]);

  const fetchUserMeditations = async () => {
    try {
      // Only show loading on initial load, not on refresh
      if (meditations.length === 0) {
        setIsLoading(true);
      }
      const response = await axios.get(`http://localhost:5002/api/auth/user/${user.id}/meditations`);
      setMeditations(response.data.meditations);
    } catch (error) {
      console.error('Error fetching meditations:', error);
      setError('Failed to load your meditations');
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatDuration = (minutes) => {
    return `${minutes} ${t('minutes', 'minutes')}`;
  };

  const meditationTypeLabels = {
    sleep: t('sleepMeditation', 'Sleep'),
    stress: t('stressMeditation', 'Stress Relief'),
    focus: t('focusMeditation', 'Focus'),
    anxiety: t('anxietyMeditation', 'Anxiety'),
    energy: t('energyMeditation', 'Energy'),
    mindfulness: t('mindfulnessMeditation', 'Mindfulness'),
    compassion: t('compassionMeditation', 'Compassion'),
    walking: t('walkingMeditation', 'Walking'),
    breathing: t('breathingMeditation', 'Breathing'),
    morning: t('morningMeditation', 'Morning')
  };

  const meditationTypeImages = {
    sleep: 'http://localhost:5002/assets/images/sleep.jpg',
    stress: 'http://localhost:5002/assets/images/stress.jpg',
    focus: 'http://localhost:5002/assets/images/focus.jpg',
    anxiety: 'http://localhost:5002/assets/images/anxiety.jpg',
    energy: 'http://localhost:5002/assets/images/energy.jpg',
    mindfulness: 'http://localhost:5002/assets/images/mindfulness.jpg',
    compassion: 'http://localhost:5002/assets/images/compassion.jpg',
    walking: 'http://localhost:5002/assets/images/walking.jpg',
    breathing: 'http://localhost:5002/assets/images/breathing.jpg',
    morning: 'http://localhost:5002/assets/images/morning.jpg'
  };

  if (isLoading) {
    return (
      <div className="my-audio-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          {t('loading', 'Loading...')}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="my-audio-container">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="my-audio-container">
      <div className="my-audio-header">
        <h2>{t('myAudio', 'My Audio')}</h2>
        <p>{t('myAudioSubtitle', 'Your meditation history')}</p>
      </div>

      {isGenerating && (
        <div className="generation-status">
          <div className="loading-spinner">
            <div className="spinner"></div>
            {t('generating', 'Generating your meditation...')}
          </div>
        </div>
      )}

      {meditations.length === 0 && !isGenerating ? (
        <div className="empty-state">
          <div className="empty-icon">🎵</div>
          <h3>{t('noMeditations', 'No meditations yet')}</h3>
          <p>{t('createFirst', 'Create your first meditation to see it here')}</p>
        </div>
      ) : meditations.length > 0 && (
        <div className="meditations-list">
          {meditations.map((meditation) => (
            <div key={meditation._id} className="meditation-card">
              <div className="meditation-thumbnail">
                <img 
                  src={meditationTypeImages[meditation.meditationType] || meditationTypeImages.sleep}
                  alt={meditationTypeLabels[meditation.meditationType] || meditation.meditationType}
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>

              <div className="meditation-details">
                <div className="meditation-header">
                  <div className="meditation-type">
                    {meditationTypeLabels[meditation.meditationType] || meditation.meditationType}
                  </div>
                  <div className="meditation-date">
                    {formatDate(meditation.createdAt)}
                  </div>
                </div>
                
                <div className="meditation-info">
                  <span className="meditation-duration">
                    ⏰ {formatDuration(meditation.duration)}
                  </span>
                  <span className="meditation-language">
                    🗣️ {meditation.originalLanguage}
                  </span>
                </div>

                <div className="meditation-text">
                  {meditation.originalText.substring(0, 150)}
                  {meditation.originalText.length > 150 && '...'}
                </div>
              </div>

              <div className="meditation-controls">
                <button 
                  className="play-button"
                  onClick={() => {
                    if (meditation.audioFiles && meditation.audioFiles.length > 0) {
                      const audio = document.querySelector(`#audio-${meditation._id}`);
                      if (audio) {
                        if (audio.paused) {
                          // Pause all other audios first
                          document.querySelectorAll('audio').forEach(a => a.pause());
                          audio.play()
                            .then(() => {
                              setPlayingMeditationId(meditation._id);
                            })
                            .catch(err => {
                              console.error('Error playing audio:', err);
                            });
                        } else {
                          audio.pause();
                          setPlayingMeditationId(null);
                        }
                      }
                    }
                  }}
                  disabled={!meditation.audioFiles || meditation.audioFiles.length === 0}
                >
                  <span className="play-icon">{playingMeditationId === meditation._id ? '⏸️' : '▶️'}</span>
                </button>
              </div>

              {meditation.audioFiles && meditation.audioFiles.length > 0 && (
                <div className="audio-files-hidden">
                  {meditation.audioFiles.map((audioFile, index) => (
                    <audio 
                      key={index} 
                      id={index === 0 ? `audio-${meditation._id}` : `audio-${meditation._id}-${index}`}
                      preload="none"
                      onEnded={() => setPlayingMeditationId(null)}
                      onPause={() => {
                        if (playingMeditationId === meditation._id) {
                          setPlayingMeditationId(null);
                        }
                      }}
                    >
                      <source 
                        src={`http://localhost:5002/assets/meditations/${audioFile.filename}`} 
                        type="audio/mpeg" 
                      />
                      {t('audioNotSupported', 'Your browser does not support the audio element.')}
                    </audio>
                  ))}
                  <div className="audio-info-minimal">
                    <span className="audio-count">{meditation.audioFiles.length} {t('audioFiles', 'audio file(s)')}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAudio;