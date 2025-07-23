import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, Shield, DollarSign, TrendingUp } from "lucide-react";

interface OnboardingCarouselProps {
  onComplete: () => void;
}

const OnboardingCarousel = ({ onComplete }: OnboardingCarouselProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      icon: <Shield className="w-16 h-16 text-magic mx-auto mb-6" />,
      title: "Seu Pix, mais poderoso",
      description: "Transforme qualquer Pix em proteção financeira global"
    },
    {
      icon: <DollarSign className="w-16 h-16 text-accent mx-auto mb-6" />,
      title: "Proteja seu dinheiro em Dólares Digitais",
      description: "Converta automaticamente para se proteger da inflação"
    },
    {
      icon: <TrendingUp className="w-16 h-16 text-success mx-auto mb-6" />,
      title: "Veja seu dinheiro crescer todo dia",
      description: "Ganhe rendimento enquanto seu dinheiro fica seguro"
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="max-w-sm w-full text-center animate-fade-up">
          {steps[currentStep].icon}
          <h2 className="text-2xl font-bold text-foreground mb-4">
            {steps[currentStep].title}
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            {steps[currentStep].description}
          </p>
        </div>
      </div>

      <div className="p-6 space-y-4">
        {/* Progress indicators */}
        <div className="flex justify-center space-x-2 mb-6">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentStep ? 'bg-primary' : 'bg-muted'
              }`}
            />
          ))}
        </div>

        <Button
          onClick={handleNext}
          size="lg"
          variant={currentStep === steps.length - 1 ? "magic" : "default"}
          className="w-full"
        >
          {currentStep === steps.length - 1 ? "Criar minha conta gratuita" : "Continuar"}
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};

export default OnboardingCarousel;