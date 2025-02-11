
import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TermsOfUseDialogProps {
  isOpen: boolean;
  onAccept: () => void;
  termsText: string;
}

const TermsOfUseDialog = ({ isOpen, onAccept, termsText }: TermsOfUseDialogProps) => {
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const element = e.currentTarget;
    const isAtBottom = Math.abs(
      element.scrollHeight - element.clientHeight - element.scrollTop
    ) < 1;
    
    if (isAtBottom) {
      setHasScrolledToBottom(true);
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setHasScrolledToBottom(false);
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Políticas de Uso</DialogTitle>
        </DialogHeader>
        <ScrollArea 
          ref={scrollRef} 
          className="h-[400px] mt-4 pr-4" 
          onScrollCapture={handleScroll}
        >
          <div className="space-y-4 text-sm">
            {termsText}
          </div>
        </ScrollArea>
        <Button 
          onClick={onAccept}
          disabled={!hasScrolledToBottom}
          className="w-full mt-4"
        >
          Li e estou de acordo
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default TermsOfUseDialog;
