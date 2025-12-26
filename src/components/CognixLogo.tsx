import { cn } from "@/lib/utils";

interface CognixLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
}

const CognixLogo = ({ className, size = "md", showText = true }: CognixLogoProps) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-14 h-14",
    xl: "w-20 h-20",
  };

  const textSizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
    xl: "text-4xl",
  };

  return (
    <div className={cn("flex items-center gap-3", className)}>
      {/* Logo Mark */}
      <div className={cn("relative", sizeClasses[size])}>
        {/* Outer glow ring */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary via-accent to-primary opacity-50 blur-md animate-pulse-glow" />
        
        {/* Main logo container */}
        <div className="relative w-full h-full rounded-xl bg-gradient-to-br from-primary to-accent p-[2px]">
          <div className="w-full h-full rounded-[10px] bg-background flex items-center justify-center">
            {/* Neural network / brain pattern */}
            <svg
              viewBox="0 0 40 40"
              className="w-3/4 h-3/4"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Central hexagon */}
              <path
                d="M20 8L28 13V23L20 28L12 23V13L20 8Z"
                className="stroke-primary"
                strokeWidth="1.5"
                fill="none"
              />
              
              {/* Inner connections */}
              <circle cx="20" cy="12" r="2" className="fill-primary" />
              <circle cx="26" cy="16" r="2" className="fill-accent" />
              <circle cx="26" cy="22" r="2" className="fill-primary" />
              <circle cx="20" cy="26" r="2" className="fill-accent" />
              <circle cx="14" cy="22" r="2" className="fill-primary" />
              <circle cx="14" cy="16" r="2" className="fill-accent" />
              
              {/* Center dot */}
              <circle cx="20" cy="18" r="3" className="fill-primary" />
              
              {/* Radiating lines */}
              <line x1="20" y1="18" x2="20" y2="12" className="stroke-primary/60" strokeWidth="1" />
              <line x1="20" y1="18" x2="26" y2="16" className="stroke-accent/60" strokeWidth="1" />
              <line x1="20" y1="18" x2="26" y2="22" className="stroke-primary/60" strokeWidth="1" />
              <line x1="20" y1="18" x2="20" y2="26" className="stroke-accent/60" strokeWidth="1" />
              <line x1="20" y1="18" x2="14" y2="22" className="stroke-primary/60" strokeWidth="1" />
              <line x1="20" y1="18" x2="14" y2="16" className="stroke-accent/60" strokeWidth="1" />
              
              {/* Outer nodes */}
              <circle cx="20" cy="4" r="1.5" className="fill-primary/40" />
              <circle cx="32" cy="12" r="1.5" className="fill-accent/40" />
              <circle cx="32" cy="26" r="1.5" className="fill-primary/40" />
              <circle cx="20" cy="34" r="1.5" className="fill-accent/40" />
              <circle cx="8" cy="26" r="1.5" className="fill-primary/40" />
              <circle cx="8" cy="12" r="1.5" className="fill-accent/40" />
            </svg>
          </div>
        </div>
      </div>

      {/* Logo Text */}
      {showText && (
        <div className="flex flex-col">
          <span className={cn("font-bold tracking-tight gradient-text", textSizes[size])}>
            Cognix
          </span>
          <span className="text-xs text-muted-foreground font-medium tracking-wider">
            by CropXon
          </span>
        </div>
      )}
    </div>
  );
};

export default CognixLogo;
