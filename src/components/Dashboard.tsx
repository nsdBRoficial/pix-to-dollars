import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { QrCode, Send, TrendingUp, Eye, EyeOff, Sparkles } from "lucide-react";

interface DashboardProps {
  userName: string;
  balance: number;
  dailyYield: number;
  onReceivePix: () => void;
  onSendPix: () => void;
}

const Dashboard = ({ userName, balance, dailyYield, onReceivePix, onSendPix }: DashboardProps) => {
  const [showBalance, setShowBalance] = useState(true);
  const [animateYield, setAnimateYield] = useState(false);

  useEffect(() => {
    if (dailyYield > 0) {
      setAnimateYield(true);
      const timer = setTimeout(() => setAnimateYield(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [dailyYield]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    return `+${(value * 100).toFixed(2)}%`;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-magic p-6 rounded-b-3xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-magic-foreground/80 text-sm">Olá,</p>
            <h1 className="text-magic-foreground text-xl font-bold">{userName}</h1>
          </div>
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-magic-foreground" />
          </div>
        </div>

        {/* Balance Card */}
        <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-magic">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-muted-foreground text-sm">Seu cofre digital</p>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowBalance(!showBalance)}
                className="h-8 w-8 p-0"
              >
                {showBalance ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </Button>
            </div>

            <div className="mb-4">
              <h2 className="text-3xl font-bold text-foreground">
                {showBalance ? formatCurrency(balance) : "••••••"}
              </h2>
              <p className="text-sm text-muted-foreground">Dólares Digitais</p>
            </div>

            {dailyYield > 0 && (
              <div className={`flex items-center space-x-2 ${animateYield ? 'animate-scale-celebration' : ''}`}>
                <TrendingUp className="w-4 h-4 text-success" />
                <span className="text-success font-semibold text-sm">
                  {formatPercentage(dailyYield)} hoje 📈
                </span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <div className="p-6 space-y-4">
        {balance === 0 ? (
          <Button
            onClick={onReceivePix}
            size="xl"
            variant="magic"
            className="w-full animate-bounce-gentle"
          >
            <QrCode className="w-6 h-6" />
            Receber meu Pix Mágico ✨
          </Button>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            <Button
              onClick={onReceivePix}
              size="lg"
              variant="default"
              className="flex-col h-20"
            >
              <QrCode className="w-6 h-6 mb-1" />
              Receber
            </Button>
            <Button
              onClick={onSendPix}
              size="lg"
              variant="outline"
              className="flex-col h-20"
            >
              <Send className="w-6 h-6 mb-1" />
              Enviar
            </Button>
          </div>
        )}

        {/* Quick Stats */}
        {balance > 0 && (
          <div className="grid grid-cols-2 gap-4 mt-8">
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-foreground">💰</p>
                <p className="text-sm text-muted-foreground">Protegido</p>
                <p className="text-sm font-semibold">da inflação</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-foreground">🌍</p>
                <p className="text-sm text-muted-foreground">Dinheiro</p>
                <p className="text-sm font-semibold">global</p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;