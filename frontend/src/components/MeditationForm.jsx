import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Input, Select, Card, FormField, LoadingSpinner } from './ui';
import MeditationTypeSlider from './MeditationTypeSlider';
import BackgroundSlider from './BackgroundSlider';
import VoiceSlider from './VoiceSlider';
import styles from './MeditationForm.module.css';

const MeditationForm = ({ text, setText, background, setBackground, voiceId, setVoiceId, voices, generate, isLoading, meditationType, selectMeditationType, duration, handleDurationChange, onGenerateTextPreview, isGeneratingText, showTextPreview, userCredits }) => {
  const { t } = useTranslation();
  
  return (
    <Card className={styles.formCard}>
      <div className={styles.header}>
        <span className={styles.icon}>🧘‍♀️</span>
        <h1 className={styles.title}>{t('title')}</h1>
        <p className={styles.subtitle}>{t('subtitle')}</p>
      </div>
      
      <form className={styles.form} onSubmit={(e) => { e.preventDefault(); generate(); }}>
        <MeditationTypeSlider 
          selectedType={meditationType}
          onTypeSelect={selectMeditationType}
        />
        
        {!showTextPreview && (
          <div className={styles.previewContainer}>
            <Button
              type="button"
              onClick={onGenerateTextPreview}
              disabled={isGeneratingText || isLoading || (userCredits && userCredits.credits < 1)}
              variant="outline"
              size="medium"
              className={styles.previewButton}
            >
              {isGeneratingText ? (
                <>
                  <LoadingSpinner size="small" />
                  {t('generating', 'Generating...')}
                </>
              ) : (
                <>
                  👁️ {t('previewText', 'Preview Text')}
                </>
              )}
            </Button>
          </div>
        )}
        
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
        
        <BackgroundSlider 
          selectedBackground={background}
          onBackgroundSelect={setBackground}
          meditationType={meditationType}
        />
        
        <FormField label={t('textLabel')} required>
          <Input
            type="textarea"
            rows={5}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={t('textPlaceholder')}
          />
        </FormField>
        
        <VoiceSlider 
          voices={voices}
          selectedVoiceId={voiceId}
          onVoiceSelect={setVoiceId}
        />
        
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