import { motion } from 'framer-motion';
import { 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Circle,
  Layers,
  Code2,
  Database,
  Rocket,
  ArrowRight
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useDashboardStore } from '@/stores/dashboardStore';
import { Link } from 'react-router-dom';

const DashboardOverview = () => {
  const { currentProject, tasks, modules, requirements, generationStep, isGenerating } = useDashboardStore();

  const completedTasks = tasks.filter(t => t.status === 'done').length;
  const inProgressTasks = tasks.filter(t => t.status === 'in_progress').length;
  const blockedTasks = tasks.filter(t => t.status === 'blocked').length;
  const progressPercent = Math.round((completedTasks / tasks.length) * 100);

  const steps = [
    { id: 'prompt', label: 'Requirements', done: true },
    { id: 'analysis', label: 'Analysis', done: true },
    { id: 'tasks', label: 'Tasks', done: true },
    { id: 'architecture', label: 'Architecture', done: true },
    { id: 'apis', label: 'API Generation', active: generationStep === 'apis' },
    { id: 'database', label: 'Database', active: generationStep === 'database' },
    { id: 'sandbox', label: 'Sandbox Deploy', active: generationStep === 'sandbox' },
  ];

  const currentStepIndex = steps.findIndex(s => s.active);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Overview</h1>
        <p className="text-muted-foreground">Project status and generation progress</p>
      </div>

      {/* Project Info Card */}
      <Card className="bg-card/50 border-border">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-semibold text-foreground">
                  {currentProject?.name}
                </h2>
                <Badge variant="outline" className="font-mono text-xs">
                  {currentProject?.shortCode}
                </Badge>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>Backend: <span className="text-foreground">{currentProject?.backendType}</span></span>
                <span>Database: <span className="text-foreground">{currentProject?.database}</span></span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-2xl font-bold text-foreground">{progressPercent}%</div>
                <div className="text-xs text-muted-foreground">Complete</div>
              </div>
              <div className="w-24">
                <Progress value={progressPercent} className="h-2" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Generation Timeline */}
      <Card className="bg-card/50 border-border">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold">Generation Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between overflow-x-auto pb-2">
            {steps.map((step, index) => {
              const isDone = step.done || index < currentStepIndex;
              const isActive = step.active;
              
              return (
                <div key={step.id} className="flex items-center">
                  <motion.div 
                    className="flex flex-col items-center min-w-[100px]"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                      isDone ? 'bg-green-500/20 text-green-500' :
                      isActive ? 'bg-primary/20 text-primary' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      {isDone ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : isActive ? (
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ repeat: Infinity, duration: 1.5 }}
                        >
                          <Clock className="w-4 h-4" />
                        </motion.div>
                      ) : (
                        <Circle className="w-4 h-4" />
                      )}
                    </div>
                    <span className={`text-xs font-medium text-center ${
                      isDone ? 'text-green-500' :
                      isActive ? 'text-primary' :
                      'text-muted-foreground'
                    }`}>
                      {step.label}
                    </span>
                  </motion.div>
                  {index < steps.length - 1 && (
                    <div className={`h-px w-8 mx-2 ${
                      isDone ? 'bg-green-500' : 'bg-border'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-card/50 border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">{completedTasks}</div>
                <div className="text-xs text-muted-foreground">Completed</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">{inProgressTasks}</div>
                <div className="text-xs text-muted-foreground">In Progress</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">{blockedTasks}</div>
                <div className="text-xs text-muted-foreground">Blocked</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <Layers className="w-5 h-5 text-accent" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">{modules.length}</div>
                <div className="text-xs text-muted-foreground">Modules</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Requirements Summary */}
      {requirements && (
        <Card className="bg-card/50 border-border">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">Requirements Summary</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/dashboard/prompt" className="gap-1">
                  View Details <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div>
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">Entities</span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {requirements.entities.map((entity) => (
                      <Badge key={entity} variant="secondary" className="font-mono text-xs">
                        {entity}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">Authentication</span>
                  <p className="text-sm text-foreground mt-1">{requirements.authMethod}</p>
                </div>
              </div>
              <div className="space-y-3">
                {requirements.payments && (
                  <div>
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">Payments</span>
                    <p className="text-sm text-foreground mt-1">{requirements.payments}</p>
                  </div>
                )}
                <div>
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">Multi-Tenant</span>
                  <p className="text-sm text-foreground mt-1">{requirements.multiTenant ? 'Yes' : 'No'}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-4">
        <Link to="/dashboard/tasks">
          <Card className="bg-card/50 border-border hover:border-primary/50 transition-colors cursor-pointer h-full">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Code2 className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="font-medium text-foreground">View Kanban</div>
                <div className="text-xs text-muted-foreground">Track task progress</div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link to="/dashboard/apis">
          <Card className="bg-card/50 border-border hover:border-primary/50 transition-colors cursor-pointer h-full">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Database className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="font-medium text-foreground">API Docs</div>
                <div className="text-xs text-muted-foreground">View Swagger preview</div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link to="/dashboard/sandbox">
          <Card className="bg-card/50 border-border hover:border-primary/50 transition-colors cursor-pointer h-full">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Rocket className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="font-medium text-foreground">Sandbox</div>
                <div className="text-xs text-muted-foreground">Deploy and test</div>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
};

export default DashboardOverview;
