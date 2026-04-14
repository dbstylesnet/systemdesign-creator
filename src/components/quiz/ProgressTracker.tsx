import { cn } from '@/lib/utils';
import { Check, X } from 'lucide-react';

interface Step {
  label: string;
  sublabel?: string;
  tone?: 'success' | 'error' | 'neutral';
}

interface ProgressTrackerProps {
  steps: Step[];
  currentStep: number;
}

export function ProgressTracker({ steps, currentStep }: ProgressTrackerProps) {
  if (steps.length === 0) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="w-full px-3 py-2">
        <div className="mb-1 text-[11px] font-semibold text-muted-foreground">
          Your answers:
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {steps.map((step, i) => (
            <div key={i} className="flex items-center shrink-0">
              <div className={cn(
                'flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium transition-all',
                step.tone === 'error'
                  ? 'bg-destructive/15 text-destructive'
                  : step.tone === 'success'
                    ? 'bg-success/20 text-success'
                    : i < currentStep
                      ? 'bg-success/20 text-success'
                      : i === currentStep
                        ? 'bg-primary/20 text-primary animate-pulse-glow'
                        : 'bg-muted text-muted-foreground',
              )}>
                {step.tone === 'error' ? <X className="h-3 w-3" /> : i < currentStep && <Check className="h-3 w-3" />}
                <span className="whitespace-nowrap">{step.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
