import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import './i18n';
import './styles/globals.css';

const App = () => {
  const [text, setText] = useState("");
  const [meditationType, setMeditationType] = useState("sleep");
  const [duration, setDuration] = useState(5); // Duration in minutes
  const [background, setBackground] = useState("ocean");
  const [voiceId, setVoiceId] = useState("EXAVITQu4vr4xnSDxMaL");
  const [voices, setVoices] = useState([]);
  const [audioUrl, setAudioUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  // Dropdown states
  const [languageOpen, setLanguageOpen] = useState(false);
  const [backgroundOpen, setBackgroundOpen] = useState(false);
  const [voiceOpen, setVoiceOpen] = useState(false);

  const { t, i18n } = useTranslation();


  const generateAIMeditationText = async (type, duration, currentLanguage) => {
    try {
      const response = await axios.post('http://localhost:5002/api/meditation/generate-text', {
        type,
        duration,
        language: currentLanguage
      });
      
      return response.data.text;
    } catch (error) {
      console.error('Error calling meditation text API:', error);
      // Fallback to a simple default text if API is completely unavailable
      return `Take a deep breath and relax. Focus on your breathing and let go of any tension. You are at peace and in control.`;
    }
  };

  const generateRandomMeditationText = (type, duration, currentLanguage) => {
    // Use AI generation instead of fixed templates
    return generateAIMeditationText(type, duration, currentLanguage);
  };

  const selectMeditationType = async (type) => {
    setMeditationType(type);
    setIsLoading(true);
    try {
      const newText = await generateRandomMeditationText(type, duration, i18n.language);
      setText(newText);
    } catch (error) {
      console.error('Error generating meditation text:', error);
      setText(`Take a deep breath and relax. Focus on your breathing and let go of any tension. You are at peace and in control.`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDurationChange = async (newDuration) => {
    setDuration(newDuration);
    if (text) {
      setIsLoading(true);
      try {
        // Regenerate text with new duration
        const newText = await generateRandomMeditationText(meditationType, newDuration, i18n.language);
        setText(newText);
      } catch (error) {
        console.error('Error generating meditation text:', error);
        setText(`Take a deep breath and relax. Focus on your breathing and let go of any tension. You are at peace and in control.`);
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Initialize with a random sleep meditation on first load
  useEffect(() => {
    if (!text) {
      selectMeditationType('sleep');
    }
  }, [text]);

  // Update text when UI language changes
  useEffect(() => {
    if (text && meditationType) {
      const updateText = async () => {
        setIsLoading(true);
        try {
          const newText = await generateRandomMeditationText(meditationType, duration, i18n.language);
          setText(newText);
        } catch (error) {
          console.error('Error generating meditation text:', error);
          setText(`Take a deep breath and relax. Focus on your breathing and let go of any tension. You are at peace and in control.`);
        } finally {
          setIsLoading(false);
        }
      };
      updateText();
    }
  }, [i18n.language]);

  const generate = async () => {
    setIsLoading(true);
    setError("");
    try {
      const res = await axios.post('http://localhost:5002/api/meditation', {
        text,
        background,
        language: i18n.language,
        voiceId
      }, { responseType: 'blob' });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      setAudioUrl(url);
    } catch (error) {
      console.error("Error generating meditation:", error);
      setError(t('errorGenerating') || "Failed to generate meditation. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchVoices = async () => {
    try {
      const res = await axios.get('http://localhost:5002/api/meditation/voices');
      setVoices(res.data);
    } catch (error) {
      console.error("Error fetching voices:", error);
    }
  };

  useEffect(() => {
    fetchVoices();
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.custom-select')) {
        setLanguageOpen(false);
        setBackgroundOpen(false);
        setVoiceOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const uiLanguages = [
    { value: 'en', label: '🇬🇧 English' },
    { value: 'es', label: '🇪🇸 Español' },
    { value: 'fr', label: '🇫🇷 Français' },
    { value: 'de', label: '🇩🇪 Deutsch' },
    { value: 'nl', label: '🇳🇱 Nederlands' },
    { value: 'zh', label: '🇨🇳 中文' },
    { value: 'hi', label: '🇮🇳 हिन्दी' },
    { value: 'ar', label: '🇸🇦 العربية' },
    { value: 'pt', label: '🇵🇹 Português' },
    { value: 'ru', label: '🇷🇺 Русский' },
    { value: 'ja', label: '🇯🇵 日本語' },
    { value: 'ko', label: '🇰🇷 한국어' },
    { value: 'it', label: '🇮🇹 Italiano' },
  ];

  const meditationTypes = [
    { type: 'sleep', icon: '🌙', label: t('sleepMeditation') },
    { type: 'stress', icon: '😌', label: t('stressMeditation') },
    { type: 'focus', icon: '🎯', label: t('focusMeditation') },
    { type: 'anxiety', icon: '🌿', label: t('anxietyMeditation') },
    { type: 'energy', icon: '⚡', label: t('energyMeditation') }
  ];

  const backgroundOptions = [
    { value: 'rain', label: '🌧️ ' + t('rain') },
    { value: 'ocean', label: '🌊 ' + t('ocean') },
    { value: 'forest', label: '🌲 ' + t('forest') },
    { value: 'white-noise', label: '🔇 ' + t('white-noise') },
    { value: 'wind-chimes', label: '🎐 ' + t('wind-chimes') },
    { value: 'singing-bowls', label: '🎵 ' + t('singing-bowls') },
    { value: 'heartbeat', label: '💓 ' + t('heartbeat') },
    { value: 'birds', label: '🐦 ' + t('birds') },
    { value: 'stream', label: '🏞️ ' + t('stream') }
  ];

  return (
    <div className="container">
      <div className="header">
        <div className="language-selector">
          <div className="custom-select">
            <div className="select-button language-btn" onClick={() => setLanguageOpen(!languageOpen)}>
              <span>{uiLanguages.find(lang => lang.value === i18n.language)?.label || 'Language'}</span>
              <span>▼</span>
            </div>
            {languageOpen && (
              <div className="select-options open">
                {uiLanguages.map(language => (
                  <div 
                    key={language.value}
                    className="select-option" 
                    onClick={() => {
                      i18n.changeLanguage(language.value);
                      setLanguageOpen(false);
                    }}
                  >
                    {language.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="icon">🧘</div>
        <h1 className="title">{t('title')}</h1>
        <p className="subtitle">{t('subtitle')}</p>
      </div>

      <div className="section">
        <h2 className="section-title">🎯 {t('meditationType')}</h2>
        <div className="meditation-types">
          {meditationTypes.map((meditation) => (
            <div
              key={meditation.type}
              className={`meditation-type ${meditationType === meditation.type ? 'active' : ''}`}
              onClick={() => selectMeditationType(meditation.type)}
            >
              <span className="emoji">{meditation.icon}</span>
              <div className="label">{meditation.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="section">
        <h2 className="section-title">⏰ {t('duration')}</h2>
        <div className="duration-container">
          <div className="duration-display">
            <div className="duration-value">{duration}</div>
            <div className="duration-label">{t('minutes')}</div>
          </div>
          <div className="slider-container">
            <div className="slider-track" style={{width: `${((duration - 1) / 19) * 100}%`}}></div>
            <input 
              type="range" 
              min="1" 
              max="20" 
              value={duration} 
              className="slider"
              onChange={(e) => handleDurationChange(parseInt(e.target.value))}
            />
          </div>
          <div className="quick-times">
            {[3, 5, 10, 15, 20].map(time => (
              <div 
                key={time}
                className={`quick-time ${duration === time ? 'active' : ''}`}
                onClick={() => handleDurationChange(time)}
              >
                {time} {t('min')}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="section">
        <h2 className="section-title">🎵 {t('backgroundLabel')}</h2>
        <div className="custom-select">
          <div className="select-button" onClick={() => setBackgroundOpen(!backgroundOpen)}>
            <span>{backgroundOptions.find(bg => bg.value === background)?.label || 'Background'}</span>
            <span>▼</span>
          </div>
          {backgroundOpen && (
            <div className="select-options open">
              {backgroundOptions.map(bg => (
                <div 
                  key={bg.value}
                  className="select-option" 
                  onClick={() => {
                    setBackground(bg.value);
                    setBackgroundOpen(false);
                  }}
                >
                  {bg.label}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="section">
        <h2 className="section-title">✨ {t('textLabel')}</h2>
        <textarea 
          className="text-area"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={t('textPlaceholder')}
        />
      </div>

      <div className="section">
        <h2 className="section-title">🎤 {t('voiceLabel')}</h2>
        <div className="custom-select">
          <div className="select-button" onClick={() => setVoiceOpen(!voiceOpen)}>
            <span>{voices.find(v => v.voice_id === voiceId)?.name || 'Voice'}</span>
            <span>▼</span>
          </div>
          {voiceOpen && (
            <div className="select-options open">
              {voices.map(voice => (
                <div 
                  key={voice.voice_id}
                  className="select-option" 
                  onClick={() => {
                    setVoiceId(voice.voice_id);
                    setVoiceOpen(false);
                  }}
                >
                  {voice.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <button 
        className="generate-btn"
        onClick={generate}
        disabled={isLoading}
      >
        {isLoading ? (
          <div className="loading-spinner">
            <div className="spinner"></div>
            {t('generating')}
          </div>
        ) : (
          t('generateButton')
        )}
      </button>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {audioUrl && (
        <div className="player-section">
          <div className="player-title">{t('audioTitle')}</div>
          <audio controls style={{width: '100%', marginTop: '16px'}}>
            <source src={audioUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
    </div>
  );
};

export default App;