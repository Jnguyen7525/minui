import React from "react";

interface StepperProps {
  steps: React.ReactNode[]; // ✅ Any content for steps (text, icons, divs)
  stepStyle?: string; // ✅ Custom styles for each step
  activeStepStyle?: string; // ✅ Custom styles for the active step
  completedStepStyle?: string; // ✅ Custom styles for completed steps
  buttonStyle?: string; // ✅ Custom button styles
  nextButton?: React.ReactNode; // ✅ Custom Next button content
  prevButton?: React.ReactNode; // ✅ Custom Previous button content
  className?: string;
  currentStep: number; // ✅ Step synchronization
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>; // ✅ Step update function
}

const Stepper: React.FC<StepperProps> = ({
  steps,
  stepStyle,
  activeStepStyle,
  completedStepStyle,
  buttonStyle,
  nextButton = null, // ✅ Custom Next button
  prevButton = null, // ✅ Custom Previous button
  className,
  currentStep,
  setCurrentStep, // ✅ Step sync function
}) => {
  return (
    <div className={`${className}`}>
      {prevButton !== null && currentStep > 0 && (
        <button
          className={buttonStyle}
          onClick={() => setCurrentStep((prev) => prev - 1)}
        >
          {prevButton} {/* ✅ Customizable Previous button */}
        </button>
      )}
      {steps.map((step, i) => (
        <button
          key={i}
          className={`step-item ${currentStep === i ? activeStepStyle : ""} ${
            i < currentStep ? completedStepStyle : stepStyle
          }`}
          onClick={() => setCurrentStep(i)} // ✅ Click to navigate steps
        >
          {step}
        </button>
      ))}

      {nextButton !== null && currentStep < steps.length - 1 && (
        <button
          className={buttonStyle}
          onClick={() => setCurrentStep((prev) => prev + 1)}
        >
          {nextButton} {/* ✅ Customizable Next button */}
        </button>
      )}
    </div>
  );
};

export default Stepper;
