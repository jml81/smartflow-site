import { cn } from '@/lib/utils';

interface FloatingShapesProps {
  className?: string;
}

export function FloatingShapes({ className }: FloatingShapesProps): React.ReactNode {
  return (
    <div
      className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}
      aria-hidden="true"
    >
      {/* Small circles */}
      <div className="absolute left-[10%] top-[15%] h-3 w-3 rounded-full bg-primary/[0.07] animate-float-slow" />
      <div className="absolute right-[15%] top-[25%] h-2 w-2 rounded-full bg-accent/[0.08] animate-float-slow-reverse" />
      <div className="absolute left-[70%] bottom-[20%] h-4 w-4 rounded-full bg-primary/[0.05] animate-float-slow-alt" />

      {/* Diamond shapes */}
      <div className="absolute left-[80%] top-[10%] hidden h-4 w-4 rotate-45 bg-accent/[0.06] animate-float-slow md:block" />
      <div className="absolute left-[5%] bottom-[30%] hidden h-3 w-3 rotate-45 bg-primary/[0.06] animate-float-slow-reverse md:block" />
    </div>
  );
}
