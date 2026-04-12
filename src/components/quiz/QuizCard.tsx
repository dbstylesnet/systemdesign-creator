import { useState } from 'react';
import { Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuizCardProps {
  label: string;
  image?: string;
  description?: string;
  onClick: () => void;
  disabled?: boolean;
  state?: 'default' | 'correct' | 'incorrect' | 'selected';
  size?: 'sm' | 'md' | 'lg';
}

export function QuizCard({
  label,
  image,
  description,
  onClick,
  disabled = false,
  state = 'default',
  size = 'md',
}: QuizCardProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'relative flex flex-col items-center gap-2 rounded-lg border-2 p-4 transition-all duration-300 text-card-foreground',
        'active:scale-95 touch-manipulation',
        size === 'lg' && 'p-5 gap-3',
        size === 'sm' && 'p-3 gap-1.5',
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

      {image && (
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

      <span className={cn(
        'font-semibold text-center',
        size === 'lg' ? 'text-base' : size === 'sm' ? 'text-xs' : 'text-sm',
      )}>
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
