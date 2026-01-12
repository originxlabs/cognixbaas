import { motion } from 'framer-motion';
import { 
  Layers, 
  Code2, 
  ArrowRight,
  CheckCircle2,
  Clock,
  AlertCircle,
  Circle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useDashboardStore } from '@/stores/dashboardStore';
import type { TaskStatus } from '@/components/dashboard/types';

const statusConfig: Record<TaskStatus, { label: string; color: string; bg: string; icon: React.ElementType }> = {
  todo: { label: 'Pending', icon: Circle, color: 'text-muted-foreground', bg: 'bg-muted/50' },
  in_progress: { label: 'Building', icon: Clock, color: 'text-primary', bg: 'bg-primary/10' },
  done: { label: 'Ready', icon: CheckCircle2, color: 'text-green-500', bg: 'bg-green-500/10' },
  blocked: { label: 'Blocked', icon: AlertCircle, color: 'text-destructive', bg: 'bg-destructive/10' },
};

const DashboardArchitecture = () => {
  const { modules } = useDashboardStore();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Architecture</h1>
        <p className="text-muted-foreground">Modular Monolith structure and dependencies</p>
      </div>

      {/* Architecture Overview */}
      <Card className="bg-card/50 border-border">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-primary" />
            <CardTitle className="text-lg font-semibold">.NET 8 Modular Monolith</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="bg-secondary/30 rounded-lg p-4 border border-border">
              <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">Framework</p>
              <p className="font-mono text-foreground">ASP.NET Core Web API</p>
            </div>
            <div className="bg-secondary/30 rounded-lg p-4 border border-border">
              <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">ORM</p>
              <p className="font-mono text-foreground">Entity Framework Core</p>
            </div>
            <div className="bg-secondary/30 rounded-lg p-4 border border-border">
              <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">API Spec</p>
              <p className="font-mono text-foreground">OpenAPI 3.0 (Swagger)</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Module Cards */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">Modules</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {modules.map((module, index) => {
            const config = statusConfig[module.status];
            const Icon = config.icon;

            return (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-card/50 border-border hover:border-primary/30 transition-colors h-full">
                  <CardContent className="p-4">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Code2 className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">{module.name}</h3>
                          <p className="text-xs text-muted-foreground">{module.endpointsCount} endpoints</p>
                        </div>
                      </div>
                      <div className={`flex items-center gap-1 ${config.color}`}>
                        <Icon className="w-3.5 h-3.5" />
                        <span className="text-xs font-medium">{config.label}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground mb-3">
                      {module.description}
                    </p>

                    {/* Dependencies */}
                    {module.dependencies.length > 0 && (
                      <div>
                        <p className="text-xs text-muted-foreground mb-1.5">Dependencies:</p>
                        <div className="flex flex-wrap gap-1.5">
                          {module.dependencies.map((dep) => (
                            <Badge key={dep} variant="outline" className="text-xs font-mono">
                              {dep}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Dependency Graph */}
      <Card className="bg-card/50 border-border">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold">Dependency Flow</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center justify-center gap-4 py-8">
            {modules.map((module, index) => (
              <div key={module.id} className="flex items-center">
                <div className="px-4 py-2 rounded-lg bg-secondary/50 border border-border">
                  <span className="text-sm font-medium text-foreground">{module.name}</span>
                </div>
                {index < modules.length - 1 && (
                  <ArrowRight className="w-4 h-4 text-muted-foreground mx-2" />
                )}
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-muted-foreground mt-4">
            Visual dependency graph • Modules are built in dependency order
          </p>
        </CardContent>
      </Card>

      {/* Project Structure */}
      <Card className="bg-card/50 border-border">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold">Project Structure</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="font-mono text-sm bg-secondary/30 rounded-lg p-4 border border-border overflow-x-auto">
            <pre className="text-muted-foreground">
{`src/
├── Modules/
│   ├── Auth/
│   │   ├── Controllers/
│   │   ├── Services/
│   │   ├── DTOs/
│   │   └── Validators/
│   ├── Users/
│   │   ├── Controllers/
│   │   ├── Entities/
│   │   ├── Services/
│   │   └── Repositories/
│   ├── Orders/
│   │   └── ...
│   ├── Products/
│   │   └── ...
│   └── Payments/
│       └── ...
├── Shared/
│   ├── Infrastructure/
│   ├── Middleware/
│   └── Extensions/
├── Program.cs
└── appsettings.json`}
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardArchitecture;
