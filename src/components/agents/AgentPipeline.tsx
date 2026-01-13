import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Clock, Circle, Loader2 } from 'lucide-react';
import { COGNIX_AGENTS, AGENT_PIPELINE_ORDER } from '@/config/agents';

interface AgentPipelineProps {
  currentAgentId?: string;
  completedAgents?: string[];
  showLabels?: boolean;
  vertical?: boolean;
}

export const AgentPipeline = ({ 
  currentAgentId,
  completedAgents = [],
  showLabels = true,
  vertical = false,
}: AgentPipelineProps) => {
  const orderedAgents = AGENT_PIPELINE_ORDER.map(id => 
    COGNIX_AGENTS.find(a => a.id === id)!
  ).filter(Boolean);

  const getAgentStatus = (agentId: string) => {
    if (completedAgents.includes(agentId)) return 'done';
    if (currentAgentId === agentId) return 'running';
    return 'pending';
  };

  if (vertical) {
    return (
      <div className="space-y-2">
        {orderedAgents.map((agent, index) => {
          const status = getAgentStatus(agent.id);
          const Icon = agent.icon;

          return (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                status === 'running' ? 'bg-primary/10 border border-primary/30' :
                status === 'done' ? 'bg-green-500/5' :
                'bg-secondary/30'
              }`}
            >
              <div className={`w-8 h-8 rounded-lg ${agent.bgColor} flex items-center justify-center`}>
                {status === 'running' ? (
                  <Loader2 className={`w-4 h-4 ${agent.color} animate-spin`} />
                ) : (
                  <Icon className={`w-4 h-4 ${agent.color}`} />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{agent.shortName}</p>
                <p className="text-xs text-muted-foreground">{agent.phase}</p>
              </div>
              {status === 'done' && <CheckCircle2 className="w-4 h-4 text-green-500" />}
              {status === 'running' && <Clock className="w-4 h-4 text-primary animate-pulse" />}
              {status === 'pending' && <Circle className="w-3 h-3 text-muted-foreground" />}
            </motion.div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1 overflow-x-auto pb-2">
      {orderedAgents.map((agent, index) => {
        const status = getAgentStatus(agent.id);
        const Icon = agent.icon;

        return (
          <div key={agent.id} className="flex items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.03 }}
              className={`flex flex-col items-center gap-1 px-2 py-1 rounded-lg transition-all ${
                status === 'running' ? 'bg-primary/10 scale-110' :
                status === 'done' ? 'bg-green-500/5' :
                ''
              }`}
            >
              <div className={`w-8 h-8 rounded-lg ${
                status === 'done' ? 'bg-green-500/10' :
                status === 'running' ? agent.bgColor :
                'bg-muted/50'
              } flex items-center justify-center relative`}>
                {status === 'running' ? (
                  <Loader2 className={`w-4 h-4 ${agent.color} animate-spin`} />
                ) : status === 'done' ? (
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                ) : (
                  <Icon className="w-4 h-4 text-muted-foreground" />
                )}
              </div>
              {showLabels && (
                <span className={`text-[10px] font-medium whitespace-nowrap ${
                  status === 'running' ? 'text-primary' :
                  status === 'done' ? 'text-green-500' :
                  'text-muted-foreground'
                }`}>
                  {agent.phase}
                </span>
              )}
            </motion.div>
            {index < orderedAgents.length - 1 && (
              <ArrowRight className={`w-3 h-3 mx-1 flex-shrink-0 ${
                status === 'done' ? 'text-green-500/50' : 'text-muted-foreground/30'
              }`} />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default AgentPipeline;
