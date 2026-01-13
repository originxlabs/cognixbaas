import { motion } from 'framer-motion';
import { 
  Clock, 
  ArrowRight, 
  Activity,
  Loader2,
  RefreshCw
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAgentActivities } from '@/hooks/useAgentActivities';
import { useProjectContext } from '@/contexts/ProjectContext';
import { COGNIX_AGENTS, AGENT_PIPELINE_ORDER } from '@/config/agents';
import { AgentCard } from '@/components/agents/AgentCard';
import { AgentPipeline } from '@/components/agents/AgentPipeline';

// Map old agent names to new agent IDs
const agentNameToId: Record<string, string> = {
  'Architect Agent': 'architecture-designer',
  'Security Agent': 'security',
  'API Agent': 'api-generator',
  'Database Agent': 'database-modeler',
  'Docs Agent': 'documentation',
  'Test Agent': 'testing',
  'Task Agent': 'task-planner',
  'Requirement Analyzer': 'requirement-analyzer',
};

const DashboardAgentsLive = () => {
  const { currentProject } = useProjectContext();
  const { activities, loading, refreshActivities } = useAgentActivities(currentProject?.id || null);

  const formatTimeAgo = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min ago`;
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  };

  const getAgentFromName = (name: string) => {
    const agentId = agentNameToId[name];
    if (agentId) {
      return COGNIX_AGENTS.find(a => a.id === agentId);
    }
    // Try to find by short name or name
    return COGNIX_AGENTS.find(a => 
      a.shortName.toLowerCase().includes(name.toLowerCase().replace(' agent', '')) ||
      a.name.toLowerCase().includes(name.toLowerCase())
    );
  };

  // Get unique agent names that have activities
  const activeAgentIds = [...new Set(activities.map(a => {
    const agent = getAgentFromName(a.agent_name);
    return agent?.id;
  }))].filter(Boolean) as string[];

  // Determine agent statuses
  const getAgentStatus = (agentId: string) => {
    if (currentProject?.is_generating) {
      const agentIndex = AGENT_PIPELINE_ORDER.indexOf(agentId);
      const currentIndex = activeAgentIds.length > 0 
        ? Math.max(...activeAgentIds.map(id => AGENT_PIPELINE_ORDER.indexOf(id)))
        : -1;
      
      if (agentIndex < currentIndex) return 'done';
      if (agentIndex === currentIndex) return 'running';
      return 'pending';
    }
    return activeAgentIds.includes(agentId) ? 'done' : 'idle';
  };

  if (!currentProject) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-muted-foreground">Select a project to view agent activity</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Agent Pipeline</h1>
          <p className="text-muted-foreground">Specialized engineering agents for {currentProject.name}</p>
        </div>
        <Button variant="outline" size="sm" onClick={refreshActivities} className="gap-2">
          <RefreshCw className="w-4 h-4" />
          Refresh
        </Button>
      </div>

      {/* Pipeline Overview */}
      <Card className="bg-card/50 border-border overflow-hidden">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">Agent Pipeline Status</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <AgentPipeline 
            currentAgentId={currentProject.is_generating ? activeAgentIds[activeAgentIds.length - 1] : undefined}
            completedAgents={activeAgentIds}
          />
        </CardContent>
      </Card>

      {/* Agent Grid */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">All Agents</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {COGNIX_AGENTS.map((agent, index) => (
            <AgentCard
              key={agent.id}
              agent={agent}
              status={getAgentStatus(agent.id) as any}
              showDetails={false}
              delay={index * 0.03}
            />
          ))}
        </div>
      </div>

      {/* Activity Timeline */}
      <Card className="bg-card/50 border-border">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary" />
            Activity Timeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          {activities.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Activity className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No agent activity yet</p>
              <p className="text-sm">Activities will appear here as agents work on your project</p>
            </div>
          ) : (
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />

              <div className="space-y-4">
                {activities.map((activity, index) => {
                  const agent = getAgentFromName(activity.agent_name);
                  const Icon = agent?.icon || Activity;
                  const color = agent?.color || 'text-primary';
                  const bgColor = agent?.bgColor || 'bg-primary/10';
                  
                  return (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.03 }}
                      className="relative pl-10"
                    >
                      {/* Timeline dot */}
                      <div className={`absolute left-1.5 top-3 w-5 h-5 rounded-lg ${bgColor} flex items-center justify-center ring-4 ring-background`}>
                        <Icon className={`w-3 h-3 ${color}`} />
                      </div>
                      
                      <div className="bg-secondary/30 rounded-lg p-4 border border-border">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className={`font-medium ${color}`}>
                              {agent?.shortName || activity.agent_name}
                            </Badge>
                            <Badge variant="secondary" className="text-[10px] font-mono">
                              {agent?.phase || 'System'}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            {formatTimeAgo(activity.created_at)}
                          </div>
                        </div>
                        
                        <p className="text-sm text-foreground flex items-center gap-2">
                          <ArrowRight className="w-4 h-4 text-primary flex-shrink-0" />
                          {activity.action}
                        </p>
                        
                        {activity.details && (
                          <p className="text-xs text-muted-foreground mt-2 pl-6 font-mono">
                            {activity.details}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Agent Philosophy */}
      <Card className="bg-card/50 border-border">
        <CardContent className="p-6">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold text-foreground mb-2">Pipeline Philosophy</h3>
            <p className="text-muted-foreground">
              Cognix replaces "one big AI" with a pipeline of <span className="text-primary font-medium">14 specialized engineering agents</span> — each scoped, auditable, and human-controlled. No agent can skip steps or weaken security constraints.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardAgentsLive;
