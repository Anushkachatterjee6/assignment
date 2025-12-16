import { Lead } from '@/types/lead';
import { ScoreRing } from './ScoreRing';
import { ScoreBreakdown } from './ScoreBreakdown';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Mail, 
  MapPin, 
  Building2, 
  FileText, 
  Beaker, 
  Calendar,
  ExternalLink,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface LeadCardProps {
  lead: Lead;
  isExpanded?: boolean;
  onToggleExpand?: () => void;
}

const actionColors: Record<Lead['recommendedAction'], string> = {
  'Email Intro': 'bg-status-info/10 text-status-info border-status-info/20',
  'Conference Meet': 'bg-chart-4/10 text-chart-4 border-chart-4/20',
  'Warm LinkedIn Outreach': 'bg-status-medium/10 text-status-medium border-status-medium/20',
  'Direct Call': 'bg-status-high/10 text-status-high border-status-high/20',
  'Partner Intro': 'bg-primary/10 text-primary border-primary/20',
};

const fundingColors: Record<Lead['fundingStage'], string> = {
  'Bootstrapped': 'bg-muted text-muted-foreground',
  'Seed': 'bg-chart-5/10 text-chart-5',
  'Series A': 'bg-status-medium/10 text-status-medium',
  'Series B': 'bg-status-info/10 text-status-info',
  'Series C+': 'bg-chart-4/10 text-chart-4',
  'IPO': 'bg-status-high/10 text-status-high',
};

export const LeadCard = ({ lead, isExpanded, onToggleExpand }: LeadCardProps) => {
  return (
    <Card className={cn(
      'hover-lift border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300',
      isExpanded && 'ring-1 ring-primary/30'
    )}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-display font-semibold text-lg truncate">{lead.name}</h3>
              {lead.linkedinUrl && (
                <a 
                  href={lead.linkedinUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
            </div>
            <p className="text-sm text-muted-foreground truncate">{lead.title}</p>
            <p className="text-sm font-medium text-foreground/80 truncate">{lead.company}</p>
          </div>
          <ScoreRing score={lead.totalScore} size="md" />
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Location & Funding */}
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="gap-1.5 text-xs">
            <MapPin className="h-3 w-3" />
            {lead.personLocation}
          </Badge>
          <Badge variant="outline" className="gap-1.5 text-xs">
            <Building2 className="h-3 w-3" />
            HQ: {lead.companyHQ}
          </Badge>
          <Badge className={cn('text-xs', fundingColors[lead.fundingStage])}>
            {lead.fundingStage}
          </Badge>
        </div>

        {/* Scientific Signals */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <FileText className="h-4 w-4 text-primary" />
            <span>{lead.recentPublications} recent pubs</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4 text-primary" />
            <span>Last: {new Date(lead.lastPublicationDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
          </div>
        </div>

        {/* Technographic Signals */}
        <div className="flex gap-2">
          {lead.usesInVitroModels && (
            <Badge variant="secondary" className="gap-1 text-xs bg-primary/10 text-primary">
              <Beaker className="h-3 w-3" />
              Uses 3D Models
            </Badge>
          )}
          {lead.openToNAMs && (
            <Badge variant="secondary" className="gap-1 text-xs bg-status-high/10 text-status-high">
              <Sparkles className="h-3 w-3" />
              Open to NAMs
            </Badge>
          )}
        </div>

        {/* Decision Rationale - Why This Lead Ranked High */}
        <div className="space-y-2 p-3 rounded-lg bg-primary/5 border border-primary/10">
          <p className="text-xs font-semibold text-primary uppercase tracking-wide">
            Why This Lead Ranked High
          </p>
          <ul className="space-y-1.5">
            {lead.topReasons.map((reason, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-foreground/80">
                <ChevronRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span>{reason}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* BD Recommendation */}
        <div className="pt-3 border-t border-border/50">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
            BD Recommendation
          </p>
          <div className="flex items-center justify-between gap-2">
            <Badge className={cn('font-medium', actionColors[lead.recommendedAction])}>
              {lead.recommendedAction}
            </Badge>
            <span className="text-xs text-muted-foreground truncate flex-1 text-right">
              {lead.actionRationale}
            </span>
          </div>
        </div>

        {/* Expanded Content */}
        {isExpanded && (
          <div className="pt-4 border-t border-border/50 space-y-4 animate-fade-in">
            <ScoreBreakdown lead={lead} />
            
            <div className="space-y-2">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Research Keywords
              </p>
              <div className="flex flex-wrap gap-1.5">
                {lead.researchKeywords.map((keyword) => (
                  <Badge key={keyword} variant="outline" className="text-xs">
                    {keyword}
                  </Badge>
                ))}
              </div>
            </div>

            {lead.conferenceAppearances.length > 0 && (
              <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Conference Appearances
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {lead.conferenceAppearances.map((conf) => (
                    <Badge key={conf} variant="secondary" className="text-xs">
                      {conf}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center gap-2 text-sm">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">{lead.email}</span>
            </div>
          </div>
        )}

        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onToggleExpand}
          className="w-full text-muted-foreground hover:text-foreground"
        >
          {isExpanded ? 'Show Less' : 'Show More'}
        </Button>
      </CardContent>
    </Card>
  );
};
