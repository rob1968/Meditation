import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { getFullUrl, API_ENDPOINTS } from '../config/api';

const Statistics = ({ user, onBackToCreate }) => {
  const [stats, setStats] = useState(null);
  const [elevenlabsStats, setElevenlabsStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const { t } = useTranslation();

  useEffect(() => {
    if (user) {
      fetchUserStats();
      // Only fetch ElevenLabs stats for user 'rob'
      if (user.username === 'rob') {
        fetchElevenlabsStats();
      }
    }
  }, [user]);

  const fetchUserStats = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(getFullUrl(API_ENDPOINTS.USER_STATS(user.id)));
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching user stats:', error);
      setError(t('failedToLoadStats', 'Failed to load statistics'));
    } finally {
      setIsLoading(false);
    }
  };

  const fetchElevenlabsStats = async () => {
    try {
      const response = await axios.get(getFullUrl(`/api/auth/user/${user.id}/elevenlabs-stats`));
      setElevenlabsStats(response.data);
    } catch (error) {
      console.error('Error fetching ElevenLabs stats:', error);
    }
  };

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    
    if (hours > 0) {
      return `${hours}h ${remainingMinutes}m`;
    }
    return `${remainingMinutes}m`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (isLoading) {
    return (
      <div className="statistics-container">
        <div className="statistics-header">
          <button 
            className="back-to-create-btn" 
            onClick={onBackToCreate}
            title={t('backToCreate', 'Back')}
          >
            ← {t('backToCreate', 'Back')}
          </button>
          <h1>📊 {t('statistics', 'Statistics')}</h1>
        </div>
        <div className="loading-spinner">
          <div className="spinner"></div>
          {t('loading', 'Loading...')}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="statistics-container">
        <div className="statistics-header">
          <button 
            className="back-to-create-btn" 
            onClick={onBackToCreate}
            title={t('backToCreate', 'Back')}
          >
            ← {t('backToCreate', 'Back')}
          </button>
          <h1>📊 {t('statistics', 'Statistics')}</h1>
        </div>
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="statistics-container">
      <div className="statistics-header">
        <button 
          className="back-to-create-btn" 
          onClick={onBackToCreate}
          title={t('backToCreate', 'Back')}
        >
          ← {t('backToCreate', 'Back')}
        </button>
        <div className="statistics-title-section">
          <h1>📊 {t('statistics', 'Statistics')}</h1>
          <p className="statistics-subtitle">{t('viewMeditationStats', 'View your meditation statistics and progress')}</p>
        </div>
      </div>

      {stats && (
        <div className="statistics-main-section">
          {/* Overview Stats */}
          <div className="stats-overview-card">
            <h3>🧘 {t('meditationOverview', 'Meditation Overview')}</h3>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">🎵</div>
                <div className="stat-info">
                  <div className="stat-value">{stats.totalMeditations}</div>
                  <div className="stat-label">{t('totalMeditations', 'Total Meditations')}</div>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">⏰</div>
                <div className="stat-info">
                  <div className="stat-value">{formatTime(stats.totalTime)}</div>
                  <div className="stat-label">{t('totalTime', 'Total Time')}</div>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">🌍</div>
                <div className="stat-info">
                  <div className="stat-value">{stats.uniqueLanguages}</div>
                  <div className="stat-label">{t('languages', 'Languages')}</div>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">🎼</div>
                <div className="stat-info">
                  <div className="stat-value">{stats.totalAudioFiles}</div>
                  <div className="stat-label">{t('audioFiles', 'Audio Files')}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Meditation Types Breakdown */}
          <div className="meditation-breakdown-card">
            <h3>📈 {t('meditationBreakdown', 'Meditation Types Breakdown')}</h3>
            <div className="meditation-types-grid">
              {Object.entries(stats.meditationTypes).map(([type, count]) => (
                <div key={type} className="meditation-type-stat">
                  <div className="meditation-type-icon">
                    {type === 'sleep' && '😴'}
                    {type === 'stress' && '😌'}
                    {type === 'focus' && '🎯'}
                    {type === 'anxiety' && '🌸'}
                    {type === 'energy' && '⚡'}
                  </div>
                  <div className="meditation-type-info">
                    <div className="meditation-type-name">
                      {t(type, type.charAt(0).toUpperCase() + type.slice(1))}
                    </div>
                    <div className="meditation-type-count">
                      {count} {t('sessions', 'sessions')}
                    </div>
                  </div>
                  <div className="meditation-type-percentage">
                    {Math.round((count / stats.totalMeditations) * 100)}%
                  </div>
                </div>
              ))}
            </div>
            
            {stats.favoriteType && (
              <div className="favorite-type">
                <div className="favorite-icon">⭐</div>
                <div className="favorite-text">
                  <strong>{t('favoriteType', 'Favorite Type')}: </strong>
                  {t(stats.favoriteType, stats.favoriteType.charAt(0).toUpperCase() + stats.favoriteType.slice(1))}
                </div>
              </div>
            )}
          </div>

          {/* Progress Insights */}
          <div className="progress-insights-card">
            <h3>🎯 {t('progressInsights', 'Progress Insights')}</h3>
            <div className="insights-grid">
              <div className="insight-item">
                <div className="insight-icon">🔥</div>
                <div className="insight-content">
                  <div className="insight-title">{t('consistency', 'Consistency')}</div>
                  <div className="insight-description">
                    {stats.totalMeditations > 10 
                      ? t('greatConsistency', 'Great consistency! Keep up the regular practice.')
                      : t('buildConsistency', 'Build consistency with regular meditation sessions.')
                    }
                  </div>
                </div>
              </div>

              <div className="insight-item">
                <div className="insight-icon">📊</div>
                <div className="insight-content">
                  <div className="insight-title">{t('averageSession', 'Average Session')}</div>
                  <div className="insight-description">
                    {stats.totalMeditations > 0 
                      ? `${formatTime(Math.round(stats.totalTime / stats.totalMeditations))} ${t('perSession', 'per session')}`
                      : t('noSessionsYet', 'No sessions yet')
                    }
                  </div>
                </div>
              </div>

              <div className="insight-item">
                <div className="insight-icon">🌟</div>
                <div className="insight-content">
                  <div className="insight-title">{t('achievement', 'Achievement')}</div>
                  <div className="insight-description">
                    {stats.totalTime >= 60 
                      ? t('hourAchievement', 'You\'ve meditated for over an hour! 🎉')
                      : stats.totalMeditations >= 5
                      ? t('fiveSessionAchievement', 'Five meditation sessions completed! 🎊')
                      : t('justStarted', 'Your meditation journey has begun! 🌱')
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ElevenLabs Stats (only for rob) */}
          {user.username === 'rob' && elevenlabsStats && (
            <div className="elevenlabs-stats-card">
              <h3>🎤 {t('elevenLabsUsage', 'ElevenLabs Usage')}</h3>
              <div className="elevenlabs-grid">
                <div className="elevenlabs-stat">
                  <div className="stat-label">{t('charactersUsed', 'Characters Used (Total)')}</div>
                  <div className="stat-value">{elevenlabsStats.charactersUsedTotal?.toLocaleString() || 0}</div>
                </div>
                
                <div className="elevenlabs-stat">
                  <div className="stat-label">{t('charactersThisMonth', 'Characters This Month')}</div>
                  <div className="stat-value">{elevenlabsStats.charactersUsedThisMonth?.toLocaleString() || 0}</div>
                </div>
                
                <div className="elevenlabs-stat">
                  <div className="stat-label">{t('currentTier', 'Current Tier')}</div>
                  <div className="stat-value">{elevenlabsStats.currentTier?.name || t('free', 'Free')}</div>
                </div>
                
                <div className="elevenlabs-stat">
                  <div className="stat-label">{t('estimatedCost', 'Estimated Cost')}</div>
                  <div className="stat-value">${elevenlabsStats.estimatedCostThisMonth?.toFixed(2) || '0.00'}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Statistics;