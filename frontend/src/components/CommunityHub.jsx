import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { getFullUrl, getAssetUrl, API_ENDPOINTS, API_BASE_URL } from '../config/api';

const CommunityHub = ({ user }) => {
  const [sharedMeditations, setSharedMeditations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterLanguage, setFilterLanguage] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMeditation, setSelectedMeditation] = useState(null);
  const [playingMeditationId, setPlayingMeditationId] = useState(null);
  const [likedMeditations, setLikedMeditations] = useState(new Set());
  const { t } = useTranslation();

  const meditationTypes = ['sleep', 'stress', 'focus', 'anxiety', 'energy', 'mindfulness', 'compassion', 'walking', 'breathing', 'morning'];
  const languages = ['en', 'es', 'fr', 'de', 'nl', 'zh', 'hi', 'ar', 'pt', 'ru', 'ja', 'ko', 'it'];

  const meditationTypeLabels = {
    sleep: t('sleepMeditation', 'Sleep'),
    stress: t('stressMeditation', 'Stress Relief'),
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
      setError('Failed to load community meditations');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredMeditations = sharedMeditations.filter(meditation => {
    const matchesType = filterType === 'all' || meditation.meditationType === filterType;
    const matchesLanguage = filterLanguage === 'all' || meditation.language === filterLanguage;
    const matchesSearch = searchTerm === '' || 
      meditation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      meditation.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      meditation.author.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesType && matchesLanguage && matchesSearch;
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
    if (meditation.customImage) {
      return getAssetUrl(`/images/shared/${meditation.customImage}`);
    }
    return getAssetUrl(`/images/defaults/${meditation.meditationType}.jpg`);
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
        document.querySelectorAll('audio').forEach(a => a.pause());
        audio.play()
          .then(() => {
            setPlayingMeditationId(meditation._id);
          })
          .catch(err => {
            console.error('Error playing audio:', err);
            console.error('Audio source:', audio.src);
          });
      } else {
        audio.pause();
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
      setError('Failed to like meditation');
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
    <div className="community-hub-container">
      <div className="community-header">
        <h2>🌟 {t('communityHub', 'Community Hub')}</h2>
        <p>{t('communitySubtitle', 'Discover and share meditation experiences with others')}</p>
      </div>

      <div className="community-filters">
        <div className="search-bar">
          <input
            type="text"
            placeholder={t('searchMeditations', 'Search meditations...')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-row">
          <select 
            value={filterType} 
            onChange={(e) => setFilterType(e.target.value)}
            className="filter-select"
          >
            <option value="all">{t('allTypes', 'All Types')}</option>
            {meditationTypes.map(type => (
              <option key={type} value={type}>
                {meditationTypeLabels[type] || type}
              </option>
            ))}
          </select>

          <select 
            value={filterLanguage} 
            onChange={(e) => setFilterLanguage(e.target.value)}
            className="filter-select"
          >
            <option value="all">{t('allLanguages', 'All Languages')}</option>
            {languages.map(lang => (
              <option key={lang} value={lang}>
                {languageLabels[lang] || lang}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filteredMeditations.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🌟</div>
          <h3>{t('noSharedMeditations', 'No shared meditations found')}</h3>
          <p>{t('beFirstToShare', 'Be the first to share your meditation with the community!')}</p>
        </div>
      ) : (
        <div className="shared-meditations-grid">
          {filteredMeditations.map((meditation) => (
            <div key={meditation.id} className="shared-meditation-card">
              <div className="meditation-thumbnail">
                <img 
                  src={getImageUrl(meditation)}
                  alt={meditation.title}
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
                <div className="play-overlay">
                  <button 
                    className="play-button-large"
                    onClick={() => handlePlayMeditation(meditation)}
                    disabled={!meditation.audioFile}
                  >
                    <span className="play-icon-large">
                      {playingMeditationId === meditation._id ? '⏸️' : '▶️'}
                    </span>
                  </button>
                </div>
              </div>

              <div className="meditation-content">
                <div className="meditation-meta">
                  <span className="meditation-type-badge">
                    {meditationTypeLabels[meditation.meditationType] || meditation.meditationType}
                  </span>
                  <span className="meditation-language-badge">
                    {languageLabels[meditation.language] || meditation.language}
                  </span>
                </div>

                <h3 className="meditation-title">{meditation.title}</h3>
                <p className="meditation-description">{meditation.description}</p>

                <div className="meditation-stats">
                  <span className="stat">
                    ⏰ {formatDuration(meditation.duration)}
                  </span>
                  <span className="stat">
                    ❤️ {meditation.likeCount || 0}
                  </span>
                  <span className="stat">
                    👥 {meditation.downloadCount || 0}
                  </span>
                </div>

                <div className="meditation-footer">
                  <div className="author-info">
                    <span className="author-name">👤 {meditation.author.username || meditation.author}</span>
                    <span className="share-date">{formatDate(meditation.createdAt)}</span>
                  </div>
                  
                  <div className="meditation-actions">
                    <button 
                      className={`action-btn like-btn ${likedMeditations.has(meditation._id) ? 'liked' : ''}`}
                      onClick={() => handleLikeMeditation(meditation._id)}
                      disabled={!user}
                    >
                      {likedMeditations.has(meditation._id) ? '❤️' : '🤍'} {t('like', 'Like')}
                    </button>
                  </div>
                </div>
              </div>

              {meditation.audioFile && (
                <audio 
                  id={`shared-audio-${meditation._id}`}
                  preload="none"
                  onEnded={() => setPlayingMeditationId(null)}
                  onPause={() => {
                    if (playingMeditationId === meditation._id) {
                      setPlayingMeditationId(null);
                    }
                  }}
                >
                  <source 
                    src={`${API_BASE_URL}/assets/audio/shared/${meditation.audioFile.filename}`} 
                    type="audio/mpeg" 
                  />
                </audio>
              )}
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default CommunityHub;