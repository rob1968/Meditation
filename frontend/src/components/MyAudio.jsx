import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const MyAudio = ({ user }) => {
  const [meditations, setMeditations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const { t } = useTranslation();

  useEffect(() => {
    if (user) {
      fetchUserMeditations();
    }
  }, [user]);

  const fetchUserMeditations = async () => {
    try {
      setIsLoading(true);
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
    energy: t('energyMeditation', 'Energy')
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

      {meditations.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🎵</div>
          <h3>{t('noMeditations', 'No meditations yet')}</h3>
          <p>{t('createFirst', 'Create your first meditation to see it here')}</p>
        </div>
      ) : (
        <div className="meditations-list">
          {meditations.map((meditation) => (
            <div key={meditation._id} className="meditation-card">
              <div className="meditation-header">
                <div className="meditation-type">
                  {meditationTypeLabels[meditation.meditationType] || meditation.meditationType}
                </div>
                <div className="meditation-date">
                  {formatDate(meditation.createdAt)}
                </div>
              </div>
              
              <div className="meditation-info">
                <div className="meditation-duration">
                  ⏰ {formatDuration(meditation.duration)}
                </div>
                <div className="meditation-language">
                  🗣️ {meditation.originalLanguage}
                </div>
              </div>

              <div className="meditation-text">
                {meditation.originalText.substring(0, 150)}
                {meditation.originalText.length > 150 && '...'}
              </div>

              {meditation.audioFiles && meditation.audioFiles.length > 0 && (
                <div className="audio-files">
                  <h4>{t('audioFiles', 'Audio Files')}</h4>
                  {meditation.audioFiles.map((audioFile, index) => (
                    <div key={index} className="audio-file">
                      <div className="audio-info">
                        <span className="audio-language">{audioFile.language}</span>
                        <span className="audio-background">{audioFile.background}</span>
                      </div>
                      <audio controls>
                        <source 
                          src={`http://localhost:5002/assets/meditations/${audioFile.filename}`} 
                          type="audio/mpeg" 
                        />
                        {t('audioNotSupported', 'Your browser does not support the audio element.')}
                      </audio>
                    </div>
                  ))}
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