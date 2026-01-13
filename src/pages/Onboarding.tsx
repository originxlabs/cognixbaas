import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Layers, 
  Code2, 
  Terminal,
  Database,
  Shield,
  CreditCard,
  Users,
  GitBranch,
  Rocket,
  Server,
  Zap,
  CheckCircle2,
  Clock,
  Circle,
  Plus,
  X,
  Loader2,
  Globe,
  FileCode,
  Activity
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@/hooks/useAuth';
import { useProjects } from '@/hooks/useProjects';
import { useProjectModules } from '@/hooks/useProjectModules';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

type OnboardingStep = 
  | 'welcome'
  | 'project-setup'
  | 'prompt-input'
  | 'requirement-analysis'
  | 'clarifications'
  | 'engineering-plan'
  | 'architecture-review'
  | 'code-generation'
  | 'api-preview'
  | 'sandbox-deployment'
  | 'github-integration'
  | 'completion';

const steps: { id: OnboardingStep; label: string; description: string }[] = [
  { id: 'welcome', label: 'Welcome', description: 'Introduction to Cognix' },
  { id: 'project-setup', label: 'Project Setup', description: 'Configure your project' },
  { id: 'prompt-input', label: 'Requirements', description: 'Describe your backend' },
  { id: 'requirement-analysis', label: 'Analysis', description: 'Structured interpretation' },
  { id: 'clarifications', label: 'Clarifications', description: 'Confirm preferences' },
  { id: 'engineering-plan', label: 'Engineering Plan', description: 'Task breakdown' },
  { id: 'architecture-review', label: 'Architecture', description: 'Module structure' },
  { id: 'code-generation', label: 'Generation', description: 'Building your backend' },
  { id: 'api-preview', label: 'API Preview', description: 'OpenAPI specification' },
  { id: 'sandbox-deployment', label: 'Deployment', description: 'Live sandbox URL' },
  { id: 'github-integration', label: 'GitHub', description: 'Repository sync' },
  { id: 'completion', label: 'Complete', description: 'Launch dashboard' },
];

