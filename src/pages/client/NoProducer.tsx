
import { Card } from "@/components/ui/card";

const NoProducer = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="max-w-2xl p-8 text-center space-y-4">
        <h1 className="text-2xl font-semibold text-gray-900">Aviso</h1>
        <p className="text-gray-600 text-lg">
          Infelizmente você não está conectado com um produtor atualmente, qualquer dúvida ou erro entre em contato com nosso suporte.
        </p>
      </Card>
    </div>
  );
};

export default NoProducer;
