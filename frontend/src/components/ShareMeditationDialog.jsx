import React, { useState } from 'react';

const ShareMeditationDialog = ({ meditation, onShare, onClose, isSharing, t }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  if (!meditation) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() && description.trim()) {
      onShare(meditation.id, { title: title.trim(), description: description.trim() });
    }
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

  return (
    <div className="share-dialog-overlay">
      <div className="share-dialog">
        <div className="share-dialog-header">
          <h3>🌟 {t('shareMeditation', 'Share Your Meditation')}</h3>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="share-dialog-content">
          <div className="meditation-preview">
            <div className="preview-info">
              <div className="preview-type">
                {meditationTypeLabels[meditation.meditationType] || meditation.meditationType}
              </div>
              <div className="preview-language">
                🗣️ {meditation.language}
              </div>
              <div className="preview-duration">
                ⏰ {meditation.audioFiles && meditation.audioFiles[0] && meditation.audioFiles[0].duration 
                     ? `${Math.floor(meditation.audioFiles[0].duration / 60)}:${(meditation.audioFiles[0].duration % 60).toString().padStart(2, '0')}`
                     : t('unknown', 'Unknown')}
              </div>
            </div>
            <div className="preview-text">
              {meditation.text.substring(0, 150)}
              {meditation.text.length > 150 && '...'}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="share-form">
            <div className="form-group">
              <label htmlFor="share-title">
                {t('title', 'Title')} *
              </label>
              <input
                id="share-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={t('enterTitle', 'Enter a catchy title for your meditation...')}
                maxLength={100}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="share-description">
                {t('description', 'Description')} *
              </label>
              <textarea
                id="share-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={t('enterDescription', 'Describe what makes this meditation special...')}
                maxLength={500}
                rows={4}
                required
              />
            </div>

            <div className="share-info">
              <p>ℹ️ {t('shareInfo', 'Your meditation will be reviewed and published to the community within 24 hours.')}</p>
            </div>

            <div className="form-actions">
              <button 
                type="button" 
                className="cancel-btn"
                onClick={onClose}
                disabled={isSharing}
              >
                {t('cancel', 'Cancel')}
              </button>
              <button 
                type="submit" 
                className="share-submit-btn"
                disabled={isSharing || !title.trim() || !description.trim()}
              >
                {isSharing ? (
                  <>
                    <div className="spinner-small"></div>
                    {t('sharing', 'Sharing...')}
                  </>
                ) : (
                  <>🌟 {t('shareNow', 'Share Now')}</>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ShareMeditationDialog;