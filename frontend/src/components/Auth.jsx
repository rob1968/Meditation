import React, { useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { getFullUrl, API_ENDPOINTS } from '../config/api';
import PageHeader from './PageHeader';

const Auth = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { t } = useTranslation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const endpoint = isLogin ? API_ENDPOINTS.LOGIN : API_ENDPOINTS.REGISTER;
      const response = await axios.post(getFullUrl(endpoint), {
        username: username.trim()
      });

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
                setError('');
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