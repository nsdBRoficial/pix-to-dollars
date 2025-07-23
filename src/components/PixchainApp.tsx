import { useState } from "react";
import SplashScreen from "./SplashScreen";
import OnboardingCarousel from "./OnboardingCarousel";
import PhoneSignup from "./PhoneSignup";
import Dashboard from "./Dashboard";

type AppState = 'splash' | 'onboarding' | 'signup' | 'dashboard';

const PixchainApp = () => {
  const [currentState, setCurrentState] = useState<AppState>('splash');
  const [userPhone, setUserPhone] = useState('');
  const [userBalance] = useState(29.45); // Mock balance in USDC
  const [dailyYield] = useState(0.0005); // 0.05% daily yield

  const getUserName = () => {
    // Extract first name from phone for demo
    return "Maria";
  };

  const handleSplashComplete = () => {
    setCurrentState('onboarding');
  };

  const handleOnboardingComplete = () => {
    setCurrentState('signup');
  };

  const handleSignupComplete = (phone: string) => {
    setUserPhone(phone);
    setCurrentState('dashboard');
  };

  const handleReceivePix = () => {
    // TODO: Navigate to Pix generation screen
    console.log('Generate Pix QR Code');
  };

  const handleSendPix = () => {
    // TODO: Navigate to send/withdraw screen
    console.log('Send Pix');
  };

  switch (currentState) {
    case 'splash':
      return <SplashScreen onComplete={handleSplashComplete} />;
    
    case 'onboarding':
      return <OnboardingCarousel onComplete={handleOnboardingComplete} />;
    
    case 'signup':
      return <PhoneSignup onComplete={handleSignupComplete} />;
    
    case 'dashboard':
      return (
        <Dashboard
          userName={getUserName()}
          balance={userBalance}
          dailyYield={dailyYield}
          onReceivePix={handleReceivePix}
          onSendPix={handleSendPix}
        />
      );
    
    default:
      return <SplashScreen onComplete={handleSplashComplete} />;
  }
};

export default PixchainApp;