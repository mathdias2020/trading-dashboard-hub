
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import TermsOfUseDialog from "@/components/auth/TermsOfUseDialog";

const Register = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showTerms, setShowTerms] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cpf: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  // Mock do texto dos termos de uso (em produção, viria do backend)
  const termsText = `
    1. Termos e Condições Gerais

    Bem-vindo à nossa plataforma de copytrading. Ao utilizar nossos serviços, você concorda com estes termos.

    2. Responsabilidades do Usuário

    O usuário é responsável por:
    - Manter a segurança de sua conta
    - Fornecer informações verdadeiras
    - Respeitar as diretrizes da plataforma

    3. Riscos do Investimento

    Todo investimento possui riscos. O usuário declara estar ciente que:
    - Resultados passados não garantem resultados futuros
    - Pode haver perda parcial ou total do capital investido
    - Deve investir apenas o que está disposto a perder

    4. Política de Privacidade

    Nos comprometemos a:
    - Proteger seus dados pessoais
    - Não compartilhar informações sem consentimento
    - Manter a confidencialidade das operações

    5. Taxas e Pagamentos

    O usuário concorda em:
    - Pagar as taxas estabelecidas
    - Manter o pagamento em dia
    - Aceitar as condições de cobrança

    6. Cancelamento

    O serviço pode ser cancelado:
    - A qualquer momento pelo usuário
    - Em caso de violação dos termos
    - Por decisão da administração

    7. Modificações dos Termos

    Reservamos o direito de:
    - Alterar estes termos quando necessário
    - Notificar os usuários sobre mudanças
    - Requerer nova aceitação quando relevante
  `.trim();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "As senhas não coincidem",
      });
      return;
    }

    setShowTerms(true);
  };

  const handleAcceptTerms = () => {
    toast({
      title: "Registro realizado com sucesso!",
      description: "Você será redirecionado para adicionar um produtor.",
    });

    setTimeout(() => {
      navigate("/producer-code");
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-semibold">Criar nova conta</h2>
        <p className="text-muted-foreground mt-2">Preencha seus dados para criar sua conta</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nome completo</Label>
          <Input
            id="name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cpf">CPF</Label>
          <Input
            id="cpf"
            required
            value={formData.cpf}
            onChange={(e) => setFormData({ ...formData, cpf: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Telefone</Label>
          <Input
            id="phone"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Senha</Label>
          <Input
            id="password"
            type="password"
            required
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirmar senha</Label>
          <Input
            id="confirmPassword"
            type="password"
            required
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
          />
        </div>
        <Button type="submit" className="w-full">
          Registrar
        </Button>
      </form>
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Já tem uma conta?{" "}
          <Link to="/" className="text-primary hover:underline">
            Faça login
          </Link>
        </p>
      </div>

      <TermsOfUseDialog 
        isOpen={showTerms}
        onAccept={handleAcceptTerms}
        termsText={termsText}
      />
    </div>
  );
};

export default Register;
