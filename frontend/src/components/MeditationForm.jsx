import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Input, Select, Card, FormField, LoadingSpinner } from './ui';
import styles from './MeditationForm.module.css';

const MeditationForm = ({ text, setText, background, setBackground, language, setLanguage, voiceId, setVoiceId, voices, generate, isLoading }) => {
  const { t } = useTranslation();
  
  const backgroundOptions = [
    { value: 'rain', label: `🌧️ ${t('rain')}` },
    { value: 'ocean', label: `🌊 ${t('ocean')}` },
    { value: 'forest', label: `🌲 ${t('forest')}` }
  ];
  
  const languageOptions = [
    { value: 'nl', label: `🇳🇱 ${t('dutch')}` },
    { value: 'en', label: `🇺🇸 ${t('english')}` },
    { value: 'de', label: `🇩🇪 ${t('german')}` },
    { value: 'es', label: `🇪🇸 ${t('spanish')}` },
    { value: 'fr', label: `🇫🇷 ${t('french')}` }
  ];
  
  const voiceOptions = voices.map(voice => ({
    value: voice.voice_id,
    label: voice.name
  }));
  
  return (
    <Card className={styles.formCard}>
      <div className={styles.header}>
        <span className={styles.icon}>🧘‍♀️</span>
        <h1 className={styles.title}>{t('title')}</h1>
        <p className={styles.subtitle}>{t('subtitle')}</p>
      </div>
      
      <form className={styles.form} onSubmit={(e) => { e.preventDefault(); generate(); }}>
        <FormField label={t('textLabel')} required>
          <Input
            type="textarea"
            rows={5}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={t('textPlaceholder')}
          />
        </FormField>
        
        <div className={styles.formRow}>
          <FormField label={t('backgroundLabel')}>
            <Select
              value={background}
              onChange={(e) => setBackground(e.target.value)}
              options={backgroundOptions}
            />
          </FormField>
          
          <FormField label={t('languageLabel')}>
            <Select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              options={languageOptions}
            />
          </FormField>
        </div>
        
        <FormField label={t('voiceLabel')}>
          <Select
            value={voiceId}
            onChange={(e) => setVoiceId(e.target.value)}
            options={voiceOptions}
          />
        </FormField>
        
        <Button
          type="submit"
          disabled={isLoading}
          size="large"
          className={styles.generateButton}
        >
          {isLoading ? t('generating') : t('generateButton')}
        </Button>
        
        {isLoading && (
          <LoadingSpinner 
            text={t('generatingText')}
            className={styles.loading}
          />
        )}
      </form>
    </Card>
  );
};

export default MeditationForm;