import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Clock, Loader2, AlertCircle } from 'lucide-react';
import { COGNIX_AGENTS } from '@/config/agents';
import { formatDistanceToNow } from 'date-fns';

interface AgentActivity {
  id: string;
  agentId: string;
  action: string;
  status: 'running' | 'done' | 'error';
  timestamp: Date;
  details?: string;
}

interface AgentActivityFeedProps {
  activities: AgentActivity[];
  maxItems?: number;
  showAgent?: boolean;
}

export const AgentActivityFeed = ({ 
  activities, 
  maxItems = 10,
  showAgent = true 
}: AgentActivityFeedProps) => {
  const displayActivities = activities.slice(0, maxItems);

  const getAgent = (agentId: string) => {
    return COGNIX_AGENTS.find(a => a.id === agentId) || COGNIX_AGENTS[0];
  };

  return (
    <div className="space-y-2">
      <AnimatePresence mode="popLayout">
        {displayActivities.map((activity, index) => {
          const agent = getAgent(activity.agentId);
          const Icon = agent.icon;

          return (
            <motion.div
              key={activity.id}
              layout
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className={`flex gap-3 p-3 rounded-lg border transition-colors ${
                activity.status === 'running' ? 'bg-primary/5 border-primary/30' :
                activity.status === 'error' ? 'bg-destructive/5 border-destructive/30' :
                'bg-card/50 border-border'
              }`}
            >
              {/* Agent Icon */}
              <div className={`w-8 h-8 rounded-lg ${agent.bgColor} flex items-center justify-center flex-shrink-0`}>
                {activity.status === 'running' ? (
                  <Loader2 className={`w-4 h-4 ${agent.color} animate-spin`} />
                ) : (
                  <Icon className={`w-4 h-4 ${agent.color}`} />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  {showAgent && (
                    <span className={`text-sm font-medium ${agent.color}`}>
                      {agent.shortName}
                    </span>
                  )}
                  <span className="text-xs text-muted-foreground">
                    {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
                  </span>
                </div>
                <p className="text-sm text-foreground">{activity.action}</p>
                {activity.details && (
                  <p className="text-xs text-muted-foreground mt-1 font-mono">
                    {activity.details}
                  </p>
                )}
              </div>

              {/* Status */}
              <div className="flex-shrink-0">
                {activity.status === 'done' && (
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                )}
                {activity.status === 'running' && (
                  <Clock className="w-4 h-4 text-primary animate-pulse" />
                )}
                {activity.status === 'error' && (
                  <AlertCircle className="w-4 h-4 text-destructive" />
                )}
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>

      {activities.length === 0 && (
        <div className="text-center py-8 text-muted-foreground text-sm">
          No agent activity yet
        </div>
      )}
    </div>
  );
};

export default AgentActivityFeed;
