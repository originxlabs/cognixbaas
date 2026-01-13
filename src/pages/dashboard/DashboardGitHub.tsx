import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Github, 
  GitBranch,
  RefreshCw,
  Check,
  AlertCircle,
  Clock,
  ExternalLink,
  Link2,
  Unlink
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useDashboardStore } from '@/stores/dashboardStore';

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

const statusConfig = {
  connected: { label: 'Connected', color: 'bg-green-500', icon: Check },
  disconnected: { label: 'Disconnected', color: 'bg-muted-foreground', icon: Unlink },
  syncing: { label: 'Syncing...', color: 'bg-primary animate-pulse', icon: RefreshCw },
  error: { label: 'Error', color: 'bg-destructive', icon: AlertCircle },
};

const DashboardGitHub = () => {
  const { github } = useDashboardStore();
  const [isSyncing, setIsSyncing] = useState(false);

  const config = statusConfig[github.status];
  const StatusIcon = config.icon;

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => setIsSyncing(false), 2000);
  };

  const recentCommits = [
    { hash: 'a1b2c3d', message: 'feat: Add JWT authentication middleware', author: 'cognix-bot', time: new Date(Date.now() - 5 * 60 * 1000) },
    { hash: 'e4f5g6h', message: 'feat: Create UsersController with CRUD', author: 'cognix-bot', time: new Date(Date.now() - 12 * 60 * 1000) },
    { hash: 'i7j8k9l', message: 'chore: Initial project structure', author: 'cognix-bot', time: new Date(Date.now() - 25 * 60 * 1000) },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">GitHub Integration</h1>
        <p className="text-muted-foreground">Repository connection and sync status</p>
      </div>

      {/* Connection Status */}
      <Card className="bg-card/50 border-border">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-secondary/50 flex items-center justify-center">
                <Github className="w-7 h-7 text-foreground" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-lg font-semibold text-foreground">
                    {github.repository || 'No Repository Connected'}
                  </h2>
                  <Badge variant="outline" className="gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${config.color}`} />
                    {config.label}
                  </Badge>
                </div>
                {github.connected && (
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <GitBranch className="w-4 h-4" />
                      {github.branch}
                    </span>
                    {github.lastSyncAt && (
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        Last sync: {formatTimeAgo(github.lastSyncAt)}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3">
              {github.connected ? (
                <>
                  <Button 
                    variant="outline" 
                    className="gap-2"
                    onClick={handleSync}
                    disabled={isSyncing}
                  >
                    <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
                    {isSyncing ? 'Syncing...' : 'Sync Now'}
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <ExternalLink className="w-4 h-4" />
                    View on GitHub
                  </Button>
                </>
              ) : (
                <Button className="gap-2">
                  <Github className="w-4 h-4" />
                  Connect Repository
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Repository Details */}
      {github.connected && (
        <div className="grid md:grid-cols-2 gap-6">
          {/* Recent Commits */}
          <Card className="bg-card/50 border-border">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold">Recent Commits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentCommits.map((commit, index) => (
                  <motion.div
                    key={commit.hash}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3 p-3 bg-secondary/30 rounded-lg border border-border"
                  >
                    <code className="text-xs font-mono text-primary bg-primary/10 px-2 py-1 rounded">
                      {commit.hash}
                    </code>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground truncate">{commit.message}</p>
                      <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                        <span>{commit.author}</span>
                        <span>•</span>
                        <span>{formatTimeAgo(commit.time)}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Sync Settings */}
          <Card className="bg-card/50 border-border">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold">Sync Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                  Target Branch
                </label>
                <Input 
                  value={github.branch} 
                  className="mt-2 bg-secondary/50 border-border font-mono"
                  readOnly
                />
              </div>

              <div>
                <label className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                  Auto-Sync
                </label>
                <div className="mt-2 flex items-center gap-3">
                  <Badge variant="secondary">Enabled</Badge>
                  <span className="text-sm text-muted-foreground">Syncs on every generation</span>
                </div>
              </div>

              <div>
                <label className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                  Commit Prefix
                </label>
                <Input 
                  value="cognix:" 
                  className="mt-2 bg-secondary/50 border-border font-mono"
                  readOnly
                />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Connect Repository (when disconnected) */}
      {!github.connected && (
        <Card className="bg-card/50 border-border">
          <CardContent className="p-8">
            <div className="text-center max-w-md mx-auto">
              <div className="w-16 h-16 rounded-full bg-secondary/50 flex items-center justify-center mx-auto mb-4">
                <Link2 className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Connect Your Repository</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Link a GitHub repository to automatically push generated code and track changes.
              </p>
              <div className="space-y-3">
                <Input 
                  placeholder="https://github.com/username/repository"
                  className="bg-secondary/50 border-border"
                />
                <Button className="w-full gap-2">
                  <Github className="w-4 h-4" />
                  Connect Repository
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DashboardGitHub;
