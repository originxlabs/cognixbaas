import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Rocket, 
  Play,
  Square,
  RotateCcw,
  ExternalLink,
  Terminal,
  Clock,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Copy,
  Check
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useDashboardStore } from '@/stores/dashboardStore';

const statusConfig = {
  idle: { label: 'Idle', color: 'bg-muted-foreground', icon: Square },
  deploying: { label: 'Deploying...', color: 'bg-yellow-500 animate-pulse', icon: Loader2 },
  running: { label: 'Running', color: 'bg-green-500', icon: CheckCircle2 },
  stopped: { label: 'Stopped', color: 'bg-muted-foreground', icon: Square },
  error: { label: 'Error', color: 'bg-destructive', icon: AlertCircle },
};

function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  
  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} min ago`;
  
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}d ago`;
}

const DashboardSandbox = () => {
  const { sandbox, currentProject } = useDashboardStore();
  const [isDeploying, setIsDeploying] = useState(false);
  const [copied, setCopied] = useState(false);

  const config = statusConfig[sandbox.status];
  const StatusIcon = config.icon;

  const handleDeploy = () => {
    setIsDeploying(true);
    setTimeout(() => setIsDeploying(false), 3000);
  };

  const handleCopyUrl = () => {
    if (sandbox.url) {
      navigator.clipboard.writeText(sandbox.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Sandbox Deployment</h1>
        <p className="text-muted-foreground">Deploy and test your generated backend</p>
      </div>

      {/* Deployment Status */}
      <Card className="bg-card/50 border-border">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                sandbox.status === 'running' ? 'bg-green-500/10' :
                sandbox.status === 'deploying' ? 'bg-yellow-500/10' :
                'bg-secondary/50'
              }`}>
                <Rocket className={`w-7 h-7 ${
                  sandbox.status === 'running' ? 'text-green-500' :
                  sandbox.status === 'deploying' ? 'text-yellow-500' :
                  'text-muted-foreground'
                }`} />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-lg font-semibold text-foreground">
                    {currentProject?.name} Sandbox
                  </h2>
                  <Badge variant="outline" className="gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${config.color}`} />
                    {config.label}
                  </Badge>
                </div>
                {sandbox.lastDeployedAt && (
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    Last deployed: {formatTimeAgo(sandbox.lastDeployedAt)}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3">
              {sandbox.status === 'running' ? (
                <>
                  <Button variant="outline" className="gap-2">
                    <Square className="w-4 h-4" />
                    Stop
                  </Button>
                  <Button variant="outline" className="gap-2" onClick={handleDeploy}>
                    <RotateCcw className="w-4 h-4" />
                    Redeploy
                  </Button>
                </>
              ) : (
                <Button 
                  className="gap-2" 
                  onClick={handleDeploy}
                  disabled={isDeploying}
                >
                  {isDeploying ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Play className="w-4 h-4" />
                  )}
                  {isDeploying ? 'Deploying...' : 'Deploy Sandbox'}
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sandbox URL */}
      {sandbox.url && sandbox.status === 'running' && (
        <Card className="bg-card/50 border-border">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold">Sandbox URL</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-secondary/30 rounded-lg px-4 py-3 border border-border font-mono text-sm text-foreground">
                {sandbox.url}
              </div>
              <Button variant="outline" size="icon" onClick={handleCopyUrl}>
                {copied ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
              <Button variant="outline" className="gap-2">
                <ExternalLink className="w-4 h-4" />
                Open
              </Button>
            </div>

            <div className="mt-4 grid md:grid-cols-3 gap-4">
              <a href="#" className="block p-4 bg-secondary/30 rounded-lg border border-border hover:border-primary/30 transition-colors">
                <p className="text-sm font-medium text-foreground mb-1">Swagger UI</p>
                <p className="text-xs text-muted-foreground">/swagger</p>
              </a>
              <a href="#" className="block p-4 bg-secondary/30 rounded-lg border border-border hover:border-primary/30 transition-colors">
                <p className="text-sm font-medium text-foreground mb-1">Health Check</p>
                <p className="text-xs text-muted-foreground">/health</p>
              </a>
              <a href="#" className="block p-4 bg-secondary/30 rounded-lg border border-border hover:border-primary/30 transition-colors">
                <p className="text-sm font-medium text-foreground mb-1">API Base</p>
                <p className="text-xs text-muted-foreground">/api/v1</p>
              </a>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Deployment Logs */}
      <Card className="bg-card/50 border-border">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Terminal className="w-5 h-5 text-primary" />
              <CardTitle className="text-lg font-semibold">Deployment Logs</CardTitle>
            </div>
            <Badge variant="outline" className="gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              Live
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="bg-[#0d1117] rounded-lg p-4 font-mono text-sm overflow-x-auto border border-border">
            <div className="space-y-1">
              {sandbox.logs.map((log, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={`${
                    log.includes('[ERROR]') ? 'text-red-400' :
                    log.includes('[WARN]') ? 'text-yellow-400' :
                    log.includes('[INFO]') ? 'text-green-400' :
                    'text-gray-400'
                  }`}
                >
                  {log}
                </motion.div>
              ))}
              <div className="text-gray-500 animate-pulse">█</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="bg-card/50 border-border">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Uptime</p>
            <p className="text-2xl font-bold text-foreground mt-1">99.9%</p>
          </CardContent>
        </Card>
        <Card className="bg-card/50 border-border">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Requests</p>
            <p className="text-2xl font-bold text-foreground mt-1">1,234</p>
          </CardContent>
        </Card>
        <Card className="bg-card/50 border-border">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Avg Response</p>
            <p className="text-2xl font-bold text-foreground mt-1">45ms</p>
          </CardContent>
        </Card>
        <Card className="bg-card/50 border-border">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Memory</p>
            <p className="text-2xl font-bold text-foreground mt-1">128MB</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardSandbox;
