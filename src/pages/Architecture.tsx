import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Layers,
  Box,
  Database,
  Server,
  GitBranch,
  Shield,
  Workflow,
  ArrowRight,
  CheckCircle2,
  Cpu,
  Code2,
  FileCode,
  Boxes,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import EnterpriseHeader from '@/components/EnterpriseHeader';
import EnterpriseFooter from '@/components/EnterpriseFooter';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/ScrollReveal';

const architectureLayers = [
  {
    name: 'Presentation Layer',
    icon: FileCode,
    description: 'REST APIs with OpenAPI 3.1',
    components: ['Controllers', 'DTOs', 'Validation', 'Swagger UI'],
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
  },
  {
    name: 'Application Layer',
    icon: Workflow,
    description: 'Business logic orchestration',
    components: ['Use Cases', 'Services', 'Mappers', 'Handlers'],
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10',
  },
  {
    name: 'Domain Layer',
    icon: Boxes,
    description: 'Core business entities',
    components: ['Entities', 'Value Objects', 'Aggregates', 'Domain Events'],
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
  },
  {
    name: 'Infrastructure Layer',
    icon: Database,
    description: 'External concerns',
    components: ['Repositories', 'EF Core', 'External APIs', 'Logging'],
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
  },
];

const techStack = [
  { name: 'Backend', value: '.NET 8 (LTS)', icon: Server },
  { name: 'API Style', value: 'REST', icon: Code2 },
  { name: 'Documentation', value: 'OpenAPI 3.1', icon: FileCode },
  { name: 'Database', value: 'PostgreSQL', icon: Database },
  { name: 'ORM', value: 'EF Core', icon: Boxes },
  { name: 'Auth', value: 'JWT + Refresh', icon: Shield },
];

const Architecture = () => {
  return (
    <>
      <Helmet>
        <title>Architecture | COGNIX - Modular Monolith Design</title>
        <meta
          name="description"
          content="Learn about COGNIX's Modular Monolith architecture. Clean Architecture patterns, .NET 8 backend, and enterprise-grade design."
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
                    <Layers className="w-3 h-3 mr-1" />
                    System Design
                  </Badge>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-foreground mb-6">
                    Modular Monolith
                    <br />
                    <span className="text-muted-foreground">architecture.</span>
                  </h1>
                  <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                    Start with a single deployable unit. Migrate to microservices 
                    when you need to, not before.
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </section>

          {/* Architecture Layers */}
          <section className="py-20 bg-card/30">
            <div className="container mx-auto px-4">
              <ScrollReveal>
                <div className="max-w-2xl mb-16">
                  <p className="text-sm font-medium text-primary mb-3">Clean Architecture</p>
                  <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground mb-4">
                    Four layers of separation.
                  </h2>
                  <p className="text-muted-foreground text-lg">
                    Each layer has clear responsibilities and dependencies flow inward.
                  </p>
                </div>
              </ScrollReveal>

              <div className="grid md:grid-cols-2 gap-6">
                {architectureLayers.map((layer, index) => (
                  <ScrollReveal key={layer.name} delay={index * 0.1}>
                    <Card className="h-full bg-background/50 border-border hover:border-primary/30 transition-all">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className={`w-12 h-12 rounded-xl ${layer.bgColor} flex items-center justify-center shrink-0`}>
                            <layer.icon className={`w-6 h-6 ${layer.color}`} />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-medium text-foreground mb-1">
                              {layer.name}
                            </h3>
                            <p className="text-sm text-muted-foreground mb-4">
                              {layer.description}
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {layer.components.map((comp) => (
                                <Badge key={comp} variant="secondary" className="text-xs">
                                  {comp}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </section>

          {/* Module Structure */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <ScrollReveal direction="left">
                  <div>
                    <p className="text-sm font-medium text-primary mb-3">Module Design</p>
                    <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground mb-6">
                      Strong internal boundaries.
                    </h2>
                    <p className="text-muted-foreground mb-6">
                      Each module owns its domain, data, and APIs. Communication happens through 
                      well-defined contracts, making future microservices extraction trivial.
                    </p>
                    <div className="space-y-3">
                      {[
                        'Domain-driven module structure',
                        'Clear API contracts between modules',
                        'Independent database schemas per module',
                        'Event-driven communication patterns',
                      ].map((item) => (
                        <div key={item} className="flex items-center gap-3">
                          <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                          <span className="text-foreground">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>

                <ScrollReveal direction="right">
                  <Card className="bg-card/50 border-border overflow-hidden">
                    <CardHeader className="bg-secondary/30 border-b border-border py-3">
                      <div className="flex items-center gap-2">
                        <Box className="w-4 h-4 text-primary" />
                        <span className="font-mono text-sm">project-structure</span>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 font-mono text-sm">
                      <div className="space-y-1">
                        <div className="text-muted-foreground">src/</div>
                        <div className="pl-4 text-muted-foreground">├── Modules/</div>
                        <div className="pl-8 text-foreground">│   ├── <span className="text-primary">Auth</span>/</div>
                        <div className="pl-8 text-foreground">│   ├── <span className="text-primary">Products</span>/</div>
                        <div className="pl-8 text-foreground">│   ├── <span className="text-primary">Orders</span>/</div>
                        <div className="pl-8 text-foreground">│   └── <span className="text-primary">Payments</span>/</div>
                        <div className="pl-4 text-muted-foreground">├── Shared/</div>
                        <div className="pl-8 text-muted-foreground">│   ├── Infrastructure/</div>
                        <div className="pl-8 text-muted-foreground">│   └── Kernel/</div>
                        <div className="pl-4 text-muted-foreground">└── API/</div>
                        <div className="pl-8 text-muted-foreground">    └── Program.cs</div>
                      </div>
                    </CardContent>
                  </Card>
                </ScrollReveal>
              </div>
            </div>
          </section>

          {/* Tech Stack */}
          <section className="py-20 bg-card/30">
            <div className="container mx-auto px-4">
              <ScrollReveal>
                <div className="text-center mb-16">
                  <p className="text-sm font-medium text-primary mb-3">Technology Stack</p>
                  <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground mb-4">
                    Enterprise-safe defaults.
                  </h2>
                  <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    All defaults are opinionated and production-ready.
                  </p>
                </div>
              </ScrollReveal>

              <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {techStack.map((tech) => (
                  <StaggerItem key={tech.name}>
                    <Card className="bg-background/50 border-border text-center h-full hover:border-primary/30 transition-colors">
                      <CardContent className="p-4">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3">
                          <tech.icon className="w-5 h-5 text-primary" />
                        </div>
                        <div className="text-xs text-muted-foreground mb-1">{tech.name}</div>
                        <div className="text-sm font-medium text-foreground">{tech.value}</div>
                      </CardContent>
                    </Card>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </section>

          {/* CTA */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <ScrollReveal>
                <div className="max-w-3xl mx-auto text-center">
                  <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground mb-6">
                    Explore the security model.
                  </h2>
                  <p className="text-lg text-muted-foreground mb-8">
                    See how COGNIX enforces security at every layer.
                  </p>
                  <Button size="lg" className="h-12 px-8 bg-foreground text-background hover:bg-foreground/90 gap-2" asChild>
                    <Link to="/security">
                      View Security
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

export default Architecture;
