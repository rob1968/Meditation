import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import './i18n';
import './styles/globals.css';
import Auth from './components/Auth';
import BottomNavigation from './components/BottomNavigation';
import MyAudio from './components/MyAudio';
import Profile from './components/Profile';
import VoiceSlider from './components/VoiceSlider';
import MeditationTypeSlider from './components/MeditationTypeSlider';
import BackgroundSlider from './components/BackgroundSlider';
import { getFullUrl, getAssetUrl, API_ENDPOINTS } from './config/api';

const App = () => {
  const [text, setText] = useState("");
  const [meditationType, setMeditationType] = useState("sleep");
  const [background, setBackground] = useState("ocean");
  const [voiceId, setVoiceId] = useState("EXAVITQu4vr4xnSDxMaL");
  const [voices, setVoices] = useState([]);
  const [audioUrl, setAudioUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGeneratingText, setIsGeneratingText] = useState(false);
  const [error, setError] = useState("");
  
  // Dropdown states
  const [languageOpen, setLanguageOpen] = useState(false);
  
  const { t, i18n } = useTranslation();
  
  // Use UI language only for audio generation
  const [generatedText, setGeneratedText] = useState('');
  const [showTextPreview, setShowTextPreview] = useState(false);
  const [audioFiles, setAudioFiles] = useState([]);
  const [generationProgress, setGenerationProgress] = useState([]);
  
  // User authentication state
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('create');


  const generateAIMeditationText = async (type, currentLanguage) => {
    try {
      const response = await axios.post(getFullUrl(API_ENDPOINTS.GENERATE_TEXT), {
        type,
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
    console.log('Starting text generation...');
    setIsGeneratingText(true);
    setError('');
    try {
      // Add a small delay to ensure spinner is visible (templates are very fast)
      await new Promise(resolve => setTimeout(resolve, 500));
      const generated = await generateAIMeditationText(meditationType, i18n.language);
      setGeneratedText(generated);
      setText(generated);
      setError('');
    } catch (error) {
      console.error('Error generating text preview:', error);
      setError(error.response?.data?.error || 'Failed to generate meditation text. Please check your Claude API configuration.');
      setText('');
      setGeneratedText('');
    } finally {
      console.log('Text generation finished');
      setIsGeneratingText(false);
    }
  };

  const selectMeditationType = (type) => {
    setMeditationType(type);
  };

  // Clear text when meditation type changes
  useEffect(() => {
    setText('');
    setGeneratedText('');
    setShowTextPreview(false);
  }, [meditationType, i18n.language]);

  // Check for existing user session and language preference on app start
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    
    // Load saved language preference
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
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
    // Note: We keep the language preference even after logout
  };

  const handleLanguageChange = (languageCode) => {
    i18n.changeLanguage(languageCode);
    localStorage.setItem('selectedLanguage', languageCode);
  };

  const generateAudio = async () => {
    setIsLoading(true);
    setError("");
    setAudioFiles([]);
    setActiveTab('myAudio'); // Switch to My Audio tab when generation starts
    
    try {
      const res = await axios.post(getFullUrl(API_ENDPOINTS.GENERATE_MEDITATION), {
        text: text,
        background,
        language: i18n.language,
        audioLanguage: i18n.language,
        voiceId,
        meditationType,
        userId: user?.id
      }, { responseType: 'blob' });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      setAudioUrl(url);
      setAudioFiles([{
        language: i18n.language,
        url: url,
        label: audioLanguages.find(lang => lang.value === i18n.language)?.label || i18n.language
      }]);
      
      // Clear the form after successful generation
      setText("");
      setGeneratedText("");
      setShowTextPreview(false);
      setMeditationType("sleep");
      setBackground("ocean");
      setAudioUrl(""); // Clear audio URL as it's no longer needed on create page
    } catch (error) {
      console.error("Error generating meditation:", error);
      setError(t('errorGenerating') || "Failed to generate meditation. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateClick = async () => {
    setShowTextPreview(true);
    await generateTextPreview();
  };

  const handleTextApproved = () => {
    setShowTextPreview(false);
    generateAudio();
  };

  const fetchVoices = async () => {
    try {
      const res = await axios.get(getFullUrl(API_ENDPOINTS.GET_VOICES));
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


  // Show auth screen if no user is logged in
  if (!user) {
    return <Auth onLogin={handleLogin} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'myAudio':
        return <MyAudio user={user} isGenerating={isLoading} />;
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
                            handleLanguageChange(language.value);
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
            </div>

      <MeditationTypeSlider 
        selectedType={meditationType}
        onTypeSelect={selectMeditationType}
      />


      <BackgroundSlider 
        selectedBackground={background}
        onBackgroundSelect={setBackground}
        meditationType={meditationType}
      />


      <VoiceSlider 
        voices={voices}
        selectedVoiceId={voiceId}
        onVoiceSelect={setVoiceId}
      />


      {!showTextPreview && (
        <button 
          className="generate-btn"
          onClick={handleGenerateClick}
          disabled={isGeneratingText || isLoading}
        >
          {isGeneratingText ? (
            <div className="loading-spinner">
              <div className="spinner"></div>
              {t('generating', 'Generating...')}
            </div>
          ) : (
            t('previewText', 'Preview Text')
          )}
        </button>
      )}

      {showTextPreview && (
        <>
          <div className="section">
            <h2 className="section-title">✨ {t('textLabel')}</h2>
            <div className="text-area-container">
              {isGeneratingText ? (
                <div className="text-area-loading">
                  <div className="loading-spinner">
                    <div className="spinner"></div>
                    {t('generating', 'Generating meditation text...')}
                  </div>
                </div>
              ) : (
                <textarea 
                  className="text-area"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder={t('textPlaceholder') || 'Meditation text will be generated when you click Generate...'}
                />
              )}
            </div>
          </div>
          
          <div className="text-preview-section">
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
        </>
      )}


      {error && (
        <div className="error-message">
          {error}
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