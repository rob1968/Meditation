import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { getFullUrl, getAssetUrl, API_ENDPOINTS, API_BASE_URL } from '../config/api';

const AdminDashboard = ({ user, onLogout }) => {
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
    sleep: 'Sleep',
    stress: 'Stress Relief',
    focus: 'Focus',
    anxiety: 'Anxiety',
    energy: 'Energy',
    mindfulness: 'Mindfulness',
    compassion: 'Compassion',
    walking: 'Walking',
    breathing: 'Breathing',
    morning: 'Morning'
  };

  if (!user || user.username !== 'rob') {
    return (
      <div className="admin-dashboard">
        <div className="access-denied">
          <h2>🚫 Access Denied</h2>
          <p>You don't have permission to access this page.</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="admin-dashboard">
        <div className="loading-spinner">
          <div className="spinner"></div>
          Loading...
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
          <p>No meditations in this category</p>
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
                  <strong>Notes:</strong> {meditation.moderationNotes}
                </div>
              )}

              <div className="admin-actions">
                <button 
                  className="view-btn"
                  onClick={() => setSelectedMeditation(meditation)}
                >
                  👁️ View Details
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
                      ✅ Approve
                    </button>
                    <button 
                      className="reject-btn"
                      onClick={() => {
                        setSelectedMeditation(meditation);
                        setModerationNote('');
                      }}
                    >
                      ❌ Reject
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
      <div className="admin-header">
        <h2>🛡️ Admin Dashboard</h2>
        <p>Meditation Moderation Center</p>
      </div>

      <div className="admin-tabs">
        <button 
          className={`admin-tab ${activeTab === 'pending' ? 'active' : ''}`}
          onClick={() => setActiveTab('pending')}
        >
          Pending ({pendingMeditations.length})
        </button>
        <button 
          className={`admin-tab ${activeTab === 'approved' ? 'active' : ''}`}
          onClick={() => setActiveTab('approved')}
        >
          Approved ({approvedMeditations.length})
        </button>
        <button 
          className={`admin-tab ${activeTab === 'rejected' ? 'active' : ''}`}
          onClick={() => setActiveTab('rejected')}
        >
          Rejected ({rejectedMeditations.length})
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
              <h3>Review Meditation</h3>
              <button className="close-btn" onClick={() => setSelectedMeditation(null)}>✕</button>
            </div>

            <div className="modal-body">
              <h4>{selectedMeditation.title}</h4>
              <p className="description">{selectedMeditation.description}</p>
              
              <div className="detail-section">
                <h5>Meditation Text:</h5>
                <div className="text-preview">
                  {selectedMeditation.text}
                </div>
              </div>

              <div className="detail-section">
                <h5>Details:</h5>
                <div className="details-grid">
                  <div>Type: {meditationTypeLabels[selectedMeditation.meditationType]}</div>
                  <div>Language: {selectedMeditation.language}</div>
                  <div>Duration: {formatDuration(selectedMeditation.duration)}</div>
                  <div>Author: {selectedMeditation.author.username}</div>
                  <div>Submitted: {formatDate(selectedMeditation.createdAt)}</div>
                </div>
              </div>

              {selectedMeditation.audioFile && (
                <div className="detail-section">
                  <h5>Audio Preview:</h5>
                  <audio controls className="audio-preview">
                    <source 
                      src={`${API_BASE_URL}/assets/audio/shared/${selectedMeditation.audioFile.filename}`} 
                      type="audio/mpeg" 
                    />
                  </audio>
                  <p style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
                    Filename: {selectedMeditation.audioFile.filename}
                  </p>
                </div>
              )}

              {selectedMeditation.status === 'pending' && (
                <div className="moderation-section">
                  <h5>Moderation Notes (optional for approval, required for rejection):</h5>
                  <textarea
                    value={moderationNote}
                    onChange={(e) => setModerationNote(e.target.value)}
                    placeholder="Enter notes about your decision..."
                    rows={3}
                  />

                  <div className="moderation-actions">
                    <button 
                      className="approve-btn-large"
                      onClick={() => handleApprove(selectedMeditation._id)}
                      disabled={isProcessing}
                    >
                      {isProcessing ? 'Processing...' : '✅ Approve & Publish'}
                    </button>
                    <button 
                      className="reject-btn-large"
                      onClick={() => handleReject(selectedMeditation._id)}
                      disabled={isProcessing || !moderationNote.trim()}
                    >
                      {isProcessing ? 'Processing...' : '❌ Reject'}
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