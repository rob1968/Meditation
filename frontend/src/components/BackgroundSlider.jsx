import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

const BackgroundSlider = ({ selectedBackground, onBackgroundSelect, meditationType }) => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Touch/swipe state
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState(null);
  const cardRef = useRef(null);

  const getBackgroundOptionsForType = (type) => {
    const allOptions = [
      { 
        value: 'rain', 
        icon: '🌧️', 
        label: t('rain', 'Rain'),
        description: t('rainDesc', 'Gentle rainfall for peaceful relaxation'),
        types: ['sleep', 'stress', 'anxiety'],
        color: '#6366f1'
      },
      { 
        value: 'ocean', 
        icon: '🌊', 
        label: t('ocean', 'Ocean'),
        description: t('oceanDesc', 'Calming waves for deep focus and tranquility'),
        types: ['sleep', 'focus', 'anxiety'],
        color: '#06b6d4'
      },
      { 
        value: 'forest', 
        icon: '🌲', 
        label: t('forest', 'Forest'),
        description: t('forestDesc', 'Natural woodland sounds for grounding and energy'),
        types: ['stress', 'focus', 'energy'],
        color: '#10b981'
      },
      { 
        value: 'birds', 
        icon: '🐦', 
        label: t('birds', 'Birds'),
        description: t('birdsDesc', 'Cheerful birdsong for energy and focus'),
        types: ['energy', 'focus'],
        color: '#f59e0b'
      },
      { 
        value: 'wind', 
        icon: '💨', 
        label: t('wind', 'Wind'),
        description: t('windDesc', 'Gentle breeze for stress relief and calm'),
        types: ['stress', 'anxiety'],
        color: '#8b5cf6'
      },
      { 
        value: 'stream', 
        icon: '🏞️', 
        label: t('stream', 'Stream'),
        description: t('streamDesc', 'Flowing water for stress relief and focus'),
        types: ['stress', 'focus'],
        color: '#14b8a6'
      }
    ];
    
    // Filter options for current meditation type, or show all if no match
    const filteredOptions = allOptions.filter(option => 
      option.types.includes(type) || 
      ['rain', 'ocean', 'forest'].includes(option.value) // Keep original options
    );
    
    return filteredOptions.length > 0 ? filteredOptions : allOptions.filter(option => 
      ['rain', 'ocean', 'forest'].includes(option.value)
    );
  };

  const backgroundOptions = getBackgroundOptionsForType(meditationType);

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
    onBackgroundSelect(backgroundOptions[newIndex].value);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const goToNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    const newIndex = currentIndex < backgroundOptions.length - 1 ? currentIndex + 1 : 0;
    setCurrentIndex(newIndex);
    onBackgroundSelect(backgroundOptions[newIndex].value);
    setTimeout(() => setIsTransitioning(false), 300);
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

  if (!currentBackground) return null;

  return (
    <div className="background-slider" onKeyDown={handleKeyDown} tabIndex="0">
      <div className="background-slider-header">
        <h2 className="section-title">🎵 {t('backgroundLabel', 'Background Sound')}</h2>
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
            
            <div className="background-badge" style={{ backgroundColor: currentBackground.color }}>
              {t(currentBackground.value, currentBackground.value)}
            </div>
            
            {currentBackground.types.includes(meditationType) && (
              <div className="background-recommendation">
                ✨ {t('recommendedFor', 'Recommended for')} {t(meditationType + 'Meditation', meditationType)}
              </div>
            )}
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