import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Layers, 
  Database, 
  Cpu, 
  BarChart3, 
  Globe,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export const ArchitecturePanel = () => {
  const stages = [
    {
      icon: Globe,
      title: 'Identification Engine',
      description: 'Data ingestion from professional networks, publications, and conferences',
      sources: ['LinkedIn-style profiles', 'PubMed/Scholar metadata', 'Conference attendee lists'],
      color: 'text-status-info',
      bgColor: 'bg-status-info/10',
    },
    {
      icon: Database,
      title: 'Enrichment Layer',
      description: 'Profile expansion with business and scientific intelligence',
      sources: ['Email inference', 'Funding stage', 'Technographic signals', 'Publication analysis'],
      color: 'text-chart-4',
      bgColor: 'bg-chart-4/10',
    },
    {
      icon: Cpu,
      title: 'Scoring Engine',
      description: 'Weighted propensity-to-buy model with explainability',
      sources: ['Role Fit (30pts)', 'Scientific Intent (40pts)', 'Company Intent (20pts)', 'Location (10pts)'],
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      icon: BarChart3,
      title: 'Intelligence Dashboard',
      description: 'Actionable insights with BD recommendations',
      sources: ['Ranked leads', 'Export functionality', 'Action recommendations'],
      color: 'text-status-high',
      bgColor: 'bg-status-high/10',
    },
  ];

  return (
    <Card className="border-border/50 bg-card/30 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-display">
          <Layers className="h-5 w-5 text-primary" />
          System Architecture
          <Badge variant="outline" className="ml-2 text-xs">
            <Sparkles className="h-3 w-3 mr-1" />
            Decision-Intent Aware
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Flow line */}
          <div className="absolute left-6 top-8 bottom-8 w-px bg-gradient-to-b from-status-info via-primary to-status-high opacity-30" />
          
          <div className="space-y-6">
            {stages.map((stage, idx) => (
              <div key={stage.title} className="relative flex gap-4">
                <div className={`relative z-10 p-2.5 rounded-lg ${stage.bgColor} shrink-0`}>
                  <stage.icon className={`h-5 w-5 ${stage.color}`} />
                </div>
                <div className="flex-1 pb-4">
                  <h4 className="font-medium text-foreground">{stage.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{stage.description}</p>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {stage.sources.map((source) => (
                      <Badge key={source} variant="secondary" className="text-xs bg-secondary/50">
                        {source}
                      </Badge>
                    ))}
                  </div>
                </div>
                {idx < stages.length - 1 && (
                  <ArrowRight className="absolute left-6 -bottom-1 h-3 w-3 text-muted-foreground/30" />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-border/50">
          <h5 className="text-sm font-medium text-muted-foreground mb-2">Extensibility</h5>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Designed for real API integration. Mock data can be replaced with live sources: 
            Proxycurl for LinkedIn, PubMed API for publications, Crunchbase for funding data. 
            Scoring weights are configurable per business context.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
