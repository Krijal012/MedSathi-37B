import React from 'react';

const StepIndicator = ({ currentStep, totalSteps = 3 }) => {
    const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);

    return (
        <div className="
            flex items-center justify-center 
            mb-6 
            sm:mb-8
            px-2
        ">
            {steps.map((step, index) => (
                <React.Fragment key={step}>
                    {/* Step Circle */}
                    <div className="flex flex-col items-center">
                        <div
                            className={`
                                w-10 h-10 
                                sm:w-12 sm:h-12 
                                md:w-16 md:h-16 
                                rounded-full 
                                flex items-center justify-center 
                                font-bold 
                                transition-all 
                                flex-shrink-0
                                text-sm 
                                sm:text-base 
                                md:text-xl
                                ${step < currentStep
                                    ? 'bg-blue-400 text-white'
                                    : step === currentStep
                                        ? 'bg-blue-400 text-white'
                                        : 'bg-gray-300 text-gray-600'
                                }
                            `}
                        >
                            {step < currentStep ? '✓' : step}
                        </div>
                        {/* Step Label (optional for mobile) */}
                        <span className="
                            text-xs 
                            text-gray-600 
                            mt-1 
                            hidden 
                            sm:block
                        ">
                            Step {step}
                        </span>
                    </div>

                    {/* Connecting Line */}
                    {index < steps.length - 1 && (
                        <div
                            className={`
                                h-1 
                                w-8 
                                sm:w-16 
                                md:w-24 
                                lg:w-32 
                                mx-1 
                                sm:mx-2 
                                transition-all 
                                flex-shrink-0
                                ${step < currentStep ? 'bg-blue-400' : 'bg-gray-300'}
                            `}
                        />
                    )}
                </React.Fragment>
            ))}
        </div>
    );
};

export default StepIndicator;