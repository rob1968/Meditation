import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { getAssetUrl } from '../config/api';

const BackgroundSlider = ({ 
  selectedBackground, 
  onBackgroundSelect, 
  meditationType, 
  customBackground, 
  customBackgroundFile, 
  savedCustomBackgrounds,
  backgroundsLoading,
  onCustomBackgroundUpload
}) => {
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
  const fileInputRef = useRef(null);
  
  // Upload modal state
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadName, setUploadName] = useState('');
  const [uploadDescription, setUploadDescription] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  // Remove upload card from slider options

  // Remove hardcoded defaults - all backgrounds now come from savedCustomBackgrounds

  // Create all background options from metadata (both system and custom)
  const allBackgroundOptions = useMemo(() => 
    (savedCustomBackgrounds || []).map(bg => {
      if (bg.isSystemBackground) {
        // For system backgrounds, use translation keys
        const backgroundKey = bg.filename.replace('.mp3', '');
        return {
          value: backgroundKey,
          icon: bg.icon || '🎵',
          label: t(backgroundKey, bg.customName), // Use translation key, fallback to metadata name
          description: t(`${backgroundKey}Desc`, bg.customDescription), // Use translation key, fallback to metadata desc
          color: bg.color || '#ec4899',
          savedBackground: bg,
          isSystemBackground: true
        };
      } else {
        // For custom backgrounds, use metadata values
        return {
          value: `saved-${bg.id}`,
          icon: bg.icon || '🎵',
          label: bg.customName,
          description: bg.customDescription || t('savedBackgroundDesc', 'Background music'),
          color: bg.color || '#ec4899',
          savedBackground: bg,
          isSystemBackground: false
        };
      }
    }), [savedCustomBackgrounds, t]);

  // Add current custom background if available (only if it's not already saved)
  const currentCustomOptions = useMemo(() => {
    // Only add current custom background if it's not a saved background
    if (customBackground && customBackgroundFile && !customBackgroundFile.savedBackground) {
      return [{
        value: 'custom',
        icon: '🎵',
        label: customBackground.name || t('customBackground', 'Custom Background'),
        description: t('customBackgroundDesc', 'Your uploaded custom background music'),
        color: '#ec4899'
      }];
    }
    return [];
  }, [customBackground, customBackgroundFile, t]);

  // Combine all background options: current custom + all metadata-based backgrounds
  const backgroundOptions = useMemo(() => {
    const options = [
      ...currentCustomOptions,
      ...allBackgroundOptions
    ];
    
    // Remove duplicates based on value (shouldn't happen but safety check)
    const uniqueOptions = options.filter((option, index, self) => 
      self.findIndex(o => o.value === option.value) === index
    );
    
    console.log('Background options created:', {
      total: options.length,
      unique: uniqueOptions.length,
      currentCustom: currentCustomOptions.length,
      allBackground: allBackgroundOptions.length,
      duplicates: options.length - uniqueOptions.length
    });
    
    return uniqueOptions;
  }, [currentCustomOptions, allBackgroundOptions]);

  // Ensure index is within bounds
  const safeIndex = Math.max(0, Math.min(currentIndex, backgroundOptions.length - 1));
  const currentBackground = backgroundOptions[safeIndex];
  
  // Auto-correct currentIndex if it's out of bounds
  useEffect(() => {
    if (backgroundOptions.length > 0 && (currentIndex >= backgroundOptions.length || currentIndex < 0)) {
      setCurrentIndex(0);
    }
  }, [backgroundOptions.length, currentIndex]);

  // Track if we're manually swiping to prevent conflicts
  const [isManualSwipe, setIsManualSwipe] = useState(false);

  // Find the index of the selected background - but only if not manually swiping
  useEffect(() => {
    if (backgroundOptions.length === 0 || isManualSwipe) return;
    
    const selectedIndex = backgroundOptions.findIndex(bg => bg.value === selectedBackground);
    
    if (selectedIndex !== -1 && selectedIndex !== currentIndex) {
      console.log('Auto-setting index based on selectedBackground:', selectedBackground, 'to index:', selectedIndex);
      setCurrentIndex(selectedIndex);
    }
  }, [selectedBackground, backgroundOptions, isManualSwipe, currentIndex]);

  // Special handling for uploads - force index update when new saved backgrounds are added
  useEffect(() => {
    if (selectedBackground && selectedBackground.startsWith('saved-') && backgroundOptions.length > 0 && !isManualSwipe) {
      const selectedIndex = backgroundOptions.findIndex(bg => bg.value === selectedBackground);
      if (selectedIndex !== -1 && selectedIndex !== currentIndex) {
        console.log('Upload-specific index update:', selectedBackground, 'to index:', selectedIndex);
        setCurrentIndex(selectedIndex);
      }
    }
  }, [savedCustomBackgrounds]);

  const goToPrevious = () => {
    if (isTransitioning || backgroundOptions.length === 0) return;
    
    setIsManualSwipe(true);
    setIsTransitioning(true);
    const newIndex = currentIndex > 0 ? currentIndex - 1 : backgroundOptions.length - 1;
    
    console.log('goToPrevious - currentIndex:', currentIndex, 'newIndex:', newIndex, 'option:', backgroundOptions[newIndex]?.label, 'value:', backgroundOptions[newIndex]?.value);
    
    if (backgroundOptions[newIndex]) {
      setCurrentIndex(newIndex);
      handleBackgroundSelection(backgroundOptions[newIndex]);
    }
    
    setTimeout(() => {
      setIsTransitioning(false);
      setIsManualSwipe(false);
    }, 300);
  };

  const goToNext = () => {
    if (isTransitioning || backgroundOptions.length === 0) return;
    
    console.log('goToNext - currentIndex:', currentIndex, 'backgroundOptions.length:', backgroundOptions.length);
    
    setIsManualSwipe(true);
    setIsTransitioning(true);
    const newIndex = currentIndex < backgroundOptions.length - 1 ? currentIndex + 1 : 0;
    
    console.log('goToNext - newIndex:', newIndex, 'option:', backgroundOptions[newIndex]?.label);
    
    if (backgroundOptions[newIndex]) {
      setCurrentIndex(newIndex);
      handleBackgroundSelection(backgroundOptions[newIndex]);
    }
    
    setTimeout(() => {
      setIsTransitioning(false);
      setIsManualSwipe(false);
    }, 300);
  };

  const handleBackgroundSelection = useCallback((backgroundOption) => {
    console.log('BackgroundSlider handleBackgroundSelection called with:', {
      label: backgroundOption.label, 
      value: backgroundOption.value,
      isSystem: backgroundOption.savedBackground?.isSystemBackground,
      hasMetadata: !!backgroundOption.savedBackground
    });
    
    // All backgrounds now have savedBackground metadata
    if (backgroundOption.savedBackground) {
      // Call parent callback with background metadata
      if (onBackgroundSelect) {
        onBackgroundSelect(backgroundOption.value, backgroundOption.savedBackground);
      }
    } else {
      // Fallback for any remaining legacy backgrounds
      console.log('Warning: Background without metadata:', backgroundOption);
      onBackgroundSelect(backgroundOption.value);
    }
  }, [onBackgroundSelect]);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Check file size (50MB limit)
      const maxSize = 50 * 1024 * 1024; // 50MB in bytes
      if (file.size > maxSize) {
        setUploadError(t('fileTooLarge', 'File is too large. Maximum size is 50MB.'));
        event.target.value = '';
        // Clear error after 5 seconds
        setTimeout(() => setUploadError(''), 5000);
        return;
      }
      
      // Validate file type
      const validTypes = ['audio/mpeg', 'audio/mp3', 'audio/mp4', 'audio/m4a', 'audio/aac', 'audio/amr', 'audio/aiff', 'audio/x-aiff'];
      const fileExtension = file.name.split('.').pop().toLowerCase();
      const isValidExtension = ['mp3', 'm4a', 'aac', 'amr', 'aiff'].includes(fileExtension);
      const isValidType = validTypes.includes(file.type) || isValidExtension;
      
      if (isValidType) {
        setSelectedFile(file);
        setShowUploadModal(true);
        setUploadError('');
      } else {
        setUploadError(t('invalidFileType', 'Please select a valid audio file (MP3, M4A, AAC, AMR, AIFF).'));
        // Clear error after 5 seconds
        setTimeout(() => setUploadError(''), 5000);
      }
    }
    // Reset file input value to allow re-selecting the same file
    event.target.value = '';
  };

  const handleUploadSubmit = async () => {
    if (!uploadName.trim() || !selectedFile) {
      setUploadError(t('nameRequired', 'Please enter a name for your background music.'));
      return;
    }

    // Check if name already exists in current backgrounds
    const nameExists = allBackgroundOptions.some(bg => 
      bg.label.toLowerCase() === uploadName.trim().toLowerCase()
    );
    
    if (nameExists) {
      setUploadError(t('nameAlreadyExists', 'A background with this name already exists. Please choose a different name.'));
      return;
    }

    // Check if filename already exists
    const filenameExists = allBackgroundOptions.some(bg => 
      bg.savedBackground?.originalName?.toLowerCase() === selectedFile.name.toLowerCase()
    );
    
    if (filenameExists) {
      setUploadError(t('filenameAlreadyExists', 'A file with this name has already been uploaded. Please rename your file.'));
      return;
    }

    setIsUploading(true);
    setUploadError('');

    try {
      // Call parent's upload handler
      if (onCustomBackgroundUpload) {
        await onCustomBackgroundUpload({
          file: selectedFile,
          name: uploadName.trim(),
          description: uploadDescription.trim()
        });
        
        // Close modal and reset state
        setShowUploadModal(false);
        setSelectedFile(null);
        setUploadName('');
        setUploadDescription('');
      }
    } catch (error) {
      console.error('Error uploading background:', error);
      
      // Show specific error message from server if available
      let errorMessage = t('uploadFailed', 'Failed to upload background. Please try again.');
      
      if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      setUploadError(errorMessage);
    } finally {
      setIsUploading(false);
    }
  };

  const handleCancelUpload = () => {
    setShowUploadModal(false);
    setSelectedFile(null);
    setUploadName('');
    setUploadDescription('');
    setUploadError('');
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
  }, [touchStart, touchEnd]);

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
    let audioUrl;
    
    // Simplified audio handling - all backgrounds now use the same assets route
    if (currentBackground.value === 'custom' && customBackgroundFile) {
      // Handle current custom background from upload
      if (customBackgroundFile.savedBackground) {
        // This is a saved custom background
        const savedBg = customBackgroundFile.savedBackground;
        audioUrl = getAssetUrl(`/api/meditation/custom-background-file/${savedBg.userId}/${savedBg.filename}`);
      } else {
        // This is a newly uploaded file (not yet saved)
        const fileUrl = URL.createObjectURL(customBackgroundFile);
        audio = new Audio(fileUrl);
        
        const cleanup = () => {
          URL.revokeObjectURL(fileUrl);
          setIsPlaying(false);
          setAudioRef(null);
        };
        
        audio.onended = cleanup;
        audio.onerror = cleanup;
        audio.play();
        setAudioRef(audio);
        setIsPlaying(true);
        return;
      }
    } else if (currentBackground.savedBackground) {
      // Check if it's a system or custom background
      if (currentBackground.savedBackground.isSystemBackground) {
        // System backgrounds are in /assets/
        audioUrl = getAssetUrl(`/assets/${currentBackground.savedBackground.filename}`);
      } else {
        // Custom backgrounds are in /custom-background-file/{userId}/{filename}
        const savedBg = currentBackground.savedBackground;
        audioUrl = getAssetUrl(`/api/meditation/custom-background-file/${savedBg.userId}/${savedBg.filename}`);
      }
    } else {
      // Fallback for any backgrounds without metadata
      console.log('Background without metadata:', currentBackground);
      return;
    }
    
    // Create and configure audio element
    console.log('Playing background:', currentBackground.label, 'from URL:', audioUrl);
    audio = new Audio(audioUrl);
    
    audio.onended = () => {
      setIsPlaying(false);
      setAudioRef(null);
    };
    
    audio.onerror = (error) => {
      setIsPlaying(false);
      setAudioRef(null);
      console.error('Error playing background sound:', error);
      console.error('Failed audio URL:', audioUrl);
      console.error('Background object:', currentBackground);
    };
    
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
  
  // Remove handleCardClick as it's no longer needed
  

  // Debug logging
  console.log('BackgroundSlider Debug:', {
    savedCustomBackgrounds: savedCustomBackgrounds?.length || 0,
    allBackgroundOptions: allBackgroundOptions?.length || 0,
    currentCustomOptions: currentCustomOptions?.length || 0,
    backgroundOptions: backgroundOptions?.length || 0,
    currentBackground: currentBackground?.label || 'none',
    currentIndex: currentIndex,
    selectedBackground: selectedBackground,
    customBackground: customBackground?.name || 'none',
    customBackgroundFile: customBackgroundFile?.name || 'none',
    isCustomFileSaved: !!customBackgroundFile?.savedBackground
  });

  if (backgroundsLoading || (!currentBackground || backgroundOptions.length === 0)) {
    return (
      <div className="background-slider">
        <div className="background-slider-header">
          <h2 className="section-title">🎵</h2>
          <div className="background-counter">
            {backgroundsLoading ? 'Loading...' : `0 of 0`}
          </div>
        </div>
        <div className="background-card" style={{ padding: '40px', textAlign: 'center' }}>
          <div style={{ color: 'var(--text-secondary)' }}>
            {backgroundsLoading ? 'Loading backgrounds...' : 'No backgrounds available'}
            <br />
            <small>
              savedCustomBackgrounds: {savedCustomBackgrounds?.length || 0} | 
              backgroundOptions: {backgroundOptions?.length || 0} |
              loading: {backgroundsLoading ? 'true' : 'false'}
            </small>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="background-slider" onKeyDown={handleKeyDown} tabIndex="0">
      <div className="background-slider-header">
        <h2 className="section-title">🎵</h2>
        <div className="background-counter">
          {safeIndex + 1} {t('of', 'of')} {backgroundOptions.length}
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
                onClick={(e) => {
                  e.stopPropagation();
                  isPlaying ? stopBackgroundSound() : playBackgroundSound();
                }}
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
      
      {/* Error display outside modal */}
      {uploadError && !showUploadModal && (
        <div className="upload-error-display">
          {uploadError}
        </div>
      )}
      
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="audio/*,.mp3,.m4a,.aac,.amr,.aiff"
        onChange={handleFileSelect}
        style={{ display: 'none' }}
      />
      
      {/* Upload Modal */}
      {showUploadModal && (
        <div className="upload-modal-overlay" onClick={handleCancelUpload}>
          <div className="upload-modal" onClick={(e) => e.stopPropagation()}>
            <h3>{t('uploadBackgroundMusic', 'Upload Background Music')}</h3>
            
            <div className="upload-file-info">
              <span className="file-icon">🎵</span>
              <span className="file-name">{selectedFile?.name}</span>
            </div>
            
            <div className="upload-form">
              <div className="form-group">
                <label htmlFor="upload-name">{t('name', 'Name')} *</label>
                <input
                  id="upload-name"
                  type="text"
                  value={uploadName}
                  onChange={(e) => setUploadName(e.target.value)}
                  placeholder={t('namePlaceholder', 'Enter a name for your background music')}
                  className="upload-input"
                  autoFocus
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="upload-description">{t('description', 'Description')}</label>
                <textarea
                  id="upload-description"
                  value={uploadDescription}
                  onChange={(e) => setUploadDescription(e.target.value)}
                  placeholder={t('descriptionPlaceholder', 'Add a description (optional)')}
                  className="upload-textarea"
                  rows="3"
                />
              </div>
              
              {uploadError && (
                <div className="upload-error">
                  {uploadError}
                </div>
              )}
              
              <div className="upload-actions">
                <button
                  className="upload-cancel-btn"
                  onClick={handleCancelUpload}
                  disabled={isUploading}
                >
                  {t('cancel', 'Cancel')}
                </button>
                <button
                  className="upload-submit-btn"
                  onClick={handleUploadSubmit}
                  disabled={isUploading || !uploadName.trim()}
                >
                  {isUploading ? (
                    <>
                      <span className="upload-spinner"></span>
                      {t('uploading', 'Uploading...')}
                    </>
                  ) : (
                    t('upload', 'Upload')
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Upload Section - Below Slider */}
      <div className="upload-section">
        <button 
          className="upload-trigger-button"
          onClick={() => fileInputRef.current?.click()}
        >
          <span className="upload-icon">📤</span>
          <span className="upload-text">{t('selectAudioFile', 'Select Audio File')}</span>
        </button>
      </div>
    </div>
  );
};

export default BackgroundSlider;