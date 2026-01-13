import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Layers, 
  Code2, 
  ArrowRight,
  CheckCircle2,
  Clock,
  AlertCircle,
  Circle,
  Package,
  GitBranch,
  RefreshCw
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useProjectContext } from '@/contexts/ProjectContext';
import { useProjectModules } from '@/hooks/useProjectModules';

type ModuleStatus = 'todo' | 'in_progress' | 'done' | 'blocked';

const statusConfig: Record<ModuleStatus, { label: string; color: string; bg: string; icon: React.ElementType }> = {
  todo: { label: 'Pending', icon: Circle, color: 'text-muted-foreground', bg: 'bg-muted/50' },
  in_progress: { label: 'Building', icon: Clock, color: 'text-primary', bg: 'bg-primary/10' },
  done: { label: 'Ready', icon: CheckCircle2, color: 'text-green-500', bg: 'bg-green-500/10' },
  blocked: { label: 'Blocked', icon: AlertCircle, color: 'text-destructive', bg: 'bg-destructive/10' },
};

const DashboardArchitecture = () => {
  const { currentProject } = useProjectContext();
  const { modules, endpoints, loading, createModulesFromEntities, refreshModules } = useProjectModules(currentProject?.id);

  // Generate modules from entities if none exist
  useEffect(() => {
    if (!loading && modules.length === 0 && currentProject?.entities && currentProject.entities.length > 0) {
      createModulesFromEntities(currentProject.entities, currentProject.id);
    }
  }, [loading, modules.length, currentProject]);

  // Group endpoints by module
  const endpointsByModule = endpoints.reduce((acc, ep) => {
    if (!acc[ep.module]) acc[ep.module] = [];
    acc[ep.module].push(ep);
    return acc;
  }, {} as Record<string, typeof endpoints>);

  // Generate project structure based on modules
  const generateProjectStructure = () => {
    const moduleNames = modules.map(m => m.name);
    let structure = `src/
├── Modules/`;
    
    moduleNames.forEach((name, index) => {
      const isLast = index === moduleNames.length - 1;
      structure += `
│   ${isLast ? '└' : '├'}── ${name}/
│   ${isLast ? ' ' : '│'}   ├── Controllers/
│   ${isLast ? ' ' : '│'}   ├── Entities/
│   ${isLast ? ' ' : '│'}   ├── Services/
│   ${isLast ? ' ' : '│'}   └── DTOs/`;
    });

    structure += `
├── Shared/
│   ├── Infrastructure/
│   ├── Middleware/
│   └── Extensions/
├── Program.cs
└── appsettings.json`;

    return structure;
  };

  if (!currentProject) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-muted-foreground">Select a project to view architecture</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Architecture</h1>
          <p className="text-muted-foreground">Modular Monolith structure for {currentProject.name}</p>
        </div>
        <Button variant="outline" size="sm" onClick={refreshModules} className="gap-2">
          <RefreshCw className="w-4 h-4" />
          Refresh
        </Button>
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
          <div className="grid md:grid-cols-4 gap-4 text-sm">
            <div className="bg-secondary/30 rounded-lg p-4 border border-border">
              <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">Framework</p>
              <p className="font-mono text-foreground">ASP.NET Core Web API</p>
            </div>
            <div className="bg-secondary/30 rounded-lg p-4 border border-border">
              <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">Database</p>
              <p className="font-mono text-foreground">{currentProject.database_type}</p>
            </div>
            <div className="bg-secondary/30 rounded-lg p-4 border border-border">
              <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">Auth</p>
              <p className="font-mono text-foreground">{currentProject.auth_method || 'JWT'}</p>
            </div>
            <div className="bg-secondary/30 rounded-lg p-4 border border-border">
              <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">Modules</p>
              <p className="font-mono text-foreground">{modules.length} modules</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Module Cards */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Modules</h2>
          <div className="flex gap-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Circle className="w-3 h-3" /> Pending
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-primary" /> Building
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-green-500" /> Ready
            </span>
          </div>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="bg-card/50 border-border">
                <CardContent className="p-4">
                  <Skeleton className="h-8 w-24 mb-3" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : modules.length === 0 ? (
          <Card className="bg-card/50 border-border border-dashed">
            <CardContent className="p-8 text-center">
              <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No modules defined</h3>
              <p className="text-muted-foreground mb-4">
                Configure your project requirements to generate modules automatically.
              </p>
              <Button 
                variant="outline" 
                onClick={() => window.location.href = `/dashboard/project/${currentProject.id}/prompt`}
              >
                Configure Requirements
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {modules.map((module, index) => {
              const config = statusConfig[module.status as ModuleStatus] || statusConfig.todo;
              const Icon = config.icon;
              const moduleEndpoints = endpointsByModule[module.name] || [];

              return (
                <motion.div
                  key={module.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
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
                            <p className="text-xs text-muted-foreground">{module.endpoints_count} endpoints</p>
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

                      {/* Endpoints Preview */}
                      {moduleEndpoints.length > 0 && (
                        <div className="mb-3 space-y-1">
                          {moduleEndpoints.slice(0, 3).map((ep) => (
                            <div key={ep.id} className="flex items-center gap-2 text-xs font-mono">
                              <Badge 
                                variant="outline" 
                                className={`text-[10px] px-1.5 ${
                                  ep.method === 'GET' ? 'text-green-500 border-green-500/30' :
                                  ep.method === 'POST' ? 'text-blue-500 border-blue-500/30' :
                                  ep.method === 'PUT' ? 'text-amber-500 border-amber-500/30' :
                                  ep.method === 'DELETE' ? 'text-red-500 border-red-500/30' :
                                  'text-muted-foreground'
                                }`}
                              >
                                {ep.method}
                              </Badge>
                              <span className="text-muted-foreground truncate">{ep.path}</span>
                            </div>
                          ))}
                          {moduleEndpoints.length > 3 && (
                            <p className="text-xs text-muted-foreground">
                              +{moduleEndpoints.length - 3} more endpoints
                            </p>
                          )}
                        </div>
                      )}

                      {/* Dependencies */}
                      {module.dependencies && module.dependencies.length > 0 && (
                        <div>
                          <p className="text-xs text-muted-foreground mb-1.5 flex items-center gap-1">
                            <GitBranch className="w-3 h-3" />
                            Dependencies:
                          </p>
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
        )}
      </div>

      {/* Dependency Graph */}
      {modules.length > 0 && (
        <Card className="bg-card/50 border-border">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold">Dependency Flow</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap items-center justify-center gap-4 py-8">
              {modules.map((module, index) => (
                <div key={module.id} className="flex items-center">
                  <div className={`px-4 py-2 rounded-lg border ${
                    module.status === 'done' ? 'bg-green-500/10 border-green-500/30' :
                    module.status === 'in_progress' ? 'bg-primary/10 border-primary/30' :
                    'bg-secondary/50 border-border'
                  }`}>
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
      )}

      {/* Project Structure */}
      {modules.length > 0 && (
        <Card className="bg-card/50 border-border">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold">Project Structure</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="font-mono text-sm bg-secondary/30 rounded-lg p-4 border border-border overflow-x-auto">
              <pre className="text-muted-foreground">
                {generateProjectStructure()}
              </pre>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DashboardArchitecture;
