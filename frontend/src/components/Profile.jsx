import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { getFullUrl, API_ENDPOINTS } from '../config/api';
import TTSTierInfo from './TTSTierInfo';

const Profile = ({ user, onLogout }) => {
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
      setError('Failed to load statistics');
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
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
    stress: t('stressMeditation', 'Stress Relief'),
    focus: t('focusMeditation', 'Focus'),
    anxiety: t('anxietyMeditation', 'Anxiety'),
    energy: t('energyMeditation', 'Energy')
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-avatar">👤</div>
        <h2>{user.username}</h2>
        <p>{t('memberSince', 'Member since')} {formatDate(user.createdAt)}</p>
      </div>

      {isLoading ? (
        <div className="loading-spinner">
          <div className="spinner"></div>
          {t('loading', 'Loading...')}
        </div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : stats ? (
        <>
          <div className="profile-stats">
            <div className="stat-card">
              <div className="stat-icon">🧘</div>
              <div className="stat-info">
                <div className="stat-label">{t('totalMeditations', 'Total Meditations')}</div>
                <div className="stat-value">{stats.totalMeditations}</div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">⏰</div>
              <div className="stat-info">
                <div className="stat-label">{t('totalTime', 'Total Time')}</div>
                <div className="stat-value">{formatTime(stats.totalTime)}</div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">🌍</div>
              <div className="stat-info">
                <div className="stat-label">{t('languages', 'Languages')}</div>
                <div className="stat-value">{stats.uniqueLanguages}</div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">🎵</div>
              <div className="stat-info">
                <div className="stat-label">{t('meditationFiles', 'Meditation Files')}</div>
                <div className="stat-value">{stats.totalAudioFiles}</div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">⭐</div>
              <div className="stat-info">
                <div className="stat-label">{t('favoriteType', 'Favorite Type')}</div>
                <div className="stat-value">{meditationTypeLabels[stats.favoriteType] || stats.favoriteType}</div>
              </div>
            </div>
          </div>

          {stats.meditationTypes && Object.keys(stats.meditationTypes).length > 0 && (
            <div className="meditation-breakdown">
              <h3>{t('meditationBreakdown', 'Meditation Breakdown')}</h3>
              <div className="breakdown-list">
                {Object.entries(stats.meditationTypes).map(([type, count]) => (
                  <div key={type} className="breakdown-item">
                    <div className="breakdown-type">
                      {meditationTypeLabels[type] || type}
                    </div>
                    <div className="breakdown-count">{count}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      ) : null}

      {/* TTS Tier Information - Only for user 'rob' */}
      {user.username === 'rob' && <TTSTierInfo />}

      <div className="profile-actions">
        <button 
          onClick={onLogout} 
          className="logout-button-full"
        >
          {t('logout', 'Logout')}
        </button>
      </div>
    </div>
  );
};

export default Profile;