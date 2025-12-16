import { useState } from 'react';
import { FilterCriteria } from '@/types/lead';
import { jobTitleOptions, keywordOptions, regionOptions, fundingStageOptions } from '@/data/mockLeads';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Filter, 
  RotateCcw, 
  Briefcase, 
  Search, 
  MapPin, 
  Building2,
  Gauge
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface FilterPanelProps {
  filters: FilterCriteria;
  onFiltersChange: (filters: FilterCriteria) => void;
  className?: string;
}

export const FilterPanel = ({ filters, onFiltersChange, className }: FilterPanelProps) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleArrayFilter = (
    key: keyof Pick<FilterCriteria, 'titles' | 'keywords' | 'regions' | 'fundingStages'>,
    value: string
  ) => {
    const current = filters[key];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    onFiltersChange({ ...filters, [key]: updated });
  };

  const resetFilters = () => {
    onFiltersChange({
      titles: [],
      keywords: [],
      regions: [],
      scoreRange: [0, 100],
      fundingStages: [],
    });
  };

  const activeFiltersCount = 
    filters.titles.length + 
    filters.keywords.length + 
    filters.regions.length + 
    filters.fundingStages.length +
    (filters.scoreRange[0] > 0 || filters.scoreRange[1] < 100 ? 1 : 0);

  return (
    <Card className={cn('border-border/50 bg-card/30 backdrop-blur-sm', className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-base font-display">
            <Filter className="h-4 w-4 text-primary" />
            Lead Filters
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="ml-2 bg-primary/10 text-primary">
                {activeFiltersCount} active
              </Badge>
            )}
          </CardTitle>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={resetFilters}
              className="h-8 text-muted-foreground hover:text-foreground"
            >
              <RotateCcw className="h-3.5 w-3.5 mr-1" />
              Reset
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Propensity-to-Buy Score Range */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Gauge className="h-4 w-4 text-muted-foreground" />
            <Label className="text-sm font-medium">Propensity Score (0–100)</Label>
            <span className="ml-auto text-sm text-muted-foreground font-mono">
              {filters.scoreRange[0]} - {filters.scoreRange[1]}
            </span>
          </div>
          <Slider
            value={filters.scoreRange}
            onValueChange={(value) => onFiltersChange({ ...filters, scoreRange: value as [number, number] })}
            min={0}
            max={100}
            step={5}
            className="mt-2"
          />
        </div>

        {/* Job Titles */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Briefcase className="h-4 w-4 text-muted-foreground" />
            <Label className="text-sm font-medium">Job Titles</Label>
          </div>
          <ScrollArea className="h-32">
            <div className="space-y-2">
              {jobTitleOptions.map((title) => (
                <div key={title} className="flex items-center space-x-2">
                  <Checkbox
                    id={`title-${title}`}
                    checked={filters.titles.includes(title)}
                    onCheckedChange={() => toggleArrayFilter('titles', title)}
                  />
                  <label
                    htmlFor={`title-${title}`}
                    className="text-sm text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
                  >
                    {title}
                  </label>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Research Keywords */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Label className="text-sm font-medium">Research Keywords</Label>
          </div>
          <div className="flex flex-wrap gap-2">
            {keywordOptions.map((keyword) => (
              <Badge
                key={keyword}
                variant={filters.keywords.includes(keyword) ? 'default' : 'outline'}
                className={cn(
                  'cursor-pointer transition-all',
                  filters.keywords.includes(keyword)
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-secondary'
                )}
                onClick={() => toggleArrayFilter('keywords', keyword)}
              >
                {keyword}
              </Badge>
            ))}
          </div>
        </div>

        {/* Regions */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <Label className="text-sm font-medium">Regions</Label>
          </div>
          <div className="flex flex-wrap gap-2">
            {regionOptions.map((region) => (
              <Badge
                key={region}
                variant={filters.regions.includes(region) ? 'default' : 'outline'}
                className={cn(
                  'cursor-pointer transition-all',
                  filters.regions.includes(region)
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-secondary'
                )}
                onClick={() => toggleArrayFilter('regions', region)}
              >
                {region}
              </Badge>
            ))}
          </div>
        </div>

        {/* Funding Stages */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Building2 className="h-4 w-4 text-muted-foreground" />
            <Label className="text-sm font-medium">Funding Stage</Label>
          </div>
          <div className="flex flex-wrap gap-2">
            {fundingStageOptions.map((stage) => (
              <Badge
                key={stage}
                variant={filters.fundingStages.includes(stage) ? 'default' : 'outline'}
                className={cn(
                  'cursor-pointer transition-all',
                  filters.fundingStages.includes(stage)
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-secondary'
                )}
                onClick={() => toggleArrayFilter('fundingStages', stage)}
              >
                {stage}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
