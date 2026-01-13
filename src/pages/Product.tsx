import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Layers,
  Code2,
  Shield,
  GitBranch,
  Zap,
  Users,
  Bot,
  Database,
  FileCode,
  CheckCircle2,
  ArrowRight,
  Terminal,
  Cpu,
  Server,
  Lock,
  FileText,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import EnterpriseHeader from '@/components/EnterpriseHeader';
import EnterpriseFooter from '@/components/EnterpriseFooter';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/ScrollReveal';

const features = [
  {
    icon: Layers,
    title: 'Modular Monolith Architecture',
    description: 'Clean separation of concerns with internal module boundaries. Start simple, scale when needed.',
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
  },
  {
    icon: Code2,
    title: 'Production-Ready Code',
    description: '.NET 8 with Clean Architecture patterns. Real code, not scaffolds.',
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10',
  },
  {
    icon: Shield,
    title: 'Security by Default',
    description: 'JWT auth, RBAC, and security policies baked into every endpoint.',
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
  },
  {
    icon: GitBranch,
    title: 'GitHub Integration',
    description: 'Bidirectional sync. Full history. Agent vs human changes labeled.',
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
  },
  {
    icon: Zap,
    title: 'Sandbox Deployment',
    description: 'Instant preview environments. Test safely before production.',
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-500/10',
  },
  {
    icon: Users,
    title: 'Human-in-the-Loop',
    description: 'AI accelerates. Humans decide. No code without review.',
    color: 'text-pink-500',
    bgColor: 'bg-pink-500/10',
  },
];

const capabilities = [
  {
    icon: Bot,
    title: '14 Specialized Agents',
    description: 'Each agent has a single responsibility with defined inputs/outputs.',
  },
  {
    icon: Database,
    title: 'Database Modeling',
    description: 'PostgreSQL with EF Core. Migrations included.',
  },
  {
    icon: FileCode,
    title: 'API Generation',
    description: 'REST APIs with OpenAPI 3.1 documentation.',
  },
  {
    icon: Terminal,
    title: 'BYOK LLM Support',
    description: 'Use your own OpenAI, Azure, or Anthropic keys.',
  },
];

const Product = () => {
  return (
    <>
      <Helmet>
        <title>Product | COGNIX - AI-Assisted Backend Engineering</title>
        <meta
          name="description"
          content="Explore COGNIX features: Modular Monolith architecture, 14 specialized AI agents, security by default, and human-in-the-loop control."
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <EnterpriseHeader />

        <main className="pt-24">
          {/* Hero */}
          <section className="py-20 relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.02]" style={{
              backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                               linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
              backgroundSize: '80px 80px'
            }} />
            
            <div className="container mx-auto px-4">
              <ScrollReveal>
                <div className="max-w-3xl mx-auto text-center">
                  <Badge variant="outline" className="mb-6">
                    <Cpu className="w-3 h-3 mr-1" />
                    Product Overview
                  </Badge>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-foreground mb-6">
                    Backend engineering,
                    <br />
                    <span className="text-muted-foreground">reimagined.</span>
                  </h1>
                  <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                    COGNIX combines specialized AI agents with human oversight to deliver 
                    production-ready backends at unprecedented speed.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button size="lg" className="h-12 px-6 bg-foreground text-background hover:bg-foreground/90 gap-2" asChild>
                      <Link to="/onboarding">
                        Request Access
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </Button>
                    <Button variant="outline" size="lg" className="h-12 px-6" asChild>
                      <Link to="/docs">
                        Read Documentation
                      </Link>
                    </Button>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </section>

          {/* Features Grid */}
          <section className="py-20 bg-card/30">
            <div className="container mx-auto px-4">
              <ScrollReveal>
                <div className="max-w-2xl mb-16">
                  <p className="text-sm font-medium text-primary mb-3">Core Features</p>
                  <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground mb-4">
                    Everything for enterprise backend development.
                  </h2>
                  <p className="text-muted-foreground text-lg">
                    Built on proven patterns. Secured by design. Controlled by humans.
                  </p>
                </div>
              </ScrollReveal>

              <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((feature) => (
                  <StaggerItem key={feature.title}>
                    <Card className="h-full bg-background/50 border-border hover:border-primary/30 transition-colors">
                      <CardContent className="p-6">
                        <div className={`w-12 h-12 rounded-xl ${feature.bgColor} flex items-center justify-center mb-4`}>
                          <feature.icon className={`w-6 h-6 ${feature.color}`} />
                        </div>
                        <h3 className="text-lg font-medium text-foreground mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {feature.description}
                        </p>
                      </CardContent>
                    </Card>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </section>

          {/* Capabilities */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <ScrollReveal direction="left">
                  <div>
                    <p className="text-sm font-medium text-primary mb-3">Capabilities</p>
                    <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground mb-6">
                      Built for real engineering teams.
                    </h2>
                    <div className="space-y-4">
                      {capabilities.map((cap) => (
                        <div key={cap.title} className="flex gap-4 items-start p-4 rounded-lg bg-card/50 border border-border">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                            <cap.icon className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium text-foreground">{cap.title}</h4>
                            <p className="text-sm text-muted-foreground">{cap.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>

                <ScrollReveal direction="right">
                  <Card className="bg-card/50 border-border p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-3 h-3 rounded-full bg-red-500/60" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                      <div className="w-3 h-3 rounded-full bg-green-500/60" />
                      <span className="ml-3 text-xs text-muted-foreground font-mono">cognix-workflow</span>
                    </div>
                    <div className="space-y-3 font-mono text-sm">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        <span className="text-muted-foreground">Requirements analyzed</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        <span className="text-muted-foreground">Tasks generated</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        <span className="text-muted-foreground">Architecture approved</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <motion.div
                          animate={{ opacity: [1, 0.5, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          className="w-4 h-4 rounded-full bg-primary flex items-center justify-center"
                        >
                          <div className="w-2 h-2 rounded-full bg-background" />
                        </motion.div>
                        <span className="text-foreground">Generating API endpoints...</span>
                      </div>
                      <div className="flex items-center gap-2 opacity-50">
                        <div className="w-4 h-4 rounded border border-border" />
                        <span className="text-muted-foreground">Security validation</span>
                      </div>
                      <div className="flex items-center gap-2 opacity-50">
                        <div className="w-4 h-4 rounded border border-border" />
                        <span className="text-muted-foreground">Sandbox deployment</span>
                      </div>
                    </div>
                  </Card>
                </ScrollReveal>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="py-20 bg-card/30">
            <div className="container mx-auto px-4">
              <ScrollReveal>
                <div className="max-w-3xl mx-auto text-center">
                  <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground mb-6">
                    Ready to transform your backend development?
                  </h2>
                  <p className="text-lg text-muted-foreground mb-8">
                    Join the private beta and experience AI-assisted backend engineering.
                  </p>
                  <Button size="lg" className="h-12 px-8 bg-foreground text-background hover:bg-foreground/90 gap-2" asChild>
                    <Link to="/onboarding">
                      Get Started
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </ScrollReveal>
            </div>
          </section>
        </main>

        <EnterpriseFooter />
      </div>
    </>
  );
};

export default Product;
