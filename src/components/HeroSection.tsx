import { ArrowRight, Sparkles, Zap, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import CognixLogo from './CognixLogo';
import ParticleBackground from './ParticleBackground';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-hero-glow opacity-60" />
      <ParticleBackground />
      
      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Floating orbs */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" 
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-float delay-1000" 
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-8"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">
              AI-Powered Backend-as-a-Service
            </span>
          </motion.div>

          {/* Logo */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex justify-center mb-8"
          >
            <CognixLogo size="xl" showText={false} />
          </motion.div>

          {/* Main Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black mb-6"
          >
            <span className="block text-foreground">Build Backends</span>
            <span className="block gradient-text">at the Speed of Thought</span>
          </motion.h1>

          {/* Tagline */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed"
          >
            Design, generate, deploy, and scale production-ready backend systems 
            with intelligent multi-agent workflows. From idea to live API in minutes.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Button variant="hero" size="xl" className="group" asChild>
              <a href="#waitlist">
                Join the Waitlist
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
            <Button variant="glass" size="xl" asChild>
              <a href="#features">
                Explore Features
              </a>
            </Button>
          </motion.div>

          {/* Stats/Trust Indicators */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="grid grid-cols-3 gap-8 max-w-2xl mx-auto"
          >
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Zap className="w-5 h-5 text-primary" />
                <span className="text-2xl font-bold text-foreground">10x</span>
              </div>
              <span className="text-sm text-muted-foreground">Faster Development</span>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Shield className="w-5 h-5 text-primary" />
                <span className="text-2xl font-bold text-foreground">100%</span>
              </div>
              <span className="text-sm text-muted-foreground">Production Ready</span>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-primary" />
                <span className="text-2xl font-bold text-foreground">8+</span>
              </div>
              <span className="text-sm text-muted-foreground">Specialized Agents</span>
            </div>
          </motion.div>
        </div>

        {/* Animated Code Preview */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-20 max-w-4xl mx-auto"
        >
          <div className="glass rounded-2xl p-1 glow-subtle">
            <div className="bg-card rounded-xl overflow-hidden">
              {/* Terminal Header */}
              <div className="flex items-center gap-2 px-4 py-3 bg-secondary/50 border-b border-border">
                <div className="w-3 h-3 rounded-full bg-destructive/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
                <span className="ml-4 text-xs text-muted-foreground font-mono">
                  cognix generate --project "ecommerce-api"
                </span>
              </div>
              
              {/* Terminal Content */}
              <div className="p-6 font-mono text-sm space-y-2">
                <div className="animate-code-line opacity-0" style={{ animationDelay: '0.5s' }}>
                  <span className="text-primary">→</span>
                  <span className="text-muted-foreground"> Analyzing requirements...</span>
                </div>
                <div className="animate-code-line opacity-0" style={{ animationDelay: '1s' }}>
                  <span className="text-green-400">✓</span>
                  <span className="text-foreground"> Architecture designed: </span>
                  <span className="text-accent">Clean Architecture + DDD</span>
                </div>
                <div className="animate-code-line opacity-0" style={{ animationDelay: '1.5s' }}>
                  <span className="text-green-400">✓</span>
                  <span className="text-foreground"> Generated: </span>
                  <span className="text-primary">12 API endpoints</span>
                  <span className="text-muted-foreground">, </span>
                  <span className="text-primary">8 database tables</span>
                </div>
                <div className="animate-code-line opacity-0" style={{ animationDelay: '2s' }}>
                  <span className="text-green-400">✓</span>
                  <span className="text-foreground"> Security configured: </span>
                  <span className="text-accent">JWT + RBAC</span>
                </div>
                <div className="animate-code-line opacity-0" style={{ animationDelay: '2.5s' }}>
                  <span className="text-green-400">✓</span>
                  <span className="text-foreground"> Deployed to: </span>
                  <span className="text-primary underline">https://api.myapp.cognix.dev</span>
                </div>
                <div className="animate-code-line opacity-0" style={{ animationDelay: '3s' }}>
                  <span className="text-primary animate-pulse">█</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
      >
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
          <div className="w-1.5 h-3 rounded-full bg-primary animate-pulse" />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
