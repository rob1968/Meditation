import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

const MeditationTypeSlider = ({ selectedType, onTypeSelect }) => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Touch/swipe state
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState(null);
  const cardRef = useRef(null);

  const meditationTypes = [
    { 
      type: 'sleep', 
      icon: '🌙', 
      label: t('sleepMeditation'),
      description: t('sleepMeditationDesc', 'Gentle guidance to help you drift into peaceful sleep'),
      color: '#6366f1'
    },
    { 
      type: 'stress', 
      icon: '😌', 
      label: t('stressMeditation', 'Stress'),
      description: t('stressMeditationDesc', 'Release tension and find calm in stressful moments'),
      color: '#10b981'
    },
    { 
      type: 'focus', 
      icon: '🎯', 
      label: t('focusMeditation'),
      description: t('focusMeditationDesc', 'Enhance concentration and mental clarity'),
      color: '#f59e0b'
    },
    { 
      type: 'anxiety', 
      icon: '🌿', 
      label: t('anxietyMeditation'),
      description: t('anxietyMeditationDesc', 'Soothe worries and cultivate inner peace'),
      color: '#06b6d4'
    },
    { 
      type: 'energy', 
      icon: '⚡', 
      label: t('energyMeditation'),
      description: t('energyMeditationDesc', 'Revitalize your mind and body with gentle energy'),
      color: '#f97316'
    },
    { 
      type: 'mindfulness', 
      icon: '🧘', 
      label: t('mindfulnessMeditation'),
      description: t('mindfulnessMeditationDesc', 'Cultivate present-moment awareness and inner stillness'),
      color: '#8b5cf6'
    },
    { 
      type: 'compassion', 
      icon: '💙', 
      label: t('compassionMeditation'),
      description: t('compassionMeditationDesc', 'Develop loving-kindness and empathy for yourself and others'),
      color: '#ec4899'
    },
    { 
      type: 'walking', 
      icon: '🚶', 
      label: t('walkingMeditation'),
      description: t('walkingMeditationDesc', 'Mindful movement and awareness while walking'),
      color: '#84cc16'
    },
    { 
      type: 'breathing', 
      icon: '🫁', 
      label: t('breathingMeditation'),
      description: t('breathingMeditationDesc', 'Focus on breath to calm the mind and body'),
      color: '#06b6d4'
    },
    { 
      type: 'morning', 
      icon: '🌅', 
      label: t('morningMeditation'),
      description: t('morningMeditationDesc', 'Start your day with intention and positive energy'),
      color: '#f59e0b'
    }
  ];

  // Find the index of the selected type
  useEffect(() => {
    const selectedIndex = meditationTypes.findIndex(type => type.type === selectedType);
    if (selectedIndex !== -1) {
      setCurrentIndex(selectedIndex);
    }
  }, [selectedType]);

  const currentType = meditationTypes[currentIndex];

  const goToPrevious = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    const newIndex = currentIndex > 0 ? currentIndex - 1 : meditationTypes.length - 1;
    setCurrentIndex(newIndex);
    onTypeSelect(meditationTypes[newIndex].type);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const goToNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    const newIndex = currentIndex < meditationTypes.length - 1 ? currentIndex + 1 : 0;
    setCurrentIndex(newIndex);
    onTypeSelect(meditationTypes[newIndex].type);
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

  if (!currentType) return null;

  return (
    <div className="meditation-type-slider" onKeyDown={handleKeyDown} tabIndex="0">
      <div className="meditation-type-slider-header">
        <h2 className="section-title">🧘‍♀️ {t('meditationType', 'Meditation Type')}</h2>
        <div className="meditation-type-counter">
          {currentIndex + 1} {t('of', 'of')} {meditationTypes.length}
        </div>
      </div>

      <div 
        ref={cardRef}
        className={`meditation-type-card ${isTransitioning ? 'transitioning' : ''} ${swipeDirection ? 'swiping-' + swipeDirection : ''}`}
        style={{ borderColor: currentType.color }}
      >
        <div className="meditation-type-navigation">
          <button 
            className="nav-button nav-prev" 
            onClick={goToPrevious}
            aria-label={t('previousType', 'Previous type')}
          >
            ◀
          </button>
          
          <div className="meditation-type-info">
            <div className="meditation-type-header">
              <div className="meditation-type-icon" style={{ color: currentType.color }}>
                {currentType.icon}
              </div>
              <div className="meditation-type-name">{currentType.label}</div>
            </div>
            
            <div className="meditation-type-description">
              {currentType.description}
            </div>
          </div>
          
          <button 
            className="nav-button nav-next" 
            onClick={goToNext}
            aria-label={t('nextType', 'Next type')}
          >
            ▶
          </button>
        </div>
      </div>
    </div>
  );
};

export default MeditationTypeSlider;