import { cn } from '@/lib/utils';

interface HeroBackgroundProps {
  className?: string;
}

export function HeroBackground({ className }: HeroBackgroundProps): React.ReactNode {
  return (
    <div
      className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}
      aria-hidden="true"
    >
      {/* Animated gradient orbs */}
      <div className="absolute -left-[200px] -top-[200px] h-[600px] w-[600px] rounded-full bg-[hsl(349_75%_63%/0.15)] blur-[120px] animate-float-slow" />
      <div className="absolute -right-[150px] top-[20%] hidden h-[500px] w-[500px] rounded-full bg-[hsl(195_85%_62%/0.12)] blur-[100px] animate-float-slow-reverse md:block" />
      <div className="absolute -bottom-[100px] left-[30%] hidden h-[400px] w-[400px] rounded-full bg-[hsl(242_40%_25%/0.20)] blur-[80px] animate-float-slow-alt md:block" />

      {/* SVG dot grid pattern */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.04]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="hero-dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-dots)" />
      </svg>
    </div>
  );
}