const Onboarding = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { createProject, account } = useProjects();
  const { toast } = useToast();

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [createdProject, setCreatedProject] = useState<any>(null);

  // Project data
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [shortCode, setShortCode] = useState('');
  
  // Requirements
  const [prompt, setPrompt] = useState('');
  const [entities, setEntities] = useState<string[]>([]);
  const [newEntity, setNewEntity] = useState('');
  const [authMethod, setAuthMethod] = useState('JWT + Refresh Token');
  const [payments, setPayments] = useState('');
  const [multiTenant, setMultiTenant] = useState(false);
  const [customFeatures, setCustomFeatures] = useState<string[]>([]);

  // Clarifications
  const [clarifications, setClarifications] = useState({
    includeRateLimiting: true,
    includeLogging: true,
    includeSwagger: true,
    includeHealthCheck: true,
    useCQRS: false,
    includeUnitTests: true,
  });

  // Generation progress
  const [generationProgress, setGenerationProgress] = useState(0);
  const [currentAgent, setCurrentAgent] = useState('');
  const [agentLogs, setAgentLogs] = useState<string[]>([]);

  const currentStep = steps[currentStepIndex];

  // Redirect if not authenticated
  useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  }, [user, navigate]);

  const generateShortCode = (name: string) => {
    const code = name.substring(0, 3).toUpperCase() + '-' + 
                 Math.random().toString(36).substring(2, 5).toUpperCase();
    setShortCode(code);
  };

  const handleNext = async () => {
    if (currentStepIndex === 1 && !projectName.trim()) {
      toast({ title: 'Project name required', variant: 'destructive' });
      return;
    }

    if (currentStepIndex === 2 && !prompt.trim()) {
      toast({ title: 'Please describe your backend requirements', variant: 'destructive' });
      return;
    }

    // Handle project creation
    if (currentStepIndex === 1) {
      setIsProcessing(true);
      const project = await createProject(projectName, projectDescription);
      if (project) {
        setCreatedProject(project);
      }
      setIsProcessing(false);
    }

    // Handle code generation step
    if (currentStep.id === 'engineering-plan') {
      await simulateGeneration();
    }

    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const addEntity = () => {
    if (newEntity.trim() && !entities.includes(newEntity.trim())) {
      setEntities([...entities, newEntity.trim()]);
      setNewEntity('');
    }
  };

  const removeEntity = (entity: string) => {
    setEntities(entities.filter(e => e !== entity));
  };

  const simulateGeneration = async () => {
    if (!createdProject) return;

    setIsProcessing(true);
    const agents = [
      { name: 'Architect Agent', action: 'Analyzing requirements and defining module structure' },
      { name: 'Database Agent', action: 'Generating entity models and migrations' },
      { name: 'Security Agent', action: 'Configuring authentication and authorization' },
      { name: 'API Agent', action: 'Creating REST endpoints and controllers' },
      { name: 'Docs Agent', action: 'Generating OpenAPI specification' },
    ];

    for (let i = 0; i < agents.length; i++) {
      setCurrentAgent(agents[i].name);
      setAgentLogs(prev => [...prev, `[${agents[i].name}] ${agents[i].action}`]);
      
      for (let p = 0; p <= 100; p += 5) {
        setGenerationProgress(((i * 100) + p) / agents.length);
        await new Promise(resolve => setTimeout(resolve, 50));
      }

      // Add activity to database
      await supabase.from('agent_activities').insert({
        project_id: createdProject.id,
        agent_name: agents[i].name,
        action: agents[i].action,
      });
    }

    // Update project status
    await supabase.from('projects').update({
      prompt,
      entities,
      auth_method: authMethod,
      payments: payments || null,
      multi_tenant: multiTenant,
      custom_features: customFeatures.length > 0 ? customFeatures : null,
      status: 'ready',
      is_generating: false,
    }).eq('id', createdProject.id);

    setIsProcessing(false);
  };

  const handleComplete = () => {
    if (createdProject) {
      navigate(`/dashboard/project/${createdProject.id}`);
    } else {
      navigate('/dashboard');
    }
  };

  const renderStepContent = () => {
    switch (currentStep.id) {
      case 'welcome':
        return (
          <div className="max-w-2xl mx-auto text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
                <Layers className="w-10 h-10 text-primary" />
              </div>
              <h1 className="text-3xl font-bold text-foreground">Welcome to Cognix</h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Enterprise backend infrastructure, engineered with precision.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="grid md:grid-cols-3 gap-6 mt-12"
            >
              <div className="p-6 rounded-xl bg-card border border-border">
                <Zap className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-semibold text-foreground mb-2">AI-Assisted</h3>
                <p className="text-sm text-muted-foreground">
                  Intelligent code generation with human oversight at every step.
                </p>
              </div>
              <div className="p-6 rounded-xl bg-card border border-border">
                <Shield className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Human-Approved</h3>
                <p className="text-sm text-muted-foreground">
                  Review and approve every architecture decision before implementation.
                </p>
              </div>
              <div className="p-6 rounded-xl bg-card border border-border">
                <Server className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Production-Ready</h3>
                <p className="text-sm text-muted-foreground">
                  .NET 8 Modular Monolith with best practices baked in.
                </p>
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-sm text-muted-foreground mt-8"
            >
              You're about to set up production backend infrastructure.
            </motion.p>
          </div>
        );

      case 'project-setup':
        return (
          <div className="max-w-xl mx-auto space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-foreground">Project Setup</h2>
              <p className="text-muted-foreground mt-2">Configure your backend project</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="projectName">Project Name</Label>
                <Input
                  id="projectName"
                  value={projectName}
                  onChange={(e) => {
                    setProjectName(e.target.value);
                    generateShortCode(e.target.value);
                  }}
                  placeholder="e.g., acme-api"
                  className="bg-secondary/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="shortCode">Short Code</Label>
                <Input
                  id="shortCode"
                  value={shortCode}
                  onChange={(e) => setShortCode(e.target.value)}
                  placeholder="ACM-001"
                  className="bg-secondary/50 font-mono"
                />
                <p className="text-xs text-muted-foreground">Used for task identifiers</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                  id="description"
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  placeholder="Brief description of your project"
                  className="bg-secondary/50"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="p-4 rounded-lg bg-secondary/30 border border-border">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Framework</p>
                  <p className="font-mono text-foreground">.NET 8</p>
                </div>
                <div className="p-4 rounded-lg bg-secondary/30 border border-border">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Architecture</p>
                  <p className="font-mono text-foreground">Modular Monolith</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'prompt-input':
        return (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-foreground">Describe Your Backend</h2>
              <p className="text-muted-foreground mt-2">Tell us what you're building</p>
            </div>

            <div className="space-y-4">
              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Example: Build an e-commerce API with products, orders, cart, and user authentication. Include Stripe for payments and webhook handling for order notifications."
                className="min-h-[160px] bg-secondary/50"
              />
              
              <div className="space-y-3">
                <Label>Core Entities</Label>
                <div className="flex gap-2">
                  <Input
                    value={newEntity}
                    onChange={(e) => setNewEntity(e.target.value)}
                    placeholder="e.g., User, Product, Order"
                    onKeyDown={(e) => e.key === 'Enter' && addEntity()}
                    className="bg-secondary/50"
                  />
                  <Button onClick={addEntity} variant="outline" size="icon">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 min-h-[32px]">
                  {entities.map((entity) => (
                    <Badge key={entity} variant="secondary" className="gap-1 font-mono">
                      {entity}
                      <button onClick={() => removeEntity(entity)} className="hover:text-destructive">
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'requirement-analysis':
        return (
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-foreground">Requirement Analysis</h2>
              <p className="text-muted-foreground mt-2">Structured interpretation of your requirements</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <Card className="bg-card border-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Database className="w-4 h-4 text-primary" />
                    Entities Detected
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {(entities.length > 0 ? entities : ['User', 'Auth']).map((entity) => (
                      <Badge key={entity} variant="outline" className="font-mono">
                        {entity}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Shield className="w-4 h-4 text-primary" />
                    Authentication
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <select 
                    value={authMethod}
                    onChange={(e) => setAuthMethod(e.target.value)}
                    className="w-full bg-secondary/50 border border-border rounded-md px-3 py-2 text-sm"
                  >
                    <option value="JWT + Refresh Token">JWT + Refresh Token</option>
                    <option value="JWT Only">JWT Only</option>
                    <option value="OAuth 2.0">OAuth 2.0</option>
                    <option value="API Key">API Key</option>
                  </select>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-primary" />
                    Payments
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <select 
                    value={payments || 'none'}
                    onChange={(e) => setPayments(e.target.value === 'none' ? '' : e.target.value)}
                    className="w-full bg-secondary/50 border border-border rounded-md px-3 py-2 text-sm"
                  >
                    <option value="none">None</option>
                    <option value="Stripe">Stripe</option>
                    <option value="PayPal">PayPal</option>
                    <option value="Razorpay">Razorpay</option>
                  </select>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Users className="w-4 h-4 text-primary" />
                    Multi-Tenancy
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm">Enable multi-tenancy</p>
                      <p className="text-xs text-muted-foreground">Isolate data per organization</p>
                    </div>
                    <Switch checked={multiTenant} onCheckedChange={setMultiTenant} />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 'clarifications':
        return (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-foreground">Clarifications</h2>
              <p className="text-muted-foreground mt-2">Confirm your preferences</p>
            </div>

            <Card className="bg-card border-border">
              <CardContent className="p-6 space-y-4">
                {[
                  { key: 'includeSwagger', label: 'OpenAPI / Swagger Documentation', description: 'Auto-generate API documentation' },
                  { key: 'includeRateLimiting', label: 'Rate Limiting', description: 'Protect APIs from abuse' },
                  { key: 'includeLogging', label: 'Structured Logging', description: 'Serilog with JSON output' },
                  { key: 'includeHealthCheck', label: 'Health Check Endpoints', description: 'Kubernetes-ready health probes' },
                  { key: 'useCQRS', label: 'CQRS Pattern', description: 'Separate read and write models' },
                  { key: 'includeUnitTests', label: 'Unit Tests', description: 'xUnit test projects per module' },
                ].map((item) => (
                  <div key={item.key} className="flex items-start gap-3">
                    <Checkbox
                      id={item.key}
                      checked={clarifications[item.key as keyof typeof clarifications]}
                      onCheckedChange={(checked) => 
                        setClarifications({ ...clarifications, [item.key]: checked })
                      }
                    />
                    <div className="space-y-1">
                      <Label htmlFor={item.key} className="cursor-pointer">{item.label}</Label>
                      <p className="text-xs text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        );

      case 'engineering-plan':
        return (
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-foreground">Engineering Plan</h2>
              <p className="text-muted-foreground mt-2">Task breakdown for your backend</p>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {['PENDING', 'IN PROGRESS', 'DONE'].map((status) => (
                <div key={status} className="space-y-3">
                  <div className="flex items-center gap-2 px-2">
                    {status === 'PENDING' && <Circle className="w-4 h-4 text-muted-foreground" />}
                    {status === 'IN PROGRESS' && <Clock className="w-4 h-4 text-primary" />}
                    {status === 'DONE' && <CheckCircle2 className="w-4 h-4 text-green-500" />}
                    <span className="text-sm font-medium text-muted-foreground">{status}</span>
                  </div>
                  
                  {status === 'PENDING' && entities.map((entity) => (
                    <Card key={entity} className="bg-card/50 border-border">
                      <CardContent className="p-3">
                        <p className="text-sm font-medium">{entity} Module</p>
                        <p className="text-xs text-muted-foreground">CRUD endpoints, services, DTOs</p>
                      </CardContent>
                    </Card>
                  ))}
                  
                  {status === 'IN PROGRESS' && (
                    <Card className="bg-primary/5 border-primary/20">
                      <CardContent className="p-3">
                        <p className="text-sm font-medium">Auth Module</p>
                        <p className="text-xs text-muted-foreground">{authMethod} implementation</p>
                      </CardContent>
                    </Card>
                  )}
                  
                  {status === 'DONE' && (
                    <>
                      <Card className="bg-green-500/5 border-green-500/20">
                        <CardContent className="p-3">
                          <p className="text-sm font-medium">Project Scaffold</p>
                          <p className="text-xs text-muted-foreground">Solution structure created</p>
                        </CardContent>
                      </Card>
                      <Card className="bg-green-500/5 border-green-500/20">
                        <CardContent className="p-3">
                          <p className="text-sm font-medium">Requirements Analysis</p>
                          <p className="text-xs text-muted-foreground">Entities and modules defined</p>
                        </CardContent>
                      </Card>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 'architecture-review':
        return (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-foreground">Architecture Review</h2>
              <p className="text-muted-foreground mt-2">Modular Monolith structure</p>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {['Auth', ...entities].map((module, index) => (
                <motion.div
                  key={module}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-card border-border h-full">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Code2 className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{module}</h3>
                          <p className="text-xs text-muted-foreground">5 endpoints</p>
                        </div>
                      </div>
                      <div className="space-y-1 font-mono text-xs">
                        <p className="text-muted-foreground">GET /{module.toLowerCase()}s</p>
                        <p className="text-muted-foreground">POST /{module.toLowerCase()}s</p>
                        <p className="text-muted-foreground">GET /{module.toLowerCase()}s/:id</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 'code-generation':
        return (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-foreground">Code Generation</h2>
              <p className="text-muted-foreground mt-2">Building your backend infrastructure</p>
            </div>

            <Card className="bg-card border-border">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  {isProcessing ? (
                    <Loader2 className="w-6 h-6 text-primary animate-spin" />
                  ) : (
                    <CheckCircle2 className="w-6 h-6 text-green-500" />
                  )}
                  <div>
                    <p className="font-semibold">{currentAgent || 'Generation Complete'}</p>
                    <p className="text-sm text-muted-foreground">
                      {isProcessing ? 'Processing...' : 'All agents completed'}
                    </p>
                  </div>
                </div>

                <Progress value={generationProgress} className="h-2" />
                <p className="text-xs text-muted-foreground text-center">
                  {Math.round(generationProgress)}% complete
                </p>

                <div className="bg-secondary/30 rounded-lg p-4 font-mono text-xs max-h-[200px] overflow-y-auto space-y-1">
                  {agentLogs.map((log, i) => (
                    <p key={i} className="text-muted-foreground">{log}</p>
                  ))}
                  {agentLogs.length === 0 && (
                    <p className="text-muted-foreground">Waiting to start generation...</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'api-preview':
        return (
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-foreground">API Preview</h2>
              <p className="text-muted-foreground mt-2">OpenAPI 3.0 Specification</p>
            </div>

            <Card className="bg-card border-border">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <FileCode className="w-5 h-5 text-primary" />
                  <CardTitle className="text-base">Generated Endpoints</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {['Auth', ...entities].flatMap((module) => [
                  { method: 'GET', path: `/api/v1/${module.toLowerCase()}s`, auth: module !== 'Auth' },
                  { method: 'POST', path: `/api/v1/${module.toLowerCase()}s`, auth: true },
                ]).slice(0, 8).map((ep, i) => (
                  <div key={i} className="flex items-center gap-3 font-mono text-sm">
                    <Badge 
                      variant="outline"
                      className={ep.method === 'GET' ? 'text-green-500 border-green-500/30' : 'text-blue-500 border-blue-500/30'}
                    >
                      {ep.method}
                    </Badge>
                    <span className="text-muted-foreground">{ep.path}</span>
                    {ep.auth && <Shield className="w-3 h-3 text-amber-500" />}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        );

      case 'sandbox-deployment':
        return (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-foreground">Sandbox Deployment</h2>
              <p className="text-muted-foreground mt-2">Your API is now live</p>
            </div>

            <Card className="bg-green-500/5 border-green-500/30">
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto">
                  <Globe className="w-8 h-8 text-green-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Sandbox URL</p>
                  <p className="font-mono text-lg text-foreground">
                    https://sandbox.api.cognix.dev/{shortCode.toLowerCase() || 'project'}
                  </p>
                </div>
                <Badge variant="outline" className="text-green-500 border-green-500/30">
                  <Activity className="w-3 h-3 mr-1" />
                  Running
                </Badge>
              </CardContent>
            </Card>
          </div>
        );

      case 'github-integration':
        return (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-foreground">GitHub Integration</h2>
              <p className="text-muted-foreground mt-2">Connect your repository</p>
            </div>

            <Card className="bg-card border-border">
              <CardContent className="p-6 text-center space-y-4">
                <GitBranch className="w-12 h-12 text-muted-foreground mx-auto" />
                <div>
                  <p className="text-foreground font-medium">Optional: Connect to GitHub</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Sync your generated code to a repository
                  </p>
                </div>
                <Button variant="outline" className="gap-2">
                  <GitBranch className="w-4 h-4" />
                  Connect Repository
                </Button>
                <p className="text-xs text-muted-foreground">You can configure this later in settings</p>
              </CardContent>
            </Card>
          </div>
        );

      case 'completion':
        return (
          <div className="max-w-2xl mx-auto text-center space-y-8">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="space-y-4"
            >
              <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto">
                <Rocket className="w-10 h-10 text-green-500" />
              </div>
              <h2 className="text-3xl font-bold text-foreground">Setup Complete</h2>
              <p className="text-lg text-muted-foreground">
                Your backend infrastructure is ready.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-4 text-left">
              <Card className="bg-card border-border">
                <CardContent className="p-4">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mb-2" />
                  <p className="font-medium text-sm">Project Created</p>
                  <p className="text-xs text-muted-foreground">{projectName}</p>
                </CardContent>
              </Card>
              <Card className="bg-card border-border">
                <CardContent className="p-4">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mb-2" />
                  <p className="font-medium text-sm">Modules Generated</p>
                  <p className="text-xs text-muted-foreground">{entities.length + 1} modules</p>
                </CardContent>
              </Card>
              <Card className="bg-card border-border">
                <CardContent className="p-4">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mb-2" />
                  <p className="font-medium text-sm">Sandbox Live</p>
                  <p className="text-xs text-muted-foreground">Ready for testing</p>
                </CardContent>
              </Card>
            </div>

            <Button size="lg" onClick={handleComplete} className="gap-2">
              Go to Dashboard
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Progress Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Layers className="w-6 h-6 text-primary" />
              <span className="font-semibold text-foreground">COGNIX</span>
              <Badge variant="outline" className="text-xs font-mono">MVP 1.0.0</Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Step {currentStepIndex + 1} of {steps.length}
            </p>
          </div>
          
          {/* Progress Bar */}
          <div className="flex gap-1">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`h-1 flex-1 rounded-full transition-colors ${
                  index < currentStepIndex ? 'bg-green-500' :
                  index === currentStepIndex ? 'bg-primary' :
                  'bg-muted'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderStepContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Navigation Footer */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-border bg-card/95 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Button 
            variant="ghost" 
            onClick={handleBack} 
            disabled={currentStepIndex === 0 || isProcessing}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>

          <div className="text-center">
            <p className="text-sm font-medium text-foreground">{currentStep.label}</p>
            <p className="text-xs text-muted-foreground">{currentStep.description}</p>
          </div>

          {currentStep.id === 'completion' ? (
            <Button onClick={handleComplete} className="gap-2">
              Launch Dashboard
              <Rocket className="w-4 h-4" />
            </Button>
          ) : (
            <Button onClick={handleNext} disabled={isProcessing} className="gap-2">
              {isProcessing ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  Continue
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
