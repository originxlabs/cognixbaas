import { motion } from 'framer-motion';
import { 
  Bot, 
  Clock,
  Link2,
  Shield,
  Code2,
  Database,
  FileText,
  Zap
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useDashboardStore } from '@/stores/dashboardStore';

const agentIcons: Record<string, React.ElementType> = {
  'Architect Agent': Zap,
  'Security Agent': Shield,
  'API Agent': Code2,
  'Database Agent': Database,
  'Docs Agent': FileText,
};

const agentColors: Record<string, string> = {
  'Architect Agent': 'bg-purple-500/10 text-purple-500',
  'Security Agent': 'bg-yellow-500/10 text-yellow-500',
  'API Agent': 'bg-blue-500/10 text-blue-500',
  'Database Agent': 'bg-green-500/10 text-green-500',
  'Docs Agent': 'bg-pink-500/10 text-pink-500',
};

function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  
  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}d ago`;
}

const DashboardAgents = () => {
  const { agentActivities } = useDashboardStore();

  const agents = [
    { name: 'Architect Agent', description: 'Designs modular structure and dependencies', status: 'active' },
    { name: 'Security Agent', description: 'Implements auth, policies, and security checks', status: 'active' },
    { name: 'API Agent', description: 'Generates controllers and endpoints', status: 'working' },
    { name: 'Database Agent', description: 'Creates entities, migrations, and schemas', status: 'idle' },
    { name: 'Docs Agent', description: 'Generates OpenAPI specs and documentation', status: 'idle' },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Agent Activity</h1>
        <p className="text-muted-foreground">Real-time visibility into AI agent actions</p>
      </div>

      {/* Active Agents */}
      <div className="grid md:grid-cols-5 gap-3">
        {agents.map((agent) => {
          const Icon = agentIcons[agent.name] || Bot;
          const colorClass = agentColors[agent.name] || 'bg-primary/10 text-primary';
          
          return (
            <Card key={agent.name} className="bg-card/50 border-border">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorClass}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{agent.name.replace(' Agent', '')}</p>
                    <div className="flex items-center gap-1.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        agent.status === 'working' ? 'bg-primary animate-pulse' :
                        agent.status === 'active' ? 'bg-green-500' :
                        'bg-muted-foreground'
                      }`} />
                      <span className="text-xs text-muted-foreground capitalize">{agent.status}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Activity Timeline */}
      <Card className="bg-card/50 border-border">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">Activity Timeline</CardTitle>
            <Badge variant="outline" className="gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              Live
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-5 top-0 bottom-0 w-px bg-border" />
            
            {/* Timeline items */}
            <div className="space-y-4">
              {agentActivities.map((activity, index) => {
                const Icon = agentIcons[activity.agentName] || Bot;
                const colorClass = agentColors[activity.agentName] || 'bg-primary/10 text-primary';
                
                return (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative flex gap-4 pl-12"
                  >
                    {/* Icon */}
                    <div className={`absolute left-0 w-10 h-10 rounded-full flex items-center justify-center ${colorClass} border-4 border-background`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 bg-secondary/30 rounded-lg p-4 border border-border">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-foreground">{activity.agentName}</span>
                            {activity.taskId && (
                              <Badge variant="outline" className="font-mono text-xs">
                                <Link2 className="w-3 h-3 mr-1" />
                                {activity.taskId}
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{activity.action}</p>
                          {activity.details && (
                            <p className="text-xs text-muted-foreground mt-1">{activity.details}</p>
                          )}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground whitespace-nowrap">
                          <Clock className="w-3 h-3" />
                          {formatTimeAgo(activity.timestamp)}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Agent Performance */}
      <Card className="bg-card/50 border-border">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold">Agent Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-secondary/30 rounded-lg p-4 border border-border">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Total Actions</p>
              <p className="text-2xl font-bold text-foreground">{agentActivities.length}</p>
            </div>
            <div className="bg-secondary/30 rounded-lg p-4 border border-border">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Active Agents</p>
              <p className="text-2xl font-bold text-foreground">{agents.filter(a => a.status !== 'idle').length}</p>
            </div>
            <div className="bg-secondary/30 rounded-lg p-4 border border-border">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Avg Response</p>
              <p className="text-2xl font-bold text-foreground">1.2s</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardAgents;
