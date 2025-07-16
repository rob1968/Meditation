import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import './i18n';
import './styles/globals.css';
import Auth from './components/Auth';
import BottomNavigation from './components/BottomNavigation';
import MyAudio from './components/MyAudio';
import Profile from './components/Profile';

const App = () => {
  const [text, setText] = useState("");
  const [meditationType, setMeditationType] = useState("sleep");
  const [duration, setDuration] = useState(5); // Duration in minutes (3, 5, 10, or 15)
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
  
  // Use UI language only for audio generation
  const [generatedText, setGeneratedText] = useState('');
  const [showTextPreview, setShowTextPreview] = useState(false);
  const [audioFiles, setAudioFiles] = useState([]);
  const [generationProgress, setGenerationProgress] = useState([]);
  
  // User authentication state
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('create');


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

  const generateTextPreview = async () => {
    try {
      const generated = await generateAIMeditationText(meditationType, duration, i18n.language);
      setGeneratedText(generated);
      setText(generated);
      setError('');
    } catch (error) {
      console.error('Error generating text preview:', error);
      setError(error.response?.data?.error || 'Failed to generate meditation text. Please check your OpenAI API configuration.');
      setText('');
      setGeneratedText('');
    }
  };

  const selectMeditationType = (type) => {
    setMeditationType(type);
  };

  const handleDurationChange = (newDuration) => {
    setDuration(newDuration);
  };

  // Clear text when meditation type or duration changes
  useEffect(() => {
    setText('');
    setGeneratedText('');
    setShowTextPreview(false);
  }, [meditationType, duration, i18n.language]);

  // Check for existing user session on app start
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    setActiveTab('create');
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setActiveTab('create');
  };

  const generateAudio = async () => {
    setIsLoading(true);
    setError("");
    setAudioFiles([]);
    
    try {
      const res = await axios.post('http://localhost:5002/api/meditation', {
        text: text,
        background,
        language: i18n.language,
        audioLanguage: i18n.language,
        voiceId,
        meditationType,
        duration,
        userId: user?.id
      }, { responseType: 'blob' });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      setAudioUrl(url);
      setAudioFiles([{
        language: i18n.language,
        url: url,
        label: audioLanguages.find(lang => lang.value === i18n.language)?.label || i18n.language
      }]);
    } catch (error) {
      console.error("Error generating meditation:", error);
      setError(t('errorGenerating') || "Failed to generate meditation. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateClick = () => {
    generateTextPreview().then(() => {
      setShowTextPreview(true);
    });
  };

  const handleTextApproved = () => {
    setShowTextPreview(false);
    generateAudio();
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

  const audioLanguages = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Español' },
    { value: 'fr', label: 'Français' },
    { value: 'de', label: 'Deutsch' },
    { value: 'nl', label: 'Nederlands' },
    { value: 'zh', label: '中文' },
    { value: 'hi', label: 'हिन्दी' },
    { value: 'ar', label: 'العربية' },
    { value: 'pt', label: 'Português' },
    { value: 'ru', label: 'Русский' },
    { value: 'ja', label: '日本語' },
    { value: 'ko', label: '한국어' },
    { value: 'it', label: 'Italiano' },
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

  // Show auth screen if no user is logged in
  if (!user) {
    return <Auth onLogin={handleLogin} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'myAudio':
        return <MyAudio user={user} />;
      case 'profile':
        return <Profile user={user} onLogout={handleLogout} />;
      default:
        return (
          <div className="create-content">
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
        <div className="duration-buttons">
          {[3, 5, 10, 15].map(time => (
            <div 
              key={time}
              className={`duration-button ${duration === time ? 'active' : ''}`}
              onClick={() => handleDurationChange(time)}
            >
              <div className="duration-time">{time}</div>
              <div className="duration-unit">{t('min')}</div>
            </div>
          ))}
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
          placeholder={t('textPlaceholder') || 'Meditation text will be generated when you click Generate...'}
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


      {showTextPreview ? (
        <div className="text-preview-section">
          <h3 className="section-title">✏️ {t('textPreview', 'Text Preview')}</h3>
          <div className="preview-buttons">
            <button 
              className="approve-btn"
              onClick={handleTextApproved}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="loading-spinner">
                  <div className="spinner"></div>
                  {t('generating')}
                </div>
              ) : (
                t('generateAudio', 'Generate Audio')
              )}
            </button>
            <button 
              className="edit-btn"
              onClick={() => setShowTextPreview(false)}
            >
              {t('editText', 'Edit Text')}
            </button>
          </div>
        </div>
      ) : (
        <button 
          className="generate-btn"
          onClick={handleGenerateClick}
          disabled={isLoading}
        >
          {t('previewText', 'Preview Text')}
        </button>
      )}


      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {audioUrl && (
        <div className="player-section">
          <div className="player-title">{t('audioTitle')}</div>
          <audio controls style={{width: '100%'}}>
            <source src={audioUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
          </div>
        );
    }
  };

  return (
    <div className="app-container">
      <div className="main-content">
        {renderContent()}
      </div>
      <BottomNavigation 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        user={user}
        onLogout={handleLogout}
      />
    </div>
  );
};

export default App;