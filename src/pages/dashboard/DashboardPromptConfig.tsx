import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  RefreshCw, 
  Play, 
  Plus, 
  X,
  Loader2,
  CheckCircle2,
  Zap,
  Database,
  Shield,
  CreditCard,
  Users,
  Layers
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { useProjectContext } from '@/contexts/ProjectContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const generationSteps = [
  { id: 'analyzing', label: 'Analyzing Requirements', icon: Sparkles },
  { id: 'entities', label: 'Extracting Entities', icon: Database },
  { id: 'auth', label: 'Configuring Auth', icon: Shield },
  { id: 'modules', label: 'Defining Modules', icon: Layers },
  { id: 'tasks', label: 'Creating Tasks', icon: CheckCircle2 },
];

const DashboardPromptConfig = () => {
  const { currentProject, updateProject } = useProjectContext();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Form state
  const [prompt, setPrompt] = useState(currentProject?.prompt || '');
  const [entities, setEntities] = useState<string[]>(currentProject?.entities || []);
  const [newEntity, setNewEntity] = useState('');
  const [authMethod, setAuthMethod] = useState(currentProject?.auth_method || 'JWT + Refresh Token');
  const [payments, setPayments] = useState(currentProject?.payments || '');
  const [multiTenant, setMultiTenant] = useState(currentProject?.multi_tenant || false);
  const [customFeatures, setCustomFeatures] = useState<string[]>(currentProject?.custom_features || []);
  const [newFeature, setNewFeature] = useState('');

  // Generation state
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [generationProgress, setGenerationProgress] = useState(0);

  const addEntity = () => {
    if (newEntity.trim() && !entities.includes(newEntity.trim())) {
      setEntities([...entities, newEntity.trim()]);
      setNewEntity('');
    }
  };

  const removeEntity = (entity: string) => {
    setEntities(entities.filter(e => e !== entity));
  };

  const addFeature = () => {
    if (newFeature.trim() && !customFeatures.includes(newFeature.trim())) {
      setCustomFeatures([...customFeatures, newFeature.trim()]);
      setNewFeature('');
    }
  };

  const removeFeature = (feature: string) => {
    setCustomFeatures(customFeatures.filter(f => f !== feature));
  };

  const handleSaveRequirements = async () => {
    if (!currentProject) return;

    await updateProject(currentProject.id, {
      prompt,
      entities,
      auth_method: authMethod,
      payments: payments || null,
      multi_tenant: multiTenant,
      custom_features: customFeatures,
    });

    toast({
      title: 'Requirements saved',
      description: 'Your project requirements have been updated.',
    });
  };

  const handleStartGeneration = async () => {
    if (!currentProject || !prompt.trim()) {
      toast({
        title: 'Prompt required',
        description: 'Please describe your backend requirements.',
        variant: 'destructive',
      });
      return;
    }

    setIsGenerating(true);
    setCurrentStep(0);
    setGenerationProgress(0);

    // Save requirements first
    await updateProject(currentProject.id, {
      prompt,
      entities,
      auth_method: authMethod,
      payments: payments || null,
      multi_tenant: multiTenant,
      custom_features: customFeatures,
      status: 'generating' as any,
      is_generating: true,
      generation_step: 'analysis',
    });

    // Simulate generation steps
    for (let i = 0; i < generationSteps.length; i++) {
      setCurrentStep(i);
      
      // Simulate progress for each step
      for (let p = 0; p <= 100; p += 10) {
        setGenerationProgress(p);
        await new Promise(resolve => setTimeout(resolve, 150));
      }

      // Add agent activity for each step
      await supabase.from('agent_activities').insert({
        project_id: currentProject.id,
        agent_name: i === 0 ? 'Architect Agent' : 
                    i === 1 ? 'Database Agent' :
                    i === 2 ? 'Security Agent' :
                    i === 3 ? 'API Agent' : 'Task Agent',
        action: `Completed: ${generationSteps[i].label}`,
      });

      await new Promise(resolve => setTimeout(resolve, 500));
    }

    // Create sample tasks based on entities
    const defaultTasks = [
      { task_code: 'REQ-001', title: 'Validate requirements', module: 'Core', status: 'done' },
      { task_code: 'ARCH-001', title: 'Define module structure', module: 'Core', status: 'done' },
      ...entities.slice(0, 3).map((entity, i) => ({
        task_code: `ENT-00${i + 1}`,
        title: `Create ${entity} entity`,
        module: entity,
        status: 'todo',
      })),
      { task_code: 'AUTH-001', title: 'Implement JWT authentication', module: 'Auth', status: 'todo' },
      { task_code: 'API-001', title: 'Generate API endpoints', module: 'API', status: 'todo' },
    ];

    for (const task of defaultTasks) {
      await supabase.from('project_tasks').insert({
        project_id: currentProject.id,
        ...task,
        position: defaultTasks.indexOf(task),
      });
    }

    // Update project status
    await updateProject(currentProject.id, {
      status: 'ready' as any,
      is_generating: false,
      generation_step: 'tasks',
    });

    setIsGenerating(false);

    toast({
      title: 'Generation complete!',
      description: 'Your backend structure has been created. Check the Tasks board.',
    });

    // Navigate to tasks
    navigate(`/dashboard/project/${currentProject.id}/tasks`);
  };

  if (!currentProject) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-muted-foreground">Select a project to configure</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Configure Requirements</h1>
          <p className="text-muted-foreground">Define your backend requirements and start generation</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleSaveRequirements} disabled={isGenerating}>
            Save Draft
          </Button>
          <Button onClick={handleStartGeneration} disabled={isGenerating || !prompt.trim()} className="gap-2">
            {isGenerating ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Zap className="w-4 h-4" />
            )}
            {isGenerating ? 'Generating...' : 'Start Generation'}
          </Button>
        </div>
      </div>

      {/* Generation Progress */}
      {isGenerating && (
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Loader2 className="w-5 h-5 text-primary animate-spin" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-foreground">
                  {generationSteps[currentStep]?.label || 'Processing...'}
                </p>
                <p className="text-sm text-muted-foreground">
                  Step {currentStep + 1} of {generationSteps.length}
                </p>
              </div>
            </div>
            <Progress value={(currentStep / generationSteps.length) * 100 + (generationProgress / generationSteps.length)} className="h-2" />
            <div className="flex justify-between mt-4">
              {generationSteps.map((step, index) => {
                const Icon = step.icon;
                const isComplete = index < currentStep;
                const isCurrent = index === currentStep;
                
                return (
                  <div key={step.id} className="flex flex-col items-center gap-1">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      isComplete ? 'bg-green-500/20 text-green-500' :
                      isCurrent ? 'bg-primary/20 text-primary' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      {isComplete ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : (
                        <Icon className="w-4 h-4" />
                      )}
                    </div>
                    <span className={`text-[10px] text-center max-w-[60px] ${
                      isComplete || isCurrent ? 'text-foreground' : 'text-muted-foreground'
                    }`}>
                      {step.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Form */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left - Prompt */}
        <Card className="bg-card/50 border-border">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              Describe Your Backend
            </CardTitle>
            <CardDescription>
              Tell Cognix what you want to build. Be specific about features, entities, and integrations.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Example: Build an e-commerce API with products, orders, cart, user authentication, and Stripe payments. Include inventory management and order tracking."
              className="min-h-[200px] bg-secondary/50 border-border"
              disabled={isGenerating}
            />
            <p className="text-xs text-muted-foreground mt-2">
              Tip: Include entities, authentication requirements, and any third-party integrations.
            </p>
          </CardContent>
        </Card>

        {/* Right - Entities */}
        <Card className="bg-card/50 border-border">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Database className="w-5 h-5 text-primary" />
              Entities
            </CardTitle>
            <CardDescription>
              Define the main data models for your backend
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={newEntity}
                onChange={(e) => setNewEntity(e.target.value)}
                placeholder="e.g., User, Product, Order"
                onKeyDown={(e) => e.key === 'Enter' && addEntity()}
                disabled={isGenerating}
              />
              <Button onClick={addEntity} size="sm" disabled={isGenerating}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {entities.map((entity) => (
                <motion.div
                  key={entity}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <Badge variant="secondary" className="gap-1 font-mono">
                    {entity}
                    <button 
                      onClick={() => removeEntity(entity)} 
                      className="hover:text-destructive"
                      disabled={isGenerating}
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                </motion.div>
              ))}
              {entities.length === 0 && (
                <p className="text-sm text-muted-foreground">No entities added yet</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Configuration Options */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Authentication */}
        <Card className="bg-card/50 border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary" />
              Authentication
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={authMethod} onValueChange={setAuthMethod} disabled={isGenerating}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="JWT + Refresh Token">JWT + Refresh Token</SelectItem>
                <SelectItem value="JWT Only">JWT Only</SelectItem>
                <SelectItem value="OAuth 2.0">OAuth 2.0</SelectItem>
                <SelectItem value="API Key">API Key</SelectItem>
                <SelectItem value="None">None (Public API)</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Payments */}
        <Card className="bg-card/50 border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-primary" />
              Payments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={payments || 'none'} onValueChange={(v) => setPayments(v === 'none' ? '' : v)} disabled={isGenerating}>
              <SelectTrigger>
                <SelectValue placeholder="Select provider" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="Stripe">Stripe</SelectItem>
                <SelectItem value="PayPal">PayPal</SelectItem>
                <SelectItem value="Razorpay">Razorpay</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Multi-Tenant */}
        <Card className="bg-card/50 border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Users className="w-4 h-4 text-primary" />
              Multi-Tenant
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="multi-tenant">Enable multi-tenancy</Label>
                <p className="text-xs text-muted-foreground">Isolate data per organization</p>
              </div>
              <Switch
                id="multi-tenant"
                checked={multiTenant}
                onCheckedChange={setMultiTenant}
                disabled={isGenerating}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Custom Features */}
      <Card className="bg-card/50 border-border">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Custom Features</CardTitle>
          <CardDescription>
            Add any additional features or integrations you need
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={newFeature}
              onChange={(e) => setNewFeature(e.target.value)}
              placeholder="e.g., Webhook handling, Email notifications, File uploads"
              onKeyDown={(e) => e.key === 'Enter' && addFeature()}
              disabled={isGenerating}
            />
            <Button onClick={addFeature} size="sm" disabled={isGenerating}>
              <Plus className="w-4 h-4 mr-1" />
              Add
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {customFeatures.map((feature) => (
              <Badge key={feature} variant="outline" className="gap-1">
                {feature}
                <button 
                  onClick={() => removeFeature(feature)} 
                  className="hover:text-destructive"
                  disabled={isGenerating}
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Backend Stack Info */}
      <Card className="bg-card/50 border-border">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Generated Backend Stack</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-secondary/30 rounded-lg p-4 border border-border">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Framework</p>
              <p className="font-mono text-sm text-foreground">.NET 8</p>
              <p className="text-xs text-muted-foreground">ASP.NET Core Web API</p>
            </div>
            <div className="bg-secondary/30 rounded-lg p-4 border border-border">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Architecture</p>
              <p className="font-mono text-sm text-foreground">Modular Monolith</p>
              <p className="text-xs text-muted-foreground">Clean Architecture</p>
            </div>
            <div className="bg-secondary/30 rounded-lg p-4 border border-border">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Database</p>
              <p className="font-mono text-sm text-foreground">PostgreSQL</p>
              <p className="text-xs text-muted-foreground">Entity Framework Core</p>
            </div>
            <div className="bg-secondary/30 rounded-lg p-4 border border-border">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">API Spec</p>
              <p className="font-mono text-sm text-foreground">OpenAPI 3.0</p>
              <p className="text-xs text-muted-foreground">Swagger UI</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardPromptConfig;
