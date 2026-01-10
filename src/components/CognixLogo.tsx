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
      {/* Logo Mark - Interlocking Monoline Symbol */}
      <div className={cn("relative", sizeClasses[size])}>
        {/* Main logo SVG - Inspired by the reference with interlocking flowing shape */}
        <svg
          viewBox="0 0 48 48"
          className="relative w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Single continuous interlocking path - abstract flowing shape */}
          <path
            d="M24 6
               L24 6
               C32 6 38 12 38 20
               L38 20
               C38 24 36 27 33 29
               L26 34
               C24 35.5 24 37 26 38
               L33 42
               C36 44 32 48 28 46
               L18 40
               C14 38 12 34 12 30
               L12 28
               C12 24 14 21 18 19
               L25 14
               C27 12.5 27 11 25 10
               L18 6
               C15 4 19 0 23 2
               L24 2.5"
            stroke={variant === "monochrome" ? "currentColor" : "hsl(var(--foreground))"}
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          
          {/* Second interlocking element - creates the woven effect */}
          <path
            d="M24 42
               L24 42
               C16 42 10 36 10 28
               L10 28
               C10 24 12 21 15 19
               L22 14
               C24 12.5 24 11 22 10
               L15 6
               C12 4 16 0 20 2
               L30 8
               C34 10 36 14 36 18
               L36 20
               C36 24 34 27 30 29
               L23 34
               C21 35.5 21 37 23 38
               L30 42
               C33 44 29 48 25 46
               L24 45.5"
            stroke={variant === "monochrome" ? "currentColor" : "hsl(var(--primary))"}
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      </div>

      {/* Logo Text - Custom Modern Sans-Serif Wordmark */}
      {showText && (
        <div className="flex flex-col">
          <span 
            className={cn(
              "font-bold tracking-[0.2em] text-foreground",
              textSizes[size]
            )}
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
          >
            COGNIX
          </span>
          <span 
            className={cn(
              "text-muted-foreground font-medium tracking-[0.25em] uppercase -mt-0.5",
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
