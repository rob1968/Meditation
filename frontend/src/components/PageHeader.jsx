import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

const PageHeader = ({ user, onProfileClick, title, subtitle, showBackButton = false, onBackClick }) => {
  const { t, i18n } = useTranslation();
  const [languageOpen, setLanguageOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const profileDropdownRef = useRef(null);

  const uiLanguages = [
    { value: 'en', label: '🇺🇸 English', flag: '🇺🇸' },
    { value: 'nl', label: '🇳🇱 Nederlands', flag: '🇳🇱' },
    { value: 'de', label: '🇩🇪 Deutsch', flag: '🇩🇪' },
    { value: 'fr', label: '🇫🇷 Français', flag: '🇫🇷' },
    { value: 'es', label: '🇪🇸 Español', flag: '🇪🇸' },
    { value: 'it', label: '🇮🇹 Italiano', flag: '🇮🇹' },
    { value: 'pt', label: '🇵🇹 Português', flag: '🇵🇹' },
    { value: 'ru', label: '🇷🇺 Русский', flag: '🇷🇺' },
    { value: 'zh', label: '🇨🇳 中文', flag: '🇨🇳' },
    { value: 'ja', label: '🇯🇵 日本語', flag: '🇯🇵' },
    { value: 'ko', label: '🇰🇷 한국어', flag: '🇰🇷' },
    { value: 'hi', label: '🇮🇳 हिन्दी', flag: '🇮🇳' },
    { value: 'ar', label: '🇸🇦 العربية', flag: '🇸🇦' }
  ];

  const currentLanguage = uiLanguages.find(lang => lang.value === i18n.language) || uiLanguages[0];

  const handleLanguageChange = (languageValue) => {
    i18n.changeLanguage(languageValue);
    setLanguageOpen(false);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setLanguageOpen(false);
      }
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setProfileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Profile menu items
  const profileMenuItems = [
    { id: 'profile', icon: '👤', label: t('profileInformation', 'Profile Information') },
    { id: 'credits', icon: '💎', label: t('credits', 'Credits') },
    { id: 'statistics', icon: '📊', label: t('statistics', 'Statistics') }
  ];

  const handleProfileMenuSelect = (sectionId) => {
    setProfileMenuOpen(false);
    // Call the original onProfileClick with the section parameter
    if (onProfileClick) {
      onProfileClick(sectionId);
    }
  };

  return (
    <div className="page-header">
      <div className="page-header-left">
        {showBackButton && onBackClick && (
          <button 
            className="back-button" 
            onClick={onBackClick}
            title={t('back', 'Back')}
          >
            ← {t('back', 'Back')}
          </button>
        )}
        {user && onProfileClick && (
          <div className="profile-dropdown" ref={profileDropdownRef}>
            <button 
              className="profile-button" 
              onClick={() => setProfileMenuOpen(!profileMenuOpen)}
              title={user?.username || 'Profile'}
            >
              <span className="profile-username">{user?.username}</span>
              <span className="dropdown-arrow">{profileMenuOpen ? '▲' : '▼'}</span>
            </button>
            
            {profileMenuOpen && (
              <div className="profile-menu-list">
                {profileMenuItems.map(item => (
                  <button
                    key={item.id}
                    className="profile-menu-item"
                    onClick={() => handleProfileMenuSelect(item.id)}
                  >
                    <span className="menu-icon">{item.icon}</span>
                    <span className="menu-label">{item.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="page-header-center">
        {title && (
          <div className="page-title-section">
            <h1 className="page-title">{title}</h1>
            {subtitle && <p className="page-subtitle">{subtitle}</p>}
          </div>
        )}
      </div>

      <div className="page-header-right">
        <div className="language-selector" ref={dropdownRef}>
          <div className="custom-select">
            <div 
              className={`select-button language-btn ${languageOpen ? 'open' : ''}`} 
              onClick={() => setLanguageOpen(!languageOpen)}
            >
              <span>{currentLanguage.flag}</span>
              <span>{currentLanguage.label.split(' ')[1]}</span>
              <span>▼</span>
            </div>
            {languageOpen && (
              <div className="select-options open">
                {uiLanguages.map(language => (
                  <div 
                    key={language.value}
                    className={`select-option ${i18n.language === language.value ? 'selected' : ''}`}
                    onClick={() => handleLanguageChange(language.value)}
                  >
                    <span>{language.flag}</span>
                    <span>{language.label.split(' ')[1]}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;