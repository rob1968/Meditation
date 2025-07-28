import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { getFullUrl, getAssetUrl, API_ENDPOINTS, API_BASE_URL } from '../config/api';
import JournalHub from './JournalHub';
import PageHeader from './PageHeader';

const CommunityHub = ({ user, onProfileClick, unreadCount, onInboxClick, onCreateClick }) => {
  const [sharedMeditations, setSharedMeditations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedMeditation, setSelectedMeditation] = useState(null);
  const [playingMeditationId, setPlayingMeditationId] = useState(null);
  const [likedMeditations, setLikedMeditations] = useState(new Set());
  const [activeSubTab, setActiveSubTab] = useState('meditations'); // 'meditations' or 'journals'
  const [filterType, setFilterType] = useState('all');
  const { t } = useTranslation();

  const meditationTypes = ['sleep', 'stress', 'focus', 'anxiety', 'energy', 'mindfulness', 'compassion', 'walking', 'breathing', 'morning'];
  const languages = ['en', 'es', 'fr', 'de', 'nl', 'zh', 'hi', 'ar', 'pt', 'ru', 'ja', 'ko', 'it'];

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

  const languageLabels = {
    en: 'English',
    es: 'Español',
    fr: 'Français',
    de: 'Deutsch',
    nl: 'Nederlands',
    zh: '中文',
    hi: 'हिन्दी',
    ar: 'العربية',
    pt: 'Português',
    ru: 'Русский',
    ja: '日本語',
    ko: '한국어',
    it: 'Italiano'
  };

  useEffect(() => {
    fetchSharedMeditations();
  }, []);

  const fetchSharedMeditations = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(getFullUrl('/api/community/shared-meditations'));
      const meditations = response.data.meditations || [];
      setSharedMeditations(meditations);
      
      // Track which meditations are liked by current user
      if (user) {
        const userLikes = new Set();
        meditations.forEach(meditation => {
          if (meditation.likes && meditation.likes.some(like => like.userId === user.id)) {
            userLikes.add(meditation._id);
          }
        });
        setLikedMeditations(userLikes);
      }
    } catch (error) {
      console.error('Error fetching shared meditations:', error);
      setError(t('failedToLoadCommunityMeditations', 'Failed to load community meditations'));
    } finally {
      setIsLoading(false);
    }
  };

  const filteredMeditations = sharedMeditations.filter(meditation => {
    return filterType === 'all' || meditation.meditationType === filterType;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatDuration = (seconds) => {
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

  const getImageUrl = (meditation) => {
    // Handle different image formats for shared meditations
    if (meditation.customImage) {
      if (typeof meditation.customImage === 'string') {
        return `${API_BASE_URL}/assets/images/shared/${meditation.customImage}`;
      } else if (meditation.customImage.filename) {
        return `${API_BASE_URL}/assets/images/shared/${meditation.customImage.filename}`;
      }
    }
    
    // Default meditation type images
    const defaultImages = {
      sleep: `${API_BASE_URL}/assets/images/sleep.jpg`,
      stress: `${API_BASE_URL}/assets/images/stress.jpg`,
      focus: `${API_BASE_URL}/assets/images/focus.jpg`,
      anxiety: `${API_BASE_URL}/assets/images/anxiety.jpg`,
      energy: `${API_BASE_URL}/assets/images/energy.jpg`,
      mindfulness: `${API_BASE_URL}/assets/images/mindfulness.jpg`,
      compassion: `${API_BASE_URL}/assets/images/compassion.jpg`,
      walking: `${API_BASE_URL}/assets/images/walking.jpg`,
      breathing: `${API_BASE_URL}/assets/images/breathing.jpg`,
      morning: `${API_BASE_URL}/assets/images/morning.jpg`
    };
    
    return defaultImages[meditation.meditationType] || defaultImages.sleep;
  };

  const handlePlayMeditation = (meditation) => {
    if (!meditation.audioFile) {
      console.log('No audio file for meditation:', meditation);
      return;
    }
    
    const audio = document.querySelector(`#shared-audio-${meditation._id}`);
    if (audio) {
      console.log('Playing audio:', meditation.audioFile.filename);
      if (audio.paused) {
        document.querySelectorAll('audio').forEach(a => {
          if (a.playTimeout) {
            clearTimeout(a.playTimeout);
            a.playTimeout = null;
          }
          a.pause();
        });
        
        // Set up 20-second timeout
        const playTimeout = setTimeout(() => {
          audio.pause();
          setPlayingMeditationId(null);
        }, 20000); // 20 seconds
        
        // Store timeout ID on audio element for cleanup
        audio.playTimeout = playTimeout;
        
        audio.play()
          .then(() => {
            setPlayingMeditationId(meditation._id);
          })
          .catch(err => {
            console.error('Error playing audio:', err);
            console.error('Audio source:', audio.src);
            clearTimeout(playTimeout);
          });
      } else {
        audio.pause();
        // Clear timeout if audio is manually paused
        if (audio.playTimeout) {
          clearTimeout(audio.playTimeout);
          audio.playTimeout = null;
        }
        setPlayingMeditationId(null);
      }
    } else {
      console.error('Audio element not found for meditation:', meditation._id);
    }
  };

  const handleLikeMeditation = async (meditationId) => {
    if (!user) return;
    
    try {
      const response = await axios.post(getFullUrl(`/api/community/meditation/${meditationId}/like`), {
        userId: user.id
      });
      
      if (response.data.success) {
        const newLikedMeditations = new Set(likedMeditations);
        if (response.data.isLiked) {
          newLikedMeditations.add(meditationId);
        } else {
          newLikedMeditations.delete(meditationId);
        }
        setLikedMeditations(newLikedMeditations);
        
        // Update meditation like count in local state
        setSharedMeditations(prevMeditations => 
          prevMeditations.map(meditation => 
            meditation._id === meditationId 
              ? { ...meditation, likeCount: response.data.likeCount }
              : meditation
          )
        );
      }
    } catch (error) {
      console.error('Error liking meditation:', error);
      setError(t('failedToLikeMeditation', 'Failed to like meditation'));
    }
  };

  if (isLoading) {
    return (
      <div className="community-hub-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          {t('loading', 'Loading...')}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="community-hub-container">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="community-hub-spotify">
      <PageHeader 
        user={user}
        onProfileClick={onProfileClick}
        title={t('community', 'Community')}
        unreadCount={unreadCount}
        onInboxClick={onInboxClick}
        onCreateClick={onCreateClick}
      />

      {/* Sub-tabs for meditations and journals */}
      <div className="community-subtabs">
        <button 
          className={`subtab-btn ${activeSubTab === 'meditations' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('meditations')}
        >
          🧘 {t('meditations', 'Meditaties')}
        </button>
        <button 
          className={`subtab-btn ${activeSubTab === 'journals' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('journals')}
        >
          📔 {t('voiceJournals', 'Dagboeken')}
        </button>
      </div>

      {/* Render content based on active sub-tab */}
      {activeSubTab === 'meditations' ? (
        <>
          {/* Filter buttons */}
          <div className="filter-section" style={{ marginTop: '16px', marginBottom: '24px' }}>
            <div className="filter-pills">
              <button 
                className={`filter-pill ${filterType === 'all' ? 'active' : ''}`}
                onClick={() => setFilterType('all')}
              >
                {t('allTypes', 'All')} ({sharedMeditations.length})
              </button>
              {meditationTypes.map(type => {
                const count = sharedMeditations.filter(m => m.meditationType === type).length;
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

          {filteredMeditations.length === 0 ? (
            <div className="spotify-empty-state">
              <div className="empty-state-content">
                <div className="empty-icon-large">🎧</div>
                <h2 className="empty-title">{t('noSharedMeditations', 'No meditations found')}</h2>
                <p className="empty-description">{t('beFirstToShare', 'Be the first to share your meditation with the community!')}</p>
              </div>
            </div>
          ) : (
            <>

              {/* My Meditation Style List */}
              <div className="community-meditations-list">
                {filteredMeditations.map((meditation, index) => (
                  <div 
                    key={meditation._id} 
                    className={`meditation-card community-card ${playingMeditationId === meditation._id ? 'playing' : ''}`}
                  >
                    <div className="meditation-thumbnail">
                      <img 
                        src={getImageUrl(meditation)}
                        alt={`${meditationTypeLabels[meditation.meditationType] || meditation.meditationType} meditation`}
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                      <div className="thumbnail-controls">
                        <button 
                          className="thumbnail-play-button"
                          onClick={() => handlePlayMeditation(meditation)}
                          disabled={!meditation.audioFile}
                        >
                          {playingMeditationId === meditation._id ? '⏸' : '▶'}
                        </button>
                        <span className="thumbnail-duration">
                          {meditation.duration ? formatDuration(meditation.duration) : '0:00'}
                        </span>
                      </div>
                    </div>

                    <div className="meditation-details">
                      <div className="meditation-header">
                        <div className="meditation-type">
                          {meditationTypeLabels[meditation.meditationType] || meditation.meditationType}
                        </div>
                        <div className="meditation-date">
                          {formatDate(meditation.createdAt)}
                        </div>
                      </div>
                      
                      <div className="meditation-info">
                        <span className="meditation-duration">
                          ⏰ {formatDuration(meditation.duration)}
                        </span>
                        <span className="meditation-language">
                          🗣️ {languageLabels[meditation.language] || meditation.language}
                        </span>
                        <span className="meditation-author">
                          👤 {meditation.author.username || meditation.author}
                        </span>
                      </div>

                      <div className="meditation-text">
                        {meditation.description && (
                          <span className="meditation-description">
                            {meditation.description.substring(0, 100)}
                            {meditation.description.length > 100 && '...'}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="meditation-controls">
                      <button 
                        className="like-button"
                        onClick={() => handleLikeMeditation(meditation._id)}
                        disabled={!user}
                        title={t('likeMeditation', 'Like Meditation')}
                      >
                        <span className="like-icon">
                          {likedMeditations.has(meditation._id) ? '💚' : '🤍'}
                        </span>
                        <span className="like-count">{meditation.likeCount || 0}</span>
                      </button>
                    </div>

                    {meditation.audioFile && (
                      <div className="community-audio-hidden">
                        <audio 
                          id={`shared-audio-${meditation._id}`}
                          preload="none"
                          onEnded={(e) => {
                            // Clear timeout when audio ends naturally
                            if (e.target.playTimeout) {
                              clearTimeout(e.target.playTimeout);
                              e.target.playTimeout = null;
                            }
                            setPlayingMeditationId(null);
                          }}
                          onPause={(e) => {
                            if (playingMeditationId === meditation._id) {
                              // Clear timeout when audio is paused
                              if (e.target.playTimeout) {
                                clearTimeout(e.target.playTimeout);
                                e.target.playTimeout = null;
                              }
                              setPlayingMeditationId(null);
                            }
                          }}
                        >
                          <source 
                            src={`${API_BASE_URL}/assets/audio/shared/${meditation.audioFile.filename}`} 
                            type="audio/mpeg" 
                          />
                        </audio>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      ) : (
        <JournalHub user={user} />
      )}
    </div>
  );
};

export default CommunityHub;