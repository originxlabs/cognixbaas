import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  Shield,
  Lock,
  Key,
  UserCheck,
  Eye,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  FileKey,
  Users,
  Server,
  Fingerprint,
  ShieldAlert,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import EnterpriseHeader from '@/components/EnterpriseHeader';
import EnterpriseFooter from '@/components/EnterpriseFooter';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/ScrollReveal';

const securityFeatures = [
  {
    icon: Key,
    title: 'JWT Authentication',
    description: 'Industry-standard JWT tokens with refresh token rotation. Secure by default.',
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
  },
  {
    icon: UserCheck,
    title: 'Role-Based Access Control',
    description: 'Policy-based authorization at every endpoint. Define roles and permissions.',
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10',
  },
  {
    icon: Lock,
    title: 'No Public APIs by Default',
    description: 'Every endpoint requires explicit permission. Zero trust architecture.',
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
  },
  {
    icon: Eye,
    title: 'Human Approval Gates',
    description: 'No production deployment without human review. AI cannot bypass security.',
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
  },
  {
    icon: FileKey,
    title: 'Secrets Management',
    description: 'Secrets never stored in code. Environment-based configuration.',
    color: 'text-pink-500',
    bgColor: 'bg-pink-500/10',
  },
  {
    icon: Fingerprint,
    title: 'Input Validation',
    description: 'FluentValidation on all inputs. Sanitization and type safety.',
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-500/10',
  },
];

const securityPrinciples = [
  {
    title: 'Defense in Depth',
    description: 'Multiple layers of security controls throughout the stack.',
    icon: ShieldCheck,
  },
  {
    title: 'Least Privilege',
    description: 'Agents and users only get minimum required permissions.',
    icon: Users,
  },
  {
    title: 'Audit Trail',
    description: 'Every action is logged. Full traceability.',
    icon: Eye,
  },
  {
    title: 'Fail Secure',
    description: 'On error, default to deny. Never fail open.',
    icon: ShieldAlert,
  },
];

const Security = () => {
  return (
    <>
      <Helmet>
        <title>Security | COGNIX - Enterprise-Grade Security Model</title>
        <meta
          name="description"
          content="COGNIX security model: JWT authentication, RBAC, human approval gates, and secrets management. Security enforced by design."
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
                    <Shield className="w-3 h-3 mr-1" />
                    Security Model
                  </Badge>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-foreground mb-6">
                    Security
                    <br />
                    <span className="text-muted-foreground">by design.</span>
                  </h1>
                  <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                    AI agents cannot bypass security rules. Every decision point 
                    is gated by human approval.
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </section>

          {/* Security Features */}
          <section className="py-20 bg-card/30">
            <div className="container mx-auto px-4">
              <ScrollReveal>
                <div className="max-w-2xl mb-16">
                  <p className="text-sm font-medium text-primary mb-3">Security Features</p>
                  <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground mb-4">
                    Enterprise-grade security defaults.
                  </h2>
                  <p className="text-muted-foreground text-lg">
                    Every generated backend includes comprehensive security controls.
                  </p>
                </div>
              </ScrollReveal>

              <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {securityFeatures.map((feature) => (
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

          {/* Security Principles */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <ScrollReveal direction="left">
                  <div>
                    <p className="text-sm font-medium text-primary mb-3">Core Principles</p>
                    <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground mb-6">
                      Built on proven security principles.
                    </h2>
                    <p className="text-muted-foreground mb-8">
                      COGNIX follows industry best practices for secure software development.
                    </p>
                    <div className="space-y-4">
                      {securityPrinciples.map((principle) => (
                        <div key={principle.title} className="flex gap-4 items-start p-4 rounded-lg bg-card/50 border border-border">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                            <principle.icon className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium text-foreground">{principle.title}</h4>
                            <p className="text-sm text-muted-foreground">{principle.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>

                <ScrollReveal direction="right">
                  <Card className="bg-destructive/5 border-destructive/20">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-destructive">
                        <AlertTriangle className="w-5 h-5" />
                        AI Agent Restrictions
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        AI agents in COGNIX are explicitly prevented from:
                      </p>
                      <div className="space-y-3">
                        {[
                          'Deploying to production without human approval',
                          'Modifying security policies without review',
                          'Accessing secrets or credentials directly',
                          'Bypassing authentication requirements',
                          'Creating public endpoints without explicit permission',
                        ].map((restriction) => (
                          <div key={restriction} className="flex items-center gap-3">
                            <div className="w-5 h-5 rounded-full bg-destructive/10 flex items-center justify-center shrink-0">
                              <Lock className="w-3 h-3 text-destructive" />
                            </div>
                            <span className="text-sm text-foreground">{restriction}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </ScrollReveal>
              </div>
            </div>
          </section>

          {/* Approval Flow */}
          <section className="py-20 bg-card/30">
            <div className="container mx-auto px-4">
              <ScrollReveal>
                <div className="text-center mb-16">
                  <p className="text-sm font-medium text-primary mb-3">Approval Workflow</p>
                  <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground mb-4">
                    Human oversight at critical points.
                  </h2>
                </div>
              </ScrollReveal>

              <ScrollReveal>
                <div className="max-w-4xl mx-auto">
                  <div className="grid md:grid-cols-4 gap-4">
                    {[
                      { step: '01', title: 'Architecture Review', desc: 'Human approves system design' },
                      { step: '02', title: 'Security Validation', desc: 'Human reviews security policies' },
                      { step: '03', title: 'Code Review', desc: 'Human inspects generated code' },
                      { step: '04', title: 'Production Deploy', desc: 'Human approves go-live' },
                    ].map((item, index) => (
                      <div key={item.step} className="relative">
                        <Card className="bg-background/50 border-border text-center h-full">
                          <CardContent className="p-4">
                            <div className="text-2xl font-bold text-primary mb-2">{item.step}</div>
                            <h4 className="font-medium text-foreground text-sm mb-1">{item.title}</h4>
                            <p className="text-xs text-muted-foreground">{item.desc}</p>
                          </CardContent>
                        </Card>
                        {index < 3 && (
                          <div className="hidden md:block absolute top-1/2 -right-2 w-4 h-px bg-border" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </section>

          {/* CTA */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <ScrollReveal>
                <div className="max-w-3xl mx-auto text-center">
                  <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground mb-6">
                    Ready to get started?
                  </h2>
                  <p className="text-lg text-muted-foreground mb-8">
                    Experience enterprise-grade security with AI-assisted development.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button size="lg" className="h-12 px-8 bg-foreground text-background hover:bg-foreground/90 gap-2" asChild>
                      <Link to="/onboarding">
                        Request Access
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </Button>
                    <Button variant="outline" size="lg" className="h-12 px-8" asChild>
                      <Link to="/whitepaper">
                        Read Whitepaper
                      </Link>
                    </Button>
                  </div>
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

export default Security;
