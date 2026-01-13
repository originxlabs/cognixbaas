import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const EnterpriseHero = () => {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center pt-20 pb-16">
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }}
      />

      {/* Subtle gradient orb */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/[0.03] rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Announcement */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <span className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground bg-secondary/50 px-3 py-1.5 rounded-full border border-border/50">
              <span className="w-1.5 h-1.5 bg-primary rounded-full" />
              Now in Private Beta
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-center text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-foreground leading-[1.1] mb-6"
          >
            AI-assisted backend engineering
            <br />
            <span className="text-muted-foreground">— built for real systems.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Production-ready backend infrastructure with intelligent agent workflows. 
            Human oversight at every step. Enterprise-grade by default.
          </motion.p>

          {/* CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-3 justify-center mb-16"
          >
            <Button 
              size="lg" 
              className="h-12 px-6 text-sm font-medium bg-foreground text-background hover:bg-foreground/90 gap-2"
              asChild
            >
              <Link to="/onboarding">
                Request Access
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="h-12 px-6 text-sm font-medium border-border hover:bg-secondary/50"
              asChild
            >
              <Link to="/docs">
                Read Documentation
              </Link>
            </Button>
          </motion.div>

          {/* Architecture Animation */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="relative"
          >
            <div className="bg-card/50 border border-border rounded-xl p-6 md:p-8">
              {/* Terminal header */}
              <div className="flex items-center gap-2 mb-6">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
                <span className="ml-3 text-xs text-muted-foreground font-mono">cognix-pipeline</span>
              </div>

              {/* Architecture visualization */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {[
                  { label: 'Requirements', sublabel: 'Natural Language' },
                  { label: 'Analysis', sublabel: 'AI Agents' },
                  { label: 'Architecture', sublabel: 'Human Review' },
                  { label: 'Generation', sublabel: 'Code + Tests' },
                  { label: 'Deployment', sublabel: 'Sandbox → Prod' },
                ].map((step, index) => (
                  <motion.div
                    key={step.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                    className="relative"
                  >
                    <div className="bg-secondary/30 border border-border/50 rounded-lg p-4 text-center h-full">
                      <div className="text-xs font-mono text-primary mb-1">0{index + 1}</div>
                      <div className="text-sm font-medium text-foreground">{step.label}</div>
                      <div className="text-xs text-muted-foreground mt-1">{step.sublabel}</div>
                    </div>
                    {index < 4 && (
                      <div className="hidden md:block absolute top-1/2 -right-2 w-4 h-px bg-border" />
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Code preview */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.1 }}
                className="mt-6 bg-background/50 rounded-lg p-4 font-mono text-xs overflow-x-auto"
              >
                <div className="flex items-center gap-3 text-muted-foreground">
                  <span className="text-primary">$</span>
                  <span>cognix generate</span>
                  <span className="text-muted-foreground/50">--prompt</span>
                  <span className="text-foreground">"E-commerce API with auth, products, orders"</span>
                </div>
                <div className="mt-2 text-muted-foreground">
                  <span className="text-green-500">✓</span> 14 agents initialized
                  <span className="mx-2">·</span>
                  <span className="text-green-500">✓</span> Architecture approved
                  <span className="mx-2">·</span>
                  <span className="text-green-500">✓</span> 47 endpoints generated
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EnterpriseHero;
