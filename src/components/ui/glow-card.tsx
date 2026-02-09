import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: 'orange' | 'blue';
}

export function GlowCard({ children, className, glowColor = 'orange' }: GlowCardProps): ReactNode {
  return (
    <div
      className={cn(
        'group relative h-full rounded-xl border border-border bg-card p-6 transition-all duration-300 md:p-8',
        'hover:border-transparent hover:shadow-xl',
        className,
      )}
    >
      {/* Gradient border on hover */}
      <div
        className={cn(
          'pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100',
          glowColor === 'orange'
            ? 'bg-gradient-to-br from-primary/30 via-transparent to-primary/10'
            : 'bg-gradient-to-br from-accent/30 via-transparent to-accent/10',
        )}
        aria-hidden="true"
      />
      {/* Outer glow on hover */}
      <div
        className={cn(
          'pointer-events-none absolute -inset-1 rounded-xl opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-100',
          glowColor === 'orange'
            ? 'bg-gradient-to-br from-primary/10 via-transparent to-transparent'
            : 'bg-gradient-to-br from-accent/10 via-transparent to-transparent',
        )}
        aria-hidden="true"
      />
      <div className="relative">{children}</div>
    </div>
  );
}
