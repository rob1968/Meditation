import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Input, Select, Card, FormField, LoadingSpinner } from './ui';
import styles from './MeditationForm.module.css';

const MeditationForm = ({ text, setText, background, setBackground, voiceId, setVoiceId, voices, generate, isLoading, meditationType, selectMeditationType, duration, handleDurationChange }) => {
  const { t } = useTranslation();
  
  const meditationTypes = [
    { type: 'sleep', icon: '🌙', label: t('sleepMeditation') },
    { type: 'stress', icon: '😌', label: t('stressMeditation') },
    { type: 'focus', icon: '🎯', label: t('focusMeditation') },
    { type: 'anxiety', icon: '🌿', label: t('anxietyMeditation') },
    { type: 'energy', icon: '⚡', label: t('energyMeditation') }
  ];
  
  const backgroundOptions = [
    { value: 'rain', label: `🌧️ ${t('rain')}` },
    { value: 'ocean', label: `🌊 ${t('ocean')}` },
    { value: 'forest', label: `🌲 ${t('forest')}` }
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
        <FormField label={t('meditationType')}>
          <div className={styles.meditationTypes}>
            {meditationTypes.map((meditation) => (
              <Button
                key={meditation.type}
                type="button"
                variant={meditationType === meditation.type ? 'primary' : 'secondary'}
                size="small"
                onClick={() => selectMeditationType(meditation.type)}
                className={styles.typeButton}
              >
                <span className={styles.typeIcon}>{meditation.icon}</span>
                {meditation.label}
              </Button>
            ))}
          </div>
        </FormField>
        
        <FormField label={`${t('duration')}: ${duration} ${t('minutes')}`}>
          <div className={styles.durationContainer}>
            <input
              type="range"
              min="1"
              max="20"
              value={duration}
              onChange={(e) => handleDurationChange(parseInt(e.target.value))}
              className={styles.durationSlider}
            />
            <div className={styles.durationLabels}>
              <span className={styles.durationLabel}>1{t('min')}</span>
              <span className={styles.durationLabel}>20{t('min')}</span>
            </div>
          </div>
        </FormField>
        
        <FormField label={t('backgroundLabel')}>
          <Select
            value={background}
            onChange={(e) => setBackground(e.target.value)}
            options={backgroundOptions}
          />
        </FormField>
        
        <FormField label={t('textLabel')} required>
          <Input
            type="textarea"
            rows={5}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={t('textPlaceholder')}
          />
        </FormField>
        
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