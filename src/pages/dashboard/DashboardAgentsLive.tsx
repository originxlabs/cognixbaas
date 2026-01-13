import { motion } from 'framer-motion';
import { 
  Bot, 
  Clock, 
  ArrowRight, 
  CheckCircle2 
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAgentActivities } from '@/hooks/useAgentActivities';
import { useProjectContext } from '@/contexts/ProjectContext';
import { Loader2 } from 'lucide-react';

const agentColors: Record<string, string> = {
  'Architect Agent': 'bg-purple-500',
  'Security Agent': 'bg-red-500',
  'API Agent': 'bg-blue-500',
  'Database Agent': 'bg-green-500',
  'Docs Agent': 'bg-yellow-500',
  'Test Agent': 'bg-orange-500',
};

const DashboardAgentsLive = () => {
  const { currentProject } = useProjectContext();
  const { activities, loading } = useAgentActivities(currentProject?.id || null);

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
      <div>
        <h1 className="text-2xl font-bold text-foreground">Agent Activity</h1>
        <p className="text-muted-foreground">Real-time agent actions and progress</p>
      </div>

      {/* Agent Summary */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {Object.entries(agentColors).map(([name, color]) => {
          const count = activities.filter(a => a.agent_name === name).length;
          return (
            <Card key={name} className="bg-card/50 border-border">
              <CardContent className="p-3">
                <div className="flex items-center gap-2 mb-1">
                  <div className={`w-2 h-2 rounded-full ${color}`} />
                  <span className="text-xs font-medium text-foreground truncate">
                    {name.replace(' Agent', '')}
                  </span>
                </div>
                <p className="text-lg font-bold text-foreground">{count}</p>
                <p className="text-xs text-muted-foreground">actions</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Activity Timeline */}
      <Card className="bg-card/50 border-border">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Bot className="w-5 h-5 text-primary" />
            Activity Timeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          {activities.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Bot className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No agent activity yet</p>
              <p className="text-sm">Activities will appear here as agents work on your project</p>
            </div>
          ) : (
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />

              <div className="space-y-4">
                {activities.map((activity, index) => {
                  const color = agentColors[activity.agent_name] || 'bg-gray-500';
                  
                  return (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="relative pl-10"
                    >
                      {/* Timeline dot */}
                      <div className={`absolute left-2.5 top-2 w-3 h-3 rounded-full ${color} ring-4 ring-background`} />
                      
                      <div className="bg-secondary/30 rounded-lg p-4 border border-border">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="font-medium">
                              {activity.agent_name}
                            </Badge>
                            {activity.task_id && (
                              <Badge variant="secondary" className="font-mono text-xs">
                                Task linked
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            {formatTimeAgo(activity.created_at)}
                          </div>
                        </div>
                        
                        <p className="text-sm text-foreground flex items-center gap-2">
                          <ArrowRight className="w-4 h-4 text-primary" />
                          {activity.action}
                        </p>
                        
                        {activity.details && (
                          <p className="text-xs text-muted-foreground mt-2 pl-6">
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
    </div>
  );
};

export default DashboardAgentsLive;
