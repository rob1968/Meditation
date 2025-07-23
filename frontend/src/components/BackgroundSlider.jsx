import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { getAssetUrl } from '../config/api';

const BackgroundSlider = ({ selectedBackground, onBackgroundSelect, meditationType, customBackground, customBackgroundFile, savedCustomBackgrounds }) => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioRef, setAudioRef] = useState(null);
  
  // Touch/swipe state
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState(null);
  const cardRef = useRef(null);

  const defaultBackgroundOptions = [
    { 
      value: 'rain', 
      icon: '🌧️', 
      label: t('rain', 'Rain'),
      description: t('rainDesc', 'Gentle rainfall for peaceful relaxation'),
      color: '#6366f1'
    },
    { 
      value: 'ocean', 
      icon: '🌊', 
      label: t('ocean', 'Ocean'),
      description: t('oceanDesc', 'Calming waves for deep focus and tranquility'),
      color: '#06b6d4'
    },
    { 
      value: 'forest', 
      icon: '🌲', 
      label: t('forest', 'Forest'),
      description: t('forestDesc', 'Natural woodland sounds for grounding and energy'),
      color: '#10b981'
    },
    { 
      value: 'birds', 
      icon: '🐦', 
      label: t('birds', 'Birds'),
      description: t('birdsDesc', 'Cheerful birdsong for energy and focus'),
      color: '#f59e0b'
    },
    { 
      value: 'wind', 
      icon: '💨', 
      label: t('wind', 'Wind'),
      description: t('windDesc', 'Gentle breeze for stress relief and calm'),
      color: '#8b5cf6'
    },
    { 
      value: 'stream', 
      icon: '🏞️', 
      label: t('stream', 'Stream'),
      description: t('streamDesc', 'Flowing water for stress relief and focus'),
      color: '#14b8a6'
    }
  ];

  // Create saved backgrounds options
  const savedBackgroundOptions = (savedCustomBackgrounds || []).map(bg => ({
    value: `saved-${bg.id}`,
    icon: '🎵',
    label: bg.customName,
    description: t('savedBackgroundDesc', 'Your saved custom background'),
    color: '#ec4899',
    savedBackground: bg
  }));

  // Add current custom background if available
  const currentCustomOptions = customBackground 
    ? [{
        value: 'custom',
        icon: '🎵',
        label: customBackground.name || t('customBackground', 'Custom Background'),
        description: t('customBackgroundDesc', 'Your uploaded custom background music'),
        color: '#ec4899'
      }]
    : [];

  // Combine all background options: current custom + saved + defaults
  const backgroundOptions = [
    ...currentCustomOptions,
    ...savedBackgroundOptions,
    ...defaultBackgroundOptions
  ];

  // Find the index of the selected background
  useEffect(() => {
    const selectedIndex = backgroundOptions.findIndex(bg => bg.value === selectedBackground);
    if (selectedIndex !== -1) {
      setCurrentIndex(selectedIndex);
    }
  }, [selectedBackground, backgroundOptions]);

  const currentBackground = backgroundOptions[currentIndex];

  const goToPrevious = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    const newIndex = currentIndex > 0 ? currentIndex - 1 : backgroundOptions.length - 1;
    setCurrentIndex(newIndex);
    handleBackgroundSelection(backgroundOptions[newIndex]);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const goToNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    const newIndex = currentIndex < backgroundOptions.length - 1 ? currentIndex + 1 : 0;
    setCurrentIndex(newIndex);
    handleBackgroundSelection(backgroundOptions[newIndex]);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const handleBackgroundSelection = (backgroundOption) => {
    // If it's a saved background, we need to notify the parent with the background data
    if (backgroundOption.value.startsWith('saved-')) {
      // Call parent callback with saved background info
      if (onBackgroundSelect) {
        onBackgroundSelect(backgroundOption.value, backgroundOption.savedBackground);
      }
    } else {
      // Regular background selection
      onBackgroundSelect(backgroundOption.value);
    }
  };

  // Add proper touch event listeners with { passive: false }
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleTouchStart = (e) => {
      setTouchEnd(null);
      setTouchStart(e.touches[0].clientX);
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
    };

    const handleTouchEnd = () => {
      if (!touchStart || !touchEnd) {
        return;
      }
      
      const distance = touchStart - touchEnd;
      const minSwipeDistance = 30;
      
      if (Math.abs(distance) < minSwipeDistance) {
        return;
      }
      
      if (distance > 0) {
        // Swipe left - go to next
        goToNext();
      } else {
        // Swipe right - go to previous
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

  const playBackgroundSound = () => {
    if (audioRef) {
      audioRef.pause();
      setAudioRef(null);
      setIsPlaying(false);
    }
    
    let audio;
    
    // Handle custom and saved background files
    if (currentBackground.value === 'custom' && customBackgroundFile) {
      // Check if this is a saved background or uploaded file
      if (customBackgroundFile.savedBackground) {
        // This is a saved background - fetch from server
        const savedBg = customBackgroundFile.savedBackground;
        const audioUrl = `/api/meditation/custom-background-file/${savedBg.userId}/${savedBg.filename}`;
        audio = new Audio(audioUrl);
        
        audio.onended = () => {
          setIsPlaying(false);
          setAudioRef(null);
        };
        
        audio.onerror = () => {
          setIsPlaying(false);
          setAudioRef(null);
          console.error('Error playing saved background sound');
        };
      } else {
        // This is a newly uploaded file
        const fileUrl = URL.createObjectURL(customBackgroundFile);
        audio = new Audio(fileUrl);
        
        // Clean up the object URL when audio ends or errors
        const cleanup = () => {
          URL.revokeObjectURL(fileUrl);
          setIsPlaying(false);
          setAudioRef(null);
        };
        
        audio.onended = cleanup;
        audio.onerror = cleanup;
      }
    } else if (currentBackground.value.startsWith('saved-') && currentBackground.savedBackground) {
      // This is a saved background from the slider
      const savedBg = currentBackground.savedBackground;
      const audioUrl = `/api/meditation/custom-background-file/${savedBg.userId}/${savedBg.filename}`;
      audio = new Audio(audioUrl);
      
      audio.onended = () => {
        setIsPlaying(false);
        setAudioRef(null);
      };
      
      audio.onerror = () => {
        setIsPlaying(false);
        setAudioRef(null);
        console.error('Error playing saved background sound');
      };
    } else if (!currentBackground.value.startsWith('saved-') && currentBackground.value !== 'custom') {
      // Create path to background sound file
      const audioPath = getAssetUrl(`/assets/${currentBackground.value}.mp3`);
      audio = new Audio(audioPath);
      
      audio.onended = () => {
        setIsPlaying(false);
        setAudioRef(null);
      };
      
      audio.onerror = () => {
        setIsPlaying(false);
        setAudioRef(null);
        console.error('Error playing background sound');
      };
    } else {
      // Custom background selected but no file available
      console.log('Custom background selected but no file available for preview');
      return;
    }
    
    audio.play();
    setAudioRef(audio);
    setIsPlaying(true);
  };

  const stopBackgroundSound = () => {
    if (audioRef) {
      audioRef.pause();
      setAudioRef(null);
      setIsPlaying(false);
    }
  };

  // Stop audio when switching backgrounds
  useEffect(() => {
    stopBackgroundSound();
  }, [currentIndex]);

  if (!currentBackground) return null;

  return (
    <div className="background-slider" onKeyDown={handleKeyDown} tabIndex="0">
      <div className="background-slider-header">
        <h2 className="section-title">🎵</h2>
        <div className="background-counter">
          {currentIndex + 1} {t('of', 'of')} {backgroundOptions.length}
        </div>
      </div>

      <div 
        ref={cardRef}
        className={`background-card ${isTransitioning ? 'transitioning' : ''} ${swipeDirection ? 'swiping-' + swipeDirection : ''}`}
        style={{ borderColor: currentBackground.color }}
      >
        <div className="background-navigation">
          <button 
            className="nav-button nav-prev" 
            onClick={goToPrevious}
            aria-label={t('previousBackground', 'Previous background')}
          >
            ◀
          </button>
          
          <div className="background-info">
            <div className="background-header">
              <div className="background-icon" style={{ color: currentBackground.color }}>
                {currentBackground.icon}
              </div>
              <div className="background-name">{currentBackground.label}</div>
            </div>
            
            <div className="background-description">
              {currentBackground.description}
            </div>
            
            {/* Play Button */}
            <div className="background-preview">
              <button 
                className="background-play-button"
                onClick={isPlaying ? stopBackgroundSound : playBackgroundSound}
                aria-label={isPlaying ? 'Stop Preview' : 'Play Preview'}
                disabled={currentBackground.value === 'custom' && !customBackgroundFile}
                style={currentBackground.value === 'custom' && !customBackgroundFile ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
              >
                {isPlaying ? '⏸️' : '▶️'}
              </button>
            </div>
          </div>
          
          <button 
            className="nav-button nav-next" 
            onClick={goToNext}
            aria-label={t('nextBackground', 'Next background')}
          >
            ▶
          </button>
        </div>
      </div>
    </div>
  );
};

export default BackgroundSlider;