import { motion, useReducedMotion } from "framer-motion";
import { ReactNode, useRef } from "react";
import { useTheme } from "@/components/ThemeProvider";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  duration?: number;
}

// Get motion intensity based on theme - Apple-style subtle animations
const useMotionIntensity = () => {
  const { theme } = useTheme();
  switch (theme) {
    case 'light':
      return 0.7;
    case 'dark':
      return 1;
    case 'midnight':
      return 0.9;
    case 'forest':
      return 0.8;
    default:
      return 1;
  }
};

const getDirectionVariants = (intensity: number) => ({
  up: { y: 30 * intensity, x: 0 },
  down: { y: -30 * intensity, x: 0 },
  left: { y: 0, x: 30 * intensity },
  right: { y: 0, x: -30 * intensity },
  none: { y: 0, x: 0 },
});

export const ScrollReveal = ({
  children,
  className = "",
  delay = 0,
  direction = "up",
  duration = 0.6,
}: ScrollRevealProps) => {
  const prefersReducedMotion = useReducedMotion();
  const intensity = useMotionIntensity();
  const directionVariants = getDirectionVariants(intensity);

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        ...directionVariants[direction],
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        x: 0,
      }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: duration * intensity,
        delay,
        ease: [0.25, 0.4, 0.25, 1], // Apple-style easing
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Stagger container - renamed for consistency
export const StaggerContainer = ({
  children,
  className = "",
  staggerDelay = 0.08,
}: {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}) => {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const StaggerItem = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => {
  const intensity = useMotionIntensity();
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 * intensity },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            ease: [0.25, 0.4, 0.25, 1],
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Legacy exports for backward compatibility
export const ScrollRevealContainer = StaggerContainer;
export const ScrollRevealItem = StaggerItem;
