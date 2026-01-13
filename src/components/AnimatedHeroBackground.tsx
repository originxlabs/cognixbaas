import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, animate } from "framer-motion";

interface Block {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  delay: number;
  type: 'module' | 'api' | 'database' | 'service';
}

interface Connection {
  id: number;
  from: { x: number; y: number };
  to: { x: number; y: number };
  delay: number;
}

const AnimatedHeroBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const [isPaused, setIsPaused] = useState(false);
  
  // Pause animation on scroll
  const opacity = useTransform(scrollY, [0, 300], [1, 0.3]);
  
  useEffect(() => {
    const unsubscribe = scrollY.on('change', (latest) => {
      setIsPaused(latest > 50);
    });
    return () => unsubscribe();
  }, [scrollY]);

  // Generate geometric blocks representing backend architecture
  const blocks: Block[] = [
    // Core modules
    { id: 1, x: 15, y: 20, width: 120, height: 80, delay: 0, type: 'module' },
    { id: 2, x: 65, y: 15, width: 100, height: 60, delay: 0.3, type: 'api' },
    { id: 3, x: 35, y: 60, width: 140, height: 70, delay: 0.6, type: 'database' },
    { id: 4, x: 75, y: 55, width: 110, height: 90, delay: 0.9, type: 'service' },
    // Secondary modules
    { id: 5, x: 10, y: 45, width: 80, height: 50, delay: 1.2, type: 'module' },
    { id: 6, x: 85, y: 35, width: 90, height: 60, delay: 1.5, type: 'api' },
    { id: 7, x: 50, y: 75, width: 100, height: 55, delay: 1.8, type: 'service' },
    { id: 8, x: 25, y: 30, width: 70, height: 45, delay: 2.1, type: 'database' },
  ];

  // API signal flow connections
  const connections: Connection[] = [
    { id: 1, from: { x: 20, y: 30 }, to: { x: 45, y: 45 }, delay: 2.5 },
    { id: 2, from: { x: 45, y: 45 }, to: { x: 70, y: 35 }, delay: 2.8 },
    { id: 3, from: { x: 70, y: 35 }, to: { x: 85, y: 60 }, delay: 3.1 },
    { id: 4, from: { x: 30, y: 55 }, to: { x: 55, y: 70 }, delay: 3.4 },
    { id: 5, from: { x: 55, y: 70 }, to: { x: 80, y: 55 }, delay: 3.7 },
  ];

  const getBlockColor = (type: Block['type']) => {
    switch (type) {
      case 'module': return 'hsl(var(--primary) / 0.08)';
      case 'api': return 'hsl(var(--accent) / 0.06)';
      case 'database': return 'hsl(var(--muted-foreground) / 0.05)';
      case 'service': return 'hsl(var(--primary) / 0.05)';
      default: return 'hsl(var(--primary) / 0.05)';
    }
  };

  const getBlockBorder = (type: Block['type']) => {
    switch (type) {
      case 'module': return 'hsl(var(--primary) / 0.15)';
      case 'api': return 'hsl(var(--accent) / 0.12)';
      case 'database': return 'hsl(var(--muted-foreground) / 0.1)';
      case 'service': return 'hsl(var(--primary) / 0.1)';
      default: return 'hsl(var(--primary) / 0.1)';
    }
  };

  return (
    <motion.div 
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ opacity }}
    >
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Geometric blocks - Backend architecture visualization */}
      <svg 
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Gradient for signal flow */}
          <linearGradient id="signalGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0" />
            <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.6" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Render blocks */}
        {blocks.map((block) => (
          <motion.g key={block.id}>
            <motion.rect
              x={`${block.x}%`}
              y={`${block.y}%`}
              width={block.width}
              height={block.height}
              rx="4"
              fill={getBlockColor(block.type)}
              stroke={getBlockBorder(block.type)}
              strokeWidth="0.5"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={!isPaused ? { 
                opacity: [0, 1, 1],
                scale: [0.8, 1, 1],
              } : { opacity: 1, scale: 1 }}
              transition={{
                duration: 2,
                delay: block.delay,
                ease: "easeOut",
                repeat: isPaused ? 0 : Infinity,
                repeatDelay: 8,
              }}
            />
          </motion.g>
        ))}

        {/* API Signal flow lines */}
        {connections.map((conn) => (
          <motion.line
            key={conn.id}
            x1={`${conn.from.x}%`}
            y1={`${conn.from.y}%`}
            x2={`${conn.to.x}%`}
            y2={`${conn.to.y}%`}
            stroke="url(#signalGradient)"
            strokeWidth="0.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={!isPaused ? {
              pathLength: [0, 1],
              opacity: [0, 0.5, 0],
            } : { pathLength: 1, opacity: 0.2 }}
            transition={{
              duration: 2,
              delay: conn.delay,
              ease: "easeInOut",
              repeat: isPaused ? 0 : Infinity,
              repeatDelay: 6,
            }}
          />
        ))}

        {/* Node indicators */}
        {connections.map((conn) => (
          <motion.circle
            key={`node-${conn.id}`}
            cx={`${conn.to.x}%`}
            cy={`${conn.to.y}%`}
            r="2"
            fill="hsl(var(--primary))"
            initial={{ scale: 0, opacity: 0 }}
            animate={!isPaused ? {
              scale: [0, 1.2, 1],
              opacity: [0, 0.8, 0.4],
            } : { scale: 1, opacity: 0.3 }}
            transition={{
              duration: 1.5,
              delay: conn.delay + 1,
              ease: "easeOut",
              repeat: isPaused ? 0 : Infinity,
              repeatDelay: 6.5,
            }}
          />
        ))}
      </svg>

      {/* Subtle radial glow */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] opacity-30"
        style={{
          background: 'radial-gradient(ellipse at center, hsl(var(--primary) / 0.05) 0%, transparent 70%)'
        }}
      />
    </motion.div>
  );
};

export default AnimatedHeroBackground;
