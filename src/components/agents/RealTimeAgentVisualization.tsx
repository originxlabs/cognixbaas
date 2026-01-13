import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Activity,
  CheckCircle2,
  Circle,
  Clock,
  Loader2,
  Terminal,
  Zap,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { COGNIX_AGENTS, Agent } from '@/config/agents';
import { cn } from '@/lib/utils';

interface AgentLog {
  id: string;
  agentId: string;
  message: string;
  timestamp: Date;
  type: 'info' | 'success' | 'warning' | 'error';
}

interface RealTimeAgentVisualizationProps {
  isGenerating: boolean;
  currentAgentIndex: number;
  completedAgents: string[];
  progress: number;
  logs?: AgentLog[];
  onComplete?: () => void;
}

export const RealTimeAgentVisualization = ({
  isGenerating,
  currentAgentIndex,
  completedAgents,
  progress,
  logs = [],
  onComplete,
}: RealTimeAgentVisualizationProps) => {
  const [activeAgentPulse, setActiveAgentPulse] = useState(true);

  // Pulse effect for active agent
  useEffect(() => {
    if (!isGenerating) return;
    const interval = setInterval(() => {
      setActiveAgentPulse((prev) => !prev);
    }, 1000);
    return () => clearInterval(interval);
  }, [isGenerating]);

  const currentAgent = COGNIX_AGENTS[currentAgentIndex];

  const getAgentStatus = (agent: Agent, index: number): 'completed' | 'active' | 'pending' => {
    if (completedAgents.includes(agent.id)) return 'completed';
    if (index === currentAgentIndex && isGenerating) return 'active';
    return 'pending';
  };

  return (
    <div className="space-y-6">
      {/* Current Agent Hero */}
      {isGenerating && currentAgent && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden"
        >
          <Card className={cn(
            "border-2 transition-all duration-500",
            currentAgent.bgColor.replace('/10', '/20'),
            `border-${currentAgent.color.replace('text-', '')}/30`
          )}>
            <CardContent className="p-6">
              <div className="flex items-center gap-6">
                {/* Agent Icon with Pulse */}
                <div className="relative">
                  <motion.div
                    animate={{
                      scale: activeAgentPulse ? [1, 1.1, 1] : 1,
                      opacity: activeAgentPulse ? [1, 0.8, 1] : 1,
                    }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className={cn(
                      "w-16 h-16 rounded-xl flex items-center justify-center",
                      currentAgent.bgColor
                    )}
                  >
                    <currentAgent.icon className={cn("w-8 h-8", currentAgent.color)} />
                  </motion.div>
                  <motion.div
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className={cn(
                      "absolute inset-0 rounded-xl",
                      currentAgent.bgColor
                    )}
                  />
                </div>

                {/* Agent Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className={cn("text-xl font-bold", currentAgent.color)}>
                      {currentAgent.shortName}
                    </h3>
                    <Badge variant="outline" className="gap-1.5 animate-pulse">
                      <Loader2 className="w-3 h-3 animate-spin" />
                      Active
                    </Badge>
                  </div>
                  <p className="text-muted-foreground mb-3">{currentAgent.purpose}</p>
                  
                  {/* Phase Progress */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Phase {currentAgentIndex + 1} of {COGNIX_AGENTS.length}</span>
                      <span className={currentAgent.color}>{currentAgent.phase}</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                </div>

                {/* Live Indicator */}
                <div className="flex flex-col items-center gap-2">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                    <span className="text-xs text-green-500 font-medium">LIVE</span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {Math.round(progress)}%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Agent Pipeline Grid */}
      <Card className="bg-card/50 border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Activity className="w-4 h-4 text-primary" />
            Agent Pipeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {COGNIX_AGENTS.map((agent, index) => {
              const status = getAgentStatus(agent, index);
              
              return (
                <motion.div
                  key={agent.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className={cn(
                    "relative p-3 rounded-lg border transition-all duration-300",
                    status === 'completed' && "bg-green-500/5 border-green-500/30",
                    status === 'active' && cn(agent.bgColor, "border-2", `border-${agent.color.replace('text-', '')}/50`),
                    status === 'pending' && "bg-secondary/30 border-border opacity-50"
                  )}
                >
                  <div className="flex flex-col items-center text-center gap-2">
                    {/* Status Icon */}
                    <div className="relative">
                      <div className={cn(
                        "w-10 h-10 rounded-lg flex items-center justify-center",
                        status === 'completed' && "bg-green-500/10",
                        status === 'active' && agent.bgColor,
                        status === 'pending' && "bg-secondary/50"
                      )}>
                        {status === 'completed' ? (
                          <CheckCircle2 className="w-5 h-5 text-green-500" />
                        ) : status === 'active' ? (
                          <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
                            <agent.icon className={cn("w-5 h-5", agent.color)} />
                          </motion.div>
                        ) : (
                          <agent.icon className="w-5 h-5 text-muted-foreground" />
                        )}
                      </div>
                      
                      {status === 'active' && (
                        <motion.div
                          animate={{ scale: [1, 1.3, 1], opacity: [1, 0, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          className={cn(
                            "absolute inset-0 rounded-lg",
                            agent.bgColor
                          )}
                        />
                      )}
                    </div>

                    {/* Agent Name */}
                    <p className={cn(
                      "text-xs font-medium truncate w-full",
                      status === 'completed' && "text-green-500",
                      status === 'active' && agent.color,
                      status === 'pending' && "text-muted-foreground"
                    )}>
                      {agent.shortName}
                    </p>

                    {/* Status Badge */}
                    <Badge 
                      variant="outline" 
                      className={cn(
                        "text-[10px] px-1.5 py-0",
                        status === 'completed' && "bg-green-500/10 text-green-500 border-green-500/30",
                        status === 'active' && "bg-primary/10 text-primary border-primary/30",
                        status === 'pending' && "bg-muted text-muted-foreground border-muted"
                      )}
                    >
                      {status === 'completed' ? 'Done' : status === 'active' ? 'Running' : 'Pending'}
                    </Badge>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Live Log Feed */}
      <Card className="bg-card/50 border-border">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base flex items-center gap-2">
              <Terminal className="w-4 h-4 text-primary" />
              Agent Activity Log
            </CardTitle>
            {isGenerating && (
              <Badge variant="outline" className="gap-1.5 text-xs">
                <Zap className="w-3 h-3 text-yellow-500" />
                Live Feed
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[200px]">
            <div className="space-y-2 font-mono text-sm">
              <AnimatePresence mode="popLayout">
                {logs.length > 0 ? (
                  logs.map((log) => {
                    const agent = COGNIX_AGENTS.find((a) => a.id === log.agentId);
                    return (
                      <motion.div
                        key={log.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="flex items-start gap-3 p-2 rounded bg-secondary/30"
                      >
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {log.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                        </span>
                        <span className={cn("text-xs font-medium", agent?.color || 'text-primary')}>
                          [{agent?.shortName || 'System'}]
                        </span>
                        <span className={cn(
                          "text-xs flex-1",
                          log.type === 'success' && "text-green-500",
                          log.type === 'error' && "text-red-500",
                          log.type === 'warning' && "text-yellow-500",
                          log.type === 'info' && "text-muted-foreground"
                        )}>
                          {log.message}
                        </span>
                      </motion.div>
                    );
                  })
                ) : (
                  <div className="text-center py-8 text-muted-foreground text-xs">
                    {isGenerating ? 'Initializing agents...' : 'No activity yet. Start generation to see live logs.'}
                  </div>
                )}
              </AnimatePresence>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Completion Summary */}
      {!isGenerating && completedAgents.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="bg-green-500/5 border-green-500/30">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-green-500">Generation Complete</h3>
                  <p className="text-sm text-muted-foreground">
                    {completedAgents.length} agents completed successfully
                  </p>
                </div>
                <div className="ml-auto">
                  <Badge className="bg-green-500/10 text-green-500 border-green-500/30">
                    100% Complete
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
};

export default RealTimeAgentVisualization;
