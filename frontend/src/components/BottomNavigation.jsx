import React from 'react';
import { useTranslation } from 'react-i18next';

const BottomNavigation = ({ activeTab, onTabChange, user, onLogout, unreadCount = 0 }) => {
  const { t } = useTranslation();

  const tabs = [
    { id: 'create', icon: '✨', label: t('creeer', 'Create') },
    { id: 'myAudio', icon: '🧘', label: t('mediteer', 'Meditate') },
    { id: 'journal', icon: '📔', label: t('dagboek', 'Diary') },
    { id: 'community', icon: '🔮', label: t('ontdek', 'Discover') },
    { id: 'inbox', icon: '💬', label: t('bericht', 'Message'), badge: unreadCount }
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
          <div className="nav-icon-container">
            <div className="nav-icon">{tab.icon}</div>
            {tab.badge > 0 && (
              <div className="nav-badge">{tab.badge}</div>
            )}
          </div>
          <div className="nav-label">{tab.label}</div>
        </button>
      ))}
      
    </div>
  );
};

export default BottomNavigation;