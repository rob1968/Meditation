import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
import axios from 'axios';
import { getFullUrl } from '../config/api';

const JournalHub = ({ user }) => {
  const [sharedEntries, setSharedEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [filterMood, setFilterMood] = useState('all');
  const [filterLanguage, setFilterLanguage] = useState('all');
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [playingEntryId, setPlayingEntryId] = useState(null);
  const [likedEntries, setLikedEntries] = useState(new Set());
  const { t } = useTranslation();

  const moods = [
    { value: 'happy', emoji: '😊', label: t('happy', 'Happy') },
    { value: 'calm', emoji: '😌', label: t('calm', 'Calm') },
    { value: 'peaceful', emoji: '🕊️', label: t('peaceful', 'Peaceful') },
    { value: 'grateful', emoji: '🙏', label: t('grateful', 'Grateful') },
    { value: 'reflective', emoji: '🤔', label: t('reflective', 'Reflective') },
    { value: 'energetic', emoji: '⚡', label: t('energetic', 'Energetic') },
    { value: 'stressed', emoji: '😰', label: t('stressed', 'Stressed') },
    { value: 'anxious', emoji: '😟', label: t('anxious', 'Anxious') }
  ];

  const languages = [
    { value: 'nl', label: 'Nederlands' },
    { value: 'en', label: 'English' },
    { value: 'de', label: 'Deutsch' },
    { value: 'fr', label: 'Français' },
    { value: 'es', label: 'Español' },
    { value: 'it', label: 'Italiano' },
    { value: 'pt', label: 'Português' },
    { value: 'ru', label: 'Русский' },
    { value: 'zh', label: '中文' },
    { value: 'ja', label: '日本語' },
    { value: 'ko', label: '한국어' },
    { value: 'hi', label: 'हिन्दी' },
    { value: 'ar', label: 'العربية' }
  ];

  useEffect(() => {
    fetchSharedEntries();
  }, [filterMood, filterLanguage]);

  const fetchSharedEntries = async () => {
    try {
      setIsLoading(true);
      const params = new URLSearchParams();
      if (filterMood !== 'all') params.append('mood', filterMood);
      if (filterLanguage !== 'all') params.append('language', filterLanguage);
      
      const response = await axios.get(getFullUrl(`/api/journal/shared?${params}`));
      const entries = response.data.entries || [];
      setSharedEntries(entries);
      
      // Track which entries are liked by current user
      if (user) {
        const userLikes = new Set();
        entries.forEach(entry => {
          if (entry.likes && entry.likes.some(like => like.userId === user.id)) {
            userLikes.add(entry._id);
          }
        });
        setLikedEntries(userLikes);
      }
    } catch (error) {
      console.error('Error fetching shared journal entries:', error);
      setError(t('failedToLoadSharedEntries', 'Failed to load shared journal entries'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleLikeEntry = async (entryId) => {
    if (!user) return;
    
    try {
      const response = await axios.post(getFullUrl(`/api/journal/${entryId}/like`), {
        userId: user.id
      });
      
      if (response.data.success) {
        const newLikedEntries = new Set(likedEntries);
        if (response.data.isLiked) {
          newLikedEntries.add(entryId);
        } else {
          newLikedEntries.delete(entryId);
        }
        setLikedEntries(newLikedEntries);
        
        // Update entry like count in local state
        setSharedEntries(prevEntries => 
          prevEntries.map(entry => 
            entry._id === entryId 
              ? { ...entry, likeCount: response.data.likeCount }
              : entry
          )
        );
      }
    } catch (error) {
      console.error('Error liking journal entry:', error);
      setError(t('failedToLikeEntry', 'Failed to like journal entry'));
    }
  };

  const handlePlayAudio = (entry) => {
    if (!entry.audioFile) return;

    const audio = document.querySelector(`#shared-journal-audio-${entry._id}`);
    if (audio) {
      if (audio.paused) {
        // Pause all other audios first
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
          setPlayingEntryId(null);
        }, 20000); // 20 seconds
        
        // Store timeout ID on audio element for cleanup
        audio.playTimeout = playTimeout;
        
        audio.play()
          .then(() => {
            setPlayingEntryId(entry._id);
          })
          .catch(err => {
            console.error('Error playing audio:', err);
            clearTimeout(playTimeout);
          });
      } else {
        audio.pause();
        // Clear timeout if audio is manually paused
        if (audio.playTimeout) {
          clearTimeout(audio.playTimeout);
          audio.playTimeout = null;
        }
        setPlayingEntryId(null);
      }
    }
  };

  const handleReadFullEntry = async (entryId) => {
    try {
      const response = await axios.get(getFullUrl(`/api/journal/shared/${entryId}`));
      if (response.data.success) {
        setSelectedEntry(response.data.entry);
      }
    } catch (error) {
      console.error('Error fetching full entry:', error);
      setError(t('failedToLoadFullEntry', 'Failed to load full entry'));
    }
  };

  const formatDate = (dateString) => {
    // Get current language from i18n
    const currentLanguage = i18n.language || 'nl';
    
    // Map i18n language codes to locale codes
    const localeMap = {
      'nl': 'nl-NL',
      'en': 'en-US', 
      'de': 'de-DE',
      'fr': 'fr-FR',
      'es': 'es-ES',
      'it': 'it-IT',
      'pt': 'pt-PT',
      'ru': 'ru-RU',
      'zh': 'zh-CN',
      'ja': 'ja-JP',
      'ko': 'ko-KR',
      'hi': 'hi-IN',
      'ar': 'ar-SA'
    };
    
    const locale = localeMap[currentLanguage] || 'nl-NL';
    
    return new Date(dateString).toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatAudioDuration = (seconds) => {
    if (!seconds) return '0:00';
    
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

  if (isLoading) {
    return (
      <div className="journal-hub-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          {t('loading', 'Loading...')}
        </div>
      </div>
    );
  }

  return (
    <div className="journal-hub-container">
      {/* Header */}
      <div className="journal-hub-header">
        <div className="header-content">
          <div className="title-section">
            <div className="icon">🎙️</div>
            <div className="title-text">
              <h1>{t('sharedJournals', 'Gedeelde Dagboeken')}</h1>
              <p>{t('voiceJournalSubtitle', 'Ontdek en luister naar stem dagboeken van anderen')}</p>
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="error-banner">
          <span>⚠️</span>
          <span>{error}</span>
          <button onClick={() => setError('')}>✕</button>
        </div>
      )}

      {/* Filters */}
      <div className="journal-hub-filters">
        <div className="filter-group">
          <label>{t('mood', 'Stemming')}:</label>
          <select value={filterMood} onChange={(e) => setFilterMood(e.target.value)}>
            <option value="all">{t('allMoods', 'Alle stemmingen')}</option>
            {moods.map(mood => (
              <option key={mood.value} value={mood.value}>
                {mood.emoji} {mood.label}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <label>{t('language', 'Taal')}:</label>
          <select value={filterLanguage} onChange={(e) => setFilterLanguage(e.target.value)}>
            <option value="all">{t('allLanguages', 'Alle talen')}</option>
            {languages.map(lang => (
              <option key={lang.value} value={lang.value}>
                {lang.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Entries List */}
      <div className="shared-entries-header">
        <h2>🌟 {t('recentlyShared', 'Recent Gedeeld')}</h2>
        <p>{sharedEntries.length} {t('voiceJournalsAvailable', 'stem dagboeken beschikbaar')}</p>
      </div>

      {sharedEntries.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🎧</div>
          <h3>{t('noSharedJournals', 'Geen gedeelde dagboeken gevonden')}</h3>
          <p>{t('beFirstToShareJournal', 'Wees de eerste om je dagboek te delen met de gemeenschap!')}</p>
        </div>
      ) : (
        <div className="shared-entries-list">
          {sharedEntries.map((entry) => (
            <div key={entry._id} className="shared-entry-card">
              <div className="entry-header">
                <div className="entry-info">
                  <h3 className="entry-title">{entry.title}</h3>
                  <div className="entry-meta">
                    <span className="entry-author">
                      <span className="meta-icon">👤</span> 
                      {entry.userId.username}
                    </span>
                    <span className="entry-date">
                      <span className="meta-icon">📅</span> 
                      {formatDate(entry.sharedAt)}
                    </span>
                    {entry.audioFile && (
                      <span className="entry-duration">
                        <span className="meta-icon">🎵</span> 
                        {formatAudioDuration(entry.audioFile.duration)}
                      </span>
                    )}
                  </div>
                </div>
                
                {entry.mood && (
                  <div className="entry-mood">
                    {moods.find(m => m.value === entry.mood)?.emoji}
                  </div>
                )}
              </div>

              {entry.tags && entry.tags.length > 0 && (
                <div className="entry-tags">
                  {entry.tags.slice(0, 3).map((tag, index) => (
                    <span key={index} className="entry-tag">#{tag}</span>
                  ))}
                  {entry.tags.length > 3 && (
                    <span className="more-tags">+{entry.tags.length - 3}</span>
                  )}
                </div>
              )}

              <div className="entry-controls">
                <div className="play-controls">
                  {entry.audioFile && (
                    <button 
                      className="play-btn"
                      onClick={() => handlePlayAudio(entry)}
                      disabled={!entry.audioFile}
                    >
                      {playingEntryId === entry._id ? '⏸️' : '▶️'} 
                      {playingEntryId === entry._id ? t('pause', 'Pauzeren') : t('playVoice', 'Stem Afspelen')}
                    </button>
                  )}
                  <button 
                    className="read-btn"
                    onClick={() => handleReadFullEntry(entry._id)}
                  >
                    📖 {t('read', 'Lezen')}
                  </button>
                </div>

                <div className="social-controls">
                  <button 
                    className="like-btn"
                    onClick={() => handleLikeEntry(entry._id)}
                    disabled={!user}
                  >
                    <span className="like-icon">
                      {likedEntries.has(entry._id) ? '💚' : '🤍'}
                    </span>
                    <span className="like-count">{entry.likeCount || 0}</span>
                  </button>
                </div>
              </div>

              {entry.audioFile && (
                <audio 
                  id={`shared-journal-audio-${entry._id}`}
                  preload="none"
                  onEnded={(e) => {
                    // Clear timeout when audio ends naturally
                    if (e.target.playTimeout) {
                      clearTimeout(e.target.playTimeout);
                      e.target.playTimeout = null;
                    }
                    setPlayingEntryId(null);
                  }}
                  onPause={(e) => {
                    if (playingEntryId === entry._id) {
                      // Clear timeout when audio is paused
                      if (e.target.playTimeout) {
                        clearTimeout(e.target.playTimeout);
                        e.target.playTimeout = null;
                      }
                      setPlayingEntryId(null);
                    }
                  }}
                >
                  <source 
                    src={getFullUrl(`/assets/audio/journals/${entry.audioFile.filename}`)} 
                    type="audio/mpeg" 
                  />
                </audio>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Full Entry Modal */}
      {selectedEntry && (
        <div className="entry-modal-overlay">
          <div className="entry-modal">
            <div className="modal-header">
              <h3>{selectedEntry.title}</h3>
              <button className="close-btn" onClick={() => setSelectedEntry(null)}>✕</button>
            </div>
            
            <div className="modal-content">
              <div className="entry-meta">
                <span>👤 {selectedEntry.userId.username}</span>
                <span>📅 {formatDate(selectedEntry.sharedAt)}</span>
                {selectedEntry.mood && (
                  <span>
                    {moods.find(m => m.value === selectedEntry.mood)?.emoji} 
                    {moods.find(m => m.value === selectedEntry.mood)?.label}
                  </span>
                )}
              </div>

              {selectedEntry.tags && selectedEntry.tags.length > 0 && (
                <div className="entry-tags">
                  {selectedEntry.tags.map((tag, index) => (
                    <span key={index} className="entry-tag">#{tag}</span>
                  ))}
                </div>
              )}

              <div className="entry-content">
                {selectedEntry.content}
              </div>

              {selectedEntry.audioFile && (
                <div className="modal-audio-controls">
                  <button 
                    className="play-btn"
                    onClick={() => handlePlayAudio(selectedEntry)}
                  >
                    {playingEntryId === selectedEntry._id ? '⏸️' : '▶️'} 
                    {t('playVoice', 'Stem Afspelen')}
                  </button>
                  <span className="duration">
                    {formatAudioDuration(selectedEntry.audioFile.duration)}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JournalHub;