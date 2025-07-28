import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { getFullUrl, getAssetUrl, API_ENDPOINTS, API_BASE_URL } from '../config/api';
import PageHeader from './PageHeader';

const AdminDashboard = ({ user, onLogout, onProfileClick, unreadCount, onInboxClick, onCreateClick }) => {
  const [pendingMeditations, setPendingMeditations] = useState([]);
  const [approvedMeditations, setApprovedMeditations] = useState([]);
  const [rejectedMeditations, setRejectedMeditations] = useState([]);
  const [activeTab, setActiveTab] = useState('pending');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedMeditation, setSelectedMeditation] = useState(null);
  const [moderationNote, setModerationNote] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (user && user.username === 'rob') {
      fetchMeditations();
    }
  }, [user]);

  const fetchMeditations = async () => {
    try {
      setIsLoading(true);
      console.log('Fetching admin meditations for user:', user.id);
      const response = await axios.get(getFullUrl('/api/community/admin/meditations'), {
        params: { adminUserId: user.id }
      });
      
      console.log('Admin response:', response.data);
      const meditations = response.data.meditations || [];
      setPendingMeditations(meditations.filter(m => m.status === 'pending'));
      setApprovedMeditations(meditations.filter(m => m.status === 'approved'));
      setRejectedMeditations(meditations.filter(m => m.status === 'rejected'));
    } catch (error) {
      console.error('Error fetching meditations for moderation:', error);
      setError(t('failedToLoadMeditations', 'Failed to load meditations') + ': ' + (error.response?.data?.error || error.message));
    } finally {
      setIsLoading(false);
    }
  };

  const handleApprove = async (meditationId) => {
    setIsProcessing(true);
    try {
      const response = await axios.patch(
        getFullUrl(`/api/community/admin/meditation/${meditationId}/approve`),
        {
          adminUserId: user.id,
          moderationNotes: moderationNote
        }
      );

      if (response.data.success) {
        await fetchMeditations();
        setSelectedMeditation(null);
        setModerationNote('');
      }
    } catch (error) {
      console.error('Error approving meditation:', error);
      setError(t('failedToApproveMeditation', 'Failed to approve meditation'));
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReject = async (meditationId) => {
    if (!moderationNote.trim()) {
      setError(t('provideRejectionReason', 'Please provide a reason for rejection'));
      return;
    }

    setIsProcessing(true);
    try {
      const response = await axios.patch(
        getFullUrl(`/api/community/admin/meditation/${meditationId}/reject`),
        {
          adminUserId: user.id,
          moderationNotes: moderationNote
        }
      );

      if (response.data.success) {
        await fetchMeditations();
        setSelectedMeditation(null);
        setModerationNote('');
      }
    } catch (error) {
      console.error('Error rejecting meditation:', error);
      setError(t('failedToRejectMeditation', 'Failed to reject meditation'));
    } finally {
      setIsProcessing(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatDuration = (seconds) => {
    if (!seconds) return t('unknown', 'Unknown');
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
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

  if (!user || user.username !== 'rob') {
    return (
      <div className="admin-dashboard">
        <div className="access-denied">
          <h2>🚫 {t('accessDenied', 'Access Denied')}</h2>
          <p>{t('noPermissionMessage', 'You don\'t have permission to access this page.')}</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="admin-dashboard">
        <div className="loading-spinner">
          <div className="spinner"></div>
          {t('loading', 'Loading...')}
        </div>
      </div>
    );
  }

  const getImageUrl = (meditation) => {
    // Handle different image formats for shared meditations
    if (meditation.customImage) {
      if (typeof meditation.customImage === 'string') {
        return `${API_BASE_URL}/assets/images/shared/${meditation.customImage}`;
      } else if (meditation.customImage.filename) {
        return `${API_BASE_URL}/assets/images/shared/${meditation.customImage.filename}`;
      }
    }
    
    // Default meditation type images (direct from assets/images)
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

  const renderMeditationList = (meditations) => {
    if (meditations.length === 0) {
      return (
        <div className="empty-state">
          <p>{t('noMeditationsInCategory', 'No meditations in this category')}</p>
        </div>
      );
    }

    return (
      <div className="meditation-list">
        {meditations.map(meditation => (
          <div key={meditation._id} className="admin-meditation-card">
            <div className="admin-meditation-thumbnail">
              <img 
                src={getImageUrl(meditation)}
                alt={meditation.title}
                onError={(e) => {
                  console.log('Image load error for:', getImageUrl(meditation));
                  e.target.style.display = 'none';
                }}
                onLoad={() => {
                  console.log('Image loaded successfully:', getImageUrl(meditation));
                }}
              />
            </div>

            <div className="admin-meditation-content">
              <div className="meditation-header">
                <h4>{meditation.title}</h4>
                <div className="meditation-badges">
                  <span className="type-badge">
                    {meditationTypeLabels[meditation.meditationType]}
                  </span>
                  <span className="language-badge">{meditation.language}</span>
                </div>
              </div>
              
              <p className="meditation-description">{meditation.description}</p>
              
              <div className="meditation-meta">
                <span>👤 {meditation.author.username}</span>
                <span>📅 {formatDate(meditation.createdAt)}</span>
                <span>⏱️ {formatDuration(meditation.duration)}</span>
              </div>

              {meditation.moderationNotes && (
                <div className="moderation-notes">
                  <strong>{t('notes', 'Notes')}:</strong> {meditation.moderationNotes}
                </div>
              )}

              <div className="admin-actions">
                <button 
                  className="view-btn"
                  onClick={() => setSelectedMeditation(meditation)}
                >
                  👁️ {t('viewDetails', 'View Details')}
                </button>
                
                {meditation.status === 'pending' && (
                  <>
                    <button 
                      className="approve-btn"
                      onClick={() => {
                        setSelectedMeditation(meditation);
                        setModerationNote('');
                      }}
                    >
                      ✅ {t('approve', 'Approve')}
                    </button>
                    <button 
                      className="reject-btn"
                      onClick={() => {
                        setSelectedMeditation(meditation);
                        setModerationNote('');
                      }}
                    >
                      ❌ {t('reject', 'Reject')}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="admin-dashboard">
      <PageHeader 
        user={user}
        onProfileClick={onProfileClick}
        title={t('adminDashboard', 'Admin Dashboard')}
        subtitle={t('meditationModerationCenter', 'Meditation Moderation Center')}
        unreadCount={unreadCount}
        onInboxClick={onInboxClick}
        onCreateClick={onCreateClick}
      />

      <div className="admin-tabs">
        <button 
          className={`admin-tab ${activeTab === 'pending' ? 'active' : ''}`}
          onClick={() => setActiveTab('pending')}
        >
          {t('pending', 'Pending')} ({pendingMeditations.length})
        </button>
        <button 
          className={`admin-tab ${activeTab === 'approved' ? 'active' : ''}`}
          onClick={() => setActiveTab('approved')}
        >
          {t('approved', 'Approved')} ({approvedMeditations.length})
        </button>
        <button 
          className={`admin-tab ${activeTab === 'rejected' ? 'active' : ''}`}
          onClick={() => setActiveTab('rejected')}
        >
          {t('rejected', 'Rejected')} ({rejectedMeditations.length})
        </button>
      </div>

      <div className="admin-content">
        {activeTab === 'pending' && renderMeditationList(pendingMeditations)}
        {activeTab === 'approved' && renderMeditationList(approvedMeditations)}
        {activeTab === 'rejected' && renderMeditationList(rejectedMeditations)}
      </div>

      {selectedMeditation && (
        <div className="moderation-modal">
          <div className="moderation-content">
            <div className="modal-header">
              <h3>{t('reviewMeditation', 'Review Meditation')}</h3>
              <button className="close-btn" onClick={() => setSelectedMeditation(null)}>✕</button>
            </div>

            <div className="modal-body">
              <h4>{selectedMeditation.title}</h4>
              <p className="description">{selectedMeditation.description}</p>
              
              <div className="detail-section">
                <h5>{t('meditationText', 'Meditation Text')}:</h5>
                <div className="text-preview">
                  {selectedMeditation.text}
                </div>
              </div>

              <div className="detail-section">
                <h5>{t('details', 'Details')}:</h5>
                <div className="details-grid">
                  <div>{t('type', 'Type')}: {meditationTypeLabels[selectedMeditation.meditationType]}</div>
                  <div>{t('languageLabel', 'Language')}: {selectedMeditation.language}</div>
                  <div>{t('duration', 'Duration')}: {formatDuration(selectedMeditation.duration)}</div>
                  <div>{t('author', 'Author')}: {selectedMeditation.author.username}</div>
                  <div>{t('submitted', 'Submitted')}: {formatDate(selectedMeditation.createdAt)}</div>
                </div>
              </div>

              {selectedMeditation.audioFile && (
                <div className="detail-section">
                  <h5>{t('audioPreview', 'Audio Preview')}:</h5>
                  <audio controls className="audio-preview">
                    <source 
                      src={`${API_BASE_URL}/assets/audio/shared/${selectedMeditation.audioFile.filename}`} 
                      type="audio/mpeg" 
                    />
                  </audio>
                  <p style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
                    {t('filename', 'Filename')}: {selectedMeditation.audioFile.filename}
                  </p>
                </div>
              )}

              {selectedMeditation.status === 'pending' && (
                <div className="moderation-section">
                  <h5>{t('moderationNotesLabel', 'Moderation Notes (optional for approval, required for rejection)')}:</h5>
                  <textarea
                    value={moderationNote}
                    onChange={(e) => setModerationNote(e.target.value)}
                    placeholder={t('enterNotesPlaceholder', 'Enter notes about your decision...')}
                    rows={3}
                  />

                  <div className="moderation-actions">
                    <button 
                      className="approve-btn-large"
                      onClick={() => handleApprove(selectedMeditation._id)}
                      disabled={isProcessing}
                    >
                      {isProcessing ? t('processing', 'Processing...') : `✅ ${t('approveAndPublish', 'Approve & Publish')}`}
                    </button>
                    <button 
                      className="reject-btn-large"
                      onClick={() => handleReject(selectedMeditation._id)}
                      disabled={isProcessing || !moderationNote.trim()}
                    >
                      {isProcessing ? t('processing', 'Processing...') : `❌ ${t('reject', 'Reject')}`}
                    </button>
                  </div>
                </div>
              )}

              {selectedMeditation.status !== 'pending' && selectedMeditation.moderationNotes && (
                <div className="existing-notes">
                  <h5>Moderation Notes:</h5>
                  <p>{selectedMeditation.moderationNotes}</p>
                  <p className="note-date">
                    {selectedMeditation.status === 'approved' ? 'Approved' : 'Rejected'} on {formatDate(selectedMeditation.updatedAt)}
                  </p>
                </div>
              )}
            </div>

            {error && (
              <div className="error-message">{error}</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;