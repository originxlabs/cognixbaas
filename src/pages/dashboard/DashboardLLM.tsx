import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Key, 
  Check,
  X,
  Eye,
  EyeOff,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  Loader2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useDashboardStore } from '@/stores/dashboardStore';

const providerLogos: Record<string, { name: string; color: string; description: string }> = {
  'OpenAI': { 
    name: 'OpenAI', 
    color: 'bg-green-500/10 text-green-500 border-green-500/30',
    description: 'GPT-4, GPT-3.5 Turbo'
  },
  'Azure OpenAI': { 
    name: 'Azure OpenAI', 
    color: 'bg-blue-500/10 text-blue-500 border-blue-500/30',
    description: 'Enterprise Azure deployment'
  },
  'Anthropic': { 
    name: 'Anthropic', 
    color: 'bg-orange-500/10 text-orange-500 border-orange-500/30',
    description: 'Claude 3, Claude 2'
  },
  'Google': { 
    name: 'Google AI', 
    color: 'bg-red-500/10 text-red-500 border-red-500/30',
    description: 'Gemini Pro, PaLM'
  },
};

const DashboardLLM = () => {
  const { llmProviders } = useDashboardStore();
  const [editingProvider, setEditingProvider] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [isValidating, setIsValidating] = useState(false);

  const handleSaveKey = (providerId: string) => {
    setIsValidating(true);
    setTimeout(() => {
      setIsValidating(false);
      setEditingProvider(null);
      setApiKey('');
    }, 1500);
  };

  const totalUsage = llmProviders.reduce((acc, p) => acc + p.usageCount, 0);
  const connectedCount = llmProviders.filter(p => p.apiKeySet).length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">LLM Keys (BYOK)</h1>
        <p className="text-muted-foreground">Bring Your Own Key - Configure AI providers</p>
      </div>

      {/* Overview Stats */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="bg-card/50 border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Key className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{connectedCount}/{llmProviders.length}</p>
                <p className="text-xs text-muted-foreground">Providers Connected</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{totalUsage}</p>
                <p className="text-xs text-muted-foreground">Total API Calls</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">Active</p>
                <p className="text-xs text-muted-foreground">Primary: OpenAI</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Provider Cards */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Providers</h2>
        
        {llmProviders.map((provider, index) => {
          const config = providerLogos[provider.name];
          const isEditing = editingProvider === provider.id;
          
          return (
            <motion.div
              key={provider.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-card/50 border-border">
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    {/* Provider Info */}
                    <div className="flex items-center gap-4 flex-1">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${config.color}`}>
                        <Sparkles className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-foreground">{config.name}</h3>
                          {provider.apiKeySet ? (
                            <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/30 gap-1">
                              <Check className="w-3 h-3" />
                              Connected
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="gap-1">
                              <X className="w-3 h-3" />
                              Not Set
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{config.description}</p>
                      </div>
                    </div>

                    {/* Usage & Actions */}
                    <div className="flex items-center gap-4">
                      {provider.apiKeySet && (
                        <div className="text-right">
                          <p className="text-lg font-semibold text-foreground">{provider.usageCount}</p>
                          <p className="text-xs text-muted-foreground">API calls</p>
                        </div>
                      )}
                      
                      {!isEditing ? (
                        <Button 
                          variant={provider.apiKeySet ? "outline" : "default"}
                          onClick={() => setEditingProvider(provider.id)}
                        >
                          {provider.apiKeySet ? 'Update Key' : 'Add Key'}
                        </Button>
                      ) : (
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => {
                            setEditingProvider(null);
                            setApiKey('');
                          }}
                        >
                          Cancel
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Edit Form */}
                  {isEditing && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-4 pt-4 border-t border-border"
                    >
                      <div className="flex gap-3">
                        <div className="relative flex-1">
                          <Input
                            type={showKey ? 'text' : 'password'}
                            placeholder={`Enter your ${provider.name} API key`}
                            value={apiKey}
                            onChange={(e) => setApiKey(e.target.value)}
                            className="bg-secondary/50 border-border font-mono pr-10"
                          />
                          <button
                            type="button"
                            onClick={() => setShowKey(!showKey)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                          >
                            {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                        <Button 
                          onClick={() => handleSaveKey(provider.id)}
                          disabled={!apiKey || isValidating}
                          className="gap-2"
                        >
                          {isValidating ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              Validating...
                            </>
                          ) : (
                            <>
                              <Check className="w-4 h-4" />
                              Save Key
                            </>
                          )}
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Your API key is encrypted and stored securely. We never log or share your keys.
                      </p>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Security Notice */}
      <Card className="bg-card/50 border-border">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium text-foreground">Security Notice</h3>
              <p className="text-sm text-muted-foreground mt-1">
                All API keys are encrypted at rest using AES-256 and are only decrypted during agent execution.
                Keys are never exposed in logs, code, or client-side applications. You can revoke or rotate keys at any time.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Usage by Agent */}
      <Card className="bg-card/50 border-border">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold">Usage by Agent</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { agent: 'API Agent', provider: 'OpenAI', calls: 120 },
              { agent: 'Security Agent', provider: 'OpenAI', calls: 85 },
              { agent: 'Docs Agent', provider: 'OpenAI', calls: 40 },
            ].map((usage, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg border border-border">
                <div className="flex items-center gap-3">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="font-medium text-foreground">{usage.agent}</span>
                </div>
                <div className="flex items-center gap-4">
                  <Badge variant="outline" className="font-mono text-xs">{usage.provider}</Badge>
                  <span className="text-sm text-muted-foreground">{usage.calls} calls</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardLLM;
