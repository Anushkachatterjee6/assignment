import { cn } from '@/lib/utils';

interface ScoreRingProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

export const ScoreRing = ({ score, size = 'md', showLabel = true, className }: ScoreRingProps) => {
  const dimensions = {
    sm: { size: 48, stroke: 4, fontSize: 'text-sm' },
    md: { size: 64, stroke: 5, fontSize: 'text-lg' },
    lg: { size: 96, stroke: 6, fontSize: 'text-2xl' },
  };

  const { size: ringSize, stroke, fontSize } = dimensions[size];
  const radius = (ringSize - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const getScoreColor = () => {
    if (score >= 80) return 'stroke-status-high';
    if (score >= 60) return 'stroke-status-medium';
    return 'stroke-status-low';
  };

  const getScoreTextColor = () => {
    if (score >= 80) return 'text-status-high';
    if (score >= 60) return 'text-status-medium';
    return 'text-status-low';
  };

  return (
    <div className={cn('relative inline-flex items-center justify-center', className)}>
      <svg width={ringSize} height={ringSize} className="transform -rotate-90">
        <circle
          cx={ringSize / 2}
          cy={ringSize / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={stroke}
          className="text-secondary"
        />
        <circle
          cx={ringSize / 2}
          cy={ringSize / 2}
          r={radius}
          fill="none"
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className={cn('score-ring transition-all duration-1000 ease-out', getScoreColor())}
          style={{ strokeDashoffset }}
        />
      </svg>
      {showLabel && (
        <span className={cn('absolute font-display font-bold', fontSize, getScoreTextColor())}>
          {score}
        </span>
      )}
    </div>
  );
};
