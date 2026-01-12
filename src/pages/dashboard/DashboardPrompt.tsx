import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, RefreshCw, Edit2, Check, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { useDashboardStore } from '@/stores/dashboardStore';

const DashboardPrompt = () => {
  const { requirements, setRequirements } = useDashboardStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editedPrompt, setEditedPrompt] = useState(requirements?.prompt || '');

  const handleSave = () => {
    if (requirements) {
      setRequirements({ ...requirements, prompt: editedPrompt });
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedPrompt(requirements?.prompt || '');
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Prompt & Requirements</h1>
        <p className="text-muted-foreground">View and edit your backend requirements</p>
      </div>

      {/* Two Column Layout */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left - User Prompt */}
        <Card className="bg-card/50 border-border">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                Your Prompt
              </CardTitle>
              {!isEditing ? (
                <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)}>
                  <Edit2 className="w-4 h-4 mr-1" />
                  Edit
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={handleCancel}>
                    <X className="w-4 h-4" />
                  </Button>
                  <Button variant="default" size="sm" onClick={handleSave}>
                    <Check className="w-4 h-4 mr-1" />
                    Save
                  </Button>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {isEditing ? (
              <Textarea
                value={editedPrompt}
                onChange={(e) => setEditedPrompt(e.target.value)}
                className="min-h-[200px] bg-secondary/50 border-border font-mono text-sm"
                placeholder="Describe your backend requirements..."
              />
            ) : (
              <div className="bg-secondary/30 rounded-lg p-4 border border-border">
                <p className="text-foreground leading-relaxed">
                  {requirements?.prompt}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Right - Structured Interpretation */}
        <Card className="bg-card/50 border-border">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">Cognix Interpretation</CardTitle>
              <Button variant="outline" size="sm" className="gap-2">
                <RefreshCw className="w-4 h-4" />
                Re-analyze
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Entities */}
            <div>
              <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                Entities
              </span>
              <div className="flex flex-wrap gap-2 mt-2">
                {requirements?.entities.map((entity) => (
                  <motion.div
                    key={entity}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <Badge variant="secondary" className="font-mono">
                      {entity}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Auth Method */}
            <div>
              <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                Authentication
              </span>
              <p className="text-sm text-foreground mt-1 font-mono bg-secondary/30 px-3 py-2 rounded-md inline-block">
                {requirements?.authMethod}
              </p>
            </div>

            {/* Payments */}
            {requirements?.payments && (
              <div>
                <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                  Payments
                </span>
                <p className="text-sm text-foreground mt-1 font-mono bg-secondary/30 px-3 py-2 rounded-md inline-block">
                  {requirements?.payments}
                </p>
              </div>
            )}

            {/* Multi-Tenant */}
            <div>
              <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                Multi-Tenant
              </span>
              <div className="mt-1">
                <Badge variant={requirements?.multiTenant ? 'default' : 'outline'}>
                  {requirements?.multiTenant ? 'Yes' : 'No'}
                </Badge>
              </div>
            </div>

            {/* Custom Features */}
            {requirements?.customFeatures && requirements.customFeatures.length > 0 && (
              <div>
                <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                  Custom Features
                </span>
                <ul className="mt-2 space-y-1">
                  {requirements.customFeatures.map((feature, index) => (
                    <li 
                      key={index}
                      className="text-sm text-foreground flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Backend Configuration */}
      <Card className="bg-card/50 border-border">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold">Backend Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                Framework
              </span>
              <div className="bg-secondary/30 rounded-lg p-3 border border-border">
                <p className="font-mono text-sm text-foreground">.NET 8</p>
                <p className="text-xs text-muted-foreground mt-1">ASP.NET Core Web API</p>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                Architecture
              </span>
              <div className="bg-secondary/30 rounded-lg p-3 border border-border">
                <p className="font-mono text-sm text-foreground">Modular Monolith</p>
                <p className="text-xs text-muted-foreground mt-1">Clean Architecture</p>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                Database
              </span>
              <div className="bg-secondary/30 rounded-lg p-3 border border-border">
                <p className="font-mono text-sm text-foreground">PostgreSQL</p>
                <p className="text-xs text-muted-foreground mt-1">via Supabase</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardPrompt;
