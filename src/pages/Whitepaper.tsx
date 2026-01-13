import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import {
  FileText,
  Download,
  ChevronDown,
  ChevronRight,
  Clock,
  User,
  Building2,
  Mail,
  Phone,
  Check,
  Eye,
  BookOpen,
  Layers,
  Shield,
  GitBranch,
  Cpu,
  Rocket,
  Users,
  Lock,
  Code2,
  Database,
  Globe,
  Zap,
  Target,
  AlertTriangle,
  Bot,
  Server,
  FileCode,
  Terminal,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';

interface WhitepaperSection {
  id: string;
  title: string;
  icon: React.ElementType;
  content: React.ReactNode;
}

interface Whitepaper {
  id: string;
  version: string;
  title: string;
  subtitle: string;
  author: string;
  status: 'preview' | 'published' | 'draft';
  date: string;
  sections: WhitepaperSection[];
}

const whitepapers: Whitepaper[] = [
  {
    id: 'cognix-v1',
    version: '1.0.0',
    title: 'COGNIX v1.0.0',
    subtitle: 'An AI-Assisted Backend Engineering Platform with Human Control',
    author: 'Abhishek Panda (Founder of Cropxon)',
    status: 'preview',
    date: 'January 13, 2026',
    sections: [
      {
        id: 'executive-summary',
        title: '1. Executive Summary',
        icon: Target,
        content: (
          <div className="space-y-4">
            <p>
              Backend engineering remains one of the most expensive, time-consuming, and risk-sensitive parts of software development. While recent AI tools demonstrate impressive code generation capabilities, they fail to meet enterprise expectations around architecture, security, auditability, and production safety.
            </p>
            <p>
              <strong>COGNIX</strong> introduces a new category: <em>AI-assisted backend engineering</em>, where AI accelerates development while humans retain architectural authority and production control.
            </p>
            <p>COGNIX v1.0.0 delivers a production-grade backend generation workflow based on:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Deterministic, step-driven execution</li>
              <li>Specialized AI agents with scoped responsibilities</li>
              <li>Mandatory human approval gates</li>
              <li>Enterprise-grade defaults</li>
              <li>GitHub as the system of record</li>
            </ul>
            <p className="text-primary font-medium">
              The result is faster backend delivery without sacrificing trust, security, or maintainability.
            </p>
          </div>
        ),
      },
      {
        id: 'problem',
        title: '2. The Problem',
        icon: AlertTriangle,
        content: (
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold mb-3">2.1 Backend Development Today</h4>
              <p className="mb-3">Modern backend systems require:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Secure authentication & authorization</li>
                <li>Correct API design</li>
                <li>Consistent architecture</li>
                <li>Reliable database modeling</li>
                <li>Documentation & testing</li>
                <li>Safe deployments</li>
              </ul>
              <p className="mt-3">These are: <strong>Repetitive</strong>, <strong>Error-prone</strong>, <strong>Expensive</strong>, and <strong>Difficult to automate safely</strong>.</p>
            </div>
            <Separator />
            <div>
              <h4 className="font-semibold mb-3">2.2 Why Existing AI Tools Fail</h4>
              <p className="mb-3">Most AI coding tools:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Use a single, general-purpose AI</li>
                <li>Generate code without enforcing architecture</li>
                <li>Skip design reviews</li>
                <li>Bypass security defaults</li>
                <li>Allow direct production changes</li>
              </ul>
              <p className="mt-3">This creates: <span className="text-destructive font-medium">Fragile systems, Security risks, Enterprise distrust</span></p>
            </div>
            <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
              <p className="font-medium text-primary">
                Conclusion: AI can assist backend engineering — but it cannot replace engineering discipline.
              </p>
            </div>
          </div>
        ),
      },
      {
        id: 'philosophy',
        title: '3. Cognix Philosophy',
        icon: Layers,
        content: (
          <div className="space-y-6">
            <p>COGNIX is built on three foundational principles:</p>
            <div className="grid gap-4">
              {[
                { title: '3.1 AI Assists, Humans Decide', desc: 'AI accelerates analysis and generation, but humans approve architecture and production deployments.' },
                { title: '3.2 Structure Before Code', desc: 'No code is generated until: Requirements are clarified, Tasks are defined, Architecture is approved.' },
                { title: '3.3 Transparency Over Magic', desc: 'Every step is visible: Tasks, Agents, Decisions, Changes, Deployments.' },
              ].map((item, i) => (
                <div key={i} className="p-4 bg-secondary/30 rounded-lg border border-border">
                  <h4 className="font-semibold mb-2">{item.title}</h4>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
            <p className="font-medium">
              COGNIX treats backend creation as an <span className="text-primary">engineering workflow</span>, not a conversation.
            </p>
          </div>
        ),
      },
      {
        id: 'system-overview',
        title: '4. System Overview',
        icon: Server,
        content: (
          <div className="space-y-4">
            <p>COGNIX is a <strong>Backend Engineering Operating System</strong>, composed of:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>A guided onboarding and dashboard UI</li>
              <li>A task-driven execution engine</li>
              <li>A set of specialized AI agents</li>
              <li>A sandbox-first deployment model</li>
              <li>GitHub-centric source control</li>
              <li>Human-in-the-loop approval gates</li>
            </ul>
          </div>
        ),
      },
      {
        id: 'execution-flow',
        title: '5. End-to-End Execution Flow',
        icon: GitBranch,
        content: (
          <div className="space-y-4">
            <p>COGNIX follows a strict, deterministic flow:</p>
            <ol className="list-decimal pl-6 space-y-2 font-mono text-sm">
              <li>Project initialization</li>
              <li>User intent capture (prompt)</li>
              <li>Requirement analysis</li>
              <li>Clarification and locking</li>
              <li>Task and user-story generation</li>
              <li>Architecture design and approval</li>
              <li>Project scaffolding</li>
              <li>Dependency installation</li>
              <li>Database modeling</li>
              <li>API implementation</li>
              <li>Security enforcement</li>
              <li>Documentation generation</li>
              <li>Testing</li>
              <li>Sandbox deployment</li>
              <li>GitHub synchronization</li>
              <li>Optional production deployment (human-approved)</li>
            </ol>
            <p className="text-sm text-muted-foreground italic">
              Each phase must complete successfully before the next begins.
            </p>
          </div>
        ),
      },
      {
        id: 'agent-architecture',
        title: '6. Agent-Based Architecture',
        icon: Bot,
        content: (
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold mb-3">6.1 Why Multiple Agents?</h4>
              <p>COGNIX replaces the "one big AI" model with specialized engineering agents, each with:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>A single responsibility</li>
                <li>Defined inputs and outputs</li>
                <li>No authority outside their scope</li>
              </ul>
              <p className="mt-3 text-primary font-medium">This reduces hallucination risk and improves auditability.</p>
            </div>
            <Separator />
            <div>
              <h4 className="font-semibold mb-3">6.2 Agent Overview</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 px-3 font-semibold">Agent</th>
                      <th className="text-left py-2 px-3 font-semibold">Responsibility</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {[
                      ['Requirement Analyzer', 'Parse user intent into structured requirements'],
                      ['Clarification Agent', 'Resolve ambiguities via user input'],
                      ['Task Planner', 'Create engineering tasks and dependencies'],
                      ['Architecture Designer', 'Define modules and system boundaries'],
                      ['Project Scaffolder', 'Generate solution and folder structure'],
                      ['Dependency Manager', 'Install approved libraries'],
                      ['Database Modeler', 'Design schema and migrations'],
                      ['API Generator', 'Create controllers, DTOs, services'],
                      ['Security Agent', 'Enforce auth, RBAC, policies'],
                      ['Documentation Agent', 'Generate OpenAPI and examples'],
                      ['Testing Agent', 'Validate correctness'],
                      ['Sandbox Deployment Agent', 'Deploy isolated environments'],
                      ['GitHub Sync Agent', 'Manage repository and history'],
                      ['Production Deployment Agent', 'Handle approved production releases'],
                    ].map(([agent, resp], i) => (
                      <tr key={i}>
                        <td className="py-2 px-3 font-mono text-xs">{agent}</td>
                        <td className="py-2 px-3 text-muted-foreground">{resp}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ),
      },
      {
        id: 'architecture-model',
        title: '7. Architecture Model (MVP)',
        icon: Code2,
        content: (
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold mb-3">7.1 Backend Architecture</h4>
              <p>COGNIX v1.0.0 generates backends using a <strong>Modular Monolith</strong> architecture:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Single deployable unit</li>
                <li>Strong internal boundaries</li>
                <li>Clear module ownership</li>
                <li>Migration-friendly to microservices later</li>
              </ul>
            </div>
            <Separator />
            <div>
              <h4 className="font-semibold mb-3">7.2 Default Technology Stack</h4>
              <div className="grid grid-cols-2 gap-3">
                {[
                  ['Backend', '.NET 8 (LTS)'],
                  ['API Style', 'REST'],
                  ['Documentation', 'OpenAPI 3.1'],
                  ['Authentication', 'JWT + Refresh Tokens'],
                  ['Authorization', 'Policy-based RBAC'],
                  ['Database', 'PostgreSQL'],
                  ['ORM', 'EF Core'],
                  ['Validation', 'FluentValidation'],
                  ['Logging', 'Structured logging'],
                  ['Docs UI', 'Swagger'],
                ].map(([key, value], i) => (
                  <div key={i} className="flex justify-between p-2 bg-secondary/30 rounded text-sm">
                    <span className="text-muted-foreground">{key}:</span>
                    <span className="font-mono">{value}</span>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                All defaults are enterprise-safe and opinionated.
              </p>
            </div>
          </div>
        ),
      },
      {
        id: 'sandbox',
        title: '8. Sandbox-First Execution',
        icon: Rocket,
        content: (
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold mb-3">8.1 Sandbox Environment</h4>
              <p>All generated backends are first deployed to a sandbox environment that is:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Isolated</li>
                <li>Resettable</li>
                <li>Safe</li>
                <li>Suitable for testing and validation</li>
              </ul>
              <p className="mt-3">Features:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Fake payment providers</li>
                <li>Public or private access</li>
                <li>Live Swagger UI</li>
                <li>One-click redeploy</li>
              </ul>
            </div>
            <Separator />
            <div>
              <h4 className="font-semibold mb-3">8.2 Why Sandbox First?</h4>
              <p>This prevents:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1 text-destructive">
                <li>Accidental production impact</li>
                <li>Security exposure</li>
                <li>Unreviewed changes</li>
              </ul>
            </div>
          </div>
        ),
      },
      {
        id: 'security',
        title: '9. Security Model',
        icon: Shield,
        content: (
          <div className="space-y-4">
            <p>Security is enforced <strong>by design</strong>:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>JWT authentication by default</li>
              <li>Role-based authorization</li>
              <li>Policy enforcement at endpoints</li>
              <li>No public APIs without explicit permission</li>
              <li>No production deployment without human approval</li>
              <li>Secrets stored securely (never in code)</li>
            </ul>
            <div className="p-4 bg-destructive/5 border border-destructive/20 rounded-lg">
              <p className="font-medium text-destructive">
                AI agents cannot bypass security rules.
              </p>
            </div>
          </div>
        ),
      },
      {
        id: 'byok',
        title: '10. BYOK (Bring Your Own LLM)',
        icon: Cpu,
        content: (
          <div className="space-y-4">
            <p>COGNIX supports BYOK to address cost and compliance concerns.</p>
            <p>Users may provide:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>OpenAI</li>
              <li>Azure OpenAI</li>
              <li>Anthropic</li>
              <li>Other compatible LLMs</li>
            </ul>
            <p className="mt-4">Benefits:</p>
            <ul className="list-disc pl-6 space-y-1 text-primary">
              <li>Cost predictability</li>
              <li>Data control</li>
              <li>Vendor flexibility</li>
            </ul>
            <p className="mt-4 text-sm text-muted-foreground">
              COGNIX also offers optional managed LLM usage with metered billing.
            </p>
          </div>
        ),
      },
      {
        id: 'mvp-scope',
        title: '11. MVP 1.0.0 Scope',
        icon: FileCode,
        content: (
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold mb-3 text-green-500">Included in MVP:</h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>Guided onboarding</li>
                <li>Requirement analysis</li>
                <li>Task & Kanban system</li>
                <li>Modular Monolith backend generation</li>
                <li>.NET 8 backend</li>
                <li>JWT authentication & RBAC</li>
                <li>Swagger / OpenAPI preview</li>
                <li>Supabase integration</li>
                <li>Sandbox deployment</li>
                <li>GitHub integration</li>
                <li>BYOK LLM support</li>
              </ul>
            </div>
            <Separator />
            <div>
              <h4 className="font-semibold mb-3 text-muted-foreground">Excluded from MVP:</h4>
              <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                <li>Automated production scaling</li>
                <li>Multi-language backends</li>
                <li>Advanced monitoring</li>
                <li>Team collaboration features</li>
              </ul>
            </div>
          </div>
        ),
      },
      {
        id: 'business-model',
        title: '12. Business Model',
        icon: Building2,
        content: (
          <div className="space-y-4">
            <ul className="list-disc pl-6 space-y-2">
              <li>Free tier (limited projects / tokens)</li>
              <li>Platform subscription</li>
              <li>Optional managed LLM billing</li>
              <li>Paid production deployments</li>
              <li>Enterprise plans (future)</li>
            </ul>
            <p className="text-primary font-medium">
              Revenue aligns with usage and value, not hype.
            </p>
          </div>
        ),
      },
      {
        id: 'roadmap',
        title: '13. Roadmap (Post-MVP)',
        icon: Globe,
        content: (
          <div className="space-y-4">
            <ul className="list-disc pl-6 space-y-2">
              <li>Production automation</li>
              <li>Observability & logs</li>
              <li>More backend languages (Node, Go)</li>
              <li>Multi-cloud support</li>
              <li>Enterprise compliance features</li>
              <li>Team collaboration</li>
            </ul>
          </div>
        ),
      },
      {
        id: 'conclusion',
        title: '14. Conclusion',
        icon: Zap,
        content: (
          <div className="space-y-4">
            <p>COGNIX represents a new class of backend tooling:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>AI-assisted</strong>, not AI-driven</li>
              <li><strong>Structured</strong>, not magical</li>
              <li><strong>Safe</strong>, not risky</li>
              <li><strong>Enterprise-ready</strong>, not experimental</li>
            </ul>
            <p>
              By enforcing discipline, transparency, and human control, Cognix enables teams to build real backends faster — <span className="text-primary font-medium">without compromising trust</span>.
            </p>
            <div className="mt-8 p-6 bg-primary/5 border border-primary/20 rounded-xl text-center">
              <h3 className="text-xl font-bold text-primary mb-2">COGNIX v1.0.0</h3>
              <p className="text-muted-foreground">AI-Assisted Backend Engineering. Built for real systems.</p>
            </div>
          </div>
        ),
      },
    ],
  },
];

const Whitepaper = () => {
  const { toast } = useToast();
  const [selectedWhitepaper, setSelectedWhitepaper] = useState(whitepapers[0]);
  const [openSections, setOpenSections] = useState<string[]>(['executive-summary']);
  const [showDownloadDialog, setShowDownloadDialog] = useState(false);
  const [downloadForm, setDownloadForm] = useState({
    email: '',
    phone: '',
    company: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleSection = (sectionId: string) => {
    setOpenSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const expandAllSections = () => {
    setOpenSections(selectedWhitepaper.sections.map((s) => s.id));
  };

  const collapseAllSections = () => {
    setOpenSections([]);
  };

  const handleDownload = async () => {
    if (!downloadForm.email || !downloadForm.company) {
      toast({
        title: 'Required fields missing',
        description: 'Please fill in your email and company name.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setShowDownloadDialog(false);
    
    toast({
      title: 'Download started',
      description: 'Your whitepaper download will begin shortly.',
    });

    // Trigger download (in real implementation, this would be a PDF)
    const link = document.createElement('a');
    link.href = '#';
    link.download = `COGNIX-Whitepaper-v${selectedWhitepaper.version}.pdf`;
    // In production, this would point to actual PDF
    toast({
      title: 'Thank you!',
      description: 'Check your email for the whitepaper PDF.',
    });
  };

  return (
    <>
      <Helmet>
        <title>Whitepapers | COGNIX - AI-Assisted Backend Engineering</title>
        <meta
          name="description"
          content="Download COGNIX technical whitepapers. Learn about AI-assisted backend engineering with human control."
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            {/* Hero Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <Badge variant="outline" className="mb-4">
                Technical Documentation
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                COGNIX Whitepapers
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Deep dive into the architecture, philosophy, and technical decisions behind COGNIX.
              </p>
            </motion.div>

            {/* Whitepaper Selector */}
            <div className="max-w-6xl mx-auto">
              <Tabs defaultValue={selectedWhitepaper.id} className="space-y-8">
                <TabsList className="bg-secondary/50 p-1 h-auto flex-wrap justify-start">
                  {whitepapers.map((wp) => (
                    <TabsTrigger
                      key={wp.id}
                      value={wp.id}
                      onClick={() => setSelectedWhitepaper(wp)}
                      className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                    >
                      <FileText className="w-4 h-4" />
                      {wp.title}
                      <Badge
                        variant="outline"
                        className={
                          wp.status === 'preview'
                            ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/30'
                            : wp.status === 'published'
                            ? 'bg-green-500/10 text-green-500 border-green-500/30'
                            : 'bg-muted'
                        }
                      >
                        {wp.status}
                      </Badge>
                    </TabsTrigger>
                  ))}
                </TabsList>

                {whitepapers.map((wp) => (
                  <TabsContent key={wp.id} value={wp.id} className="space-y-6">
                    {/* Whitepaper Header Card */}
                    <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
                      <CardContent className="p-8">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                          <div>
                            <div className="flex items-center gap-3 mb-3">
                              <Badge variant="outline" className="font-mono">
                                v{wp.version}
                              </Badge>
                              <Badge
                                variant="outline"
                                className={
                                  wp.status === 'preview'
                                    ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/30'
                                    : 'bg-green-500/10 text-green-500 border-green-500/30'
                                }
                              >
                                {wp.status === 'preview' ? 'Preview' : 'Published'}
                              </Badge>
                            </div>
                            <h2 className="text-3xl font-bold text-foreground mb-2">{wp.title}</h2>
                            <p className="text-lg text-muted-foreground mb-4">{wp.subtitle}</p>
                            <div className="flex items-center gap-6 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1.5">
                                <User className="w-4 h-4" />
                                {wp.author}
                              </span>
                              <span className="flex items-center gap-1.5">
                                <Clock className="w-4 h-4" />
                                {wp.date}
                              </span>
                              <span className="flex items-center gap-1.5">
                                <BookOpen className="w-4 h-4" />
                                {wp.sections.length} sections
                              </span>
                            </div>
                          </div>
                          <div className="flex flex-col gap-3">
                            <Button
                              size="lg"
                              className="gap-2"
                              onClick={() => setShowDownloadDialog(true)}
                            >
                              <Download className="w-5 h-5" />
                              Download PDF
                            </Button>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" onClick={expandAllSections}>
                                Expand All
                              </Button>
                              <Button variant="outline" size="sm" onClick={collapseAllSections}>
                                Collapse All
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Table of Contents */}
                    <Card className="bg-card/50 border-border">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base">Table of Contents</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                          {wp.sections.map((section) => (
                            <button
                              key={section.id}
                              onClick={() => {
                                if (!openSections.includes(section.id)) {
                                  toggleSection(section.id);
                                }
                                document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
                              }}
                              className="flex items-center gap-2 p-2 rounded-lg hover:bg-secondary/50 text-left transition-colors"
                            >
                              <section.icon className="w-4 h-4 text-primary flex-shrink-0" />
                              <span className="text-sm text-muted-foreground truncate">
                                {section.title}
                              </span>
                            </button>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Sections */}
                    <div className="space-y-4">
                      {wp.sections.map((section, index) => (
                        <motion.div
                          key={section.id}
                          id={section.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <Collapsible
                            open={openSections.includes(section.id)}
                            onOpenChange={() => toggleSection(section.id)}
                          >
                            <Card className="bg-card/50 border-border overflow-hidden">
                              <CollapsibleTrigger asChild>
                                <button className="w-full">
                                  <CardHeader className="flex flex-row items-center justify-between py-4 hover:bg-secondary/30 transition-colors">
                                    <div className="flex items-center gap-3">
                                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                        <section.icon className="w-5 h-5 text-primary" />
                                      </div>
                                      <CardTitle className="text-lg text-left">
                                        {section.title}
                                      </CardTitle>
                                    </div>
                                    {openSections.includes(section.id) ? (
                                      <ChevronDown className="w-5 h-5 text-muted-foreground" />
                                    ) : (
                                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                                    )}
                                  </CardHeader>
                                </button>
                              </CollapsibleTrigger>
                              <CollapsibleContent>
                                <CardContent className="pt-0 pb-6 prose prose-sm dark:prose-invert max-w-none">
                                  {section.content}
                                </CardContent>
                              </CollapsibleContent>
                            </Card>
                          </Collapsible>
                        </motion.div>
                      ))}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </div>
        </main>

        <Footer />

        {/* Download Dialog */}
        <Dialog open={showDownloadDialog} onOpenChange={setShowDownloadDialog}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Download className="w-5 h-5 text-primary" />
                Download Whitepaper
              </DialogTitle>
              <DialogDescription>
                Fill in your details to download the {selectedWhitepaper.title} whitepaper.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email Address *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={downloadForm.email}
                  onChange={(e) => setDownloadForm({ ...downloadForm, email: e.target.value })}
                  placeholder="you@company.com"
                  className="bg-secondary/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Mobile Number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={downloadForm.phone}
                  onChange={(e) => setDownloadForm({ ...downloadForm, phone: e.target.value })}
                  placeholder="+1 (555) 000-0000"
                  className="bg-secondary/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company" className="flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  Company Name *
                </Label>
                <Input
                  id="company"
                  value={downloadForm.company}
                  onChange={(e) => setDownloadForm({ ...downloadForm, company: e.target.value })}
                  placeholder="Acme Inc."
                  className="bg-secondary/50"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setShowDownloadDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleDownload} disabled={isSubmitting} className="gap-2">
                {isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    >
                      <Download className="w-4 h-4" />
                    </motion.div>
                    Processing...
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    Download PDF
                  </>
                )}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default Whitepaper;
