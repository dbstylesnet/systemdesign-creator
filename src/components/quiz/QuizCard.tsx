import type { ReactNode } from 'react';
import { Check, CircleHelp, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuizCardProps {
  label: string;
  image?: string;
  description?: string;
  /** Icon or graphic shown to the left of the label (quiz answer buttons). */
  leadingVisual?: ReactNode;
  /** Optional tip shown when clicking the question-mark. */
  tip?: string;
  /** Optional handler for when the question-mark is clicked. */
  onTipClick?: () => void;
  /** Whether the tip icon should appear active/highlighted. */
  tipActive?: boolean;
  layout?: 'vertical' | 'horizontal';
  onClick: () => void;
  disabled?: boolean;
  state?: 'default' | 'correct' | 'incorrect' | 'selected';
  size?: 'sm' | 'md' | 'lg';
}

export function QuizCard({
  label,
  image,
  description,
  leadingVisual,
  tip,
  onTipClick,
  tipActive = false,
  layout = 'vertical',
  onClick,
  disabled = false,
  state = 'default',
  size = 'md',
}: QuizCardProps) {
  const horizontal = layout === 'horizontal';
  const dimContent = disabled && state === 'default';

  return (
    <button
      type="button"
      aria-disabled={disabled}
      onClick={() => {
        if (disabled) return;
        onClick();
      }}
      className={cn(
        'relative rounded-lg border-2 transition-all duration-300 text-card-foreground',
        'active:scale-95 touch-manipulation',
        horizontal ? 'text-left w-full min-h-[3.25rem]' : '',
        state === 'default' && 'border-border bg-card hover:border-primary/50 hover:glow-primary cursor-pointer',
        state === 'correct' && 'border-success bg-success/10 glow-success animate-enlarge',
        state === 'incorrect' && 'border-destructive bg-destructive/10 glow-destructive animate-shake',
        state === 'selected' && 'border-primary bg-primary/10 glow-primary',
        disabled && state === 'default' && 'cursor-not-allowed',
      )}
    >
      {tip && (
        <span
          role="button"
          tabIndex={0}
          aria-label={`Explain ${label}`}
          className={cn(
            'absolute top-2 right-2 z-40 inline-flex items-center justify-center rounded-full border bg-background/60 backdrop-blur',
            'h-6 w-6 text-muted-foreground hover:text-info hover:border-info/50 hover:bg-info/10',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
            tipActive && 'text-info border-info/50 bg-info/10',
          )}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onTipClick?.();
          }}
          onPointerDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              e.stopPropagation();
              onTipClick?.();
            }
          }}
        >
          <CircleHelp className="h-4 w-4" />
        </span>
      )}

      {state === 'correct' && (
        <div className="absolute -top-2 -right-2 z-50 rounded-full bg-success p-1">
          <Check className="h-4 w-4 text-success-foreground" />
        </div>
      )}
      {state === 'incorrect' && (
        <div className="absolute -top-2 -right-2 z-50 rounded-full bg-destructive p-1">
          <X className="h-4 w-4 text-destructive-foreground" />
        </div>
      )}

      <div
        className={cn(
          'flex',
          horizontal
            ? 'flex-row items-center gap-3 p-3'
            : 'flex-col items-center gap-2 p-4',
          tip && horizontal && 'pr-10',
          !horizontal && size === 'lg' && 'p-5 gap-3',
          !horizontal && size === 'sm' && 'p-3 gap-1.5',
          dimContent && 'opacity-40',
        )}
      >
        {leadingVisual && (
          <span
            className={cn(
              'flex shrink-0 items-center justify-center rounded-md bg-primary/10',
              horizontal ? 'p-2' : '',
            )}
          >
            {leadingVisual}
          </span>
        )}

        {image && !horizontal && (
          <div className={cn(
            'flex items-center justify-center overflow-hidden rounded-md',
            size === 'lg' ? 'h-24 w-24' : size === 'sm' ? 'h-12 w-12' : 'h-16 w-16',
          )}>
            <img
              src={image}
              alt={label}
              className="h-full w-full object-contain"
            />
          </div>
        )}

        <span
          className={cn(
            'font-semibold',
            horizontal ? 'flex-1 min-w-0 text-sm leading-snug' : 'text-center',
            !horizontal && size === 'lg' && 'text-base',
            !horizontal && size === 'sm' && 'text-xs',
            !horizontal && size === 'md' && 'text-sm',
          )}
        >
          {label}
        </span>

        {description && (
          <span className={cn(
            'text-muted-foreground text-center leading-tight',
            size === 'lg' ? 'text-sm' : 'text-xs',
          )}>
            {description}
          </span>
        )}
      </div>
    </button>
  );
}
