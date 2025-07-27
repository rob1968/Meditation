import React, { useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { getFullUrl, API_ENDPOINTS } from '../config/api';
import { getSortedCountries } from '../data/countries';
import PageHeader from './PageHeader';

const Auth = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [country, setCountry] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [city, setCity] = useState('');
  const [gender, setGender] = useState('');
  const [preferredLanguage, setPreferredLanguage] = useState('');
  const [bio, setBio] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { t, i18n } = useTranslation();

  // Get sorted countries for the current language
  const countries = getSortedCountries(i18n.language);
  
  // Available languages
  const availableLanguages = [
    { code: 'en', name: 'English' },
    { code: 'de', name: 'Deutsch' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'it', name: 'Italiano' },
    { code: 'pt', name: 'Português' },
    { code: 'ru', name: 'Русский' },
    { code: 'ja', name: '日本語' },
    { code: 'ko', name: '한국어' },
    { code: 'zh', name: '中文' },
    { code: 'ar', name: 'العربية' },
    { code: 'hi', name: 'हिंदी' },
    { code: 'nl', name: 'Nederlands' }
  ];

  const calculateAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const handleCountryChange = (e) => {
    const selectedCountry = countries.find(c => c.name === e.target.value);
    if (selectedCountry) {
      setCountry(selectedCountry.name);
      setCountryCode(selectedCountry.code);
    } else {
      setCountry(e.target.value);
      setCountryCode('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Validation for registration
    if (!isLogin) {
      if (birthDate) {
        const age = calculateAge(birthDate);
        if (age < 13 || age > 120) {
          setError(t('invalidAge', 'You must be between 13 and 120 years old'));
          setIsLoading(false);
          return;
        }
      }
    }

    try {
      const endpoint = isLogin ? API_ENDPOINTS.LOGIN : API_ENDPOINTS.REGISTER;
      const requestData = isLogin 
        ? { username: username.trim() }
        : { 
            username: username.trim(), 
            birthDate: birthDate || null,
            age: birthDate ? calculateAge(birthDate) : null,
            country: country || null,
            countryCode: countryCode || null,
            city: city.trim() || null,
            gender: gender || null,
            preferredLanguage: preferredLanguage || null,
            bio: bio.trim() || null
          };

      const response = await axios.post(getFullUrl(endpoint), requestData);

      // Store user data in localStorage
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      // Call parent callback
      onLogin(response.data.user);
      
    } catch (error) {
      console.error('Auth error:', error);
      if (error.response?.data?.error) {
        setError(error.response.data.error);
      } else {
        setError(isLogin ? t('loginFailed', 'Login failed') : t('registrationFailed', 'Registration failed'));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setUsername('');
    setBirthDate('');
    setCountry('');
    setCountryCode('');
    setCity('');
    setGender('');
    setPreferredLanguage('');
    setBio('');
    setError('');
  };

  return (
    <div className="auth-container">
      <div className="auth-language-header">
        <PageHeader />
      </div>
      <div className="auth-card">
        <div className="auth-header">
          <h2>{isLogin ? t('login', 'Login') : t('register', 'Register')}</h2>
          <p>{isLogin ? t('loginSubtitle', 'Welcome back') : t('registerSubtitle', 'Create your account')}</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>{t('username', 'Username')}</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder={t('enterUsername', 'Enter username')}
              required
              minLength={3}
              maxLength={20}
              className="auth-input"
            />
          </div>

          {!isLogin && (
            <>

              <div className="form-group">
                <label>{t('birthDate', 'Birth Date')} ({t('optional', 'Optional')})</label>
                <input
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  max={new Date(new Date().setFullYear(new Date().getFullYear() - 13)).toISOString().split('T')[0]}
                  min={new Date(new Date().setFullYear(new Date().getFullYear() - 120)).toISOString().split('T')[0]}
                  className="auth-input"
                />
              </div>

              <div className="form-group">
                <label>{t('country', 'Country')} ({t('optional', 'Optional')})</label>
                <select
                  value={country}
                  onChange={handleCountryChange}
                  className="auth-input"
                >
                  <option value="">{t('selectCountry', 'Select your country')}</option>
                  {countries.map(country => (
                    <option key={country.code} value={country.name}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>{t('location', 'City')} ({t('optional', 'Optional')})</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder={t('enterCity', 'Enter your city')}
                  className="auth-input"
                />
              </div>

              <div className="form-group">
                <label>{t('gender', 'Gender')} ({t('optional', 'Optional')})</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="auth-input"
                >
                  <option value="">{t('selectGender', 'Select your gender')}</option>
                  <option value="male">☀️ {t('male', 'Male')}</option>
                  <option value="female">🌙 {t('female', 'Female')}</option>
                  <option value="other">{t('other', 'Other')}</option>
                  <option value="prefer_not_to_say">{t('preferNotToSay', 'Prefer not to say')}</option>
                </select>
              </div>

              <div className="form-group">
                <label>{t('preferredLanguage', 'Preferred Language')} ({t('optional', 'Optional')})</label>
                <select
                  value={preferredLanguage}
                  onChange={(e) => setPreferredLanguage(e.target.value)}
                  className="auth-input"
                >
                  <option value="">{t('selectLanguage', 'Select your language')}</option>
                  {availableLanguages.map(lang => (
                    <option key={lang.code} value={lang.code}>
                      {lang.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>{t('bio', 'Bio')} ({t('optional', 'Optional')})</label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder={t('bioPlaceholder', 'Tell us about yourself...')}
                  maxLength={500}
                  rows={3}
                  className="auth-input"
                />
                <div className="character-count">
                  {500 - bio.length} {t('charactersRemaining', 'characters remaining')}
                </div>
              </div>
            </>
          )}

          {error && <div className="error-message">{error}</div>}

          <button 
            type="submit" 
            disabled={isLoading || username.trim().length < 3}
            className="auth-button"
          >
            {isLoading ? (
              <div className="loading-spinner">
                <div className="spinner"></div>
                {isLogin ? t('loggingIn', 'Logging in...') : t('registering', 'Registering...')}
              </div>
            ) : (
              isLogin ? t('login', 'Login') : t('register', 'Register')
            )}
          </button>
        </form>

        <div className="auth-switch">
          <p>
            {isLogin ? t('noAccount', "Don't have an account?") : t('haveAccount', 'Already have an account?')}
            <button 
              type="button" 
              onClick={() => {
                setIsLogin(!isLogin);
                resetForm();
              }}
              className="switch-button"
            >
              {isLogin ? t('register', 'Register') : t('login', 'Login')}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;