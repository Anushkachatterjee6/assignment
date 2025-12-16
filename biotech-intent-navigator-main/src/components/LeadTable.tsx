import { useState } from 'react';
import { Lead } from '@/types/lead';
import { ScoreRing } from './ScoreRing';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScoreBreakdown } from './ScoreBreakdown';
import { 
  ArrowUpDown, 
  ChevronDown, 
  ChevronUp,
  MapPin,
  Building2,
  FileText,
  Beaker,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface LeadTableProps {
  leads: Lead[];
  className?: string;
}

type SortKey = 'totalScore' | 'name' | 'company' | 'recentPublications';
type SortOrder = 'asc' | 'desc';

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

export const LeadTable = ({ leads, className }: LeadTableProps) => {
  const [sortKey, setSortKey] = useState<SortKey>('totalScore');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('desc');
    }
  };

  const sortedLeads = [...leads].sort((a, b) => {
    const aVal = a[sortKey];
    const bVal = b[sortKey];
    const order = sortOrder === 'asc' ? 1 : -1;
    
    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return aVal.localeCompare(bVal) * order;
    }
    return ((aVal as number) - (bVal as number)) * order;
  });

  const SortIcon = ({ columnKey }: { columnKey: SortKey }) => {
    if (sortKey !== columnKey) return <ArrowUpDown className="h-3.5 w-3.5 ml-1 opacity-50" />;
    return sortOrder === 'asc' 
      ? <ChevronUp className="h-3.5 w-3.5 ml-1" />
      : <ChevronDown className="h-3.5 w-3.5 ml-1" />;
  };

  return (
    <>
      <div className={cn('rounded-lg border border-border/50 bg-card/30 backdrop-blur-sm overflow-hidden', className)}>
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-border/50">
              <TableHead className="w-24">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('totalScore')}
                  className="h-8 px-2 font-medium"
                >
                  Propensity
                  <SortIcon columnKey="totalScore" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('name')}
                  className="h-8 px-2 font-medium"
                >
                  Lead
                  <SortIcon columnKey="name" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('company')}
                  className="h-8 px-2 font-medium"
                >
                  Company
                  <SortIcon columnKey="company" />
                </Button>
              </TableHead>
              <TableHead>Location</TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('recentPublications')}
                  className="h-8 px-2 font-medium"
                >
                  Publications
                  <SortIcon columnKey="recentPublications" />
                </Button>
              </TableHead>
              <TableHead>Signals</TableHead>
              <TableHead>BD Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedLeads.map((lead, idx) => (
              <TableRow 
                key={lead.id} 
                className="cursor-pointer hover:bg-secondary/30 border-border/30 transition-colors"
                onClick={() => setSelectedLead(lead)}
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                <TableCell>
                  <ScoreRing score={lead.totalScore} size="sm" />
                </TableCell>
                <TableCell>
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5">
                      <span className="font-medium">{lead.name}</span>
                      {lead.linkedinUrl && (
                        <ExternalLink className="h-3 w-3 text-muted-foreground" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground truncate max-w-[200px]">
                      {lead.title}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <p className="font-medium text-sm">{lead.company}</p>
                    <Badge className={cn('text-xs', fundingColors[lead.fundingStage])}>
                      {lead.fundingStage}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      {lead.personLocation}
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground/70">
                      <Building2 className="h-3 w-3" />
                      HQ: {lead.companyHQ}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1.5">
                    <FileText className="h-3.5 w-3.5 text-primary" />
                    <span className="font-mono text-sm">{lead.recentPublications}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex gap-1.5">
                    {lead.usesInVitroModels && (
                      <Badge variant="secondary" className="text-xs bg-primary/10 text-primary px-1.5">
                        <Beaker className="h-3 w-3" />
                      </Badge>
                    )}
                    {lead.openToNAMs && (
                      <Badge variant="secondary" className="text-xs bg-status-high/10 text-status-high px-1.5">
                        <Sparkles className="h-3 w-3" />
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={cn('text-xs whitespace-nowrap', actionColors[lead.recommendedAction])}>
                    {lead.recommendedAction}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!selectedLead} onOpenChange={() => setSelectedLead(null)}>
        <DialogContent className="max-w-2xl bg-card border-border/50">
          {selectedLead && (
            <>
              <DialogHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <DialogTitle className="font-display text-xl">
                      {selectedLead.name}
                    </DialogTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      {selectedLead.title} at {selectedLead.company}
                    </p>
                  </div>
                  <ScoreRing score={selectedLead.totalScore} size="lg" />
                </div>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                <ScoreBreakdown lead={selectedLead} />

                {/* Decision Rationale */}
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                    Why This Lead Ranked High
                  </h4>
                  <ul className="space-y-2">
                    {selectedLead.topReasons.map((reason, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <span className="text-primary font-bold">{idx + 1}.</span>
                        <span>{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* BD Recommendation */}
                <div className="p-4 rounded-lg bg-secondary/30 border border-primary/20">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                    BD Recommendation
                  </p>
                  <Badge className={cn('font-medium', actionColors[selectedLead.recommendedAction])}>
                    {selectedLead.recommendedAction}
                  </Badge>
                  <p className="text-sm text-muted-foreground mt-2">
                    {selectedLead.actionRationale}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-1">
                    <p className="text-muted-foreground">Email</p>
                    <p className="font-mono">{selectedLead.email}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-muted-foreground">Recent Publications</p>
                    <p className="font-mono">{selectedLead.recentPublications} papers</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Research Focus</p>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedLead.publicationTopics.map((topic) => (
                      <Badge key={topic} variant="outline" className="text-xs">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </div>

                {selectedLead.currentTechStack.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Current Tech Stack</p>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedLead.currentTechStack.map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
