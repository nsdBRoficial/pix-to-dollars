import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Phone } from "lucide-react";

interface PhoneSignupProps {
  onComplete: (phone: string) => void;
}

const PhoneSignup = ({ onComplete }: PhoneSignupProps) => {
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const formatPhone = (value: string) => {
    // Remove non-digits
    const cleaned = value.replace(/\D/g, '');
    
    // Format as (11) 99999-9999
    if (cleaned.length <= 11) {
      let formatted = cleaned;
      if (cleaned.length > 2) {
        formatted = `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`;
      }
      if (cleaned.length > 7) {
        const area = cleaned.slice(0, 2);
        const first = cleaned.slice(2, 7);
        const second = cleaned.slice(7, 11);
        formatted = `(${area}) ${first}-${second}`;
      }
      return formatted;
    }
    return value;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setPhone(formatted);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.replace(/\D/g, '').length !== 11) return;
    
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    onComplete(phone);
  };

  const isValidPhone = phone.replace(/\D/g, '').length === 11;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="max-w-sm w-full">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Qual seu celular?
            </h2>
            <p className="text-muted-foreground">
              Usamos seu telefone para criar e proteger sua conta
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Input
                type="tel"
                placeholder="(11) 99999-9999"
                value={phone}
                onChange={handlePhoneChange}
                className="text-center text-lg h-14"
                maxLength={15}
              />
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={!isValidPhone || isLoading}
            >
              {isLoading ? "Enviando..." : "Continuar"}
              <ArrowRight className="w-5 h-5" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PhoneSignup;