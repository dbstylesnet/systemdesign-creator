import type { ReactNode } from 'react';
import { Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuizCardProps {
  label: string;
  image?: string;
  description?: string;
  /** Icon or graphic shown to the left of the label (quiz answer buttons). */
  leadingVisual?: ReactNode;
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
  layout = 'vertical',
  onClick,
  disabled = false,
  state = 'default',
  size = 'md',
}: QuizCardProps) {
  const horizontal = layout === 'horizontal';

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'relative flex rounded-lg border-2 transition-all duration-300 text-card-foreground',
        'active:scale-95 touch-manipulation',
        horizontal
          ? 'flex-row items-center gap-3 p-3 text-left w-full min-h-[3.25rem]'
          : 'flex-col items-center gap-2 p-4',
        !horizontal && size === 'lg' && 'p-5 gap-3',
        !horizontal && size === 'sm' && 'p-3 gap-1.5',
        state === 'default' && 'border-border bg-card hover:border-primary/50 hover:glow-primary cursor-pointer',
        state === 'correct' && 'border-success bg-success/10 glow-success animate-enlarge',
        state === 'incorrect' && 'border-destructive bg-destructive/10 glow-destructive animate-shake',
        state === 'selected' && 'border-primary bg-primary/10 glow-primary',
        disabled && state === 'default' && 'opacity-40 cursor-not-allowed',
      )}
    >
      {state === 'correct' && (
        <div className="absolute -top-2 -right-2 rounded-full bg-success p-1">
          <Check className="h-4 w-4 text-success-foreground" />
        </div>
      )}
      {state === 'incorrect' && (
        <div className="absolute -top-2 -right-2 rounded-full bg-destructive p-1">
          <X className="h-4 w-4 text-destructive-foreground" />
        </div>
      )}

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
    </button>
  );
}
