import React from 'react';
import { useTranslation } from 'react-i18next';

const StepNavigation = ({ 
  currentStep, 
  totalSteps, 
  onNext, 
  onPrev, 
  isCurrentStepValid,
  onSave,
  onGenerate,
  isGenerating 
}) => {
  const { t } = useTranslation();

  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === totalSteps;

  return (
    <div className="step-navigation">
      {/* Previous Button - Left side */}
      <button
        className={`nav-btn prev-btn ${isFirstStep ? 'disabled' : ''}`}
        onClick={onPrev}
        disabled={isFirstStep}
        style={{ visibility: isFirstStep ? 'hidden' : 'visible' }}
      >
        ← {t('previous', 'Vorige')}
      </button>

      {/* Generate button for final step only */}
      {isLastStep && (
        <button
          className="generate-btn primary"
          onClick={onGenerate}
          disabled={!isCurrentStepValid || isGenerating}
        >
          {isGenerating ? t('generating', 'Genereren...') : `🎵 ${t('generateAudio', 'Audio Genereren')}`}
        </button>
      )}

      {/* Next Button - Right side */}
      <button
        className={`nav-btn next-btn ${!isCurrentStepValid || isLastStep ? 'disabled' : ''}`}
        onClick={onNext}
        disabled={!isCurrentStepValid || isLastStep}
        style={{ visibility: isLastStep ? 'hidden' : 'visible' }}
      >
        {t('next', 'Volgende')} →
      </button>
    </div>
  );
};

export default StepNavigation;