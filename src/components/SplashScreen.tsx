import { useEffect, useState } from "react";
import pixchainLogo from "@/assets/pixchain-logo.png";

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 300); // Wait for fade out animation
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 bg-background flex items-center justify-center transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="text-center">
        <img
          src={pixchainLogo}
          alt="PIXCHAIN"
          className="w-24 h-24 mx-auto mb-6 animate-bounce-gentle"
        />
        <h1 className="text-2xl font-bold text-foreground">PIXCHAIN</h1>
        <p className="text-muted-foreground mt-2">Seu Pix mais poderoso</p>
      </div>
    </div>
  );
};

export default SplashScreen;