import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface Step {
  label: string;
  sublabel?: string;
}

interface ProgressTrackerProps {
  steps: Step[];
  currentStep: number;
}

export function ProgressTracker({ steps, currentStep }: ProgressTrackerProps) {
  if (steps.length === 0) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="mx-auto max-w-2xl px-3 py-2">
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide">
          {steps.map((step, i) => (
            <div key={i} className="flex items-center shrink-0">
              {i > 0 && (
                <div className="mx-1 h-px w-4 bg-border" />
              )}
              <div className={cn(
                'flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium transition-all',
                i < currentStep
                  ? 'bg-success/20 text-success'
                  : i === currentStep
                    ? 'bg-primary/20 text-primary animate-pulse-glow'
                    : 'bg-muted text-muted-foreground',
              )}>
                {i < currentStep && <Check className="h-3 w-3" />}
                <span className="whitespace-nowrap">{step.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
