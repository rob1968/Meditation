import React from 'react';
import { useTranslation } from 'react-i18next';

const ReviewStep = ({ wizardData, voices, savedCustomBackgrounds }) => {
  const { t, i18n } = useTranslation();

  const getVoiceName = (voiceId) => {
    const voice = voices.find(v => v.voice_id === voiceId);
    return voice ? voice.name : voiceId;
  };

  const getBackgroundInfo = (background) => {
    if (wizardData.useBackgroundMusic) {
      const savedBg = savedCustomBackgrounds.find(bg => {
        // Check both filename and saved-id format
        return bg.filename.replace('.mp3', '') === background || 
               `saved-${bg.id}` === background;
      });
      
      if (savedBg) {
        // Return both icon and name
        return {
          icon: savedBg.icon || '🎵',
          name: savedBg.isSystemBackground 
            ? t(savedBg.filename.replace('.mp3', ''), savedBg.customName)
            : savedBg.customName
        };
      }
      
      // For system backgrounds without metadata (fallback)
      const backgroundIcons = {
        ocean: '🌊',
        forest: '🌲',
        rain: '🌧️'
      };
      
      return {
        icon: backgroundIcons[background] || '🎵',
        name: background.charAt(0).toUpperCase() + background.slice(1)
      };
    }
    
    return {
      icon: '🚫',
      name: t('noBackground', 'Geen achtergrond')
    };
  };

  const meditationTypes = {
    sleep: t('sleepMeditation', 'Sleep'),
    stress: t('stressMeditation', 'Stress'),
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
    <div className="review-step">
      <div className="review-header">
        <p className="review-subtitle">
          {t('reviewDescription', 'Controleer je keuzes voordat je de audio genereert')}
        </p>
      </div>

      <div className="review-sections">
        {/* Meditation Type */}
        <div className="review-section">
          <div className="review-section-header">
            <div className="review-icon">🧘</div>
            <h3>{t('meditationType', 'Meditatie Type')}</h3>
          </div>
          <div className="review-content">
            <span className="review-value">
              {meditationTypes[wizardData.meditationType] || wizardData.meditationType}
            </span>
          </div>
        </div>

        {/* Language */}
        <div className="review-section">
          <div className="review-section-header">
            <div className="review-icon">🌍</div>
            <h3>{t('languageLabel', 'Language')}</h3>
          </div>
          <div className="review-content">
            <span className="review-value">
              {(() => {
                const languageMap = {
                  'en': 'English',
                  'nl': 'Nederlands',
                  'de': 'Deutsch',
                  'es': 'Español',
                  'fr': 'Français',
                  'it': 'Italiano',
                  'pt': 'Português',
                  'ru': 'Русский',
                  'ja': '日本語',
                  'ko': '한국어',
                  'zh': '中文',
                  'ar': 'العربية',
                  'hi': 'हिन्दी'
                };
                return languageMap[i18n.language] || i18n.language;
              })()}
            </span>
          </div>
        </div>

        {/* Text */}
        <div className="review-section">
          <div className="review-section-header">
            <div className="review-icon">📝</div>
            <h3>{t('textLabel', 'Meditatie Tekst')}</h3>
          </div>
          <div className="review-content">
            <div className="text-preview text-preview-scrollable">
              {wizardData.text}
            </div>
            <div className="text-stats">
              {t('textLength', '{{count}} karakters', { count: wizardData.text.length })}
            </div>
          </div>
        </div>

        {/* Voice */}
        <div className="review-section">
          <div className="review-section-header">
            <div className="review-icon">🎤</div>
            <h3>{t('voiceLabel', 'Voice')}</h3>
          </div>
          <div className="review-content">
            <div className="voice-info">
              <span className="review-value">{getVoiceName(wizardData.voiceId)}</span>
              <span className="voice-tempo">
                {t('tempo', 'Tempo')}: {wizardData.speechTempo}x
              </span>
            </div>
          </div>
        </div>

        {/* Background */}
        <div className="review-section">
          <div className="review-section-header">
            <div className="review-icon">🎵</div>
            <h3>{t('backgroundMusicLabel', 'Background Music')}</h3>
          </div>
          <div className="review-content">
            <span className="review-value">
              {(() => {
                const bgInfo = getBackgroundInfo(wizardData.background);
                return (
                  <>
                    <span style={{ marginRight: '8px' }}>{bgInfo.icon}</span>
                    {bgInfo.name}
                  </>
                );
              })()}
            </span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ReviewStep;