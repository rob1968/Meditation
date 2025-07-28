import React, { useState, useEffect, useRef, useCallback, useMemo, forwardRef, useImperativeHandle } from 'react';
import { useTranslation } from 'react-i18next';
import { getAssetUrl } from '../config/api';

const BackgroundSlider = forwardRef(({ 
  selectedBackground, 
  onBackgroundSelect, 
  meditationType, 
  customBackground, 
  customBackgroundFile, 
  savedCustomBackgrounds,
  backgroundsLoading,
  onCustomBackgroundUpload,
  showUploadFirst = true, // New prop to show upload card first by default
  onStopAllAudio
}, ref) => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);
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
  const [pendingNavigateToUpload, setPendingNavigateToUpload] = useState(null);

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

  // Create upload card as first option
  const uploadCard = {
    value: 'upload',
    icon: '📁',
    label: t('selectAudioFile', 'Select Audio File'),
    description: t('uploadBackgroundMusic', 'Upload your own background music'),
    color: '#3b82f6'
  };

  // Combine all background options: upload card first, then current custom + all metadata-based backgrounds
  const backgroundOptions = useMemo(() => {
    const options = [
      uploadCard,
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
      duplicates: options.length - uniqueOptions.length,
      firstOption: uniqueOptions[0]?.value,
      uploadCard: uploadCard.value
    });
    
    return uniqueOptions;
  }, [uploadCard, currentCustomOptions, allBackgroundOptions]);

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
  
  // Expose stopBackgroundSound function to parent via ref
  useImperativeHandle(ref, () => ({
    stopBackgroundSound
  }));

  // Handle initial load and background selection
  useEffect(() => {
    if (backgroundOptions.length === 0) return;
    
    // Always start with upload card on first load if showUploadFirst is true
    if (!isInitialized && showUploadFirst) {
      console.log('Initial load: setting to upload card (index 0)', backgroundOptions[0]);
      setCurrentIndex(0);
      setIsInitialized(true);
      return;
    }
    
    // Mark as initialized
    if (!isInitialized) {
      setIsInitialized(true);
      return;
    }
    
    // Skip auto-navigation if user is manually swiping or if we want to show upload first
    if (isManualSwipe || (showUploadFirst && currentIndex === 0)) return;
    
    // For subsequent updates, only navigate to selected background if it's not upload
    if (selectedBackground && selectedBackground !== 'upload') {
      const selectedIndex = backgroundOptions.findIndex(bg => bg.value === selectedBackground);
      
      if (selectedIndex !== -1 && selectedIndex !== currentIndex) {
        console.log('Auto-setting index based on selectedBackground:', selectedBackground, 'to index:', selectedIndex);
        setCurrentIndex(selectedIndex);
      }
    }
  }, [backgroundOptions, selectedBackground, isManualSwipe, isInitialized, showUploadFirst, currentIndex]);

  // Special handling for uploads - force index update when new saved backgrounds are added
  useEffect(() => {
    // Don't auto-navigate if we want to show upload first and are on index 0
    if (showUploadFirst && currentIndex === 0) return;
    
    if (selectedBackground && selectedBackground.startsWith('saved-') && backgroundOptions.length > 0 && !isManualSwipe) {
      const selectedIndex = backgroundOptions.findIndex(bg => bg.value === selectedBackground);
      if (selectedIndex !== -1 && selectedIndex !== currentIndex) {
        console.log('Upload-specific index update:', selectedBackground, 'to index:', selectedIndex);
        setCurrentIndex(selectedIndex);
      }
    }
  }, [savedCustomBackgrounds, showUploadFirst, currentIndex]);

  // Handle navigation to newly uploaded background
  useEffect(() => {
    if (pendingNavigateToUpload && backgroundOptions.length > 0) {
      // Find the newly uploaded background in the list
      const newBackgroundIndex = backgroundOptions.findIndex(bg => 
        bg.label === pendingNavigateToUpload || 
        (bg.savedBackground && bg.savedBackground.customName === pendingNavigateToUpload)
      );
      
      if (newBackgroundIndex !== -1) {
        console.log('Navigating to newly uploaded background at index:', newBackgroundIndex);
        setCurrentIndex(newBackgroundIndex);
        setIsManualSwipe(true);
        setPendingNavigateToUpload(null);
        // Reset manual swipe flag after a short delay
        setTimeout(() => setIsManualSwipe(false), 500);
      }
    }
  }, [backgroundOptions, pendingNavigateToUpload]);

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
    // Don't select the upload card as a background
    if (backgroundOption.value === 'upload') {
      return;
    }
    
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
    // Stop any playing background audio during upload
    stopBackgroundSound();
    
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
        const uploadResult = await onCustomBackgroundUpload({
          file: selectedFile,
          name: uploadName.trim(),
          description: uploadDescription.trim()
        });
        
        // Store the upload name for navigation after backgroundOptions are updated
        const uploadedName = uploadName.trim();
        
        // Close modal and reset state
        setShowUploadModal(false);
        setSelectedFile(null);
        setUploadName('');
        setUploadDescription('');
        
        // Set pending navigation to the uploaded background
        setPendingNavigateToUpload(uploadedName);
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
    // Stop any playing background audio when canceling upload
    stopBackgroundSound();
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
    // Don't play sound for upload card
    if (currentBackground.value === 'upload') {
      return;
    }
    
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
    console.log('BackgroundSlider stopBackgroundSound called');
    console.log('audioRef:', audioRef);
    console.log('isPlaying:', isPlaying);
    if (audioRef) {
      console.log('Pausing audio');
      audioRef.pause();
      setAudioRef(null);
      setIsPlaying(false);
    } else {
      console.log('No audioRef to stop');
    }
  };

  // Stop audio when switching backgrounds
  useEffect(() => {
    stopBackgroundSound();
  }, [currentIndex]);
  
  // Cleanup audio on component unmount
  useEffect(() => {
    return () => {
      stopBackgroundSound();
    };
  }, []);
  
  // Remove handleCardClick as it's no longer needed
  

  // Debug logging
  console.log('BackgroundSlider Debug:', {
    savedCustomBackgrounds: savedCustomBackgrounds?.length || 0,
    allBackgroundOptions: allBackgroundOptions?.length || 0,
    currentCustomOptions: currentCustomOptions?.length || 0,
    backgroundOptions: backgroundOptions?.length || 0,
    currentBackground: currentBackground?.label || 'none',
    currentBackgroundValue: currentBackground?.value || 'none',
    currentIndex: currentIndex,
    selectedBackground: selectedBackground,
    customBackground: customBackground?.name || 'none',
    customBackgroundFile: customBackgroundFile?.name || 'none',
    isCustomFileSaved: !!customBackgroundFile?.savedBackground,
    isInitialized: isInitialized,
    showUploadFirst: showUploadFirst
  });

  if (backgroundsLoading && (!savedCustomBackgrounds || savedCustomBackgrounds.length === 0)) {
    return (
      <div className="background-slider">
        <div className="background-slider-header">
          <h2 className="section-title">🎵</h2>
          <div className="background-counter">{t('loading', 'Loading...')}</div>
        </div>
        <div className="background-card" style={{ padding: '40px', textAlign: 'center' }}>
          <div style={{ color: 'var(--text-secondary)' }}>
            {t('loadingBackgrounds', 'Loading backgrounds...')}
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

  if (!currentBackground || backgroundOptions.length === 0) {
    return (
      <div className="background-slider">
        <div className="background-slider-header">
          <h2 className="section-title">🎵</h2>
          <div className="background-counter">0 of 0</div>
        </div>
        <div className="background-card" style={{ padding: '40px', textAlign: 'center' }}>
          <div style={{ color: 'var(--text-secondary)' }}>
            {t('noBackgroundsAvailable', 'No backgrounds available')}
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
    <>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
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
            
            
            {/* Upload Button for upload card, Play Button for others */}
            <div className="background-preview">
              {currentBackground.value === 'upload' ? (
                <button 
                  className="background-upload-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    fileInputRef.current?.click();
                  }}
                  style={{
                    background: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)',
                    color: 'white',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    cursor: 'pointer',
                    fontWeight: '600'
                  }}
                >
                  ⬆️ {t('upload', 'Upload')}
                </button>
              ) : (
                <button 
                  className="background-play-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    isPlaying ? stopBackgroundSound() : playBackgroundSound();
                  }}
                  aria-label={isPlaying ? t('stopPreview', 'Stop Preview') : t('playPreview', 'Play Preview')}
                  disabled={currentBackground.value === 'custom' && !customBackgroundFile}
                  style={currentBackground.value === 'custom' && !customBackgroundFile ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
                >
                  {isPlaying ? '⏸️' : '▶️'}
                </button>
              )}
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
        <div 
          className="upload-modal-overlay" 
          onClick={handleCancelUpload}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            backdropFilter: 'blur(20px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10000,
            padding: '20px'
          }}
        >
          <div 
            className="upload-modal" 
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'var(--glass-dark)',
              backdropFilter: 'blur(20px)',
              padding: '32px',
              borderRadius: '20px',
              maxWidth: '480px',
              width: '100%',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            {/* Header */}
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              marginBottom: '28px',
              gap: '16px'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: 'var(--glass-light)',
                backdropFilter: 'blur(15px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px'
              }}>
                🎵
              </div>
              <div>
                <h3 style={{ 
                  margin: '0', 
                  color: 'var(--text-primary)',
                  fontSize: '20px',
                  fontWeight: '600',
                  letterSpacing: '-0.025em'
                }}>
                  {t('uploadBackgroundMusic', 'Upload Background Music')}
                </h3>
              </div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
              <div>
                <label 
                  htmlFor="upload-name"
                  style={{ 
                    display: 'block',
                    marginBottom: 'var(--space-sm)', 
                    fontWeight: '600',
                    color: 'var(--text-primary)',
                    fontSize: '14px'
                  }}
                >
                  {t('name', 'Name')} *
                </label>
                <input
                  id="upload-name"
                  type="text"
                  value={uploadName}
                  onChange={(e) => setUploadName(e.target.value)}
                  placeholder={t('namePlaceholder', 'Enter a name for your background music')}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    background: 'var(--glass-light)',
                    backdropFilter: 'blur(15px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '16px',
                    fontSize: '14px',
                    color: 'var(--text-primary)',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                    boxSizing: 'border-box',
                    fontFamily: 'var(--font-primary)',
                    minHeight: '44px'
                  }}
                  autoFocus
                  onFocus={(e) => {
                    e.target.style.background = 'var(--glass-medium)';
                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.2)';
                  }}
                  onBlur={(e) => {
                    e.target.style.background = 'var(--glass-light)';
                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>
              
              <div>
                <label 
                  htmlFor="upload-description"
                  style={{ 
                    display: 'block',
                    marginBottom: 'var(--space-sm)', 
                    fontWeight: '600',
                    color: 'var(--text-primary)',
                    fontSize: '14px'
                  }}
                >
                  {t('description', 'Description')}
                  <span style={{ color: 'var(--text-tertiary)', fontSize: '13px', fontWeight: '400', marginLeft: '4px' }}>
                    {t('optional', '(optional)')}
                  </span>
                </label>
                <textarea
                  id="upload-description"
                  value={uploadDescription}
                  onChange={(e) => setUploadDescription(e.target.value)}
                  placeholder={t('descriptionPlaceholder', 'Add a description (optional)')}
                  rows="3"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    background: 'var(--glass-light)',
                    backdropFilter: 'blur(15px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '16px',
                    fontSize: '14px',
                    color: 'var(--text-primary)',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                    resize: 'vertical',
                    fontFamily: 'var(--font-primary)',
                    boxSizing: 'border-box',
                    minHeight: '100px'
                  }}
                  onFocus={(e) => {
                    e.target.style.background = 'var(--glass-medium)';
                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.2)';
                  }}
                  onBlur={(e) => {
                    e.target.style.background = 'var(--glass-light)';
                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>
              
              {uploadError && (
                <div style={{
                  padding: 'var(--space-md)',
                  background: 'rgba(220, 38, 38, 0.1)',
                  backdropFilter: 'blur(15px)',
                  border: '1px solid rgba(220, 38, 38, 0.3)',
                  borderRadius: '16px',
                  color: '#ff6b6b',
                  fontSize: '14px',
                  fontWeight: '500'
                }}>
                  ⚠️ {uploadError}
                </div>
              )}
              
              <div style={{ 
                display: 'flex', 
                gap: 'var(--space-md)', 
                marginTop: 'var(--space-xl)'
              }}>
                <button
                  onClick={handleCancelUpload}
                  disabled={isUploading}
                  style={{
                    flex: '1',
                    background: 'var(--glass-light)',
                    backdropFilter: 'blur(15px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '16px',
                    color: 'var(--text-secondary)',
                    padding: '12px 20px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: isUploading ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s ease',
                    minHeight: '44px',
                    opacity: isUploading ? 0.6 : 1
                  }}
                  onMouseEnter={(e) => {
                    if (!isUploading) {
                      e.target.style.background = 'var(--glass-medium)';
                      e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.2)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isUploading) {
                      e.target.style.background = 'var(--glass-light)';
                      e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = 'none';
                    }
                  }}
                >
                  {t('cancel', 'Cancel')}
                </button>
                <button
                  onClick={handleUploadSubmit}
                  disabled={isUploading || !uploadName.trim()}
                  style={{
                    flex: '2',
                    background: isUploading || !uploadName.trim() 
                      ? 'var(--glass-light)' 
                      : 'var(--gradient-card-2)',
                    backdropFilter: 'blur(15px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '16px',
                    color: 'var(--text-primary)',
                    padding: '12px 20px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: isUploading || !uploadName.trim() ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 'var(--space-xs)',
                    minHeight: '44px',
                    opacity: isUploading || !uploadName.trim() ? 0.6 : 1
                  }}
                  onMouseEnter={(e) => {
                    if (!isUploading && uploadName.trim()) {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.2)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isUploading && uploadName.trim()) {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = 'none';
                    }
                  }}
                >
                  {isUploading ? (
                    <>
                      <div style={{
                        width: '16px',
                        height: '16px',
                        border: '2px solid transparent',
                        borderTop: '2px solid var(--text-primary)',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite'
                      }}></div>
                      {t('uploading', 'Uploading...')}
                    </>
                  ) : (
                    <>
                      ⬆️ {t('upload', 'Upload')}
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
    </>
  );
});

export default BackgroundSlider;