import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import cognixLogo from "@/assets/cognix-logo.svg";

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 200),    // Start logo animation
      setTimeout(() => setPhase(2), 1500),   // Logo complete, start text
      setTimeout(() => setPhase(3), 2800),   // Subtext
      setTimeout(() => setPhase(4), 3800),   // Powered by
      setTimeout(() => onComplete(), 4800),  // Complete
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      {/* Subtle dot pattern - theme aware */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--foreground)) 1px, transparent 0)`,
            backgroundSize: '48px 48px'
          }}
        />
      </div>

      {/* Animated glow background - theme aware */}
      <motion.div
        className="absolute w-[700px] h-[700px] rounded-full"
        style={{
          background: 'radial-gradient(circle, hsl(var(--primary) / 0.12) 0%, hsl(var(--primary) / 0.03) 40%, transparent 70%)'
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: phase >= 1 ? 1.8 : 0, 
          opacity: phase >= 1 ? 1 : 0 
        }}
        transition={{ duration: 2.5, ease: "easeOut" }}
      />

      {/* Secondary accent glow */}
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full"
        style={{
          background: 'radial-gradient(circle, hsl(var(--accent) / 0.08) 0%, transparent 60%)'
        }}
        initial={{ scale: 0, opacity: 0, x: 100, y: -50 }}
        animate={{ 
          scale: phase >= 2 ? 1.5 : 0, 
          opacity: phase >= 2 ? 1 : 0,
          x: 100,
          y: -50
        }}
        transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
      />

      <div className="relative flex flex-col items-center">
        {/* Logo Container with SVG */}
        <motion.div 
          className="relative w-48 h-32 mb-8 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: phase >= 1 ? 1 : 0,
            scale: phase >= 1 ? 1 : 0.8
          }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Reveal mask animation */}
          <motion.div
            className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-xl"
            initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
            animate={{ 
              clipPath: phase >= 1 ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)"
            }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.65, 0, 0.35, 1] }}
          >
            <img 
              src={cognixLogo} 
              alt="Cognix Logo" 
              className="w-full h-full object-contain drop-shadow-lg"
              style={{ 
                filter: 'drop-shadow(0 4px 20px hsl(var(--primary) / 0.15))'
              }}
            />
          </motion.div>

          {/* Shimmer effect */}
          <motion.div
            className="absolute inset-0 pointer-events-none rounded-xl overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase >= 1 ? 1 : 0 }}
          >
            <motion.div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, hsl(var(--primary) / 0.15) 50%, transparent 100%)',
                transform: 'skewX(-20deg)'
              }}
              initial={{ x: '-200%' }}
              animate={{ 
                x: phase >= 1 ? '200%' : '-200%'
              }}
              transition={{ duration: 1.5, delay: 1, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>

        {/* Typography - COGNIX with letter animation */}
        <div className="text-center overflow-hidden">
          <motion.h1 
            className="text-5xl md:text-7xl font-bold tracking-[0.25em] text-foreground mb-3"
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
          >
            {"COGNIX".split("").map((letter, i) => (
              <motion.span
                key={i}
                className="inline-block"
                initial={{ opacity: 0, y: 40, rotateX: -90 }}
                animate={{ 
                  opacity: phase >= 2 ? 1 : 0,
                  y: phase >= 2 ? 0 : 40,
                  rotateX: phase >= 2 ? 0 : -90
                }}
                transition={{ 
                  duration: 0.6, 
                  delay: phase >= 2 ? i * 0.08 : 0,
                  ease: [0.22, 1, 0.36, 1]
                }}
              >
                {letter}
              </motion.span>
            ))}
          </motion.h1>
        </div>

        {/* Tagline - AI Intelligence Backend as a Service */}
        <motion.div
          className="text-center overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: phase >= 3 ? 1 : 0,
            y: phase >= 3 ? 0 : 20
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="text-base md:text-lg text-muted-foreground tracking-[0.15em] uppercase font-medium">
            AI Intelligence Backend as a Service
          </p>
        </motion.div>

        {/* Separator line */}
        <motion.div
          className="w-16 h-px bg-border mt-8 mb-6"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ 
            scaleX: phase >= 4 ? 1 : 0,
            opacity: phase >= 4 ? 1 : 0
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />

        {/* Powered by */}
        <motion.div
          className="flex flex-col items-center gap-1"
          initial={{ opacity: 0, y: 10 }}
          animate={{ 
            opacity: phase >= 4 ? 1 : 0,
            y: phase >= 4 ? 0 : 10
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="text-xs text-muted-foreground/60 uppercase tracking-widest">Powered by</span>
          <span className="text-sm font-semibold text-foreground/80 tracking-wide">Cropxon Innovations Pvt. Ltd.</span>
        </motion.div>

        {/* Loading dots */}
        <motion.div
          className="mt-14 flex gap-1.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: phase >= 1 ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-primary"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.15,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SplashScreen;
