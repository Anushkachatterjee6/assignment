import { Lead } from '@/types/lead';
import { cn } from '@/lib/utils';
import { User, FlaskConical, Building2, MapPin } from 'lucide-react';

interface ScoreBreakdownProps {
  lead: Lead;
  className?: string;
}

const scoreCategories = [
  { key: 'roleScore', label: 'Role Fit', max: 30, icon: User },
  { key: 'scientificScore', label: 'Scientific Intent', max: 40, icon: FlaskConical },
  { key: 'companyScore', label: 'Company Intent', max: 20, icon: Building2 },
  { key: 'locationScore', label: 'Location Signal', max: 10, icon: MapPin },
] as const;

export const ScoreBreakdown = ({ lead, className }: ScoreBreakdownProps) => {
  return (
    <div className={cn('space-y-3', className)}>
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
        Propensity-to-Buy Score Breakdown
      </p>
      {scoreCategories.map(({ key, label, max, icon: Icon }) => {
        const score = lead[key];
        const percentage = (score / max) * 100;
        
        return (
          <div key={key} className="space-y-1.5">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <Icon className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-muted-foreground">{label}</span>
              </div>
              <span className="font-mono font-medium text-foreground">
                {score}/{max}
              </span>
            </div>
            <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
              <div
                className={cn(
                  'h-full rounded-full transition-all duration-700 ease-out',
                  percentage >= 80 ? 'bg-status-high' : percentage >= 60 ? 'bg-status-medium' : 'bg-status-low'
                )}
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
