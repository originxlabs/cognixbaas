import { cn } from "@/lib/utils";

interface CognixLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  variant?: "default" | "monochrome";
}

const CognixLogo = ({ 
  className, 
  size = "md", 
  showText = true,
  variant = "default"
}: CognixLogoProps) => {
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

  const subtextSizes = {
    sm: "text-[8px]",
    md: "text-[9px]",
    lg: "text-[10px]",
    xl: "text-xs",
  };

  return (
    <div className={cn("flex items-center gap-3", className)}>
      {/* Logo Mark - Premium Hexagonal Design */}
      <div className={cn("relative", sizeClasses[size])}>
        {/* Subtle glow effect */}
        <div className="absolute inset-0 rounded-lg bg-primary/20 blur-xl opacity-60" />
        
        {/* Main logo SVG */}
        <svg
          viewBox="0 0 48 48"
          className="relative w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Primary gradient - Electric Cyan */}
            <linearGradient id="cognix-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--primary))" />
              <stop offset="100%" stopColor="hsl(var(--primary) / 0.7)" />
            </linearGradient>
            
            {/* Glow filter */}
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Background hexagon - outer shell */}
          <path
            d="M24 4L42 14V34L24 44L6 34V14L24 4Z"
            fill="none"
            stroke={variant === "monochrome" ? "currentColor" : "url(#cognix-gradient)"}
            strokeWidth="1.5"
            strokeLinejoin="round"
            className="opacity-30"
          />

          {/* Inner hexagon - main shape */}
          <path
            d="M24 8L38 16V32L24 40L10 32V16L24 8Z"
            fill="none"
            stroke={variant === "monochrome" ? "currentColor" : "url(#cognix-gradient)"}
            strokeWidth="2"
            strokeLinejoin="round"
          />

          {/* Connection path 1 - Top right */}
          <line
            x1="24"
            y1="24"
            x2="36"
            y2="18"
            stroke={variant === "monochrome" ? "currentColor" : "hsl(var(--primary))"}
            strokeWidth="1.5"
            strokeLinecap="round"
            className="opacity-80"
          />

          {/* Connection path 2 - Bottom right */}
          <line
            x1="24"
            y1="24"
            x2="36"
            y2="30"
            stroke={variant === "monochrome" ? "currentColor" : "hsl(var(--primary))"}
            strokeWidth="1.5"
            strokeLinecap="round"
            className="opacity-80"
          />

          {/* Connection path 3 - Left */}
          <line
            x1="24"
            y1="24"
            x2="12"
            y2="24"
            stroke={variant === "monochrome" ? "currentColor" : "hsl(var(--primary))"}
            strokeWidth="1.5"
            strokeLinecap="round"
            className="opacity-80"
          />

          {/* Connection path 4 - Top */}
          <line
            x1="24"
            y1="24"
            x2="24"
            y2="12"
            stroke={variant === "monochrome" ? "currentColor" : "hsl(var(--primary))"}
            strokeWidth="1.5"
            strokeLinecap="round"
            className="opacity-60"
          />

          {/* Connection path 5 - Bottom */}
          <line
            x1="24"
            y1="24"
            x2="24"
            y2="36"
            stroke={variant === "monochrome" ? "currentColor" : "hsl(var(--primary))"}
            strokeWidth="1.5"
            strokeLinecap="round"
            className="opacity-60"
          />

          {/* Outer nodes */}
          <circle
            cx="36"
            cy="18"
            r="2"
            fill={variant === "monochrome" ? "currentColor" : "hsl(var(--primary))"}
            className="opacity-90"
          />
          <circle
            cx="36"
            cy="30"
            r="2"
            fill={variant === "monochrome" ? "currentColor" : "hsl(var(--primary))"}
            className="opacity-90"
          />
          <circle
            cx="12"
            cy="24"
            r="2"
            fill={variant === "monochrome" ? "currentColor" : "hsl(var(--primary))"}
            className="opacity-90"
          />
          <circle
            cx="24"
            cy="12"
            r="1.5"
            fill={variant === "monochrome" ? "currentColor" : "hsl(var(--primary))"}
            className="opacity-70"
          />
          <circle
            cx="24"
            cy="36"
            r="1.5"
            fill={variant === "monochrome" ? "currentColor" : "hsl(var(--primary))"}
            className="opacity-70"
          />

          {/* Central nucleus - core */}
          <circle
            cx="24"
            cy="24"
            r="5"
            fill={variant === "monochrome" ? "currentColor" : "hsl(var(--primary))"}
            filter="url(#glow)"
          />
          <circle
            cx="24"
            cy="24"
            r="2.5"
            fill="hsl(var(--background))"
          />
          <circle
            cx="24"
            cy="24"
            r="1"
            fill={variant === "monochrome" ? "currentColor" : "hsl(var(--primary))"}
          />
        </svg>
      </div>

      {/* Logo Text - Custom Modern Sans-Serif Wordmark */}
      {showText && (
        <div className="flex flex-col">
          <span 
            className={cn(
              "font-bold tracking-[0.15em] text-foreground",
              textSizes[size]
            )}
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
          >
            COGNIX
          </span>
          <span 
            className={cn(
              "text-muted-foreground font-medium tracking-[0.2em] uppercase -mt-0.5",
              subtextSizes[size]
            )}
          >
            by CROPXON
          </span>
        </div>
      )}
    </div>
  );
};

export default CognixLogo;
