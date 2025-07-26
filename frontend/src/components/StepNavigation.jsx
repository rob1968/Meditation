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
      {/* Navigation buttons side by side */}
      {!isLastStep && (
        <>
          {/* Previous Button */}
          <button
            className={`nav-btn prev-btn ${isFirstStep ? 'disabled' : ''}`}
            onClick={onPrev}
            disabled={isFirstStep}
          >
            ← {t('previous', 'Vorige')}
          </button>

          {/* Next Button */}
          <button
            className={`nav-btn next-btn ${!isCurrentStepValid ? 'disabled' : ''}`}
            onClick={onNext}
            disabled={!isCurrentStepValid}
          >
            {t('next', 'Volgende')} →
          </button>
        </>
      )}

      {/* Generate button for final step */}
      {isLastStep && (
        <button
          className="generate-btn primary"
          onClick={onGenerate}
          disabled={!isCurrentStepValid || isGenerating}
        >
          {isGenerating ? t('generating', 'Genereren...') : `🎵 ${t('generateAudio', 'Audio Genereren')}`}
        </button>
      )}
    </div>
  );
};

export default StepNavigation;