import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface CognixLogoAnimatedProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  variant?: "default" | "monochrome";
  animate?: boolean;
}

const CognixLogoAnimated = ({ 
  className, 
  size = "md", 
  showText = true,
  variant = "default",
  animate = false
}: CognixLogoAnimatedProps) => {
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
      {/* Logo Mark */}
      <div className={cn("relative", sizeClasses[size])}>
        <svg
          viewBox="0 0 48 48"
          className="relative w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* First interlocking path */}
          <motion.path
            d="M24 8 C30 8 35 13 35 19 C35 22 33.5 24.5 31 26.5 L26 30 C24.5 31 24.5 32.5 26 33.5 L31 37 C33.5 39 30.5 42 27.5 40.5 L19 35 C16 33.5 14 30.5 14 27 C14 24 15.5 21.5 18 19.5 L23 15.5 C24.5 14.5 24.5 13 23 12 L18 8.5 C15.5 7 18.5 4 21 5.5 L24 7.5"
            stroke={variant === "monochrome" ? "currentColor" : "hsl(var(--foreground))"}
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            initial={animate ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
          
          {/* Second interlocking path */}
          <motion.path
            d="M24 40 C18 40 13 35 13 29 C13 26 14.5 23.5 17 21.5 L22 17.5 C23.5 16.5 23.5 15 22 14 L17 10.5 C14.5 9 17.5 6 20.5 7.5 L29 13 C32 14.5 34 17.5 34 21 C34 24 32.5 26.5 30 28.5 L25 32.5 C23.5 33.5 23.5 35 25 36 L30 39.5 C32.5 41 29.5 44 27 42.5 L24 40.5"
            stroke={variant === "monochrome" ? "currentColor" : "hsl(var(--primary))"}
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            initial={animate ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.3, ease: "easeInOut" }}
          />
        </svg>
      </div>

      {/* Logo Text */}
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

export default CognixLogoAnimated;
