import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Github,
  GitBranch,
  GitCommit,
  GitPullRequest,
  RefreshCw,
  Check,
  ExternalLink,
  AlertCircle,
  Shield,
  ArrowLeftRight,
  Settings2,
  Unlink,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

interface GitHubAppInstallProps {
  projectId: string;
  projectName: string;
  isConnected?: boolean;
  repository?: string;
  branch?: string;
  lastSync?: Date;
  onConnect?: (config: GitHubConfig) => void;
  onDisconnect?: () => void;
}

interface GitHubConfig {
  repository: string;
  branch: string;
  autoSync: boolean;
  bidirectionalSync: boolean;
  commitPrefix: string;
}

const COGNIX_GITHUB_APP_URL = 'https://github.com/apps/cognix-backend-engine';

export const GitHubAppInstall = ({
  projectId,
  projectName,
  isConnected = false,
  repository,
  branch = 'main',
  lastSync,
  onConnect,
  onDisconnect,
}: GitHubAppInstallProps) => {
  const { toast } = useToast();
  const [step, setStep] = useState<'install' | 'configure' | 'connected'>(
    isConnected ? 'connected' : 'install'
  );
  const [isInstalling, setIsInstalling] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncProgress, setSyncProgress] = useState(0);
  const [showDisconnectDialog, setShowDisconnectDialog] = useState(false);

  const [config, setConfig] = useState<GitHubConfig>({
    repository: repository || '',
    branch: branch,
    autoSync: true,
    bidirectionalSync: true,
    commitPrefix: 'cognix:',
  });

  const [availableRepos] = useState([
    { name: 'acme/backend-api', private: true },
    { name: 'acme/payment-service', private: true },
    { name: 'acme/user-management', private: false },
  ]);

  const handleInstallApp = () => {
    setIsInstalling(true);
    // Open GitHub app installation in new window
    window.open(COGNIX_GITHUB_APP_URL, '_blank', 'width=800,height=600');

    // Simulate callback after installation
    setTimeout(() => {
      setIsInstalling(false);
      setStep('configure');
      toast({
        title: 'GitHub App installed',
        description: 'Now select a repository to connect.',
      });
    }, 2000);
  };

  const handleConnect = () => {
    if (!config.repository) {
      toast({
        title: 'Repository required',
        description: 'Please select a repository to connect.',
        variant: 'destructive',
      });
      return;
    }

    onConnect?.(config);
    setStep('connected');
    toast({
      title: 'Repository connected',
      description: `${config.repository} is now synced with Cognix.`,
    });
  };

  const handleSync = async () => {
    setIsSyncing(true);
    setSyncProgress(0);

    // Simulate sync progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise((resolve) => setTimeout(resolve, 200));
      setSyncProgress(i);
    }

    setIsSyncing(false);
    toast({
      title: 'Sync complete',
      description: 'All changes have been synchronized.',
    });
  };

  const handleDisconnect = () => {
    onDisconnect?.();
    setStep('install');
    setShowDisconnectDialog(false);
    toast({
      title: 'Repository disconnected',
      description: 'GitHub integration has been removed.',
    });
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${Math.floor(diffHours / 24)}d ago`;
  };

  if (step === 'connected' || isConnected) {
    return (
      <div className="space-y-6">
        {/* Connection Status Card */}
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
                      {config.repository || repository}
                    </h2>
                    <Badge variant="outline" className="gap-1.5 bg-green-500/10 text-green-500 border-green-500/30">
                      <span className="w-2 h-2 rounded-full bg-green-500" />
                      Connected
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <GitBranch className="w-4 h-4" />
                      {config.branch}
                    </span>
                    {lastSync && (
                      <span>Last sync: {formatTimeAgo(lastSync)}</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  onClick={handleSync}
                  disabled={isSyncing}
                  className="gap-2"
                >
                  <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
                  {isSyncing ? 'Syncing...' : 'Sync Now'}
                </Button>
                <Button variant="outline" className="gap-2" asChild>
                  <a href={`https://github.com/${config.repository || repository}`} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4" />
                    View on GitHub
                  </a>
                </Button>
              </div>
            </div>

            {isSyncing && (
              <div className="mt-4">
                <Progress value={syncProgress} className="h-1" />
                <p className="text-xs text-muted-foreground mt-2">
                  Synchronizing changes... {syncProgress}%
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Sync Settings */}
        <Card className="bg-card/50 border-border">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Settings2 className="w-5 h-5" />
              Sync Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Auto-Sync on Generation</Label>
                    <p className="text-xs text-muted-foreground">
                      Automatically push changes after code generation
                    </p>
                  </div>
                  <Switch
                    checked={config.autoSync}
                    onCheckedChange={(checked) => setConfig({ ...config, autoSync: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="flex items-center gap-2">
                      <ArrowLeftRight className="w-4 h-4 text-primary" />
                      Bidirectional Sync
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Pull changes from GitHub back to Cognix
                    </p>
                  </div>
                  <Switch
                    checked={config.bidirectionalSync}
                    onCheckedChange={(checked) =>
                      setConfig({ ...config, bidirectionalSync: checked })
                    }
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Target Branch</Label>
                  <Select
                    value={config.branch}
                    onValueChange={(value) => setConfig({ ...config, branch: value })}
                  >
                    <SelectTrigger className="bg-secondary/50">
                      <SelectValue placeholder="Select branch" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="main">main</SelectItem>
                      <SelectItem value="develop">develop</SelectItem>
                      <SelectItem value="staging">staging</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Commit Prefix</Label>
                  <Input
                    value={config.commitPrefix}
                    onChange={(e) => setConfig({ ...config, commitPrefix: e.target.value })}
                    className="font-mono bg-secondary/50"
                    placeholder="cognix:"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-border">
              <Dialog open={showDisconnectDialog} onOpenChange={setShowDisconnectDialog}>
                <DialogTrigger asChild>
                  <Button variant="ghost" className="text-destructive hover:text-destructive gap-2">
                    <Unlink className="w-4 h-4" />
                    Disconnect Repository
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Disconnect GitHub Repository?</DialogTitle>
                    <DialogDescription>
                      This will remove the connection between Cognix and your GitHub repository.
                      Your code will remain in GitHub, but automatic syncing will stop.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex justify-end gap-3 mt-4">
                    <Button variant="outline" onClick={() => setShowDisconnectDialog(false)}>
                      Cancel
                    </Button>
                    <Button variant="destructive" onClick={handleDisconnect}>
                      Disconnect
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              <Button className="gap-2">
                <Check className="w-4 h-4" />
                Save Settings
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="bg-card/50 border-border">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <GitCommit className="w-5 h-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                {
                  type: 'commit',
                  message: 'feat: Add JWT authentication middleware',
                  author: 'cognix-bot',
                  time: new Date(Date.now() - 5 * 60 * 1000),
                },
                {
                  type: 'commit',
                  message: 'feat: Create UsersController with CRUD',
                  author: 'cognix-bot',
                  time: new Date(Date.now() - 12 * 60 * 1000),
                },
                {
                  type: 'sync',
                  message: 'Pulled changes from main branch',
                  author: 'cognix-bot',
                  time: new Date(Date.now() - 30 * 60 * 1000),
                },
              ].map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3 p-3 bg-secondary/30 rounded-lg"
                >
                  {activity.type === 'commit' ? (
                    <GitCommit className="w-4 h-4 text-primary mt-1" />
                  ) : (
                    <RefreshCw className="w-4 h-4 text-green-500 mt-1" />
                  )}
                  <div className="flex-1">
                    <p className="text-sm text-foreground">{activity.message}</p>
                    <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                      <span>{activity.author}</span>
                      <span>•</span>
                      <span>{formatTimeAgo(activity.time)}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (step === 'configure') {
    return (
      <Card className="bg-card/50 border-border max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Github className="w-6 h-6" />
            Connect Repository
          </CardTitle>
          <CardDescription>
            Select a repository to sync with your Cognix project
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Repository</Label>
            <Select
              value={config.repository}
              onValueChange={(value) => setConfig({ ...config, repository: value })}
            >
              <SelectTrigger className="bg-secondary/50">
                <SelectValue placeholder="Select a repository" />
              </SelectTrigger>
              <SelectContent>
                {availableRepos.map((repo) => (
                  <SelectItem key={repo.name} value={repo.name}>
                    <div className="flex items-center gap-2">
                      {repo.name}
                      {repo.private && (
                        <Shield className="w-3 h-3 text-muted-foreground" />
                      )}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Branch</Label>
            <Select
              value={config.branch}
              onValueChange={(value) => setConfig({ ...config, branch: value })}
            >
              <SelectTrigger className="bg-secondary/50">
                <SelectValue placeholder="Select branch" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="main">main</SelectItem>
                <SelectItem value="develop">develop</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4 pt-4 border-t border-border">
            <div className="flex items-center justify-between">
              <div>
                <Label>Auto-Sync</Label>
                <p className="text-xs text-muted-foreground">
                  Automatically push after generation
                </p>
              </div>
              <Switch
                checked={config.autoSync}
                onCheckedChange={(checked) => setConfig({ ...config, autoSync: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="flex items-center gap-2">
                  <ArrowLeftRight className="w-4 h-4 text-primary" />
                  Bidirectional Sync
                </Label>
                <p className="text-xs text-muted-foreground">
                  Pull external changes back to Cognix
                </p>
              </div>
              <Switch
                checked={config.bidirectionalSync}
                onCheckedChange={(checked) =>
                  setConfig({ ...config, bidirectionalSync: checked })
                }
              />
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={() => setStep('install')}>
              Back
            </Button>
            <Button onClick={handleConnect} className="gap-2">
              <Check className="w-4 h-4" />
              Connect Repository
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Install step
  return (
    <Card className="bg-card/50 border-border max-w-2xl mx-auto">
      <CardContent className="p-8">
        <div className="text-center">
          <div className="w-20 h-20 rounded-2xl bg-secondary/50 flex items-center justify-center mx-auto mb-6">
            <Github className="w-10 h-10 text-foreground" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Connect to GitHub
          </h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Install the Cognix GitHub App to enable automatic code synchronization,
            bidirectional sync, and version control.
          </p>

          <div className="grid md:grid-cols-3 gap-4 mb-8 text-left">
            {[
              {
                icon: GitCommit,
                title: 'Auto Commits',
                description: 'Every generation is tracked',
              },
              {
                icon: ArrowLeftRight,
                title: 'Bidirectional',
                description: 'Sync changes both ways',
              },
              {
                icon: GitPullRequest,
                title: 'PR Ready',
                description: 'Create PRs from Cognix',
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="p-4 rounded-lg bg-secondary/30 border border-border"
              >
                <feature.icon className="w-5 h-5 text-primary mb-2" />
                <p className="font-medium text-foreground text-sm">{feature.title}</p>
                <p className="text-xs text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>

          <Button
            onClick={handleInstallApp}
            disabled={isInstalling}
            size="lg"
            className="gap-2"
          >
            {isInstalling ? (
              <RefreshCw className="w-5 h-5 animate-spin" />
            ) : (
              <Github className="w-5 h-5" />
            )}
            {isInstalling ? 'Installing...' : 'Install GitHub App'}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            You'll be redirected to GitHub to authorize the Cognix app
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default GitHubAppInstall;
