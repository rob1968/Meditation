import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import './i18n';
import './styles/globals.css';
import Auth from './components/Auth';
import BottomNavigation from './components/BottomNavigation';
import MyAudio from './components/MyAudio';
import Profile from './components/Profile';
import CommunityHub from './components/CommunityHub';
import AdminDashboard from './components/AdminDashboard';
import Inbox from './components/Inbox';
import Journal from './components/Journal';
import JournalHub from './components/JournalHub';
import PageHeader from './components/PageHeader';
import VoiceSlider from './components/VoiceSlider';
import MeditationTypeSlider from './components/MeditationTypeSlider';
import BackgroundSlider from './components/BackgroundSlider';
import { getFullUrl, getAssetUrl, API_ENDPOINTS } from './config/api';

const App = () => {
  const [text, setText] = useState("");
  const [meditationType, setMeditationType] = useState("sleep");
  const [background, setBackground] = useState("ocean");
  const [voiceId, setVoiceId] = useState("EXAVITQu4vr4xnSDxMaL");
  const [useBackgroundMusic, setUseBackgroundMusic] = useState(false);
  const [voices, setVoices] = useState([]);
  const [speechTempo, setSpeechTempo] = useState(1.00); // Default meditation tempo
  const [genderFilter, setGenderFilter] = useState('all'); // Gender filter state
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
  const [unreadCount, setUnreadCount] = useState(0);
  
  // Credits state
  const [userCredits, setUserCredits] = useState(null);
  const [elevenlabsCredits, setElevenlabsCredits] = useState(null);
  
  // Draft and text editing state
  const [originalGeneratedText, setOriginalGeneratedText] = useState('');
  const [isTextModified, setIsTextModified] = useState(false);
  const [currentMeditationId, setCurrentMeditationId] = useState(null);
  const [isSavingDraft, setIsSavingDraft] = useState(false);
  const [draftSaveMessage, setDraftSaveMessage] = useState('');
  
  // User saved meditations
  const [userMeditations, setUserMeditations] = useState([]);
  const [showSavedMeditations, setShowSavedMeditations] = useState(false);


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
      setOriginalGeneratedText(generated);
      setIsTextModified(false);
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
  
  const saveDraft = async () => {
    setIsSavingDraft(true);
    setDraftSaveMessage('');
    
    try {
      const response = await axios.post(getFullUrl('/api/user-meditations/save'), {
        userId: user?.id,
        meditationId: currentMeditationId,
        text: text,
        language: i18n.language,
        meditationType: meditationType
      });
      
      if (response.data.success) {
        setCurrentMeditationId(response.data.meditationId);
        setDraftSaveMessage(t('draftSaved'));
        setOriginalGeneratedText(text); // Update original to mark as saved
        setIsTextModified(false);
        
        // Reload user meditations
        await loadUserMeditations();
        
        // Clear message after 3 seconds
        setTimeout(() => {
          setDraftSaveMessage('');
        }, 3000);
      }
    } catch (error) {
      console.error('Error saving draft:', error);
      setError(t('errorSavingDraft', 'Error saving draft'));
    } finally {
      setIsSavingDraft(false);
    }
  };
  
  const regenerateText = async () => {
    setShowTextPreview(true);
    await generateTextPreview();
  };
  
  // Load user's saved meditations
  const loadUserMeditations = async () => {
    if (!user?.id) return;
    
    try {
      const response = await axios.get(
        getFullUrl(`/api/user-meditations/list/${user.id}`)
      );
      setUserMeditations(response.data.meditations || []);
    } catch (error) {
      console.error('Error loading user meditations:', error);
    }
  };
  
  // Load specific saved meditation
  const loadSavedMeditation = async (meditation) => {
    setText(meditation.text);
    setMeditationType(meditation.meditationType);
    setCurrentMeditationId(meditation.id);
    setOriginalGeneratedText(meditation.text);
    setIsTextModified(false);
    setShowTextPreview(true);
    setShowSavedMeditations(false);
    
    // Change language if different
    if (meditation.language !== i18n.language) {
      i18n.changeLanguage(meditation.language);
    }
  };
  
  // Delete saved meditation
  const deleteSavedMeditation = async (meditationId) => {
    if (!user?.id) return;
    
    try {
      await axios.delete(
        getFullUrl(`/api/user-meditations/${user.id}/${meditationId}`)
      );
      // Reload list
      await loadUserMeditations();
    } catch (error) {
      console.error('Error deleting meditation:', error);
      setError(t('errorDeletingMeditation', 'Error deleting meditation'));
    }
  };

  // Auto-generate text when meditation type changes
  useEffect(() => {
    if (meditationType) {
      setText('');
      setGeneratedText('');
      setOriginalGeneratedText('');
      setIsTextModified(false);
      // Auto-generate preview text
      generateTextPreview();
    }
  }, [meditationType, i18n.language]);
  
  // Track text modifications
  useEffect(() => {
    if (originalGeneratedText && text) {
      setIsTextModified(text !== originalGeneratedText);
    }
  }, [text, originalGeneratedText]);

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
  
  // Fetch unread notifications count
  const fetchUnreadCount = async () => {
    if (!user?.id) return;
    
    try {
      const response = await axios.get(
        getFullUrl(`/api/notifications/user/${user.id}`),
        { params: { unreadOnly: true } }
      );
      setUnreadCount(response.data.unreadCount);
    } catch (error) {
      console.error('Error fetching unread count:', error);
    }
  };

  // Load user meditations and credits when user changes
  useEffect(() => {
    if (user?.id) {
      loadUserMeditations();
      fetchUserCredits();
      fetchElevenlabsCredits();
      fetchUnreadCount();
    }
  }, [user]);

  // Refresh unread count periodically
  useEffect(() => {
    if (!user?.id) return;
    
    const interval = setInterval(() => {
      fetchUnreadCount();
    }, 30000); // Refresh every 30 seconds
    
    return () => clearInterval(interval);
  }, [user]);

  const handleLogin = (userData) => {
    setUser(userData);
    setActiveTab('create');
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setUserCredits(null);
    setActiveTab('create');
    // Note: We keep the language preference even after logout
  };

  const fetchUserCredits = async () => {
    if (!user?.id) return;
    
    try {
      const response = await axios.get(getFullUrl(`/api/auth/user/${user.id}/credits`));
      setUserCredits(response.data);
    } catch (error) {
      console.error('Error fetching user credits:', error);
    }
  };

  const fetchElevenlabsCredits = async () => {
    if (!user?.id) return;
    
    try {
      const response = await axios.get(getFullUrl(`/api/auth/user/${user.id}/elevenlabs-stats`));
      setElevenlabsCredits(response.data);
    } catch (error) {
      console.error('Error fetching ElevenLabs credits:', error);
    }
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
        userId: user?.id,
        useBackgroundMusic,
        speechTempo
      }, { responseType: 'blob' });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      setAudioUrl(url);
      setAudioFiles([{
        language: i18n.language,
        url: url,
        label: audioLanguages.find(lang => lang.value === i18n.language)?.label || i18n.language
      }]);
      
      // Refresh credits after successful generation
      if (user?.id) {
        fetchUserCredits();
        fetchElevenlabsCredits();
      }
      
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
    // Check credits before generating audio
    if (user && userCredits && userCredits.credits < 1) {
      setError(t('insufficientCredits', 'Insufficient credits. You need 1 credit to generate audio.'));
      return;
    }
    
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

  // Update voice selection when language changes
  useEffect(() => {
    if (voices.length > 0) {
      setVoiceId(voices[0].voice_id);
    }
  }, [voices]);

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

  // Create animated stars background
  const createStars = () => {
    const starsContainer = document.getElementById('stars');
    if (!starsContainer || starsContainer.children.length > 0) return; // Prevent duplicates
    
    const numberOfStars = 100;

    for (let i = 0; i < numberOfStars; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      
      const size = Math.random() * 3 + 1;
      star.style.width = size + 'px';
      star.style.height = size + 'px';
      star.style.left = Math.random() * 100 + '%';
      star.style.top = Math.random() * 100 + '%';
      star.style.animationDelay = Math.random() * 3 + 's';
      
      starsContainer.appendChild(star);
    }
  };

  // Initialize stars on component mount - MUST be before any conditional returns
  useEffect(() => {
    createStars();
  }, []);

  // Show auth screen if no user is logged in
  if (!user) {
    return <Auth onLogin={handleLogin} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'myAudio':
        return <MyAudio user={user} userCredits={userCredits} isGenerating={isLoading} onCreditsUpdate={fetchUserCredits} />;
      case 'journal':
        return <Journal user={user} userCredits={userCredits} onCreditsUpdate={fetchUserCredits} />;
      case 'community':
        return <CommunityHub user={user} />;
      case 'journalHub':
        return <JournalHub user={user} />;
      case 'admin':
        return <AdminDashboard user={user} onLogout={handleLogout} />;
      case 'inbox':
        return <Inbox user={user} onUnreadCountChange={setUnreadCount} />;
      case 'profile':
        return <Profile user={user} onLogout={handleLogout} onBackToCreate={() => setActiveTab('create')} />;
      default:
        return (
          <div className="create-content">
            <div className="create-language-header">
              <PageHeader 
                user={user}
                onProfileClick={() => setActiveTab('profile')}
              />
            </div>

            <div className="main-title">{t('createMeditation', 'Create Your Meditation')}</div>

      <MeditationTypeSlider 
        selectedType={meditationType}
        onTypeSelect={selectMeditationType}
      />


      {(
        <div className="text-preview-section" style={{ 
          marginTop: '20px', 
          marginBottom: '20px',
          padding: '20px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '15px',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '15px'
          }}>
            <h3 style={{ 
              color: '#fff',
              fontSize: '18px',
              fontWeight: '600',
              margin: 0
            }}>
              ✨ {t('textLabel', 'Meditation Text')}
            </h3>
            
            {userMeditations.length > 0 && (
              <button
                onClick={() => setShowSavedMeditations(!showSavedMeditations)}
                style={{
                  background: 'rgba(103, 126, 234, 0.8)',
                  color: 'white',
                  border: 'none',
                  padding: '6px 12px',
                  borderRadius: '15px',
                  fontSize: '11px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                📚 {showSavedMeditations ? t('hideSaved', 'Hide Saved') : t('viewSaved', 'View Saved')} ({userMeditations.filter(m => m.meditationType === meditationType && m.language === i18n.language).length})
              </button>
            )}
          </div>

          {showSavedMeditations && userMeditations.length > 0 && (
            <div style={{ 
              background: 'rgba(0, 0, 0, 0.5)',
              borderRadius: '10px',
              padding: '15px',
              marginBottom: '15px',
              maxHeight: '200px',
              overflowY: 'auto',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <h4 style={{ 
                color: '#fff', 
                fontSize: '14px', 
                marginBottom: '10px',
                fontWeight: '500'
              }}>
                {t('savedMeditations', 'Saved Meditations')}
              </h4>
              
              {userMeditations.filter(m => 
                m.meditationType === meditationType && 
                m.language === i18n.language
              ).length === 0 ? (
                <p style={{ 
                  textAlign: 'center', 
                  color: '#a0aec0',
                  fontSize: '12px',
                  fontStyle: 'italic'
                }}>
                  {t('noSavedMeditations', 'No saved meditations for this type and language')}
                </p>
              ) : (
                userMeditations
                  .filter(m => m.meditationType === meditationType && m.language === i18n.language)
                  .slice(0, 5) // Show max 5 recent meditations
                  .map((meditation, index) => (
                    <div 
                      key={index} 
                      onClick={() => {
                        setText(meditation.text);
                        setOriginalGeneratedText(meditation.text);
                        setIsTextModified(false);
                        setShowSavedMeditations(false);
                      }}
                      style={{
                        padding: '10px',
                        margin: '5px 0',
                        borderRadius: '8px',
                        background: 'rgba(255, 255, 255, 0.1)',
                        cursor: 'pointer',
                        transition: 'background 0.2s ease',
                        border: '1px solid rgba(255, 255, 255, 0.05)'
                      }}
                      onMouseEnter={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.2)'}
                      onMouseLeave={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.1)'}
                    >
                      <div style={{ 
                        color: '#fff',
                        fontSize: '12px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        marginBottom: '4px'
                      }}>
                        {meditation.text.substring(0, 80)}...
                      </div>
                      <div style={{ 
                        fontSize: '10px', 
                        color: '#a0aec0'
                      }}>
                        {t('savedOn', 'Saved on')}: {new Date(meditation.updatedAt || meditation.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  ))
              )}
            </div>
          )}
          <div style={{
            background: 'rgba(0, 0, 0, 0.3)',
            padding: '15px',
            borderRadius: '10px',
            marginBottom: '15px'
          }}>
            <textarea
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                setIsTextModified(e.target.value !== originalGeneratedText);
              }}
              placeholder={t('textPlaceholder', 'Enter your meditation text here...')}
              rows={6}
              style={{
                width: '100%',
                background: 'transparent',
                border: 'none',
                color: '#fff',
                fontSize: '14px',
                lineHeight: '1.6',
                resize: 'vertical',
                outline: 'none'
              }}
            />
          </div>
          {isTextModified && (
            <div style={{ 
              textAlign: 'center', 
              marginBottom: '15px',
              padding: '8px 12px',
              background: 'rgba(255, 193, 7, 0.2)',
              borderRadius: '8px',
              border: '1px solid rgba(255, 193, 7, 0.4)'
            }}>
              <span style={{ 
                color: '#ffc107', 
                fontSize: '12px',
                fontWeight: '500'
              }}>
                ⚠️ {t('textModified', 'Text has been modified')}
              </span>
            </div>
          )}
          
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={regenerateText}
              disabled={isGeneratingText}
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '20px',
                fontSize: '12px',
                cursor: 'pointer'
              }}
            >
              🔄 {t('regenerate', 'Regenerate')}
            </button>
            
            {isTextModified && (
              <button
                onClick={saveDraft}
                disabled={isSavingDraft || !text.trim()}
                style={{
                  background: 'linear-gradient(135deg, #4299e1 0%, #3182ce 100%)',
                  color: 'white',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  cursor: isSavingDraft ? 'not-allowed' : 'pointer',
                  opacity: isSavingDraft ? 0.6 : 1
                }}
              >
                {isSavingDraft ? (
                  <>
                    <div className="loading-spinner" style={{ display: 'inline-block', width: '12px', height: '12px', marginRight: '5px' }}>
                      <div className="spinner"></div>
                    </div>
                    {t('saving', 'Saving...')}
                  </>
                ) : (
                  <>
                    💾 {t('saveDraft', 'Save Draft')}
                  </>
                )}
              </button>
            )}
            
            <button
              onClick={handleTextApproved}
              disabled={!text.trim() || isLoading}
              style={{
                background: 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '20px',
                fontSize: '12px',
                cursor: 'pointer'
              }}
            >
              ✓ {t('useText', 'Use This Text')}
            </button>
          </div>
          
          {draftSaveMessage && (
            <div style={{ 
              textAlign: 'center', 
              marginTop: '10px',
              fontSize: '12px',
              color: draftSaveMessage.includes('Error') ? '#f56565' : '#48bb78',
              padding: '4px 8px',
              borderRadius: '4px',
              background: draftSaveMessage.includes('Error') ? 'rgba(245, 101, 101, 0.1)' : 'rgba(72, 187, 120, 0.1)'
            }}>
              {draftSaveMessage}
            </div>
          )}
        </div>
      )}

      <div className="background-music-toggle">
        <label className="checkbox-container">
          <input
            type="checkbox"
            checked={useBackgroundMusic}
            onChange={(e) => setUseBackgroundMusic(e.target.checked)}
            className="checkbox-input"
          />
          <span className="checkbox-label">{t('backgroundMusicLabel', 'Background Music')}</span>
        </label>
      </div>

      {useBackgroundMusic && (
        <BackgroundSlider 
          selectedBackground={background}
          onBackgroundSelect={setBackground}
          meditationType={meditationType}
        />
      )}


      <VoiceSlider 
        voices={voices}
        selectedVoiceId={voiceId}
        onVoiceSelect={setVoiceId}
        voiceProvider="elevenlabs"
        currentMeditationType={meditationType}
        speechTempo={speechTempo}
        onTempoChange={setSpeechTempo}
        isGeneratingAudio={isLoading}
        genderFilter={genderFilter}
        onGenderFilterChange={setGenderFilter}
      />






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
      <div className="stars" id="stars"></div>
      <div className="main-content">
        {renderContent()}
      </div>
      <BottomNavigation 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        user={user}
        onLogout={handleLogout}
        unreadCount={unreadCount}
      />
    </div>
  );
};

export default App;