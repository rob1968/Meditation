import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { getFullUrl } from '../config/api';

const TTSTierInfo = () => {
  const [tierInfo, setTierInfo] = useState(null);
  const [pricing, setPricing] = useState(null);
  const [estimate, setEstimate] = useState(null);
  const [alerts, setAlerts] = useState(null);
  const [recommendations, setRecommendations] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [showDetails, setShowDetails] = useState(false);
  const [dailyRequests, setDailyRequests] = useState(100);
  const [avgChars, setAvgChars] = useState(500);
  const { t } = useTranslation();

  useEffect(() => {
    fetchTierInfo();
    fetchPricing();
    fetchAlerts();
    fetchRecommendations();
  }, []);

  useEffect(() => {
    if (dailyRequests > 0 && avgChars > 0) {
      calculateEstimate();
    }
  }, [dailyRequests, avgChars]);

  const fetchTierInfo = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(getFullUrl('/api/google-tts-info'));
      setTierInfo(response.data.data);
    } catch (error) {
      console.error('Error fetching TTS tier info:', error);
      setError('Failed to load TTS tier information');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPricing = async () => {
    try {
      const response = await axios.get(getFullUrl('/api/google-tts-info/pricing'));
      setPricing(response.data.data);
    } catch (error) {
      console.error('Error fetching pricing info:', error);
    }
  };

  const fetchAlerts = async () => {
    try {
      const response = await axios.get(getFullUrl('/api/google-tts-info/alerts'));
      setAlerts(response.data.data);
    } catch (error) {
      console.error('Error fetching alerts:', error);
    }
  };

  const fetchRecommendations = async () => {
    try {
      const response = await axios.get(getFullUrl('/api/google-tts-info/recommendations'));
      setRecommendations(response.data.data);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    }
  };

  const calculateEstimate = async () => {
    try {
      const response = await axios.post(getFullUrl('/api/google-tts-info/estimate'), {
        dailyRequests: parseInt(dailyRequests),
        avgCharactersPerRequest: parseInt(avgChars)
      });
      setEstimate(response.data.data);
    } catch (error) {
      console.error('Error calculating estimate:', error);
    }
  };

  const getTierBadgeColor = (tier) => {
    switch (tier) {
      case 'free': return '#10B981'; // Green
      case 'standard': return '#3B82F6'; // Blue  
      case 'premium': return '#8B5CF6'; // Purple
      default: return '#6B7280'; // Gray
    }
  };

  const getTierDisplayName = (tier) => {
    switch (tier) {
      case 'free': return 'Free Tier';
      case 'standard': return 'Standard';
      case 'premium': return 'Premium';
      default: return 'Unknown';
    }
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat().format(num);
  };

  const getAlertIcon = (severity) => {
    switch (severity) {
      case 'critical': return '🚨';
      case 'warning': return '⚠️';
      case 'info': return 'ℹ️';
      default: return '📋';
    }
  };

  const getAlertColor = (severity) => {
    switch (severity) {
      case 'critical': return '#dc2626';
      case 'warning': return '#d97706';
      case 'info': return '#2563eb';
      default: return '#6b7280';
    }
  };

  if (isLoading) {
    return (
      <div className="tts-tier-info loading">
        <div className="spinner"></div>
        <span>Loading TTS information...</span>
      </div>
    );
  }

  if (error || !tierInfo) {
    return (
      <div className="tts-tier-info error">
        <div className="error-icon">⚠️</div>
        <span>{error || 'Unable to load TTS information'}</span>
      </div>
    );
  }

  return (
    <div className="tts-tier-info">
      <div className="tts-header">
        <h3>🗣️ Google Cloud TTS</h3>
        <button 
          className="details-toggle"
          onClick={() => setShowDetails(!showDetails)}
        >
          {showDetails ? '▼' : '▶'} Details
        </button>
      </div>

      <div className="tts-overview">
        <div className="tier-badge" style={{ backgroundColor: getTierBadgeColor(tierInfo.tier) }}>
          {getTierDisplayName(tierInfo.tier)}
        </div>
        
        <div className="project-info">
          <span className="project-label">Project:</span>
          <span className="project-id">{tierInfo.projectId}</span>
        </div>

        {tierInfo.usage && (
          <div className="usage-summary">
            <div className="usage-item">
              <span className="usage-label">24h Requests:</span>
              <span className="usage-value">{formatNumber(tierInfo.usage.requests)}</span>
            </div>
          </div>
        )}
      </div>

      {/* Quota Alerts */}
      {alerts && alerts.alerts && alerts.alerts.length > 0 && (
        <div className="quota-alerts">
          {alerts.alerts.map((alert, index) => (
            <div 
              key={index} 
              className={`alert ${alert.severity}`}
              style={{ borderLeftColor: getAlertColor(alert.severity) }}
            >
              <div className="alert-header">
                <span className="alert-icon">{getAlertIcon(alert.severity)}</span>
                <span className="alert-message">{alert.message}</span>
              </div>
              {alert.recommendation && (
                <div className="alert-recommendation">
                  {alert.recommendation}
                </div>
              )}
              {alert.actionUrl && (
                <a 
                  href={alert.actionUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="alert-action"
                >
                  Take Action →
                </a>
              )}
            </div>
          ))}
        </div>
      )}

      {showDetails && (
        <div className="tts-details">
          {/* Pricing Information */}
          {pricing && (
            <div className="pricing-section">
              <h4>💰 Pricing</h4>
              <div className="pricing-grid">
                <div className="pricing-card free">
                  <div className="pricing-header">
                    <span className="pricing-type">Free Tier</span>
                    <span className="pricing-cost">Free</span>
                  </div>
                  <div className="pricing-limit">{pricing.free_tier?.limit}</div>
                </div>
                
                <div className="pricing-card wavenet">
                  <div className="pricing-header">
                    <span className="pricing-type">WaveNet</span>
                    <span className="pricing-cost">{pricing.wavenet?.price}</span>
                  </div>
                  <div className="pricing-desc">{pricing.wavenet?.description}</div>
                </div>
              </div>
            </div>
          )}

          {/* Usage Estimator */}
          <div className="estimator-section">
            <h4>📊 Monthly Usage Estimator</h4>
            <div className="estimator-inputs">
              <div className="input-group">
                <label htmlFor="dailyRequests">Daily Requests:</label>
                <input
                  id="dailyRequests"
                  type="number"
                  value={dailyRequests}
                  onChange={(e) => setDailyRequests(e.target.value)}
                  min="0"
                  max="10000"
                />
              </div>
              
              <div className="input-group">
                <label htmlFor="avgChars">Avg Characters:</label>
                <input
                  id="avgChars"
                  type="number"
                  value={avgChars}
                  onChange={(e) => setAvgChars(e.target.value)}
                  min="0"
                  max="10000"
                />
              </div>
            </div>

            {estimate && (
              <div className="estimate-results">
                <div className="estimate-item">
                  <span>Monthly Requests:</span>
                  <span>{formatNumber(estimate.monthlyRequests)}</span>
                </div>
                <div className="estimate-item">
                  <span>Monthly Characters:</span>
                  <span>{formatNumber(estimate.monthlyCharacters)}</span>
                </div>
                <div className="estimate-item">
                  <span>Free Characters:</span>
                  <span>{formatNumber(estimate.freeCharacters)}</span>
                </div>
                <div className="estimate-item">
                  <span>Paid Characters:</span>
                  <span>{formatNumber(estimate.paidCharacters)}</span>
                </div>
                <div className="estimate-item total">
                  <span>Estimated Cost:</span>
                  <span>${estimate.estimatedCost} USD</span>
                </div>
              </div>
            )}
          </div>

          {/* Service Status */}
          <div className="service-status">
            <h4>🔧 Service Status</h4>
            <div className="status-grid">
              <div className="status-item">
                <span>Service Enabled:</span>
                <span className={tierInfo.service?.enabled ? 'status-enabled' : 'status-disabled'}>
                  {tierInfo.service?.enabled ? '✅ Yes' : '❌ No'}
                </span>
              </div>
              <div className="status-item">
                <span>Voice Quality:</span>
                <span>🎵 WaveNet (Premium)</span>
              </div>
              <div className="status-item">
                <span>Supported Languages:</span>
                <span>🌍 12 Languages</span>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          {recommendations && recommendations.length > 0 && (
            <div className="recommendations-section">
              <h4>💡 Recommendations</h4>
              <div className="recommendations-list">
                {recommendations.map((rec, index) => (
                  <div key={index} className="recommendation-card">
                    <div className="recommendation-header">
                      <h5>{rec.title}</h5>
                    </div>
                    <p className="recommendation-description">{rec.description}</p>
                    {rec.actions && rec.actions.length > 0 && (
                      <ul className="recommendation-actions">
                        {rec.actions.map((action, actionIndex) => (
                          <li key={actionIndex}>{action}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="quick-actions">
            <a 
              href={`https://console.cloud.google.com/apis/api/texttospeech.googleapis.com/quotas?project=${tierInfo.projectId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="action-link"
            >
              📊 View Quotas in Console
            </a>
            <a 
              href={`https://console.cloud.google.com/billing?project=${tierInfo.projectId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="action-link"
            >
              💳 View Billing
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default TTSTierInfo;