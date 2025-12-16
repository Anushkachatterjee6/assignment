import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dna, Sparkles, Bell, Settings } from 'lucide-react';

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="flex items-center justify-between h-16 px-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <Dna className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="font-display font-bold text-lg">BioLeadIQ</h1>
              <p className="text-xs text-muted-foreground">AI Business Development Agent</p>
            </div>
          </div>
          <Badge variant="outline" className="hidden sm:flex gap-1 text-xs border-primary/30 text-primary">
            <Sparkles className="h-3 w-3" />
            Decision-Intent Aware
          </Badge>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};
