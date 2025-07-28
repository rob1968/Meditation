import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { getFullUrl, API_ENDPOINTS } from '../config/api';

const Statistics = ({ user }) => {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const { t } = useTranslation();

  useEffect(() => {
    if (user) {
      fetchUserStats();
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

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    
    if (hours > 0) {
      return `${hours}h ${remainingMinutes}m`;
    }
    return `${remainingMinutes}m`;
  };

  const meditationTypeLabels = {
    sleep: t('sleepMeditation', 'Sleep'),
    stress: t('stressMeditation', 'Stress'),
    focus: t('focusMeditation', 'Focus'),
    anxiety: t('anxietyMeditation', 'Anxiety'),
    energy: t('energyMeditation', 'Energy'),
    mindfulness: t('mindfulnessMeditation', 'Mindfulness')
  };

  const getTypeEmoji = (type) => {
    const emojiMap = {
      sleep: '😴',
      stress: '🧘‍♀️',
      focus: '🎯',
      anxiety: '💚',
      energy: '⚡',
      mindfulness: '🧘'
    };
    return emojiMap[type] || '🧘';
  };

  const getTypeGradient = (type) => {
    const gradientMap = {
      sleep: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      stress: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      focus: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      anxiety: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      energy: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      mindfulness: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
    };
    return gradientMap[type] || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
  };

  if (isLoading) {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
        {t('loading', 'Loading...')}
      </div>
    );
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="statistics-section">
      <div className="statistics-header">
        <h3>📊 {t('statistics', 'Statistics')}</h3>
        <p className="statistics-subtitle">{t('memberSince', 'Member since')} {new Date(user.createdAt).toLocaleDateString()}</p>
      </div>
      
      <div className="statistics-overview">
        <div className="stats-grid">
          <div className="stat-card primary">
            <div className="stat-card-header">
              <div className="stat-icon">🧘</div>
              <div className="stat-label">{t('totalMeditations', 'Total Meditations')}</div>
            </div>
            <div className="stat-value large">{stats?.totalMeditations || 0}</div>
            <div className="stat-progress">
              <div className="stat-progress-bar" style={{width: `${Math.min((stats?.totalMeditations || 0) / 100 * 100, 100)}%`}}></div>
            </div>
          </div>

          <div className="stat-card secondary">
            <div className="stat-card-header">
              <div className="stat-icon">⏰</div>
              <div className="stat-label">{t('totalTime', 'Total Time')}</div>
            </div>
            <div className="stat-value large">{stats ? formatTime(stats.totalTime) : t('zeroMinutes', '0m')}</div>
            <div className="stat-sublabel">{t('minutesOfMeditation', 'minutes of meditation')}</div>
          </div>

          <div className="stat-card accent">
            <div className="stat-card-header">
              <div className="stat-icon">🌍</div>
              <div className="stat-label">{t('languages', 'Languages')}</div>
            </div>
            <div className="stat-value large">{stats?.uniqueLanguages || 0}</div>
            <div className="stat-sublabel">{t('differentLanguages', 'different languages')}</div>
          </div>

          <div className="stat-card success">
            <div className="stat-card-header">
              <div className="stat-icon">🎵</div>
              <div className="stat-label">{t('meditationFiles', 'Audio Files')}</div>
            </div>
            <div className="stat-value large">{stats?.totalAudioFiles || 0}</div>
            <div className="stat-sublabel">{t('audioFilesCreated', 'files created')}</div>
          </div>
        </div>
      </div>

      <div className="statistics-details">
        <div className="stat-detail-card">
          <div className="stat-detail-header">
            <div className="stat-detail-icon">⭐</div>
            <h4>{t('favoriteType', 'Favorite Type')}</h4>
          </div>
          <div className="favorite-type-display">
            <div className="favorite-type-name">
              {stats ? (meditationTypeLabels[stats.favoriteType] || stats.favoriteType || t('noData', 'No data')) : t('noData', 'No data')}
            </div>
            <div className="favorite-type-badge">
              {stats?.favoriteType && getTypeEmoji(stats.favoriteType)}
            </div>
          </div>
        </div>

        {stats && stats.meditationTypes && Object.keys(stats.meditationTypes).length > 0 && (
          <div className="stat-detail-card">
            <div className="stat-detail-header">
              <div className="stat-detail-icon">📈</div>
              <h4>{t('meditationBreakdown', 'Meditation Breakdown')}</h4>
            </div>
            <div className="breakdown-chart">
              {Object.entries(stats.meditationTypes)
                .sort(([,a], [,b]) => b - a)
                .map(([type, count]) => {
                  const percentage = ((count / (stats?.totalMeditations || 1)) * 100).toFixed(1);
                  return (
                    <div key={type} className="breakdown-item">
                      <div className="breakdown-item-header">
                        <div className="breakdown-type">
                          <span className="breakdown-emoji">{getTypeEmoji(type)}</span>
                          <span className="breakdown-name">{meditationTypeLabels[type] || type}</span>
                        </div>
                        <div className="breakdown-stats">
                          <span className="breakdown-count">{count}</span>
                          <span className="breakdown-percentage">({percentage}%)</span>
                        </div>
                      </div>
                      <div className="breakdown-progress">
                        <div 
                          className="breakdown-progress-bar" 
                          style={{
                            width: `${percentage}%`,
                            background: getTypeGradient(type)
                          }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Statistics;