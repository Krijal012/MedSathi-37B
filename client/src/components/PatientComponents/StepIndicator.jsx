import React from 'react';

const StepIndicator = ({ currentStep, totalSteps = 3 }) => {
    const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);

    return (
        <div className="flex items-center justify-center mb-8">
            {steps.map((step, index) => (
                <React.Fragment key={step}>
                    {/* Step Circle */}
                    <div className="flex flex-col items-center">
                        <div
                            className={`w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold transition-all ${
                                // Conditional Rendering
                                step < currentStep
                                    ? 'bg-blue-400 text-white' // Completed step
                                    : step === currentStep
                                    ? 'bg-blue-400 text-white' // Current step
                                    : 'bg-gray-300 text-gray-600' // Future step
                            }`}
                        >
                            {step < currentStep ? '✓' : step}
                        </div>
                    </div>

                    {/* Connecting Line */}
                    {index < steps.length - 1 && (
                        <div
                            className={`h-1 w-32 mx-2 transition-all ${
                                step < currentStep ? 'bg-blue-400' : 'bg-gray-300'
                            }`}
                        />
                    )}
                </React.Fragment>
            ))}
        </div>
    );
};

export default StepIndicator;