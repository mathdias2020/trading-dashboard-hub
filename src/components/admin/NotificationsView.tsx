
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Notification } from "@/types/notification";

interface NotificationsViewProps {
  notifications: Notification[];
  onBack: () => void;
  onResolveNotification: (id: number) => void;
}

const NotificationsView = ({ notifications, onBack, onResolveNotification }: NotificationsViewProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="mr-2" />
          Voltar
        </Button>
        <h1 className="text-2xl font-bold">Avisos</h1>
      </div>

      <Tabs defaultValue="producers">
        <TabsList>
          <TabsTrigger value="producers">Produtores</TabsTrigger>
          <TabsTrigger value="clients">Clientes</TabsTrigger>
        </TabsList>
        
        <TabsContent value="producers">
          <Card className="p-4">
            <div className="space-y-4">
              {notifications
                .filter(notification => notification.type === "producer")
                .map(notification => (
                  <Card key={notification.id} className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold">{notification.message}</p>
                        <p className="text-sm text-muted-foreground">{notification.date}</p>
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => onResolveNotification(notification.id)}
                      >
                        Resolver
                      </Button>
                    </div>
                  </Card>
                ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="clients">
          <Card className="p-4">
            <div className="space-y-4">
              {notifications
                .filter(notification => notification.type === "client")
                .map(notification => (
                  <Card key={notification.id} className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold">{notification.message}</p>
                        <p className="text-sm text-muted-foreground">{notification.date}</p>
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => onResolveNotification(notification.id)}
                      >
                        Resolver
                      </Button>
                    </div>
                  </Card>
                ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NotificationsView;
