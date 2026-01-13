import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import cognixLogoSvg from "@/assets/cognix-logo.svg";

interface CognixLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  variant?: "default" | "monochrome";
}

const CognixLogo = forwardRef<HTMLDivElement, CognixLogoProps>(({ 
  className, 
  size = "md", 
  showText = true,
  variant = "default"
}, ref) => {
  const sizeClasses = {
    sm: "w-8 h-6",
    md: "w-12 h-8",
    lg: "w-16 h-11",
    xl: "w-24 h-16",
  };

  const textSizes = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-xl",
    xl: "text-3xl",
  };

  const subtextSizes = {
    sm: "text-[7px]",
    md: "text-[8px]",
    lg: "text-[10px]",
    xl: "text-xs",
  };

  return (
    <div ref={ref} className={cn("flex items-center gap-2.5", className)}>
      {/* Logo Image */}
      <div className={cn("relative flex-shrink-0", sizeClasses[size])}>
        <img 
          src={cognixLogoSvg} 
          alt="Cognix Logo" 
          className="w-full h-full object-contain"
        />
      </div>

      {/* Logo Text */}
      {showText && (
        <div className="flex flex-col">
          <span 
            className={cn(
              "font-bold tracking-[0.15em] text-foreground leading-tight",
              textSizes[size]
            )}
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
          >
            COGNIX
          </span>
          <span 
            className={cn(
              "text-muted-foreground font-medium tracking-[0.2em] uppercase leading-tight",
              subtextSizes[size]
            )}
          >
            by CROPXON
          </span>
        </div>
      )}
    </div>
  );
});

CognixLogo.displayName = "CognixLogo";

export default CognixLogo;
