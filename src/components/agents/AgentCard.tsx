import { motion } from 'framer-motion';
import { CheckCircle2, Clock, Circle, AlertCircle, Ban } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Agent } from '@/config/agents';

interface AgentCardProps {
  agent: Agent;
  status?: 'idle' | 'running' | 'done' | 'blocked' | 'pending';
  compact?: boolean;
  showDetails?: boolean;
  delay?: number;
}

const statusConfig = {
  idle: { icon: Circle, label: 'Idle', color: 'text-muted-foreground' },
  pending: { icon: Circle, label: 'Pending', color: 'text-muted-foreground' },
  running: { icon: Clock, label: 'Running', color: 'text-primary' },
  done: { icon: CheckCircle2, label: 'Done', color: 'text-green-500' },
  blocked: { icon: AlertCircle, label: 'Blocked', color: 'text-destructive' },
};

export const AgentCard = ({ 
  agent, 
  status = 'idle', 
  compact = false,
  showDetails = false,
  delay = 0 
}: AgentCardProps) => {
  const Icon = agent.icon;
  const StatusIcon = statusConfig[status].icon;

  if (compact) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay }}
        className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-colors ${
          status === 'running' ? 'border-primary/50 bg-primary/5' :
          status === 'done' ? 'border-green-500/30 bg-green-500/5' :
          'border-border bg-card/50'
        }`}
      >
        <div className={`w-6 h-6 rounded-md ${agent.bgColor} flex items-center justify-center`}>
          <Icon className={`w-3.5 h-3.5 ${agent.color}`} />
        </div>
        <span className="text-sm font-medium text-foreground">{agent.shortName}</span>
        <StatusIcon className={`w-3.5 h-3.5 ml-auto ${statusConfig[status].color}`} />
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <Card className={`h-full transition-colors ${
        status === 'running' ? 'border-primary/50 bg-primary/5' :
        status === 'done' ? 'border-green-500/30' :
        'border-border bg-card/50'
      }`}>
        <CardContent className="p-4">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg ${agent.bgColor} flex items-center justify-center`}>
                <Icon className={`w-5 h-5 ${agent.color}`} />
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-sm">{agent.shortName}</h3>
                <Badge variant="outline" className="text-[10px] mt-1">{agent.phase}</Badge>
              </div>
            </div>
            <div className={`flex items-center gap-1 ${statusConfig[status].color}`}>
              <StatusIcon className="w-4 h-4" />
              <span className="text-xs font-medium">{statusConfig[status].label}</span>
            </div>
          </div>

          {/* Purpose */}
          <p className="text-sm text-muted-foreground mb-3">{agent.purpose}</p>

          {showDetails && (
            <>
              {/* Does */}
              <div className="mb-3">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1.5">Tasks</p>
                <ul className="space-y-1">
                  {agent.does.slice(0, 3).map((task, i) => (
                    <li key={i} className="text-xs text-foreground flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-primary" />
                      {task}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Restriction */}
              <div className="flex items-center gap-1.5 text-xs text-destructive/80 bg-destructive/5 rounded-md px-2 py-1.5">
                <Ban className="w-3 h-3" />
                <span>{agent.restriction}</span>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AgentCard;
