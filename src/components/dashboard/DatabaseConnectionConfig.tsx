import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Database,
  Link2,
  Eye,
  EyeOff,
  Check,
  AlertCircle,
  Settings2,
  Server,
  Shield,
  RefreshCw,
  ExternalLink,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';

type DatabaseProvider = 'supabase' | 'neon' | 'railway' | 'planetscale' | 'custom';

interface ConnectionConfig {
  provider: DatabaseProvider;
  host?: string;
  port?: string;
  database?: string;
  username?: string;
  password?: string;
  connectionString?: string;
  ssl?: boolean;
  pooling?: boolean;
}

interface DatabaseConnectionConfigProps {
  projectId: string;
  currentProvider?: DatabaseProvider;
  isConnected?: boolean;
  onConnect?: (config: ConnectionConfig) => void;
}

const providerConfigs: Record<
  DatabaseProvider,
  { name: string; description: string; icon: React.ReactNode; color: string }
> = {
  supabase: {
    name: 'Supabase',
    description: 'PostgreSQL with built-in auth and APIs',
    icon: '⚡',
    color: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30',
  },
  neon: {
    name: 'Neon',
    description: 'Serverless PostgreSQL with branching',
    icon: '🔋',
    color: 'bg-green-500/10 text-green-500 border-green-500/30',
  },
  railway: {
    name: 'Railway',
    description: 'Instant PostgreSQL deployments',
    icon: '🚂',
    color: 'bg-purple-500/10 text-purple-500 border-purple-500/30',
  },
  planetscale: {
    name: 'PlanetScale',
    description: 'MySQL-compatible serverless database',
    icon: '🌍',
    color: 'bg-blue-500/10 text-blue-500 border-blue-500/30',
  },
  custom: {
    name: 'Custom Database',
    description: 'Connect any PostgreSQL or MySQL database',
    icon: '🔧',
    color: 'bg-slate-500/10 text-slate-400 border-slate-500/30',
  },
};

