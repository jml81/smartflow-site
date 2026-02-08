import { cn } from '@/lib/utils';

type Variant = 'wave' | 'curve' | 'angle';

interface SectionDividerProps {
  variant?: Variant;
  fill?: string;
  flip?: boolean;
  className?: string;
}

function WavePath(): React.ReactNode {
  return <path d="M0,32 C320,96 640,0 960,64 C1280,128 1600,32 1920,64 L1920,160 L0,160 Z" />;
}

function CurvePath(): React.ReactNode {
  return <path d="M0,128 Q960,0 1920,128 L1920,160 L0,160 Z" />;
}

function AnglePath(): React.ReactNode {
  return <path d="M0,160 L960,32 L1920,160 Z" />;
}

const paths: Record<Variant, () => React.ReactNode> = {
  wave: WavePath,
  curve: CurvePath,
  angle: AnglePath,
};

export function SectionDivider({
  variant = 'wave',
  fill = 'hsl(var(--background))',
  flip = false,
  className,
}: SectionDividerProps): React.ReactNode {
  const PathComponent = paths[variant];

  return (
    <div
      className={cn('relative h-12 w-full md:h-20', flip && 'rotate-180', className)}
      aria-hidden="true"
    >
      <svg
        className="absolute bottom-0 h-full w-full"
        viewBox="0 0 1920 160"
        preserveAspectRatio="none"
        fill={fill}
        xmlns="http://www.w3.org/2000/svg"
      >
        <PathComponent />
      </svg>
    </div>
  );
}
