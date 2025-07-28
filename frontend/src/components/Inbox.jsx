import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { getFullUrl } from '../config/api';
import PageHeader from './PageHeader';

const Inbox = ({ user, onUnreadCountChange, onProfileClick, headerUnreadCount, onInboxClick, onCreateClick }) => {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [unreadCount, setUnreadCount] = useState(0);
  const [filter, setFilter] = useState('all'); // all, unread, read
  const { t } = useTranslation();

  useEffect(() => {
    if (user) {
      fetchNotifications();
    }
  }, [user, filter]);

  const fetchNotifications = async () => {
    try {
      setIsLoading(true);
      const unreadOnly = filter === 'unread';
      const response = await axios.get(
        getFullUrl(`/api/notifications/user/${user.id}`),
        { params: { unreadOnly } }
      );
      
      setNotifications(response.data.notifications);
      setUnreadCount(response.data.unreadCount);
      if (onUnreadCountChange) {
        onUnreadCountChange(response.data.unreadCount);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
      setError(t('failedToLoadNotifications', 'Failed to load notifications'));
    } finally {
      setIsLoading(false);
    }
  };

  const markAsRead = async (notificationId) => {
    try {
      await axios.patch(
        getFullUrl(`/api/notifications/${notificationId}/read`),
        { userId: user.id }
      );
      
      // Update local state
      setNotifications(prev => 
        prev.map(notif => 
          notif._id === notificationId 
            ? { ...notif, isRead: true }
            : notif
        )
      );
      const newCount = Math.max(0, unreadCount - 1);
      setUnreadCount(newCount);
      if (onUnreadCountChange) {
        onUnreadCountChange(newCount);
      }
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const markAllAsRead = async () => {
    try {
      await axios.patch(getFullUrl(`/api/notifications/user/${user.id}/read-all`));
      
      // Update local state
      setNotifications(prev => 
        prev.map(notif => ({ ...notif, isRead: true }))
      );
      setUnreadCount(0);
      if (onUnreadCountChange) {
        onUnreadCountChange(0);
      }
    } catch (error) {
      console.error('Error marking all as read:', error);
    }
  };

  const deleteNotification = async (notificationId) => {
    try {
      const response = await axios.delete(
        getFullUrl(`/api/notifications/${notificationId}`),
        { data: { userId: user.id } }
      );
      
      // Update local state
      setNotifications(prev => prev.filter(notif => notif._id !== notificationId));
      setUnreadCount(response.data.unreadCount);
      if (onUnreadCountChange) {
        onUnreadCountChange(response.data.unreadCount);
      }
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      return t('justNow', 'Just now');
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)} ${t('hoursAgo', 'hours ago')}`;
    } else if (diffInHours < 48) {
      return t('yesterday', 'Yesterday');
    } else {
      return date.toLocaleDateString();
    }
  };

  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'unread') return !notif.isRead;
    if (filter === 'read') return notif.isRead;
    return true;
  });

  if (isLoading) {
    return (
      <div className="inbox-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          {t('loading', 'Loading...')}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="inbox-container">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="inbox-container">
      <PageHeader 
        user={user}
        onProfileClick={onProfileClick}
        title={t('inbox', 'Inbox')}
        unreadCount={headerUnreadCount}
        onInboxClick={onInboxClick}
        onCreateClick={onCreateClick}
      />

      <div className="inbox-controls">
        <div className="filter-buttons">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            {t('all', 'All')} ({notifications.length})
          </button>
          <button 
            className={`filter-btn ${filter === 'unread' ? 'active' : ''}`}
            onClick={() => setFilter('unread')}
          >
            {t('unread', 'Ongelezen')} ({unreadCount})
          </button>
          <button 
            className={`filter-btn ${filter === 'read' ? 'active' : ''}`}
            onClick={() => setFilter('read')}
          >
            {t('read', 'Gelezen')} ({notifications.length - unreadCount})
          </button>
        </div>
        
        {unreadCount > 0 && (
          <button className="mark-all-read-btn" onClick={markAllAsRead}>
            ✅ {t('markAllRead', 'Alles markeren als gelezen')}
          </button>
        )}
      </div>

      {filteredNotifications.length === 0 ? (
        <div className="empty-inbox">
          <div className="empty-icon">📭</div>
          <h3>{t('noNotifications', 'Geen berichten')}</h3>
          <p>{t('notificationsAppearHere', 'Berichten over je meditaties verschijnen hier')}</p>
        </div>
      ) : (
        <div className="notifications-list">
          {filteredNotifications.map((notification) => (
            <div 
              key={notification._id} 
              className={`notification-card ${!notification.isRead ? 'unread' : ''}`}
            >
              <div className="notification-content">
                <div className="notification-header">
                  <div className="notification-title">
                    {notification.title}
                  </div>
                  <div className="notification-date">
                    {formatDate(notification.createdAt)}
                  </div>
                </div>
                
                <div className="notification-message">
                  {notification.message}
                </div>
                
                {notification.moderationNotes && (
                  <div className="moderation-notes">
                    <strong>{t('adminNotes', 'Beheerder notities')}:</strong> {notification.moderationNotes}
                  </div>
                )}
                
                <div className="notification-meditation">
                  <span className="meditation-ref">
                    📿 {notification.meditationId?.title || t('deletedMeditation', 'Verwijderde meditatie')}
                  </span>
                </div>
              </div>

              <div className="notification-actions">
                {!notification.isRead && (
                  <button 
                    className="mark-read-btn"
                    onClick={() => markAsRead(notification._id)}
                    title={t('markAsRead', 'Markeren als gelezen')}
                  >
                    👁️
                  </button>
                )}
                <button 
                  className="delete-btn"
                  onClick={() => deleteNotification(notification._id)}
                  title={t('delete', 'Delete')}
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Inbox;