export const DatabaseConnectionConfig = ({
  projectId,
  currentProvider = 'supabase',
  isConnected = false,
  onConnect,
}: DatabaseConnectionConfigProps) => {
  const { toast } = useToast();
  const [selectedProvider, setSelectedProvider] = useState<DatabaseProvider>(currentProvider);
  const [showPassword, setShowPassword] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<'success' | 'error' | null>(null);
  const [connectionTab, setConnectionTab] = useState<'string' | 'manual'>('string');

  const [config, setConfig] = useState<ConnectionConfig>({
    provider: currentProvider,
    host: '',
    port: '5432',
    database: '',
    username: '',
    password: '',
    connectionString: '',
    ssl: true,
    pooling: true,
  });

  const handleTestConnection = async () => {
    setIsTesting(true);
    setTestResult(null);

    // Simulate connection test
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const success = config.connectionString || (config.host && config.database);
    setTestResult(success ? 'success' : 'error');
    setIsTesting(false);

    if (success) {
      toast({
        title: 'Connection successful',
        description: 'Database connection verified.',
      });
    } else {
      toast({
        title: 'Connection failed',
        description: 'Please check your credentials and try again.',
        variant: 'destructive',
      });
    }
  };

  const handleConnect = () => {
    onConnect?.({ ...config, provider: selectedProvider });
    toast({
      title: 'Database connected',
      description: `${providerConfigs[selectedProvider].name} has been configured.`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Provider Selection */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {(Object.keys(providerConfigs) as DatabaseProvider[]).map((provider) => {
          const config = providerConfigs[provider];
          const isSelected = selectedProvider === provider;

          return (
            <motion.button
              key={provider}
              onClick={() => setSelectedProvider(provider)}
              className={`p-4 rounded-lg border text-left transition-all ${
                isSelected
                  ? 'border-primary bg-primary/5'
                  : 'border-border bg-card hover:border-primary/30'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-2xl mb-2 block">{config.icon}</span>
              <p className="font-medium text-sm text-foreground">{config.name}</p>
              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                {config.description}
              </p>
            </motion.button>
          );
        })}
      </div>

      {/* Connection Configuration */}
      <Card className="bg-card/50 border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Database className="w-5 h-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-lg">
                  {providerConfigs[selectedProvider].name} Configuration
                </CardTitle>
                <CardDescription>
                  {isConnected ? 'Connected and active' : 'Configure your database connection'}
                </CardDescription>
              </div>
            </div>
            {isConnected && (
              <Badge variant="outline" className="gap-1.5 bg-green-500/10 text-green-500 border-green-500/30">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                Connected
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {selectedProvider === 'supabase' ? (
            <div className="space-y-4">
              <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-lg">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-500 mt-0.5" />
                  <div>
                    <p className="font-medium text-emerald-500">Integrated with Cognix</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Supabase is natively integrated. Your database is automatically configured with
                      RLS policies and optimized for your backend.
                    </p>
                  </div>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Project URL</Label>
                  <Input
                    value="https://fzvyxqoqtjyqonwpstzz.supabase.co"
                    readOnly
                    className="font-mono text-sm bg-secondary/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Anon Key</Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      value="eyJhbGciOiJIUzI1NiIsInR5c..."
                      readOnly
                      className="font-mono text-sm bg-secondary/50 pr-10"
                    />
                    <button
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <Tabs value={connectionTab} onValueChange={(v) => setConnectionTab(v as any)}>
              <TabsList className="bg-secondary/50">
                <TabsTrigger value="string">Connection String</TabsTrigger>
                <TabsTrigger value="manual">Manual Config</TabsTrigger>
              </TabsList>

              <TabsContent value="string" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label>Connection String</Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      value={config.connectionString}
                      onChange={(e) =>
                        setConfig({ ...config, connectionString: e.target.value })
                      }
                      placeholder="postgresql://user:password@host:5432/database"
                      className="font-mono text-sm bg-secondary/50 pr-10"
                    />
                    <button
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Paste your full connection string from your database provider
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="manual" className="space-y-4 mt-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Host</Label>
                    <Input
                      value={config.host}
                      onChange={(e) => setConfig({ ...config, host: e.target.value })}
                      placeholder="db.example.com"
                      className="font-mono text-sm bg-secondary/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Port</Label>
                    <Input
                      value={config.port}
                      onChange={(e) => setConfig({ ...config, port: e.target.value })}
                      placeholder="5432"
                      className="font-mono text-sm bg-secondary/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Database Name</Label>
                    <Input
                      value={config.database}
                      onChange={(e) => setConfig({ ...config, database: e.target.value })}
                      placeholder="myapp_production"
                      className="font-mono text-sm bg-secondary/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Username</Label>
                    <Input
                      value={config.username}
                      onChange={(e) => setConfig({ ...config, username: e.target.value })}
                      placeholder="postgres"
                      className="font-mono text-sm bg-secondary/50"
                    />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <Label>Password</Label>
                    <div className="relative">
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        value={config.password}
                        onChange={(e) => setConfig({ ...config, password: e.target.value })}
                        placeholder="••••••••••••"
                        className="font-mono text-sm bg-secondary/50 pr-10"
                      />
                      <button
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 pt-2">
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={config.ssl}
                      onCheckedChange={(checked) => setConfig({ ...config, ssl: checked })}
                    />
                    <Label className="text-sm cursor-pointer">
                      <Shield className="w-4 h-4 inline mr-1.5 text-green-500" />
                      SSL/TLS
                    </Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={config.pooling}
                      onCheckedChange={(checked) => setConfig({ ...config, pooling: checked })}
                    />
                    <Label className="text-sm cursor-pointer">
                      <Server className="w-4 h-4 inline mr-1.5 text-blue-500" />
                      Connection Pooling
                    </Label>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div className="flex items-center gap-2">
              {testResult === 'success' && (
                <Badge variant="outline" className="gap-1.5 bg-green-500/10 text-green-500 border-green-500/30">
                  <Check className="w-3 h-3" />
                  Connection verified
                </Badge>
              )}
              {testResult === 'error' && (
                <Badge variant="outline" className="gap-1.5 bg-destructive/10 text-destructive border-destructive/30">
                  <AlertCircle className="w-3 h-3" />
                  Connection failed
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2">
              {selectedProvider !== 'supabase' && (
                <Button
                  variant="outline"
                  onClick={handleTestConnection}
                  disabled={isTesting}
                  className="gap-2"
                >
                  {isTesting ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <Link2 className="w-4 h-4" />
                  )}
                  Test Connection
                </Button>
              )}
              <Button onClick={handleConnect} className="gap-2">
                <Settings2 className="w-4 h-4" />
                {isConnected ? 'Update' : 'Save Configuration'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DatabaseConnectionConfig;
