import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle, Loader2, Hand } from 'lucide-react';
import { COGNIX_AGENTS, AGENT_PIPELINE_ORDER } from '@/config/agents';

interface EnterpriseAgentPipelineProps {
  autoPlay?: boolean;
  onComplete?: () => void;
}

// Group agents by phases
const PIPELINE_PHASES = [
  { name: 'Planning', agents: ['requirement-analyzer', 'clarification', 'task-planner'] },
  { name: 'Design', agents: ['architecture-designer'] },
  { name: 'Structure', agents: ['scaffolding', 'dependency-manager'] },
  { name: 'Data & APIs', agents: ['database-modeler', 'api-generator'] },
  { name: 'Quality', agents: ['security', 'documentation', 'testing'] },
  { name: 'Delivery', agents: ['sandbox-deploy', 'github-sync', 'prod-deploy'] },
];

// Human approval gates (after these agents, pause for approval)
const APPROVAL_GATES = ['architecture-designer', 'testing'];

export const EnterpriseAgentPipeline = ({ 
  autoPlay = true,
  onComplete 
}: EnterpriseAgentPipelineProps) => {
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [completedAgents, setCompletedAgents] = useState<string[]>([]);
  const [isPaused, setIsPaused] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const orderedAgents = AGENT_PIPELINE_ORDER.map(id => 
    COGNIX_AGENTS.find(a => a.id === id)!
  ).filter(Boolean);

  const currentAgentId = currentIndex >= 0 ? orderedAgents[currentIndex]?.id : null;

  const advanceToNext = useCallback(() => {
    if (currentIndex >= orderedAgents.length - 1) {
      setIsComplete(true);
      onComplete?.();
      return;
    }

    const nextIndex = currentIndex + 1;
    const currentAgent = orderedAgents[currentIndex];
    
    // Mark current as complete
    if (currentAgent) {
      setCompletedAgents(prev => [...prev, currentAgent.id]);
    }

    // Check if we hit an approval gate
    if (currentAgent && APPROVAL_GATES.includes(currentAgent.id)) {
      setIsPaused(true);
      return;
    }

    setCurrentIndex(nextIndex);
  }, [currentIndex, orderedAgents, onComplete]);

  const handleApproval = () => {
    setIsPaused(false);
    setCurrentIndex(prev => prev + 1);
  };

  // Auto-advance animation
  useEffect(() => {
    if (!autoPlay || isPaused || isComplete) return;
    
    if (currentIndex === -1) {
      const startTimer = setTimeout(() => setCurrentIndex(0), 500);
      return () => clearTimeout(startTimer);
    }

    const timer = setTimeout(advanceToNext, 1800);
    return () => clearTimeout(timer);
  }, [currentIndex, autoPlay, isPaused, isComplete, advanceToNext]);

  const getAgentStatus = (agentId: string) => {
    if (completedAgents.includes(agentId)) return 'done';
    if (currentAgentId === agentId) return 'running';
    return 'pending';
  };

  const getPhaseStatus = (phaseAgents: string[]) => {
    const allDone = phaseAgents.every(id => completedAgents.includes(id));
    const someActive = phaseAgents.some(id => id === currentAgentId);
    const someStarted = phaseAgents.some(id => completedAgents.includes(id) || id === currentAgentId);
    
    if (allDone) return 'done';
    if (someActive) return 'active';
    if (someStarted) return 'partial';
    return 'pending';
  };

  return (
    <div className="w-full">
      {/* Phase Labels */}
      <div className="flex items-center gap-1 mb-6 overflow-x-auto pb-2">
        {PIPELINE_PHASES.map((phase, phaseIndex) => {
          const status = getPhaseStatus(phase.agents);
          return (
            <div key={phase.name} className="flex items-center">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: phaseIndex * 0.05 }}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                  status === 'done' ? 'bg-green-500/10 text-green-600 dark:text-green-400' :
                  status === 'active' ? 'bg-primary/10 text-primary' :
                  status === 'partial' ? 'bg-primary/5 text-primary/70' :
                  'bg-muted text-muted-foreground'
                }`}
              >
                {phase.name}
              </motion.div>
              {phaseIndex < PIPELINE_PHASES.length - 1 && (
                <div className={`w-8 h-px mx-1 transition-colors ${
                  status === 'done' ? 'bg-green-500/50' : 'bg-border'
                }`} />
              )}
            </div>
          );
        })}
      </div>

      {/* Agent Pipeline */}
      <div className="relative">
        {/* Connection Line */}
        <div className="absolute top-1/2 left-0 right-0 h-px bg-border -translate-y-1/2 z-0" />
        
        {/* Progress Line */}
        <motion.div
          className="absolute top-1/2 left-0 h-0.5 bg-primary -translate-y-1/2 z-0 origin-left"
          initial={{ scaleX: 0 }}
          animate={{ 
            scaleX: orderedAgents.length > 0 
              ? (completedAgents.length + (currentAgentId ? 0.5 : 0)) / orderedAgents.length 
              : 0 
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{ width: '100%' }}
        />

        {/* Agents */}
        <div className="flex items-center justify-between gap-1 overflow-x-auto pb-4 relative z-10">
          {orderedAgents.map((agent, index) => {
            const status = getAgentStatus(agent.id);
            const Icon = agent.icon;
            const isApprovalGate = APPROVAL_GATES.includes(agent.id);
            const showApprovalPrompt = isPaused && completedAgents[completedAgents.length - 1] === agent.id;

            return (
              <div key={agent.id} className="flex flex-col items-center relative">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.03, duration: 0.3 }}
                  className={`relative flex flex-col items-center group`}
                >
                  {/* Agent Node */}
                  <motion.div
                    animate={status === 'running' ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ duration: 1.5, repeat: status === 'running' ? Infinity : 0 }}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center relative transition-all cursor-pointer ${
                      status === 'done' ? 'bg-green-500/10 border-2 border-green-500/30' :
                      status === 'running' ? `${agent.bgColor} border-2 border-primary shadow-lg shadow-primary/20` :
                      'bg-card border border-border'
                    }`}
                  >
                    {status === 'running' ? (
                      <Loader2 className={`w-5 h-5 ${agent.color} animate-spin`} />
                    ) : status === 'done' ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    ) : (
                      <Icon className="w-5 h-5 text-muted-foreground" />
                    )}

                    {/* Approval Gate Indicator */}
                    {isApprovalGate && status !== 'done' && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500 flex items-center justify-center">
                        <Hand className="w-2.5 h-2.5 text-white" />
                      </div>
                    )}
                  </motion.div>

                  {/* Agent Label */}
                  <span className={`text-[10px] font-medium mt-2 text-center whitespace-nowrap max-w-[60px] truncate ${
                    status === 'running' ? 'text-primary' :
                    status === 'done' ? 'text-green-600 dark:text-green-400' :
                    'text-muted-foreground'
                  }`}>
                    {agent.shortName}
                  </span>

                  {/* Tooltip on hover */}
                  <div className="absolute bottom-full mb-2 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50">
                    <div className="bg-popover border border-border rounded-lg p-2 shadow-xl min-w-[150px]">
                      <p className="text-xs font-medium text-foreground">{agent.name}</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">{agent.purpose}</p>
                    </div>
                  </div>
                </motion.div>

                {/* Approval Prompt */}
                {showApprovalPrompt && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-full mt-4"
                  >
                    <button
                      onClick={handleApproval}
                      className="px-3 py-1.5 bg-primary text-primary-foreground text-xs font-medium rounded-full hover:bg-primary/90 transition-colors shadow-lg"
                    >
                      Approve & Continue
                    </button>
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Status Bar */}
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Circle className="w-3 h-3 fill-muted stroke-muted-foreground" />
            Pending
          </span>
          <span className="flex items-center gap-1.5">
            <Loader2 className="w-3 h-3 text-primary" />
            Running
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3 h-3 text-green-500" />
            Complete
          </span>
          <span className="flex items-center gap-1.5">
            <Hand className="w-3 h-3 text-amber-500" />
            Human Gate
          </span>
        </div>
        <div className="text-xs font-mono text-muted-foreground">
          {completedAgents.length}/{orderedAgents.length} agents
        </div>
      </div>
    </div>
  );
};

export default EnterpriseAgentPipeline;
