import React from 'react';
import { useTranslation } from 'react-i18next';
import ProfileInfo from './ProfileInfo';
import Credits from './Credits';
import Statistics from './Statistics';

const ProfileContainer = ({ user, onLogout, onBackToCreate, selectedSection = 'profile', onUserUpdate }) => {
  const { t } = useTranslation();

  const renderContent = () => {
    switch (selectedSection) {
      case 'profile':
        return <ProfileInfo user={user} onUserUpdate={onUserUpdate} />;
      case 'credits':
        return <Credits user={user} />;
      case 'statistics':
        return <Statistics user={user} />;
      default:
        return <ProfileInfo user={user} />;
    }
  };


  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-header-top">
          <button 
            className="back-to-create-btn" 
            onClick={onBackToCreate}
            title={t('backToCreate', 'Back to Create')}
          >
            ← {t('backToCreate', 'Back')}
          </button>
        </div>
        
        <div className="profile-user-info">
          <div className="profile-avatar">👤</div>
          <h2>{user.username}</h2>
          <p>{t('memberSince', 'Member since')} {new Date(user.createdAt).toLocaleDateString()}</p>
        </div>
      </div>

      <div className="profile-content">
        {renderContent()}
      </div>

      <div className="profile-actions">
        <button 
          onClick={onLogout} 
          className="logout-button-full"
        >
          {t('logout', 'Logout')}
        </button>
      </div>
    </div>
  );
};

export default ProfileContainer;