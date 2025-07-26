import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { getFullUrl, API_ENDPOINTS } from '../config/api';

const Profile = ({ user, onLogout, onBackToCreate }) => {
  const [stats, setStats] = useState(null);
  const [credits, setCredits] = useState(null);
  const [creditHistory, setCreditHistory] = useState([]);
  const [elevenlabsStats, setElevenlabsStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCreditHistory, setShowCreditHistory] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (user) {
      fetchUserStats();
      fetchUserCredits();
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

  const fetchUserCredits = async () => {
    try {
      const response = await axios.get(getFullUrl(`/api/auth/user/${user.id}/credits`));
      setCredits(response.data);
    } catch (error) {
      console.error('Error fetching user credits:', error);
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

  const fetchCreditHistory = async () => {
    try {
      const response = await axios.get(getFullUrl(`/api/auth/user/${user.id}/credit-history`));
      setCreditHistory(response.data.transactions);
    } catch (error) {
      console.error('Error fetching credit history:', error);
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
    stress: t('stressMeditation', 'Stress'),
    focus: t('focusMeditation', 'Focus'),
    anxiety: t('anxietyMeditation', 'Anxiety'),
    energy: t('energyMeditation', 'Energy')
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <button 
          className="back-to-create-btn" 
          onClick={onBackToCreate}
          title={t('backToCreate', 'Back to Create')}
        >
          ← {t('backToCreate', 'Back')}
        </button>
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
          {/* Credits Section */}
          {credits && (
            <div className="credits-section">
              <div className="credits-header">
                <h3>💎 {t('credits', 'Credits')}</h3>
                <button 
                  className="credits-purchase-btn"
                  onClick={() => alert(t('paymentComingSoon', 'Payment system coming soon!'))}
                >
                  {t('buyCredits', 'Buy Credits')}
                </button>
              </div>
              
              <div className="credits-display">
                <div className="credits-main">
                  <div className="credits-balance">
                    <span className="credits-amount">{credits.credits}</span>
                    <span className="credits-label">{t('availableCredits', 'Available Credits')}</span>
                  </div>
                  
                  {credits.credits < 3 && (
                    <div className="credits-warning">
                      ⚠️ {t('lowCreditsWarning', 'Low credits! Consider purchasing more.')}
                    </div>
                  )}
                </div>
                
                <div className="credits-stats">
                  <div className="credit-stat">
                    <span className="stat-label">{t('totalEarned', 'Total Earned')}</span>
                    <span className="stat-value">{credits.totalCreditsEarned}</span>
                  </div>
                  <div className="credit-stat">
                    <span className="stat-label">{t('totalSpent', 'Total Spent')}</span>
                    <span className="stat-value">{credits.totalCreditsSpent}</span>
                  </div>
                </div>
                
                <button 
                  className="credit-history-btn"
                  onClick={() => {
                    setShowCreditHistory(!showCreditHistory);
                    if (!showCreditHistory && creditHistory.length === 0) {
                      fetchCreditHistory();
                    }
                  }}
                >
                  {showCreditHistory ? '📤 ' + t('hideHistory', 'Hide History') : '📋 ' + t('viewHistory', 'View History')}
                </button>
                
                {showCreditHistory && (
                  <div className="credit-history">
                    <h4>{t('creditHistory', 'Credit History')}</h4>
                    {creditHistory.length === 0 ? (
                      <p>{t('noTransactions', 'No transactions yet.')}</p>
                    ) : (
                      <div className="credit-transactions">
                        {creditHistory.map((transaction, index) => (
                          <div key={index} className="credit-transaction">
                            <div className="transaction-info">
                              <span className="transaction-type">
                                {transaction.type === 'initial' && '🎁'}
                                {transaction.type === 'generation' && '🎵'}
                                {transaction.type === 'sharing' && '🌟'}
                                {transaction.type === 'purchase' && '💳'}
                                {transaction.type === 'bonus' && '🎉'}
                                {transaction.description}
                              </span>
                              <span className="transaction-date">
                                {formatDate(transaction.createdAt)}
                              </span>
                            </div>
                            <span className={`transaction-amount ${transaction.amount > 0 ? 'positive' : 'negative'}`}>
                              {transaction.amount > 0 ? '+' : ''}{transaction.amount}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

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


      {/* ElevenLabs Credits Display - Only for user 'rob' */}
      {user.username === 'rob' && elevenlabsStats && (
        <div className="elevenlabs-credits-display">
          <h3 style={{ color: 'var(--text-primary)', marginBottom: 'var(--space-lg)' }}>
            🔊 ElevenLabs Credits
          </h3>
          <div className="credits-info">
            <span className="credits-icon">🔊</span>
            <div className="credits-text">
              <div className="credits-remaining">
                {elevenlabsStats.currentTier?.limit ? 
                  (elevenlabsStats.currentTier.limit - elevenlabsStats.charactersUsedThisMonth).toLocaleString() :
                  '∞'
                } tekens over
              </div>
              <div className="credits-tier">{elevenlabsStats.currentTier?.name || 'Free'} tier</div>
            </div>
          </div>
          {elevenlabsStats.lastReset && (
            <div style={{ fontSize: '14px', color: 'var(--text-secondary)', textAlign: 'center', marginTop: 'var(--space-sm)' }}>
              Monthly stats reset on: {new Date(elevenlabsStats.lastReset).toLocaleDateString()}
            </div>
          )}
        </div>
      )}

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