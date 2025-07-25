import React, { useState, useEffect, useRef } from 'react';
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
  const [customBackgroundFile, setCustomBackgroundFile] = useState(null);
  const [customBackgroundName, setCustomBackgroundName] = useState('');
  const [customBackgroundDescription, setCustomBackgroundDescription] = useState('');
  const [showNameInput, setShowNameInput] = useState(false);
  const [savedCustomBackgrounds, setSavedCustomBackgrounds] = useState([]);
  const [backgroundsLoading, setBackgroundsLoading] = useState(true);
  const [showSavedBackgrounds, setShowSavedBackgrounds] = useState(false);
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
  const [showVoiceSelector, setShowVoiceSelector] = useState(false);
  const [showBackgroundOptions, setShowBackgroundOptions] = useState(false);
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
  
  // Saved texts integration in main textbox
  const [savedTexts, setSavedTexts] = useState([]);
  const [currentSavedIndex, setCurrentSavedIndex] = useState(0);
  const [showingSavedTexts, setShowingSavedTexts] = useState(false);
  
  // Background audio cleanup ref
  const backgroundSliderRef = useRef(null);

  // Global function to stop all background audio
  const stopAllBackgroundAudio = () => {
    console.log('stopAllBackgroundAudio called');
    
    // Method 1: Try using the ref if available
    if (backgroundSliderRef.current && backgroundSliderRef.current.stopBackgroundSound) {
      console.log('Calling stopBackgroundSound via ref');
      backgroundSliderRef.current.stopBackgroundSound();
    } else {
      console.log('backgroundSliderRef not available, trying alternative method');
    }
    
    // Method 2: Force stop all audio elements (backup method)
    try {
      const audioElements = document.querySelectorAll('audio');
      audioElements.forEach(audio => {
        if (!audio.paused) {
          console.log('Force stopping audio element:', audio);
          audio.pause();
        }
      });
    } catch (error) {
      console.error('Error stopping audio elements:', error);
    }
  };

  // Tab change handler that stops background audio
  const handleTabChange = (newTab) => {
    stopAllBackgroundAudio();
    setActiveTab(newTab);
  };

  // Background music toggle handler that stops audio first
  const handleBackgroundMusicToggle = (checked) => {
    if (!checked) {
      // If turning off background music, stop any playing audio
      stopAllBackgroundAudio();
    }
    setUseBackgroundMusic(checked);
  };

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
      return t('fallbackMeditationText', 'Take a deep breath and relax. Focus on your breathing and let go of any tension. You are at peace and in control.');
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
    // Reset saved texts mode when changing meditation type
    setShowingSavedTexts(false);
    setSavedTexts([]);
    setCurrentSavedIndex(0);
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
        meditationType: meditationType,
        isModified: isTextModified // Send whether this is user-modified text
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
    setShowingSavedTexts(false); // Switch back to generated text mode
    setShowTextPreview(true);
    await generateTextPreview();
  };
  
  const clearText = () => {
    setText("");
    setGeneratedText("");
    setOriginalGeneratedText("");
    setIsTextModified(false);
  };
  
  // Auto-load appropriate text: saved texts first, then sample texts as fallback
  const autoLoadAppropriateText = async (savedMeditations = userMeditations) => {
    if (!user?.id) {
      // No user logged in, generate sample text
      await generateTextPreview();
      return;
    }
    
    // Check if there are saved texts for current type and language
    const filteredSavedTexts = savedMeditations
      .filter(m => m.meditationType === meditationType && m.language === i18n.language)
      .sort((a, b) => {
        const aIsModified = a.isModified || (a.updatedAt && a.createdAt && a.updatedAt !== a.createdAt);
        const bIsModified = b.isModified || (b.updatedAt && b.createdAt && b.updatedAt !== b.createdAt);
        if (aIsModified !== bIsModified) {
          return bIsModified - aIsModified;
        }
        const aDate = new Date(a.updatedAt || a.createdAt);
        const bDate = new Date(b.updatedAt || b.createdAt);
        return bDate - aDate;
      });
    
    if (filteredSavedTexts.length > 0) {
      // Found saved texts - load them automatically
      setSavedTexts(filteredSavedTexts);
      setCurrentSavedIndex(0);
      setShowingSavedTexts(true);
      setShowSavedMeditations(false);
      
      // Load first saved text
      const firstSavedText = filteredSavedTexts[0];
      setText(firstSavedText.text);
      setGeneratedText(firstSavedText.text);
      setOriginalGeneratedText(firstSavedText.text);
      setIsTextModified(false);
      setCurrentMeditationId(firstSavedText.id);
      setShowTextPreview(true);
    } else {
      // No saved texts found - fallback to sample text
      setShowingSavedTexts(false);
      await generateTextPreview();
    }
  };
  
  // Load saved texts into main textbox
  const loadSavedTextsIntoTextbox = () => {
    const filteredSavedTexts = userMeditations
      .filter(m => m.meditationType === meditationType && m.language === i18n.language)
      .sort((a, b) => {
        // Same sorting logic as before
        const aIsModified = a.isModified || (a.updatedAt && a.createdAt && a.updatedAt !== a.createdAt);
        const bIsModified = b.isModified || (b.updatedAt && b.createdAt && b.updatedAt !== b.createdAt);
        if (aIsModified !== bIsModified) {
          return bIsModified - aIsModified;
        }
        const aDate = new Date(a.updatedAt || a.createdAt);
        const bDate = new Date(b.updatedAt || b.createdAt);
        return bDate - aDate;
      });
    
    if (filteredSavedTexts.length === 0) return;
    
    setSavedTexts(filteredSavedTexts);
    setCurrentSavedIndex(0);
    setShowingSavedTexts(true);
    setShowSavedMeditations(false);
    
    // Load first saved text
    const firstSavedText = filteredSavedTexts[0];
    setText(firstSavedText.text);
    setGeneratedText(firstSavedText.text);
    setOriginalGeneratedText(firstSavedText.text);
    setIsTextModified(false);
    setCurrentMeditationId(firstSavedText.id);
    setShowTextPreview(true);
  };
  
  // Navigate through saved texts
  const navigateSavedText = (direction) => {
    if (!showingSavedTexts || savedTexts.length === 0) return;
    
    let newIndex = currentSavedIndex;
    if (direction === 'next' && newIndex < savedTexts.length - 1) {
      newIndex++;
    } else if (direction === 'prev' && newIndex > 0) {
      newIndex--;
    }
    
    if (newIndex !== currentSavedIndex) {
      setCurrentSavedIndex(newIndex);
      const selectedText = savedTexts[newIndex];
      setText(selectedText.text);
      setGeneratedText(selectedText.text);
      setOriginalGeneratedText(selectedText.text);
      setIsTextModified(false);
      setCurrentMeditationId(selectedText.id);
    }
  };
  
  // Load user's saved meditations
  const loadUserMeditations = async () => {
    if (!user?.id) return;
    
    try {
      const response = await axios.get(
        getFullUrl(`/api/user-meditations/list/${user.id}`)
      );
      const meditations = response.data.meditations || [];
      setUserMeditations(meditations);
      
      // Auto-load appropriate text after loading meditations
      if (meditationType && !text.trim()) {
        await autoLoadAppropriateText(meditations);
      }
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

  // Auto-load appropriate text when meditation type changes
  useEffect(() => {
    if (meditationType) {
      setText('');
      setGeneratedText('');
      setOriginalGeneratedText('');
      setIsTextModified(false);
      setShowVoiceSelector(false); // Hide voice selector on type/language change
      setShowBackgroundOptions(false); // Hide background options on type/language change
      setCustomBackgroundFile(null); // Clear custom background file
      setCustomBackgroundName(''); // Clear custom background name
      setCustomBackgroundDescription(''); // Clear custom background description
      setShowNameInput(false); // Hide name input
      // Auto-load appropriate text (saved first, then sample)
      autoLoadAppropriateText();
    }
  }, [meditationType, i18n.language]);
  
  // Auto-load appropriate text when user meditations change
  useEffect(() => {
    if (userMeditations.length > 0 && meditationType && user?.id) {
      // Only auto-load if we're not already showing saved texts and no text is currently loaded
      if (!showingSavedTexts && !text.trim()) {
        autoLoadAppropriateText();
      }
    }
  }, [userMeditations]);
  
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
      fetchSavedCustomBackgrounds();
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
    handleTabChange('create');
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setUserCredits(null);
    handleTabChange('create');
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
    stopAllBackgroundAudio(); // Stop any playing background audio
    setIsLoading(true);
    setError("");
    setAudioFiles([]);
    handleTabChange('myAudio'); // Switch to My Audio tab when generation starts
    
    try {
      // Prepare form data for file upload if custom background is used
      const formData = new FormData();
      formData.append('text', text);
      formData.append('background', background);
      formData.append('language', i18n.language);
      formData.append('audioLanguage', i18n.language);
      formData.append('voiceId', voiceId);
      formData.append('meditationType', meditationType);
      formData.append('userId', user?.id);
      formData.append('useBackgroundMusic', useBackgroundMusic);
      formData.append('speechTempo', speechTempo);
      
      // Add custom background file if selected
      if (customBackgroundFile) {
        if (customBackgroundFile.savedBackground) {
          // This is a saved background - create a reference to the server file
          const savedBg = customBackgroundFile.savedBackground;
          formData.append('savedBackgroundId', savedBg.id);
          formData.append('savedBackgroundUserId', savedBg.userId);
          formData.append('savedBackgroundFilename', savedBg.filename);
          console.log('Frontend: Using saved background:', savedBg);
        } else {
          // This should not happen anymore since we upload immediately
          console.warn('Frontend: Unexpected - using non-saved background file');
          formData.append('customBackground', customBackgroundFile);
        }
      }

      const res = await axios.post(getFullUrl(API_ENDPOINTS.GENERATE_MEDITATION), formData, { 
        responseType: 'blob',
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

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
        // Refresh saved backgrounds if a custom background was used
        if (customBackgroundFile && customBackgroundName) {
          fetchSavedCustomBackgrounds();
        }
      }
      
      // Reset all values on create page after successful generation
      setText("");
      setGeneratedText("");
      setOriginalGeneratedText("");
      setIsTextModified(false);
      setCurrentMeditationId(null);
      setDraftSaveMessage('');
      
      // Reset UI states
      setShowTextPreview(false);
      setShowVoiceSelector(false);
      setShowBackgroundOptions(false);
      setShowNameInput(false);
      setShowSavedMeditations(false);
      setLanguageOpen(false);
      
      // Reset meditation settings to defaults
      setMeditationType("sleep");
      setBackground("ocean");
      setVoiceId(voices.length > 0 ? voices[0].voice_id : "EXAVITQu4vr4xnSDxMaL");
      handleBackgroundMusicToggle(false);
      setSpeechTempo(1.00);
      setGenderFilter('all');
      
      // Clear custom background data
      setCustomBackgroundFile(null);
      setCustomBackgroundName('');
      setCustomBackgroundDescription('');
      
      // Clear other states
      setAudioUrl("");
      setError("");
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
    // Check credits before showing voice selector
    if (user && userCredits && userCredits.credits < 1) {
      setError(t('insufficientCredits', 'Insufficient credits. You need 1 credit to generate audio.'));
      return;
    }
    
    // Show voice selector instead of immediately generating audio
    setShowVoiceSelector(true);
    setShowBackgroundOptions(false); // Reset background options
  };

  const handleCustomBackgroundUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Check if it's a supported audio file (MP3, M4A, AAC, AMR, AIFF, CAF)
      const supportedTypes = [
        'audio/mpeg',     // MP3
        'audio/mp4',      // M4A
        'audio/m4a',      // M4A
        'audio/x-m4a',    // M4A (alternative)
        'audio/aac',      // AAC
        'audio/amr',      // AMR
        'audio/3gpp',     // 3GA/AMR
        'audio/aiff',     // AIFF (iPhone)
        'audio/x-aiff',   // AIFF (alternative)
        'audio/x-caf'     // CAF (Core Audio Format - iPhone)
      ];
      
      const supportedExtensions = ['.mp3', '.m4a', '.aac', '.amr', '.3ga', '.aiff', '.caf'];
      const fileName = file.name.toLowerCase();
      
      const isValidType = supportedTypes.includes(file.type) || 
                         supportedExtensions.some(ext => fileName.endsWith(ext));
      
      if (isValidType) {
        setCustomBackgroundFile(file);
        setShowNameInput(true); // Show name input after file selection
        setError(''); // Clear any previous errors
      } else {
        setError(t('invalidFileType', 'Please select a valid audio file (MP3, M4A, AAC, AMR, AIFF).'));
        event.target.value = ''; // Clear the input
      }
    }
    // Reset file input value to allow re-selecting the same file
    event.target.value = '';
  };

  const handleCustomBackgroundNameSubmit = async () => {
    if (customBackgroundName.trim() && customBackgroundFile && user?.id) {
      try {
        // Upload and save the background immediately
        const formData = new FormData();
        formData.append('customBackground', customBackgroundFile);
        formData.append('userId', user.id);
        formData.append('customName', customBackgroundName);
        formData.append('customDescription', customBackgroundDescription);

        console.log('Frontend: Uploading background with name:', customBackgroundName);
        
        const response = await axios.post(getFullUrl('/api/meditation/custom-background/upload'), formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        if (response.data.success) {
          // Update the custom background file to include the server response
          setCustomBackgroundFile({
            name: response.data.filename,
            savedBackground: {
              id: response.data.backgroundId,
              filename: response.data.filename,
              customName: customBackgroundName,
              userId: user.id
            }
          });

          setBackground('custom');
          setShowNameInput(false);
          
          // Refresh the list of saved backgrounds
          fetchSavedCustomBackgrounds();
          
          console.log('Background uploaded successfully:', response.data);
        }
      } catch (error) {
        console.error('Error uploading custom background:', error);
        setError(t('uploadError', 'Failed to upload background. Please try again.'));
      }
    }
  };

  const handleRemoveCustomBackground = () => {
    setCustomBackgroundFile(null);
    setCustomBackgroundName('');
    setCustomBackgroundDescription('');
    setShowNameInput(false);
    setBackground('ocean'); // Reset to default
  };

  const handleBackgroundUploadFromSlider = async ({ file, name, description }) => {
    if (!user?.id) {
      throw new Error(t('loginRequired', 'Please login to upload custom backgrounds'));
    }

    try {
      // Upload and save the background
      const formData = new FormData();
      formData.append('customBackground', file);
      formData.append('userId', user.id);
      formData.append('customName', name);
      formData.append('customDescription', description);

      console.log('Frontend: Uploading background with name:', name);
      
      const response = await axios.post(getFullUrl('/api/meditation/custom-background/upload'), formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.success) {
        console.log('Upload response.data:', response.data);
        
        // Clear the temporary custom background state since it's now saved
        setCustomBackgroundFile(null);
        setCustomBackgroundName('');
        setCustomBackgroundDescription('');
        setShowNameInput(false);
        
        // Refresh the list of saved backgrounds first
        await fetchSavedCustomBackgrounds();
        
        // Then set the background to the new saved background ID (longer delay for state stability)
        setTimeout(() => {
          setBackground(`saved-${response.data.backgroundId}`);
        }, 500);
        
        console.log('Background uploaded successfully:', response.data);
      }
    } catch (error) {
      console.error('Error uploading custom background:', error);
      throw error;
    }
  };

  const fetchSavedCustomBackgrounds = async () => {
    if (!user?.id) {
      console.log('fetchSavedCustomBackgrounds: No user ID');
      setBackgroundsLoading(false);
      return;
    }
    
    console.log('fetchSavedCustomBackgrounds: Fetching for user', user.id);
    setBackgroundsLoading(true);
    
    try {
      const url = getFullUrl(`/api/meditation/custom-backgrounds/${user.id}`);
      console.log('fetchSavedCustomBackgrounds: URL:', url);
      
      const response = await axios.get(url);
      console.log('fetchSavedCustomBackgrounds: Response:', response.data);
      
      setSavedCustomBackgrounds(response.data.backgrounds || []);
      console.log('fetchSavedCustomBackgrounds: Set backgrounds count:', response.data.backgrounds?.length || 0);
    } catch (error) {
      console.error('Error fetching saved custom backgrounds:', error);
      console.error('Error details:', error.response?.data || error.message);
      // Set empty array on error to prevent infinite loading
      setSavedCustomBackgrounds([]);
    } finally {
      setBackgroundsLoading(false);
    }
  };

  const handleSelectSavedBackground = (savedBackground) => {
    // Create a mock file object for the saved background
    setCustomBackgroundFile(null); // Clear current file
    setCustomBackgroundName(savedBackground.customName);
    setBackground('custom');
    setShowSavedBackgrounds(false);
    
    // We'll need to handle this differently since we can't recreate the File object
    // For now, we'll store the background metadata
    setCustomBackgroundFile({
      name: savedBackground.filename,
      savedBackground: savedBackground // Store the full metadata
    });
  };

  const deleteSavedBackground = async (backgroundId) => {
    if (!user?.id) return;
    
    try {
      await axios.delete(getFullUrl(`/api/meditation/custom-background/${user.id}/${backgroundId}`));
      fetchSavedCustomBackgrounds(); // Refresh the list
    } catch (error) {
      console.error('Error deleting saved background:', error);
    }
  };

  const handleBackgroundSelection = (backgroundValue, savedBackgroundData) => {
    console.log('App handleBackgroundSelection:', backgroundValue, savedBackgroundData?.customName);
    
    if (backgroundValue.startsWith('saved-') && savedBackgroundData) {
      // Handle saved background selection - use the specific backgroundValue, not 'custom'
      setBackground(backgroundValue); // This is crucial - use the specific saved ID
      setCustomBackgroundName(savedBackgroundData.customName);
      setCustomBackgroundFile({
        name: savedBackgroundData.filename,
        savedBackground: savedBackgroundData
      });
      console.log('Selected saved background:', backgroundValue, savedBackgroundData);
    } else if (backgroundValue === 'custom' && savedBackgroundData) {
      // Handle current upload session
      setBackground('custom');
      setCustomBackgroundName(savedBackgroundData.customName);
      setCustomBackgroundFile({
        name: savedBackgroundData.filename,
        savedBackground: savedBackgroundData
      });
    } else {
      // Handle regular background selection (system backgrounds)
      setBackground(backgroundValue);
      setCustomBackgroundFile(null);
      setCustomBackgroundName('');
    }
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
        return <Profile user={user} onLogout={handleLogout} onBackToCreate={() => handleTabChange('create')} />;
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


      {!showVoiceSelector && (
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
            
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              {text.trim() && (
                <button
                  onClick={clearText}
                  style={{
                    background: 'rgba(245, 101, 101, 0.8)',
                    color: 'white',
                    border: 'none',
                    padding: '4px 8px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    cursor: 'pointer',
                    minWidth: '28px',
                    height: '28px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s ease'
                  }}
                  title="Clear text"
                >
                  🗑️
                </button>
              )}
              
              {userMeditations.length > 0 && (
                <button
                  onClick={loadSavedTextsIntoTextbox}
                  style={{
                    background: showingSavedTexts ? 'rgba(72, 187, 120, 0.8)' : 'rgba(103, 126, 234, 0.8)',
                    color: 'white',
                    border: 'none',
                    padding: '6px 12px',
                    borderRadius: '15px',
                    fontSize: '11px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  📚 {showingSavedTexts ? t('showingSaved', 'Showing Saved') : t('viewSaved', 'View Saved')} ({userMeditations.filter(m => m.meditationType === meditationType && m.language === i18n.language).length})
                </button>
              )}
            </div>
          </div>

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
            
            {/* Navigation for saved texts */}
            {showingSavedTexts && savedTexts.length > 1 && (
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: '8px',
                padding: '0 5px'
              }}>
                <button
                  onClick={() => navigateSavedText('prev')}
                  disabled={currentSavedIndex === 0}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: currentSavedIndex === 0 ? '#666' : '#fff',
                    fontSize: '18px',
                    cursor: currentSavedIndex === 0 ? 'not-allowed' : 'pointer',
                    padding: '4px 8px'
                  }}
                >
                  ◀️
                </button>
                
                <span style={{ 
                  color: '#fff', 
                  fontSize: '12px',
                  fontWeight: '500'
                }}>
                  {currentSavedIndex + 1} van {savedTexts.length} opgeslagen teksten
                </span>
                
                <button
                  onClick={() => navigateSavedText('next')}
                  disabled={currentSavedIndex === savedTexts.length - 1}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: currentSavedIndex === savedTexts.length - 1 ? '#666' : '#fff',
                    fontSize: '18px',
                    cursor: currentSavedIndex === savedTexts.length - 1 ? 'not-allowed' : 'pointer',
                    padding: '4px 8px'
                  }}
                >
                  ▶️
                </button>
              </div>
            )}
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
                    💾 {t('saveText', 'Save Text')}
                  </>
                )}
              </button>
            )}
            
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

      {showVoiceSelector && !useBackgroundMusic && (
        <div className="voice-selector-section" style={{ 
          marginTop: '20px', 
          marginBottom: '20px',
          padding: '20px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '15px',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <h3 style={{ 
            color: '#fff',
            marginBottom: '15px',
            fontSize: '18px',
            fontWeight: '600'
          }}>
            🎙️ {t('selectVoice', 'Select Voice')}
          </h3>
          
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
          
        </div>
      )}

      {showVoiceSelector && (
        <div className="background-toggle-section" style={{ 
          marginTop: '15px', 
          textAlign: 'center'
        }}>
          <div className="background-music-toggle">
            <label className="checkbox-container">
              <input
                type="checkbox"
                checked={useBackgroundMusic}
                onChange={(e) => handleBackgroundMusicToggle(e.target.checked)}
                className="checkbox-input"
              />
              <span className="checkbox-label">{t('backgroundMusicLabel', 'Add Background Music')}</span>
            </label>
          </div>
        </div>
      )}

      {showVoiceSelector && useBackgroundMusic && (
        <div style={{ marginTop: '10px', marginBottom: '15px' }}>
          <BackgroundSlider 
            ref={backgroundSliderRef}
            selectedBackground={background}
            onBackgroundSelect={handleBackgroundSelection}
            meditationType={meditationType}
            customBackground={customBackgroundName ? {
              value: 'custom',
              name: customBackgroundName,
              icon: '🎵'
            } : null}
            customBackgroundFile={customBackgroundFile}
            savedCustomBackgrounds={savedCustomBackgrounds}
            backgroundsLoading={backgroundsLoading}
            onCustomBackgroundUpload={handleBackgroundUploadFromSlider}
            showUploadFirst={true}
            onStopAllAudio={stopAllBackgroundAudio}
          />
        </div>
      )}

      {showVoiceSelector && (
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          marginTop: '20px' 
        }}>
          <button
            onClick={generateAudio}
            disabled={isLoading || !text.trim() || !voiceId}
            style={{
              background: 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)',
              color: 'white',
              border: 'none',
              padding: '12px 30px',
              borderRadius: '25px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: (isLoading || !text.trim() || !voiceId) ? 'not-allowed' : 'pointer',
              opacity: (isLoading || !text.trim() || !voiceId) ? 0.6 : 1,
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            {isLoading ? (
              <>
                <div className="loading-spinner">
                  <div className="spinner"></div>
                </div>
                {t('generating', 'Generating...')}
              </>
            ) : (
              <>
                🎵 {t('generateAudio', 'Generate Audio')}
              </>
            )}
          </button>
        </div>
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
      <div className="stars" id="stars"></div>
      <div className="main-content">
        {renderContent()}
      </div>
      <BottomNavigation 
        activeTab={activeTab} 
        onTabChange={handleTabChange}
        user={user}
        onLogout={handleLogout}
        unreadCount={unreadCount}
      />
    </div>
  );
};

export default App;