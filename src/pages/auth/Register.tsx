
import { Link } from "react-router-dom";
import { RegisterForm } from "@/components/auth/RegisterForm";

const Register = () => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-semibold">Criar nova conta</h2>
        <p className="text-muted-foreground mt-2">Preencha seus dados para criar sua conta</p>
      </div>
      <RegisterForm />
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Já tem uma conta?{" "}
          <Link to="/" className="text-primary hover:underline">
            Faça login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
