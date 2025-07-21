import React from 'react';
import { useTranslation } from 'react-i18next';

const BottomNavigation = ({ activeTab, onTabChange, user, onLogout }) => {
  const { t } = useTranslation();

  const tabs = [
    { id: 'create', icon: '🧘', label: t('create', 'Create') },
    { id: 'myAudio', icon: '📱', label: t('myMeditation', 'My Meditations') },
    { id: 'community', icon: '🌟', label: t('community', 'Community') },
    { id: 'profile', icon: '👤', label: t('profile', 'Profile') }
  ];

  // Add admin tab for user 'rob'
  if (user && user.username === 'rob') {
    tabs.push({ id: 'admin', icon: '🛡️', label: t('admin', 'Admin') });
  }

  return (
    <div className="bottom-navigation">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => onTabChange(tab.id)}
        >
          <div className="nav-icon">{tab.icon}</div>
          <div className="nav-label">{tab.label}</div>
        </button>
      ))}
      
    </div>
  );
};

export default BottomNavigation;