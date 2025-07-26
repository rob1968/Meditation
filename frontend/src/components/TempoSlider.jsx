import React from 'react';
import { useTranslation } from 'react-i18next';

const TempoSlider = ({ speechTempo, onTempoChange }) => {
  const { t } = useTranslation();

  const tempoValues = [0.75, 0.80, 0.85, 0.90, 0.95, 1.00, 1.05, 1.10];
  
  const getTempoDescription = (value) => {
    if (value <= 0.80) return t('verySlowTempo', 'Zeer langzaam');
    if (value <= 0.90) return t('slowTempo', 'Langzaam');
    if (value <= 1.00) return t('normalTempo', 'Normaal');
    return t('fastTempo', 'Sneller');
  };

  const getTempoEmoji = (value) => {
    if (value <= 0.80) return '🐌';
    if (value <= 0.90) return '🚶';
    if (value <= 1.00) return '⚡';
    return '🏃';
  };

  const handleSliderChange = (e) => {
    const index = parseInt(e.target.value);
    const value = tempoValues[index];
    onTempoChange(value);
  };

  const currentIndex = tempoValues.findIndex(val => val === speechTempo);

  return (
    <div className="tempo-slider-container">
      <div className="section-title">
        <span className="tempo-icon">🎵</span>
        {t('speechTempo', 'Speech Tempo')}
      </div>
      
      <div className="tempo-description">
        {t('tempoDescription', 'Choose the speech speed for your ideal meditation experience')}
      </div>
      
      <div className="tempo-slider-wrapper">
        <div className="tempo-slider-track">
          <input
            type="range"
            min="0"
            max={tempoValues.length - 1}
            value={currentIndex}
            onChange={handleSliderChange}
            className="tempo-slider-input"
            step="1"
          />
          <div className="tempo-marks">
            {tempoValues.map((value, index) => (
              <div 
                key={value} 
                className={`tempo-mark ${index === currentIndex ? 'active' : ''}`}
                style={{ left: `${(index / (tempoValues.length - 1)) * 100}%` }}
              >
                <div className="tempo-mark-value">{value}x</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="tempo-current">
        <div className="tempo-display">
          <span className="tempo-emoji">{getTempoEmoji(speechTempo)}</span>
          <span className="current-tempo-value">{speechTempo}x</span>
          <span className="current-tempo-description">{getTempoDescription(speechTempo)}</span>
        </div>
      </div>
    </div>
  );
};

export default TempoSlider;