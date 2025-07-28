import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { getFullUrl, API_ENDPOINTS } from '../config/api';

const VoiceSlider = ({ voices, selectedVoiceId, onVoiceSelect, voiceProvider, currentMeditationType, speechTempo, onTempoChange, isGeneratingAudio, genderFilter, onGenderFilterChange }) => {
  const { t, i18n } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioRef, setAudioRef] = useState(null);
  const [previewCache, setPreviewCache] = useState(new Map());
  const [isGeneratingPreview, setIsGeneratingPreview] = useState(false);
  
  // Touch/swipe state
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState(null);
  const cardRef = useRef(null);

  // Tempo values and functions
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

  const currentTempoIndex = tempoValues.findIndex(val => val === speechTempo);

  // Filter voices based on gender filter
  const filteredVoices = voices.filter(voice => 
    genderFilter === 'all' || voice.gender === genderFilter
  );

  // Find the index of the selected voice in filtered voices
  useEffect(() => {
    const selectedIndex = filteredVoices.findIndex(voice => voice.voice_id === selectedVoiceId);
    if (selectedIndex !== -1) {
      setCurrentIndex(selectedIndex);
    } else if (filteredVoices.length > 0) {
      // If current voice is not in filtered list, select first available voice
      setCurrentIndex(0);
      onVoiceSelect(filteredVoices[0].voice_id);
    }
  }, [selectedVoiceId, filteredVoices, onVoiceSelect]);

  // Cleanup cached audio URLs when component unmounts
  useEffect(() => {
    return () => {
      previewCache.forEach((url) => {
        URL.revokeObjectURL(url);
      });
    };
  }, [previewCache]);

  const currentVoice = filteredVoices[currentIndex];

  const goToPrevious = () => {
    if (isTransitioning) return;
    
    // Stop any playing audio when navigating
    if (audioRef) {
      audioRef.pause();
      setAudioRef(null);
      setIsPlaying(false);
    }
    
    setIsTransitioning(true);
    const newIndex = currentIndex > 0 ? currentIndex - 1 : filteredVoices.length - 1;
    setCurrentIndex(newIndex);
    onVoiceSelect(filteredVoices[newIndex].voice_id);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const goToNext = () => {
    if (isTransitioning) return;
    
    // Stop any playing audio when navigating
    if (audioRef) {
      audioRef.pause();
      setAudioRef(null);
      setIsPlaying(false);
    }
    
    setIsTransitioning(true);
    const newIndex = currentIndex < filteredVoices.length - 1 ? currentIndex + 1 : 0;
    setCurrentIndex(newIndex);
    onVoiceSelect(filteredVoices[newIndex].voice_id);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  // Add proper touch event listeners with { passive: false }
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleTouchStart = (e) => {
      setTouchEnd(null);
      setTouchStart(e.touches[0].clientX);
      console.log('Touch start:', e.touches[0].clientX);
    };

    const handleTouchMove = (e) => {
      e.preventDefault(); // This will work because passive: false
      setTouchEnd(e.touches[0].clientX);
      
      // Show visual feedback during swipe
      if (touchStart && e.touches[0].clientX) {
        const distance = touchStart - e.touches[0].clientX;
        if (Math.abs(distance) > 10) {
          setSwipeDirection(distance > 0 ? 'left' : 'right');
        }
      }
      
      console.log('Touch move:', e.touches[0].clientX);
    };

    const handleTouchEnd = () => {
      if (!touchStart || !touchEnd) {
        console.log('Touch end: no start or end values');
        return;
      }
      
      const distance = touchStart - touchEnd;
      const minSwipeDistance = 30; // Reduced from 50px
      
      console.log('Swipe distance:', distance, 'Min required:', minSwipeDistance);
      
      if (Math.abs(distance) < minSwipeDistance) {
        console.log('Swipe too short, ignoring');
        return;
      }
      
      if (distance > 0) {
        // Swipe left - go to next
        console.log('Swipe left detected - going to next');
        goToNext();
      } else {
        // Swipe right - go to previous
        console.log('Swipe right detected - going to previous');
        goToPrevious();
      }
      
      // Clean up touch state
      setTouchStart(null);
      setTouchEnd(null);
      setSwipeDirection(null);
    };

    // Add event listeners with { passive: false } to allow preventDefault
    card.addEventListener('touchstart', handleTouchStart, { passive: false });
    card.addEventListener('touchmove', handleTouchMove, { passive: false });
    card.addEventListener('touchend', handleTouchEnd, { passive: false });

    return () => {
      card.removeEventListener('touchstart', handleTouchStart);
      card.removeEventListener('touchmove', handleTouchMove);
      card.removeEventListener('touchend', handleTouchEnd);
    };
  }, [touchStart, touchEnd, goToNext, goToPrevious]);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      goToPrevious();
    } else if (e.key === 'ArrowRight') {
      goToNext();
    }
  };

  // These are now handled by useEffect with proper event listeners

  const generatePreview = async (voiceId, language) => {
    const cacheKey = `${voiceId}-${language}-${speechTempo}`;
    
    // Check cache first
    if (previewCache.has(cacheKey)) {
      return previewCache.get(cacheKey);
    }
    
    try {
      setIsGeneratingPreview(true);
      
      // Determine which endpoint to use based on voice provider
      const endpoint = voiceProvider === 'google' 
        ? API_ENDPOINTS.GOOGLE_VOICE_PREVIEW 
        : API_ENDPOINTS.VOICE_PREVIEW;
      
      const response = await axios.post(
        getFullUrl(endpoint),
        {
          voiceId,
          language,
          speechTempo
        },
        {
          responseType: 'blob'
        }
      );
      
      // Create a blob URL for the audio
      const audioBlob = new Blob([response.data], { type: 'audio/mpeg' });
      const audioUrl = URL.createObjectURL(audioBlob);
      
      // Store in cache
      const newCache = new Map(previewCache);
      newCache.set(cacheKey, audioUrl);
      setPreviewCache(newCache);
      
      return audioUrl;
      
    } catch (error) {
      console.error('Error generating voice preview:', error);
      // Enhanced error handling with user feedback
      if (error.response?.status === 404) {
        console.warn('Voice preview endpoint not found, falling back to original preview');
      } else if (error.response?.status === 500) {
        console.error('Server error generating preview');
      } else if (error.code === 'NETWORK_ERROR') {
        console.error('Network error generating preview');
      }
      // Fallback to original preview URL if available
      return currentVoice.preview_url || null;
    } finally {
      setIsGeneratingPreview(false);
    }
  };

  const playPreview = async () => {
    if (audioRef) {
      audioRef.pause();
      setAudioRef(null);
      setIsPlaying(false);
    }
    
    try {
      // Generate preview in current UI language
      const audioUrl = await generatePreview(currentVoice.voice_id, i18n.language);
      
      if (audioUrl) {
        const audio = new Audio(audioUrl);
        audio.play();
        setAudioRef(audio);
        setIsPlaying(true);
        
        audio.onended = () => {
          setIsPlaying(false);
          setAudioRef(null);
        };
        
        audio.onerror = () => {
          setIsPlaying(false);
          setAudioRef(null);
          console.error('Error playing audio preview');
        };
      }
    } catch (error) {
      console.error('Error playing preview:', error);
      setIsPlaying(false);
    }
  };

  const stopPreview = () => {
    if (audioRef) {
      audioRef.pause();
      setAudioRef(null);
      setIsPlaying(false);
    }
  };

  const getGenderIcon = (gender) => {
    switch (gender) {
      case 'female': return '👩';
      case 'male': return '👨';
      default: return '🧑';
    }
  };

  const getCharacteristicColor = (characteristic) => {
    const colors = {
      calm: '#10b981',
      soft: '#8b5cf6',
      deep: '#f59e0b',
      gentle: '#06b6d4',
      soothing: '#84cc16',
      warm: '#f97316',
      clear: '#3b82f6',
      professional: '#6366f1',
      young: '#ec4899',
      mature: '#64748b'
    };
    return colors[characteristic] || '#6b7280';
  };

  if (!currentVoice) return null;

  return (
    <div className="voice-slider" onKeyDown={handleKeyDown} tabIndex="0">
      <div className="voice-slider-header">
        <h2 className="section-title">🎤 {t('voiceLabel', 'Voice')}</h2>
        <div className="voice-counter">
          {currentIndex + 1} {t('of', 'of')} {filteredVoices.length}
        </div>
      </div>

      {/* Gender Filter */}
      <div className="voice-gender-filter">
        <div className="gender-filter-options-compact">
          <button 
            className={`gender-filter-btn-compact ${genderFilter === 'all' ? 'active' : ''}`}
            onClick={() => onGenderFilterChange('all')}
          >
            {t('all', 'All')}
          </button>
          <button 
            className={`gender-filter-btn-compact ${genderFilter === 'male' ? 'active' : ''}`}
            onClick={() => onGenderFilterChange('male')}
          >
            👨 {t('men', 'Men')}
          </button>
          <button 
            className={`gender-filter-btn-compact ${genderFilter === 'female' ? 'active' : ''}`}
            onClick={() => onGenderFilterChange('female')}
          >
            👩 {t('women', 'Women')}
          </button>
        </div>
      </div>

      <div 
        ref={cardRef}
        className={`voice-card ${isTransitioning ? 'transitioning' : ''} ${swipeDirection ? 'swiping-' + swipeDirection : ''}`}
      >
        <div className="voice-navigation">
          <button 
            className="nav-button nav-prev" 
            onClick={goToPrevious}
            aria-label={t('previousVoice', 'Previous voice')}
          >
            ◀
          </button>
          
          <div className="voice-info">
            {/* Simplified Voice Header */}
            <div className="voice-header-simplified">
              <div className="voice-name-centered">
                <span className="voice-gender-inline">
                  {getGenderIcon(currentVoice.gender)}
                </span>
                {voiceProvider === 'google' && currentVoice.friendlyName 
                  ? currentVoice.friendlyName 
                  : currentVoice.name
                }
              </div>
              
              {/* Play Button Below Name */}
              <div className="voice-preview-centered">
                <button 
                  className="preview-button-centered"
                  onClick={isPlaying ? stopPreview : playPreview}
                  disabled={isGeneratingPreview}
                  aria-label={isGeneratingPreview ? t('generating', 'Generating...') : (isPlaying ? t('stopPreview', 'Stop Preview') : t('playPreview', 'Play Preview'))}
                >
                  {isGeneratingPreview ? '⏳' : (isPlaying ? '⏸️' : '▶️')}
                </button>
              </div>
            </div>
          </div>
          
          <button 
            className="nav-button nav-next" 
            onClick={goToNext}
            aria-label={t('nextVoice', 'Next voice')}
          >
            ▶
          </button>
        </div>
      </div>

      {/* Tempo Filter - Moved after voice card */}
      <div className="voice-tempo-filter">
        <div className="tempo-filter-label">{t('voiceSpeed', 'Voice speed')}</div>
        <div className="tempo-filter-options">
          {tempoValues.map((tempo) => (
            <button
              key={tempo}
              className={`tempo-filter-btn ${speechTempo === tempo ? 'active' : ''}`}
              onClick={() => onTempoChange(tempo)}
              disabled={isGeneratingAudio || isPlaying || isGeneratingPreview}
            >
              {tempo}x
            </button>
          ))}
        </div>
      </div>
      
    </div>
  );
};

export default VoiceSlider;