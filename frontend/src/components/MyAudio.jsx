import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { getFullUrl, getAssetUrl, API_ENDPOINTS } from '../config/api';
import ShareMeditationDialog from './ShareMeditationDialog';
import PageHeader from './PageHeader';

const MyAudio = ({ user, userCredits, isGenerating, onCreditsUpdate, onProfileClick, unreadCount, onInboxClick, onCreateClick }) => {
  const [meditations, setMeditations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [playingMeditationId, setPlayingMeditationId] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(null);
  const [showImageOptions, setShowImageOptions] = useState(null);
  const [showShareDialog, setShowShareDialog] = useState(null);
  const [isSharing, setIsSharing] = useState(false);
  const [filterType, setFilterType] = useState('all');
  const { t } = useTranslation();
  const prevIsGenerating = useRef(isGenerating);
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (user) {
      fetchUserMeditations();
    }
  }, [user]);

  // Refresh only when generation completes (goes from true to false)
  useEffect(() => {
    if (prevIsGenerating.current === true && isGenerating === false && user) {
      // Generation just completed, refresh the list
      const timer = setTimeout(() => {
        fetchUserMeditations();
      }, 1000);
      
      return () => clearTimeout(timer);
    }
    
    // Update the ref for next render
    prevIsGenerating.current = isGenerating;
  }, [isGenerating, user]);

  const fetchUserMeditations = async () => {
    try {
      // Only show loading on initial load, not on refresh
      if (meditations.length === 0) {
        setIsLoading(true);
      }
      const response = await axios.get(getFullUrl(API_ENDPOINTS.USER_MEDITATIONS(user.id)));
      setMeditations(response.data.meditations);
    } catch (error) {
      console.error('Error fetching meditations:', error);
      setError(t('failedToLoadMeditations', 'Failed to load your meditations'));
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatDuration = (minutes) => {
    return `${minutes} ${t('minutes', 'minutes')}`;
  };

  const formatAudioDuration = (seconds) => {
    if (!seconds) return t('unknown', 'Unknown');
    
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    
    if (minutes === 0) {
      return `${remainingSeconds}s`;
    } else if (remainingSeconds === 0) {
      return `${minutes}m`;
    } else {
      return `${minutes}m ${remainingSeconds}s`;
    }
  };

  // Get unique meditation types from user's meditations
  const availableTypes = [...new Set(meditations.map(m => m.meditationType))];

  // Filter meditations based on type filter only
  const filteredMeditations = meditations.filter(meditation => {
    return filterType === 'all' || meditation.meditationType === filterType;
  });

  const handleImageUpload = async (meditationId, file) => {
    setUploadingImage(meditationId);
    
    try {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('userId', user.id);
      
      const response = await axios.post(
        getFullUrl(API_ENDPOINTS.UPLOAD_IMAGE(meditationId)),
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      
      // Refresh meditations to show the new image
      await fetchUserMeditations();
      setShowImageOptions(null);
      
    } catch (error) {
      console.error('Error uploading image:', error);
      setError(t('failedUploadImage', 'Failed to upload image. Please try again.'));
    } finally {
      setUploadingImage(null);
    }
  };

  const handleFileSelect = (meditationId, event) => {
    const file = event.target.files[0];
    if (file) {
      handleImageUpload(meditationId, file);
    }
  };

  const startCamera = async (meditationId) => {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setError(t('cameraNotSupported', 'Camera is not supported in this browser. Please use Chrome, Firefox, or Safari.'));
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        setShowImageOptions(meditationId + '_camera');
        setError('');
      }
    } catch (error) {
      let errorMessage = '';
      
      if (error.name === 'NotAllowedError') {
        errorMessage = t('cameraPermissionDenied', 'Camera permission denied. Please allow camera access in your browser.');
      } else if (error.name === 'NotFoundError') {
        errorMessage = t('noCameraFound', 'No camera found. Please ensure your device has a camera connected.');
      } else if (error.name === 'NotReadableError') {
        errorMessage = t('cameraInUse', 'Camera is being used by another application. Please close other apps using the camera.');
      } else {
        errorMessage = `Camera error: ${error.message}`;
      }
      
      setError(errorMessage);
    }
  };

  const capturePhoto = async (meditationId) => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0);
    
    // Convert canvas to blob
    canvas.toBlob(async (blob) => {
      const file = new File([blob], 'camera-capture.jpg', { type: 'image/jpeg' });
      await handleImageUpload(meditationId, file);
      
      // Stop camera stream
      const stream = video.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
      
      setShowImageOptions(null);
    }, 'image/jpeg', 0.8);
  };

  const deleteCustomImage = async (meditationId) => {
    try {
      await axios.delete(getFullUrl(API_ENDPOINTS.DELETE_IMAGE(meditationId)), {
        params: { userId: user.id }
      });
      await fetchUserMeditations();
      setShowImageOptions(null);
    } catch (error) {
      console.error('Error deleting custom image:', error);
      setError(t('failedDeleteImage', 'Failed to delete image. Please try again.'));
    }
  };

  const shareMeditation = async (meditationId, shareData) => {
    // Check credits before sharing
    if (userCredits && userCredits.credits < 1) {
      setError(t('insufficientCreditsShare', 'Insufficient credits. You need 1 credit to share a meditation.'));
      return;
    }
    
    setIsSharing(true);
    try {
      const meditation = meditations.find(m => m.id === meditationId);
      if (!meditation) {
        throw new Error('Meditation not found');
      }

      // Create FormData for sharing
      const formData = new FormData();
      formData.append('title', shareData.title);
      formData.append('description', shareData.description);
      formData.append('text', meditation.text);
      formData.append('meditationType', meditation.meditationType);
      formData.append('language', meditation.language);
      formData.append('duration', meditation.audioFiles[0]?.duration || 300);
      formData.append('userId', user.id);
      formData.append('originalMeditationId', meditationId);

      // Copy audio file to shared location
      const audioFile = meditation.audioFiles[0];
      if (audioFile) {
        try {
          // First try to fetch the audio file
          const audioUrl = getFullUrl(API_ENDPOINTS.MEDITATION_AUDIO(audioFile.filename));
          console.log('Fetching audio from:', audioUrl);
          
          const audioResponse = await fetch(audioUrl);
          if (!audioResponse.ok) {
            throw new Error(`Failed to fetch audio: ${audioResponse.status}`);
          }
          
          const audioBlob = await audioResponse.blob();
          const audioFileToUpload = new File([audioBlob], audioFile.filename, { type: 'audio/mpeg' });
          formData.append('audio', audioFileToUpload);
        } catch (audioError) {
          console.error('Error fetching audio file:', audioError);
          // Try alternative path
          const altAudioUrl = `${window.location.origin}/assets/meditations/${audioFile.filename}`;
          console.log('Trying alternative audio URL:', altAudioUrl);
          const audioResponse = await fetch(altAudioUrl);
          const audioBlob = await audioResponse.blob();
          const audioFileToUpload = new File([audioBlob], audioFile.filename, { type: 'audio/mpeg' });
          formData.append('audio', audioFileToUpload);
        }
      }

      // Copy custom image if exists
      if (meditation.customImage && meditation.customImage.filename) {
        const imageResponse = await fetch(getFullUrl(API_ENDPOINTS.CUSTOM_IMAGE(meditation.customImage.filename)));
        const imageBlob = await imageResponse.blob();
        formData.append('image', imageBlob, meditation.customImage.filename);
      }

      const response = await axios.post(getFullUrl('/api/community/share'), formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        // Update meditation to mark as shared
        await axios.patch(getFullUrl(`/api/user-meditations/${user.id}/${meditationId}/share`), {
          sharedMeditationId: response.data.meditation._id,
          isShared: true
        });
        
        // Refresh meditations and credits
        await fetchUserMeditations();
        if (onCreditsUpdate) {
          onCreditsUpdate();
        }
        setShowShareDialog(null);
        setError('');
        
        // Show success message
        alert(t('meditationSharedSuccess', 'Meditation shared successfully! It will appear in the community after admin approval.'));
      }
    } catch (error) {
      console.error('Error sharing meditation:', error);
      setError(t('failedShareMeditation', 'Failed to share meditation. Please try again.'));
    } finally {
      setIsSharing(false);
    }
  };

  const getImageUrl = (meditation) => {
    if (meditation.customImage && meditation.customImage.filename) {
      return getAssetUrl(API_ENDPOINTS.CUSTOM_IMAGE(meditation.customImage.filename));
    }
    return meditationTypeImages[meditation.meditationType] || meditationTypeImages.sleep;
  };

  const meditationTypeLabels = {
    sleep: t('sleepMeditation', 'Sleep'),
    stress: t('stressMeditation', 'Stress'),
    focus: t('focusMeditation', 'Focus'),
    anxiety: t('anxietyMeditation', 'Anxiety'),
    energy: t('energyMeditation', 'Energy'),
    mindfulness: t('mindfulnessMeditation', 'Mindfulness'),
    compassion: t('compassionMeditation', 'Compassion'),
    walking: t('walkingMeditation', 'Walking'),
    breathing: t('breathingMeditation', 'Breathing'),
    morning: t('morningMeditation', 'Morning')
  };

  const meditationTypeImages = {
    sleep: getAssetUrl(API_ENDPOINTS.DEFAULT_IMAGE('sleep')),
    stress: getAssetUrl(API_ENDPOINTS.DEFAULT_IMAGE('stress')),
    focus: getAssetUrl(API_ENDPOINTS.DEFAULT_IMAGE('focus')),
    anxiety: getAssetUrl(API_ENDPOINTS.DEFAULT_IMAGE('anxiety')),
    energy: getAssetUrl(API_ENDPOINTS.DEFAULT_IMAGE('energy')),
    mindfulness: getAssetUrl(API_ENDPOINTS.DEFAULT_IMAGE('mindfulness')),
    compassion: getAssetUrl(API_ENDPOINTS.DEFAULT_IMAGE('compassion')),
    walking: getAssetUrl(API_ENDPOINTS.DEFAULT_IMAGE('walking')),
    breathing: getAssetUrl(API_ENDPOINTS.DEFAULT_IMAGE('breathing')),
    morning: getAssetUrl(API_ENDPOINTS.DEFAULT_IMAGE('morning'))
  };

  if (isLoading) {
    return (
      <div className="my-audio-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          {t('loading', 'Loading...')}
        </div>
      </div>
    );
  }

  // Don't replace entire component with error, just show it alongside content

  return (
    <div className="my-audio-container">
      <PageHeader 
        user={user}
        onProfileClick={onProfileClick}
        title={t('myMeditation', 'My Meditations')}
        unreadCount={unreadCount}
        onInboxClick={onInboxClick}
        onCreateClick={onCreateClick}
      />
        
      {availableTypes.length > 0 && (
        <div className="filter-section" style={{ marginBottom: '24px' }}>
          <div className="filter-pills">
            <button 
              className={`filter-pill ${filterType === 'all' ? 'active' : ''}`}
              onClick={() => setFilterType('all')}
            >
              {t('allTypes', 'All')} ({meditations.length})
            </button>
            {availableTypes.map(type => {
              const count = meditations.filter(m => m.meditationType === type).length;
              return (
                <button 
                  key={type}
                  className={`filter-pill ${filterType === type ? 'active' : ''}`}
                  onClick={() => setFilterType(type)}
                >
                  {meditationTypeLabels[type] || type} ({count})
                </button>
              );
            })}
          </div>
        </div>
      )}
        

      {error && (
        <div className="error-banner" style={{ 
          background: 'rgba(239, 68, 68, 0.1)', 
          border: '1px solid rgba(239, 68, 68, 0.3)',
          borderRadius: '8px',
          padding: '12px 16px',
          margin: '16px 0',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <span style={{ fontSize: '16px' }}>⚠️</span>
          <span style={{ flex: 1 }}>{error}</span>
          <button 
            onClick={() => setError('')}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              padding: '4px',
              fontSize: '16px'
            }}
          >
            ✕
          </button>
        </div>
      )}

      {isGenerating && (
        <div className="generation-status">
          <div className="loading-spinner">
            <div className="spinner"></div>
            {t('generating', 'Generating your meditation...')}
          </div>
        </div>
      )}

      {filteredMeditations.length === 0 && !isGenerating ? (
        <div className="empty-state">
          <div className="empty-icon">🎵</div>
          <h3>{t('noMeditations', 'No meditations yet')}</h3>
          <p>{t('createFirst', 'Create your first meditation to see it here')}</p>
        </div>
      ) : filteredMeditations.length > 0 && (
        <div className="meditations-list">
          {filteredMeditations.map((meditation) => (
            <div key={meditation.id} className="meditation-card">
              <div className="meditation-thumbnail">
                <img 
                  src={getImageUrl(meditation)}
                  alt={meditationTypeLabels[meditation.meditationType] || meditation.meditationType}
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
                <div className="thumbnail-controls">
                  <button 
                    className="thumbnail-play-button"
                    onClick={() => {
                      if (meditation.audioFiles && meditation.audioFiles.length > 0) {
                        const audio = document.querySelector(`#audio-${meditation.id}`);
                        if (audio) {
                          if (audio.paused) {
                            // Pause all other audios first
                            document.querySelectorAll('audio').forEach(a => a.pause());
                            audio.play()
                              .then(() => {
                                setPlayingMeditationId(meditation.id);
                              })
                              .catch(err => {
                                console.error('Error playing audio:', err);
                              });
                          } else {
                            audio.pause();
                            setPlayingMeditationId(null);
                          }
                        }
                      }
                    }}
                    disabled={!meditation.audioFiles || meditation.audioFiles.length === 0}
                  >
                    {playingMeditationId === meditation.id ? '⏸' : '▶'}
                  </button>
                  <span className="thumbnail-duration">
                    {meditation.audioFiles && meditation.audioFiles.length > 0 && meditation.audioFiles[0].duration 
                      ? formatAudioDuration(meditation.audioFiles[0].duration) 
                      : '0:00'}
                  </span>
                </div>
              </div>

              <div className="meditation-details">
                <div className="meditation-header">
                  <div className="meditation-type">
                    {meditationTypeLabels[meditation.meditationType] || meditation.meditationType}
                  </div>
                </div>
                
                <div className="meditation-info">
                  <span className="meditation-language">
                    🗣️ {meditation.language}
                  </span>
                </div>
              </div>

              <div className="meditation-controls">
                {meditation.audioFiles && meditation.audioFiles.length > 0 && (
                  <button 
                    className="share-button"
                    onClick={() => {
                      if (userCredits && userCredits.credits < 1) {
                        setError(t('insufficientCreditsShare', 'Insufficient credits. You need 1 credit to share a meditation.'));
                        return;
                      }
                      setShowShareDialog(meditation.id);
                    }}
                    title={t('shareMeditation', 'Share Meditation')}
                    disabled={userCredits && userCredits.credits < 1}
                  >
                    <span className="share-icon">
                      {meditation.isShared ? '🌟' : '📤'}
                    </span>
                  </button>
                )}
              </div>


              {meditation.audioFiles && meditation.audioFiles.length > 0 && (
                <div className="audio-files-hidden">
                  {meditation.audioFiles.map((audioFile, index) => (
                    <audio 
                      key={index} 
                      id={index === 0 ? `audio-${meditation.id}` : `audio-${meditation.id}-${index}`}
                      preload="none"
                      onEnded={() => setPlayingMeditationId(null)}
                      onPause={() => {
                        if (playingMeditationId === meditation.id) {
                          setPlayingMeditationId(null);
                        }
                      }}
                    >
                      <source 
                        src={getAssetUrl(API_ENDPOINTS.MEDITATION_AUDIO(audioFile.filename))} 
                        type="audio/mpeg" 
                      />
                      {t('audioNotSupported', 'Your browser does not support the audio element.')}
                    </audio>
                  ))}
                  <div className="audio-info-minimal">
                    <span className="audio-count">{meditation.audioFiles.length} {t('audioFiles', 'audio file(s)')}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Image Options Modal */}
      {showImageOptions && !showImageOptions.includes('_camera') && (
        <div className="image-options-modal">
          <div className="image-options-content">
            <h3>{t('changeImage', 'Change Image')}</h3>
            <div className="image-options-buttons">
              <button 
                className="image-option-btn"
                onClick={() => fileInputRef.current.click()}
              >
                📁 {t('uploadImage', 'Upload Image')}
              </button>
              <button 
                className="image-option-btn"
                onClick={() => startCamera(showImageOptions)}
              >
                📷 {t('takePhoto', 'Take Photo')}
              </button>
              {meditations.find(m => m.id === showImageOptions)?.customImage && (
                <button 
                  className="image-option-btn delete-btn"
                  onClick={() => deleteCustomImage(showImageOptions)}
                >
                  🗑️ {t('deleteImage', 'Delete Image')}
                </button>
              )}
            </div>
            <button 
              className="close-modal-btn"
              onClick={() => setShowImageOptions(null)}
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Camera Modal */}
      {showImageOptions && showImageOptions.includes('_camera') && (
        <div className="camera-modal">
          <div className="camera-content">
            <h3>{t('takePhoto', 'Take Photo')}</h3>
            <video ref={videoRef} className="camera-video" autoPlay muted />
            <div className="camera-controls">
              <button 
                className="camera-btn capture-btn"
                onClick={() => capturePhoto(showImageOptions.replace('_camera', ''))}
              >
                📸 {t('capture', 'Capture')}
              </button>
              <button 
                className="camera-btn cancel-btn"
                onClick={() => {
                  const video = videoRef.current;
                  const stream = video.srcObject;
                  if (stream) {
                    const tracks = stream.getTracks();
                    tracks.forEach(track => track.stop());
                  }
                  setShowImageOptions(null);
                }}
              >
                ✕ {t('cancel', 'Cancel')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={(e) => handleFileSelect(showImageOptions, e)}
      />

      {/* Hidden canvas for camera capture */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />

      {/* Share Dialog */}
      {showShareDialog && (
        <ShareMeditationDialog
          meditation={meditations.find(m => m.id === showShareDialog)}
          onShare={shareMeditation}
          onClose={() => setShowShareDialog(null)}
          isSharing={isSharing}
          t={t}
        />
      )}
    </div>
  );
};

export default MyAudio;