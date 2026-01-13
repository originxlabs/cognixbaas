import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  ArrowLeft, 
  Layers, 
  Terminal,
  Plus,
  X,
  Loader2,
  Globe,
  FileCode,
  Activity,
  Rocket,
  CheckCircle2,
  Circle,
  Clock,
  Ban
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { COGNIX_AGENTS, AGENT_PIPELINE_ORDER } from '@/config/agents';
import { AgentPipeline } from '@/components/agents/AgentPipeline';

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

const steps: { id: OnboardingStep; label: string; description: string; agentId?: string }[] = [
  { id: 'welcome', label: 'Welcome', description: 'Introduction to Cognix' },
  { id: 'project-setup', label: 'Project Setup', description: 'Configure your project', agentId: 'scaffolding' },
  { id: 'prompt-input', label: 'Requirements', description: 'Describe your backend', agentId: 'requirement-analyzer' },
  { id: 'requirement-analysis', label: 'Analysis', description: 'Structured interpretation', agentId: 'requirement-analyzer' },
  { id: 'clarifications', label: 'Clarifications', description: 'Confirm preferences', agentId: 'clarification' },
  { id: 'engineering-plan', label: 'Engineering Plan', description: 'Task breakdown', agentId: 'task-planner' },
  { id: 'architecture-review', label: 'Architecture', description: 'Module structure', agentId: 'architecture-designer' },
  { id: 'code-generation', label: 'Generation', description: 'Building your backend' },
  { id: 'api-preview', label: 'API Preview', description: 'OpenAPI specification', agentId: 'documentation' },
  { id: 'sandbox-deployment', label: 'Deployment', description: 'Live sandbox URL', agentId: 'sandbox-deploy' },
  { id: 'github-integration', label: 'GitHub', description: 'Repository sync', agentId: 'github-sync' },
  { id: 'completion', label: 'Complete', description: 'Launch dashboard' },
];

