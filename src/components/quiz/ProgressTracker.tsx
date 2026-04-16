import { cn } from '@/lib/utils';
import { Check, X } from 'lucide-react';

interface StepAnswer {
  label: string;
  tone?: 'success' | 'error' | 'neutral';
}

interface StepGroup {
  stepNumber: number; // 1-based
  answers: StepAnswer[];
}

interface ProgressTrackerProps {
  groups: StepGroup[];
}

function toRoman(n: number): string {
  const table: Array<[number, string]> = [
    [1000, 'M'],
    [900, 'CM'],
    [500, 'D'],
    [400, 'CD'],
    [100, 'C'],
    [90, 'XC'],
    [50, 'L'],
    [40, 'XL'],
    [10, 'X'],
    [9, 'IX'],
    [5, 'V'],
    [4, 'IV'],
    [1, 'I'],
  ];

  let x = Math.max(0, Math.floor(n));
  let out = '';
  for (const [value, numeral] of table) {
    while (x >= value) {
      out += numeral;
      x -= value;
    }
  }
  return out || 'I';
}

export function ProgressTracker({ groups }: ProgressTrackerProps) {
  if (groups.length === 0) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="w-full px-3 py-2">
        <div className="mb-1 text-[11px] font-semibold text-muted-foreground">
          Step answers:
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {groups.map((group, gi) => (
            <div key={group.stepNumber} className="flex items-center gap-2 shrink-0">
              {gi > 0 && <span className="text-muted-foreground/70">|</span>}
              <span className="text-xs font-semibold text-muted-foreground">
                {toRoman(group.stepNumber)}
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {group.answers.map((a, ai) => (
                  <div
                    key={`${group.stepNumber}-${ai}-${a.label}`}
                    className={cn(
                      'flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium',
                      a.tone === 'error'
                        ? 'bg-destructive/15 text-destructive'
                        : a.tone === 'success'
                          ? 'bg-success/20 text-success'
                          : 'bg-muted text-muted-foreground',
                    )}
                  >
                    {a.tone === 'error' ? <X className="h-3 w-3" /> : a.tone === 'success' ? <Check className="h-3 w-3" /> : null}
                    <span className="whitespace-nowrap">{a.label}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
