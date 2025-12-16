import { Lead } from '@/types/lead';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Download, FileSpreadsheet, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ExportButtonProps {
  leads: Lead[];
}

export const ExportButton = ({ leads }: ExportButtonProps) => {
  const { toast } = useToast();

  const exportToCSV = () => {
    const headers = [
      'Name',
      'Title',
      'Company',
      'Email',
      'Location',
      'Company HQ',
      'Funding Stage',
      'Total Score',
      'Role Score',
      'Scientific Score',
      'Company Score',
      'Location Score',
      'Recent Publications',
      'Uses In-Vitro Models',
      'Open to NAMs',
      'Recommended Action',
      'Action Rationale',
      'Top Reasons',
      'Research Keywords',
    ].join(',');

    const rows = leads.map((lead) => [
      `"${lead.name}"`,
      `"${lead.title}"`,
      `"${lead.company}"`,
      `"${lead.email}"`,
      `"${lead.personLocation}"`,
      `"${lead.companyHQ}"`,
      `"${lead.fundingStage}"`,
      lead.totalScore,
      lead.roleScore,
      lead.scientificScore,
      lead.companyScore,
      lead.locationScore,
      lead.recentPublications,
      lead.usesInVitroModels,
      lead.openToNAMs,
      `"${lead.recommendedAction}"`,
      `"${lead.actionRationale}"`,
      `"${lead.topReasons.join('; ')}"`,
      `"${lead.researchKeywords.join(', ')}"`,
    ].join(','));

    const csv = [headers, ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `biotech-leads-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);

    toast({
      title: 'Export Successful',
      description: `Exported ${leads.length} leads to CSV`,
    });
  };

  const exportToJSON = () => {
    const json = JSON.stringify(leads, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `biotech-leads-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);

    toast({
      title: 'Export Successful',
      description: `Exported ${leads.length} leads to JSON`,
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Export
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-popover border-border">
        <DropdownMenuItem onClick={exportToCSV} className="gap-2 cursor-pointer">
          <FileSpreadsheet className="h-4 w-4" />
          Export as CSV
        </DropdownMenuItem>
        <DropdownMenuItem onClick={exportToJSON} className="gap-2 cursor-pointer">
          <FileText className="h-4 w-4" />
          Export as JSON
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
