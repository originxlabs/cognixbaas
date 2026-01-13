import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import cognixLogo from "@/assets/cognix-logo.svg";

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 100),     // Start logo build
      setTimeout(() => setPhase(2), 800),     // Logo layers animate
      setTimeout(() => setPhase(3), 1600),    // Logo complete, start text
      setTimeout(() => setPhase(4), 2600),    // Tagline
      setTimeout(() => setPhase(5), 3400),    // Powered by
      setTimeout(() => onComplete(), 4200),   // Complete
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      {/* Subtle geometric pattern - theme aware */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, hsl(var(--foreground)) 1px, transparent 1px),
              linear-gradient(to bottom, hsl(var(--foreground)) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      {/* Animated glow orbs - theme aware */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full blur-3xl"
        style={{
          background: 'radial-gradient(circle, hsl(var(--primary) / 0.15) 0%, transparent 70%)'
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: phase >= 1 ? 1.5 : 0, 
          opacity: phase >= 1 ? 1 : 0 
        }}
        transition={{ duration: 2, ease: "easeOut" }}
      />

      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full blur-3xl"
        style={{
          background: 'radial-gradient(circle, hsl(var(--accent) / 0.1) 0%, transparent 70%)'
        }}
        initial={{ scale: 0, opacity: 0, x: 150, y: -80 }}
        animate={{ 
          scale: phase >= 2 ? 1.2 : 0, 
          opacity: phase >= 2 ? 1 : 0,
          x: 150,
          y: -80
        }}
        transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
      />

      <div className="relative flex flex-col items-center">
        {/* Logo Container with Layer Animation */}
        <motion.div 
          className="relative w-56 h-36 mb-10 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {/* Logo with progressive reveal */}
          <motion.div
            className="relative w-full h-full flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.7, rotateY: -30 }}
            animate={{ 
              opacity: phase >= 1 ? 1 : 0,
              scale: phase >= 2 ? 1 : 0.85,
              rotateY: phase >= 2 ? 0 : -15
            }}
            transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <img 
              src={cognixLogo} 
              alt="Cognix Logo" 
              className="w-full h-full object-contain"
              style={{ 
                filter: `drop-shadow(0 8px 32px hsl(var(--primary) / 0.25))`
              }}
            />
          </motion.div>

          {/* Pulse ring effect */}
          <motion.div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              border: '2px solid hsl(var(--primary) / 0.3)'
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: phase >= 2 ? [0, 0.5, 0] : 0,
              scale: phase >= 2 ? [0.9, 1.3, 1.5] : 0.8
            }}
            transition={{ 
              duration: 1.2, 
              delay: 0.5,
              ease: "easeOut"
            }}
          />

          {/* Shimmer sweep */}
          <motion.div
            className="absolute inset-0 pointer-events-none rounded-2xl overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase >= 2 ? 1 : 0 }}
          >
            <motion.div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(110deg, transparent 20%, hsl(var(--primary) / 0.2) 50%, transparent 80%)',
              }}
              initial={{ x: '-150%' }}
              animate={{ 
                x: phase >= 2 ? '150%' : '-150%'
              }}
              transition={{ duration: 1, delay: 0.8, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>

        {/* Typography - COGNIX with staggered letter animation */}
        <div className="text-center overflow-hidden">
          <motion.h1 
            className="text-5xl md:text-7xl font-bold tracking-[0.2em] text-foreground mb-4"
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
          >
            {"COGNIX".split("").map((letter, i) => (
              <motion.span
                key={i}
                className="inline-block"
                initial={{ opacity: 0, y: 50, rotateX: -90 }}
                animate={{ 
                  opacity: phase >= 3 ? 1 : 0,
                  y: phase >= 3 ? 0 : 50,
                  rotateX: phase >= 3 ? 0 : -90
                }}
                transition={{ 
                  duration: 0.5, 
                  delay: phase >= 3 ? i * 0.06 : 0,
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
          initial={{ opacity: 0, y: 25 }}
          animate={{ 
            opacity: phase >= 4 ? 1 : 0,
            y: phase >= 4 ? 0 : 25
          }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <p className="text-sm md:text-base text-muted-foreground tracking-[0.2em] uppercase font-medium">
            AI Intelligence Backend as a Service
          </p>
        </motion.div>

        {/* Separator line with glow */}
        <motion.div
          className="relative w-20 h-px mt-10 mb-6"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ 
            scaleX: phase >= 5 ? 1 : 0,
            opacity: phase >= 5 ? 1 : 0
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary to-transparent" />
          <div 
            className="absolute inset-0 blur-sm" 
            style={{ background: 'linear-gradient(to right, transparent, hsl(var(--primary)), transparent)' }}
          />
        </motion.div>

        {/* Powered by */}
        <motion.div
          className="flex flex-col items-center gap-1.5"
          initial={{ opacity: 0, y: 15 }}
          animate={{ 
            opacity: phase >= 5 ? 1 : 0,
            y: phase >= 5 ? 0 : 15
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="text-[10px] text-muted-foreground/50 uppercase tracking-[0.3em]">Powered by</span>
          <span className="text-xs font-semibold text-foreground/70 tracking-wider">Cropxon Innovations Pvt. Ltd.</span>
        </motion.div>

        {/* Loading indicator - animated bars */}
        <motion.div
          className="mt-16 flex gap-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: phase >= 1 ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        >
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              className="w-1 bg-primary rounded-full"
              animate={{
                height: [12, 24, 12],
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.1,
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
