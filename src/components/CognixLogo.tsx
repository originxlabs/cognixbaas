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
            {/* Cognix Unique Logo - Neural Brain with Code Integration */}
            <svg
              viewBox="0 0 48 48"
              className="w-3/4 h-3/4"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Outer orbital ring */}
              <ellipse
                cx="24"
                cy="24"
                rx="20"
                ry="8"
                className="stroke-primary/30"
                strokeWidth="0.8"
                transform="rotate(-25 24 24)"
              />
              <ellipse
                cx="24"
                cy="24"
                rx="20"
                ry="8"
                className="stroke-accent/30"
                strokeWidth="0.8"
                transform="rotate(25 24 24)"
              />
              
              {/* Brain-like neural structure */}
              <path
                d="M24 8 C16 8 10 14 10 22 C10 30 16 36 24 38 C32 36 38 30 38 22 C38 14 32 8 24 8"
                className="stroke-primary"
                strokeWidth="1.2"
                fill="none"
              />
              
              {/* Left hemisphere */}
              <path
                d="M14 20 Q16 16 20 18 Q22 20 20 24 Q18 28 14 26"
                className="stroke-primary fill-primary/10"
                strokeWidth="1"
              />
              
              {/* Right hemisphere */}
              <path
                d="M34 20 Q32 16 28 18 Q26 20 28 24 Q30 28 34 26"
                className="stroke-accent fill-accent/10"
                strokeWidth="1"
              />
              
              {/* Center connection - Code symbol < > */}
              <path
                d="M21 21 L18 24 L21 27"
                className="stroke-primary"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M27 21 L30 24 L27 27"
                className="stroke-accent"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              
              {/* Central core */}
              <circle cx="24" cy="24" r="3" className="fill-primary" />
              <circle cx="24" cy="24" r="1.5" className="fill-background" />
              
              {/* Neural nodes */}
              <circle cx="16" cy="14" r="1.5" className="fill-primary animate-pulse" />
              <circle cx="32" cy="14" r="1.5" className="fill-accent animate-pulse" style={{ animationDelay: '0.3s' }} />
              <circle cx="12" cy="24" r="1.5" className="fill-accent animate-pulse" style={{ animationDelay: '0.6s' }} />
              <circle cx="36" cy="24" r="1.5" className="fill-primary animate-pulse" style={{ animationDelay: '0.9s' }} />
              <circle cx="16" cy="34" r="1.5" className="fill-accent animate-pulse" style={{ animationDelay: '0.5s' }} />
              <circle cx="32" cy="34" r="1.5" className="fill-primary animate-pulse" style={{ animationDelay: '0.8s' }} />
              
              {/* Connection lines */}
              <line x1="16" y1="14" x2="20" y2="18" className="stroke-primary/40" strokeWidth="0.5" />
              <line x1="32" y1="14" x2="28" y2="18" className="stroke-accent/40" strokeWidth="0.5" />
              <line x1="12" y1="24" x2="18" y2="24" className="stroke-accent/40" strokeWidth="0.5" />
              <line x1="36" y1="24" x2="30" y2="24" className="stroke-primary/40" strokeWidth="0.5" />
              <line x1="16" y1="34" x2="20" y2="28" className="stroke-accent/40" strokeWidth="0.5" />
              <line x1="32" y1="34" x2="28" y2="28" className="stroke-primary/40" strokeWidth="0.5" />
              
              {/* Top spark */}
              <path
                d="M24 4 L24 7 M21 5 L24 7 L27 5"
                className="stroke-primary"
                strokeWidth="1"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Logo Text */}
      {showText && (
        <div className="flex flex-col">
          <span className={cn("font-bold tracking-tight gradient-text", textSizes[size])}>
            COGNIX
          </span>
          <span className="text-[10px] text-muted-foreground font-semibold tracking-widest uppercase">
            by CROPXON
          </span>
        </div>
      )}
    </div>
  );
};

export default CognixLogo;
