
import { Link, Outlet } from "react-router-dom";
import { Card } from "./ui/card";

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-50 p-4">
      <div className="w-full max-w-lg animate-slide-up">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Folow</h1>
          <p className="text-muted-foreground mt-2">Bem-vindo ao seu portal de copytrading</p>
        </div>
        <Card className="p-6">
          <Outlet />
        </Card>
      </div>
    </div>
  );
};

export default AuthLayout;
