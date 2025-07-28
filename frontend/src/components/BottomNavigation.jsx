import React from 'react';
import { useTranslation } from 'react-i18next';

const BottomNavigation = ({ activeTab, onTabChange, user, onLogout }) => {
  const { t } = useTranslation();

  const tabs = [
    { id: 'myAudio', icon: '🧘', label: t('meditations', 'Meditations') },
    { id: 'community', icon: '🔮', label: t('community', 'Community') },
    { id: 'create', icon: '✨', label: t('creeer', 'Create') },
    { id: 'journal', icon: '📔', label: t('journal', 'Journal') }
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
            {tab.badge !== undefined && tab.badge > 0 && (
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