const Onboarding = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { createProject } = useProjects();
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
  const [currentAgentIndex, setCurrentAgentIndex] = useState(0);
  const [completedAgents, setCompletedAgents] = useState<string[]>([]);
  const [agentLogs, setAgentLogs] = useState<{ agentId: string; message: string; timestamp: Date }[]>([]);

  const currentStep = steps[currentStepIndex];
  const currentStepAgent = currentStep.agentId 
    ? COGNIX_AGENTS.find(a => a.id === currentStep.agentId) 
    : null;

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
      await runAgentPipeline();
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

  const runAgentPipeline = async () => {
    if (!createdProject) return;

    setIsProcessing(true);
    setCompletedAgents([]);
    setAgentLogs([]);

    // Run through the agent pipeline
    const pipelineAgents = COGNIX_AGENTS.filter(a => 
      ['requirement-analyzer', 'task-planner', 'architecture-designer', 'scaffolding', 
       'dependency-manager', 'database-modeler', 'api-generator', 'security', 
       'documentation', 'testing'].includes(a.id)
    );

    for (let i = 0; i < pipelineAgents.length; i++) {
      const agent = pipelineAgents[i];
      setCurrentAgentIndex(i);

      // Add log entry
      setAgentLogs(prev => [...prev, {
        agentId: agent.id,
        message: agent.purpose,
        timestamp: new Date()
      }]);

      // Simulate progress
      for (let p = 0; p <= 100; p += 10) {
        setGenerationProgress(((i * 100) + p) / pipelineAgents.length);
        await new Promise(resolve => setTimeout(resolve, 80));
      }

      // Mark as completed
      setCompletedAgents(prev => [...prev, agent.id]);

      // Add activity to database
      await supabase.from('agent_activities').insert({
        project_id: createdProject.id,
        agent_name: agent.shortName,
        action: `Completed: ${agent.purpose}`,
        details: agent.outputs.join(', '),
      });

      await new Promise(resolve => setTimeout(resolve, 200));
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
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto border border-primary/20">
                <Layers className="w-10 h-10 text-primary" />
              </div>
              <h1 className="text-4xl font-bold text-foreground tracking-tight">Welcome to Cognix</h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-xl mx-auto">
                Enterprise backend infrastructure, engineered with precision.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="grid md:grid-cols-3 gap-4 mt-12"
            >
              {[
                { icon: Terminal, title: 'AI-Assisted', desc: 'Intelligent code generation with human oversight at every step.' },
                { icon: CheckCircle2, title: 'Human-Approved', desc: 'Review and approve every architecture decision before implementation.' },
                { icon: Layers, title: 'Production-Ready', desc: '.NET 8 Modular Monolith with best practices baked in.' },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="p-6 rounded-xl bg-card border border-border text-left"
                >
                  <item.icon className="w-8 h-8 text-primary mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Agent Pipeline Preview */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-12 p-6 rounded-xl bg-card/50 border border-border"
            >
              <p className="text-sm text-muted-foreground mb-4">Powered by 14 specialized engineering agents</p>
              <div className="overflow-x-auto">
                <AgentPipeline showLabels={false} />
              </div>
            </motion.div>
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
                  className="bg-secondary/50 font-mono"
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
            {/* Active Agent Badge */}
            {currentStepAgent && (
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className={`w-6 h-6 rounded-md ${currentStepAgent.bgColor} flex items-center justify-center`}>
                  <currentStepAgent.icon className={`w-3.5 h-3.5 ${currentStepAgent.color}`} />
                </div>
                <span className={`text-sm font-medium ${currentStepAgent.color}`}>
                  {currentStepAgent.shortName} Active
                </span>
              </div>
            )}

            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-foreground">Describe Your Backend</h2>
              <p className="text-muted-foreground mt-2">Tell us what you're building</p>
            </div>

            <div className="space-y-4">
              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Example: Build an e-commerce API with products, orders, cart, and user authentication. Include Stripe for payments and webhook handling for order notifications."
                className="min-h-[160px] bg-secondary/50 font-mono text-sm"
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
            {currentStepAgent && (
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className={`w-6 h-6 rounded-md ${currentStepAgent.bgColor} flex items-center justify-center`}>
                  <currentStepAgent.icon className={`w-3.5 h-3.5 ${currentStepAgent.color}`} />
                </div>
                <span className={`text-sm font-medium ${currentStepAgent.color}`}>
                  {currentStepAgent.shortName} • Analyzing requirements
                </span>
              </div>
            )}

            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-foreground">Requirement Analysis</h2>
              <p className="text-muted-foreground mt-2">Structured interpretation of your requirements</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <Card className="bg-card border-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-500" />
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
                    <span className="w-2 h-2 rounded-full bg-red-500" />
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
                    <span className="w-2 h-2 rounded-full bg-green-500" />
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
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
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
            {currentStepAgent && (
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className={`w-6 h-6 rounded-md ${currentStepAgent.bgColor} flex items-center justify-center`}>
                  <currentStepAgent.icon className={`w-3.5 h-3.5 ${currentStepAgent.color}`} />
                </div>
                <span className={`text-sm font-medium ${currentStepAgent.color}`}>
                  {currentStepAgent.shortName} • Confirming decisions
                </span>
              </div>
            )}

            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-foreground">Clarifications</h2>
              <p className="text-muted-foreground mt-2">Confirm your engineering preferences</p>
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
                      <Label htmlFor={item.key} className="cursor-pointer font-medium">{item.label}</Label>
                      <p className="text-xs text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <div className="flex items-center gap-2 text-xs text-muted-foreground bg-secondary/30 rounded-lg p-3">
              <Ban className="w-4 h-4 text-amber-500" />
              <span>This agent prevents AI from guessing critical decisions. All choices are locked after confirmation.</span>
            </div>
          </div>
        );

      case 'engineering-plan':
        return (
          <div className="max-w-4xl mx-auto space-y-6">
            {currentStepAgent && (
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className={`w-6 h-6 rounded-md ${currentStepAgent.bgColor} flex items-center justify-center`}>
                  <currentStepAgent.icon className={`w-3.5 h-3.5 ${currentStepAgent.color}`} />
                </div>
                <span className={`text-sm font-medium ${currentStepAgent.color}`}>
                  {currentStepAgent.shortName} • Creating task breakdown
                </span>
              </div>
            )}

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
                  
                  {status === 'PENDING' && entities.slice(0, 4).map((entity) => (
                    <Card key={entity} className="bg-card/50 border-border">
                      <CardContent className="p-3">
                        <p className="text-sm font-medium font-mono">{entity} Module</p>
                        <p className="text-xs text-muted-foreground">CRUD endpoints, services, DTOs</p>
                      </CardContent>
                    </Card>
                  ))}
                  
                  {status === 'IN PROGRESS' && (
                    <Card className="bg-primary/5 border-primary/20">
                      <CardContent className="p-3">
                        <p className="text-sm font-medium font-mono">Auth Module</p>
                        <p className="text-xs text-muted-foreground">{authMethod} implementation</p>
                      </CardContent>
                    </Card>
                  )}
                  
                  {status === 'DONE' && (
                    <>
                      <Card className="bg-green-500/5 border-green-500/20">
                        <CardContent className="p-3">
                          <p className="text-sm font-medium font-mono">Project Scaffold</p>
                          <p className="text-xs text-muted-foreground">Solution structure created</p>
                        </CardContent>
                      </Card>
                      <Card className="bg-green-500/5 border-green-500/20">
                        <CardContent className="p-3">
                          <p className="text-sm font-medium font-mono">Requirements Analysis</p>
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
            {currentStepAgent && (
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className={`w-6 h-6 rounded-md ${currentStepAgent.bgColor} flex items-center justify-center`}>
                  <currentStepAgent.icon className={`w-3.5 h-3.5 ${currentStepAgent.color}`} />
                </div>
                <span className={`text-sm font-medium ${currentStepAgent.color}`}>
                  {currentStepAgent.shortName} • Designing module structure
                </span>
              </div>
            )}

            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-foreground">Architecture Review</h2>
              <p className="text-muted-foreground mt-2">Modular Monolith structure</p>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {['Auth', ...entities].slice(0, 6).map((module, index) => {
                const moduleAgent = COGNIX_AGENTS.find(a => a.id === 'api-generator');
                
                return (
                  <motion.div
                    key={module}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="bg-card border-border h-full">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <div className={`w-8 h-8 rounded-lg ${moduleAgent?.bgColor || 'bg-primary/10'} flex items-center justify-center`}>
                            {moduleAgent?.icon && <moduleAgent.icon className={`w-4 h-4 ${moduleAgent.color}`} />}
                          </div>
                          <div>
                            <h3 className="font-semibold font-mono">{module}</h3>
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
                );
              })}
            </div>

            <div className="flex items-center gap-2 text-xs text-muted-foreground bg-destructive/5 border border-destructive/20 rounded-lg p-3">
              <Ban className="w-4 h-4 text-destructive" />
              <span>No code will be generated until you approve this architecture.</span>
            </div>
          </div>
        );

      case 'code-generation':
        return (
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-foreground">Code Generation</h2>
              <p className="text-muted-foreground mt-2">Building your backend infrastructure</p>
            </div>

            {/* Agent Pipeline */}
            <Card className="bg-card border-border overflow-hidden">
              <CardContent className="p-4">
                <AgentPipeline 
                  currentAgentId={COGNIX_AGENTS[currentAgentIndex]?.id}
                  completedAgents={completedAgents}
                  vertical
                />
              </CardContent>
            </Card>

            {/* Progress */}
            <Card className="bg-card border-border">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  {isProcessing ? (
                    <Loader2 className="w-6 h-6 text-primary animate-spin" />
                  ) : completedAgents.length > 0 ? (
                    <CheckCircle2 className="w-6 h-6 text-green-500" />
                  ) : (
                    <Activity className="w-6 h-6 text-muted-foreground" />
                  )}
                  <div>
                    <p className="font-semibold">
                      {isProcessing 
                        ? COGNIX_AGENTS[currentAgentIndex]?.shortName || 'Processing...'
                        : completedAgents.length > 0 
                          ? 'Generation Complete'
                          : 'Ready to generate'
                      }
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {isProcessing 
                        ? `Agent ${currentAgentIndex + 1} of ${COGNIX_AGENTS.length}`
                        : completedAgents.length > 0
                          ? 'All agents completed'
                          : 'Click Continue to start'
                      }
                    </p>
                  </div>
                </div>

                <Progress value={generationProgress} className="h-2" />
                <p className="text-xs text-muted-foreground text-center">
                  {Math.round(generationProgress)}% complete
                </p>

                {/* Agent Logs */}
                <div className="bg-secondary/30 rounded-lg p-4 font-mono text-xs max-h-[200px] overflow-y-auto space-y-1">
                  {agentLogs.map((log, i) => {
                    const agent = COGNIX_AGENTS.find(a => a.id === log.agentId);
                    return (
                      <p key={i} className="text-muted-foreground">
                        <span className={agent?.color || 'text-primary'}>[{agent?.shortName}]</span> {log.message}
                      </p>
                    );
                  })}
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
            {currentStepAgent && (
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className={`w-6 h-6 rounded-md ${currentStepAgent.bgColor} flex items-center justify-center`}>
                  <currentStepAgent.icon className={`w-3.5 h-3.5 ${currentStepAgent.color}`} />
                </div>
                <span className={`text-sm font-medium ${currentStepAgent.color}`}>
                  {currentStepAgent.shortName} • Generated OpenAPI spec
                </span>
              </div>
            )}

            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-foreground">API Preview</h2>
              <p className="text-muted-foreground mt-2">OpenAPI 3.1 Specification</p>
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
                ]).slice(0, 10).map((ep, i) => {
                  const securityAgent = COGNIX_AGENTS.find(a => a.id === 'security');
                  
                  return (
                    <div key={i} className="flex items-center gap-3 font-mono text-sm">
                      <Badge 
                        variant="outline"
                        className={ep.method === 'GET' ? 'text-green-500 border-green-500/30' : 'text-blue-500 border-blue-500/30'}
                      >
                        {ep.method}
                      </Badge>
                      <span className="text-muted-foreground flex-1">{ep.path}</span>
                      {ep.auth && securityAgent && (
                        <securityAgent.icon className={`w-3.5 h-3.5 ${securityAgent.color}`} />
                      )}
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>
        );

      case 'sandbox-deployment':
        return (
          <div className="max-w-2xl mx-auto space-y-6">
            {currentStepAgent && (
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className={`w-6 h-6 rounded-md ${currentStepAgent.bgColor} flex items-center justify-center`}>
                  <currentStepAgent.icon className={`w-3.5 h-3.5 ${currentStepAgent.color}`} />
                </div>
                <span className={`text-sm font-medium ${currentStepAgent.color}`}>
                  {currentStepAgent.shortName} • Deployed to sandbox
                </span>
              </div>
            )}

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

            <div className="flex items-center gap-2 text-xs text-muted-foreground bg-secondary/30 rounded-lg p-3">
              <Ban className="w-4 h-4 text-amber-500" />
              <span>Sandbox has no production access. Data resets periodically.</span>
            </div>
          </div>
        );

      case 'github-integration':
        return (
          <div className="max-w-2xl mx-auto space-y-6">
            {currentStepAgent && (
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className={`w-6 h-6 rounded-md ${currentStepAgent.bgColor} flex items-center justify-center`}>
                  <currentStepAgent.icon className={`w-3.5 h-3.5 ${currentStepAgent.color}`} />
                </div>
                <span className={`text-sm font-medium ${currentStepAgent.color}`}>
                  {currentStepAgent.shortName} • Repository sync
                </span>
              </div>
            )}

            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-foreground">GitHub Integration</h2>
              <p className="text-muted-foreground mt-2">Connect your repository</p>
            </div>

            <Card className="bg-card border-border">
              <CardContent className="p-6 text-center space-y-4">
                {currentStepAgent && <currentStepAgent.icon className="w-12 h-12 text-muted-foreground mx-auto" />}
                <div>
                  <p className="text-foreground font-medium">Optional: Connect to GitHub</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Sync your generated code to a repository
                  </p>
                </div>
                <Button variant="outline" className="gap-2">
                  {currentStepAgent && <currentStepAgent.icon className="w-4 h-4" />}
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
              {[
                { title: 'Project Created', value: projectName },
                { title: 'Modules Generated', value: `${entities.length + 1} modules` },
                { title: 'Sandbox Live', value: 'Ready for testing' },
              ].map((item) => (
                <Card key={item.title} className="bg-card border-border">
                  <CardContent className="p-4">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mb-2" />
                    <p className="font-medium text-sm">{item.title}</p>
                    <p className="text-xs text-muted-foreground font-mono">{item.value}</p>
                  </CardContent>
                </Card>
              ))}
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
              <span className="font-semibold text-foreground tracking-tight">COGNIX</span>
              <Badge variant="outline" className="text-xs font-mono">MVP 1.0.0</Badge>
            </div>
            <p className="text-sm text-muted-foreground font-mono">
              Step {currentStepIndex + 1} / {steps.length}
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
      <main className="max-w-6xl mx-auto px-6 py-12 pb-32">
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
