import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { getFullUrl } from '../config/api';

const Credits = ({ user, onBackToCreate }) => {
  const [credits, setCredits] = useState(null);
  const [creditHistory, setCreditHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCreditHistory, setShowCreditHistory] = useState(false);
  const [error, setError] = useState('');
  const { t } = useTranslation();

  useEffect(() => {
    if (user) {
      fetchUserCredits();
    }
  }, [user]);

  const fetchUserCredits = async () => {
    if (!user?.id) return;
    
    try {
      setIsLoading(true);
      const response = await axios.get(getFullUrl(`/api/auth/user/${user.id}/credits`));
      setCredits(response.data);
    } catch (error) {
      console.error('Error fetching user credits:', error);
      setError(t('failedToLoadStats', 'Failed to load credit information'));
    } finally {
      setIsLoading(false);
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

  if (isLoading) {
    return (
      <div className="credits-container">
        <div className="credits-header">
          <button 
            className="back-to-create-btn" 
            onClick={onBackToCreate}
            title={t('backToCreate', 'Back')}
          >
            ← {t('backToCreate', 'Back')}
          </button>
          <h1>💳 {t('credits', 'Credits')}</h1>
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
      <div className="credits-container">
        <div className="credits-header">
          <button 
            className="back-to-create-btn" 
            onClick={onBackToCreate}
            title={t('backToCreate', 'Back')}
          >
            ← {t('backToCreate', 'Back')}
          </button>
          <h1>💳 {t('credits', 'Credits')}</h1>
        </div>
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="credits-container">
      <div className="credits-header">
        <button 
          className="back-to-create-btn" 
          onClick={onBackToCreate}
          title={t('backToCreate', 'Back to Create')}
        >
          ← {t('backToCreate', 'Back')}
        </button>
        <div className="credits-title-section">
          <h1>💳 {t('credits', 'Credits')}</h1>
          <p className="credits-subtitle">{t('manageCredits', 'Manage your meditation credits')}</p>
        </div>
      </div>

      {credits && (
        <div className="credits-main-section">
          {/* Current Balance Card */}
          <div className="credits-balance-card">
            <div className="balance-header">
              <div className="balance-icon">💎</div>
              <div className="balance-info">
                <h2>{t('availableCredits', 'Available Credits')}</h2>
                <p className="balance-description">{t('creditsDescription', 'Use credits to generate meditation audio')}</p>
              </div>
            </div>
            
            <div className="balance-amount">
              <span className="credit-number">{credits.credits}</span>
              <span className="credit-label">{t('credits', 'Credits')}</span>
            </div>
            
            {credits.credits < 3 && (
              <div className="low-credits-warning">
                <div className="warning-icon">⚠️</div>
                <div className="warning-text">
                  <strong>{t('lowCreditsTitle', 'Low Credits!')}</strong>
                  <p>{t('lowCreditsWarning', 'You need credits to generate meditations. Consider purchasing more.')}</p>
                </div>
              </div>
            )}
          </div>

          {/* Purchase Credits Card */}
          <div className="purchase-credits-card">
            <div className="purchase-header">
              <h3>🛒 {t('buyCredits', 'Buy Credits')}</h3>
              <p>{t('purchaseDescription', 'Get more credits to create unlimited meditations')}</p>
            </div>
            
            <div className="credit-packages">
              <div className="credit-package">
                <div className="package-credits">10</div>
                <div className="package-label">{t('credits', 'Credits')}</div>
                <div className="package-price">€5.99</div>
                <button className="package-btn" onClick={() => alert(t('paymentComingSoon', 'Payment system coming soon!'))}>
                  {t('selectPackage', 'Select')}
                </button>
              </div>
              
              <div className="credit-package popular">
                <div className="package-badge">{t('popular', 'Popular')}</div>
                <div className="package-credits">25</div>
                <div className="package-label">{t('credits', 'Credits')}</div>
                <div className="package-price">€12.99</div>
                <div className="package-savings">€2 {t('savings', 'savings')}</div>
                <button className="package-btn" onClick={() => alert(t('paymentComingSoon', 'Payment system coming soon!'))}>
                  {t('selectPackage', 'Select')}
                </button>
              </div>
              
              <div className="credit-package">
                <div className="package-credits">50</div>
                <div className="package-label">{t('credits', 'Credits')}</div>
                <div className="package-price">€19.99</div>
                <div className="package-savings">€10 {t('savings', 'savings')}</div>
                <button className="package-btn" onClick={() => alert(t('paymentComingSoon', 'Payment system coming soon!'))}>
                  {t('selectPackage', 'Select')}
                </button>
              </div>
            </div>
          </div>

          {/* Credits Overview */}
          <div className="credits-overview-card">
            <h3>📊 {t('creditsOverview', 'Credits Overview')}</h3>
            <div className="credits-stats-grid">
              <div className="credit-stat-item">
                <div className="stat-icon">📈</div>
                <div className="stat-content">
                  <div className="stat-value">{credits.totalCreditsEarned}</div>
                  <div className="stat-label">{t('totalEarned', 'Total Earned')}</div>
                </div>
              </div>
              
              <div className="credit-stat-item">
                <div className="stat-icon">📉</div>
                <div className="stat-content">
                  <div className="stat-value">{credits.totalCreditsSpent}</div>
                  <div className="stat-label">{t('totalSpent', 'Total Spent')}</div>
                </div>
              </div>
              
              <div className="credit-stat-item">
                <div className="stat-icon">🎵</div>
                <div className="stat-content">
                  <div className="stat-value">{credits.totalCreditsSpent}</div>
                  <div className="stat-label">{t('meditationsGenerated', 'Meditations Generated')}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Credit History */}
          <div className="credit-history-card">
            <div className="history-header">
              <h3>📋 {t('creditHistory', 'Credit History')}</h3>
              <button 
                className="toggle-history-btn"
                onClick={() => {
                  setShowCreditHistory(!showCreditHistory);
                  if (!showCreditHistory && creditHistory.length === 0) {
                    fetchCreditHistory();
                  }
                }}
              >
                {showCreditHistory ? 
                  `📤 ${t('hideHistory', 'Hide History')}` : 
                  `📋 ${t('viewHistory', 'View History')}`
                }
              </button>
            </div>
            
            {showCreditHistory && (
              <div className="credit-history-content">
                {creditHistory.length === 0 ? (
                  <div className="no-transactions">
                    <div className="no-transactions-icon">📝</div>
                    <p>{t('noTransactions', 'No transactions yet.')}</p>
                  </div>
                ) : (
                  <div className="credit-transactions">
                    {creditHistory.map((transaction, index) => (
                      <div key={index} className="credit-transaction">
                        <div className="transaction-icon">
                          {transaction.type === 'initial' && '🎁'}
                          {transaction.type === 'generation' && '🎵'}
                          {transaction.type === 'sharing' && '🌟'}
                          {transaction.type === 'purchase' && '💳'}
                          {transaction.type === 'bonus' && '🎉'}
                        </div>
                        <div className="transaction-info">
                          <div className="transaction-description">{transaction.description}</div>
                          <div className="transaction-date">{formatDate(transaction.createdAt)}</div>
                        </div>
                        <div className={`transaction-amount ${transaction.amount > 0 ? 'positive' : 'negative'}`}>
                          {transaction.amount > 0 ? '+' : ''}{transaction.amount}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Credits;