import React from 'react';
import { useTranslation } from 'react-i18next';
import StepIndicator from './StepIndicator';
import StepNavigation from './StepNavigation';

const WizardContainer = ({ 
  currentStep, 
  totalSteps = 5, 
  onNext, 
  onPrev, 
  onGoToStep,
  isStepValid,
  onSave,
  onGenerate,
  isGenerating,
  children 
}) => {
  const { t } = useTranslation();

  const stepTitles = {
    1: t('stepMeditationType', 'Meditatie Type'),
    2: t('stepText', 'Meditatie Tekst'),
    3: t('stepVoice', 'Stem Keuze'),
    4: t('stepBackground', 'Achtergrond Muziek'),
    5: t('stepReview', 'Overzicht')
  };

  const hideStepTitle = [1, 2, 3, 4, 5].includes(currentStep);

  return (
    <div className="wizard-container">
      <div className="wizard-header">
        <StepIndicator 
          currentStep={currentStep}
          totalSteps={totalSteps}
          stepTitles={stepTitles}
          onGoToStep={onGoToStep}
          isStepValid={isStepValid}
        />
      </div>

      <div className="wizard-content">
        {!hideStepTitle && stepTitles[currentStep] && (
          <div className="step-title">
            <h2>{stepTitles[currentStep]}</h2>
          </div>
        )}
        
        <div className="step-body">
          {children}
        </div>
      </div>

      <div className="wizard-footer">
        <StepNavigation
          currentStep={currentStep}
          totalSteps={totalSteps}
          onNext={onNext}
          onPrev={onPrev}
          isCurrentStepValid={isStepValid(currentStep)}
          onSave={onSave}
          onGenerate={onGenerate}
          isGenerating={isGenerating}
        />
      </div>
    </div>
  );
};

export default WizardContainer;