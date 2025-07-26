import React from 'react';
import { useTranslation } from 'react-i18next';

const StepIndicator = ({ 
  currentStep, 
  totalSteps, 
  stepTitles, 
  onGoToStep, 
  isStepValid 
}) => {
  const { t } = useTranslation();

  const getStepClass = (step) => {
    if (step === currentStep) return 'step-current';
    if (step < currentStep) return 'step-completed';
    return 'step-pending';
  };

  const canGoToStep = (step) => {
    // Can always go backward
    if (step < currentStep) return true;
    
    // Can go to current step
    if (step === currentStep) return true;
    
    // Can go forward only if all previous steps are valid
    for (let i = 1; i < step; i++) {
      if (!isStepValid(i)) return false;
    }
    return true;
  };

  return (
    <div className="step-indicator">
      <div className="step-progress-bar">
        <div 
          className="step-progress-fill"
          style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
        />
      </div>
      
      <div className="step-items">
        {Array.from({ length: totalSteps }, (_, index) => {
          const step = index + 1;
          const stepClass = getStepClass(step);
          const canClick = canGoToStep(step);
          
          return (
            <div
              key={step}
              className={`step-item ${stepClass} ${canClick ? 'clickable' : 'disabled'}`}
              onClick={() => canClick && onGoToStep(step)}
            >
              <div className="step-number">
                {step < currentStep ? '✓' : step}
              </div>
              <div className="step-title">
                {stepTitles[step]}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepIndicator;