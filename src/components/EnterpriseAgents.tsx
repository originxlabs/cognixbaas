import { motion } from 'framer-motion';
import { COGNIX_AGENTS } from '@/config/agents';
import { ArrowRight } from 'lucide-react';

const EnterpriseAgents = () => {
  // Group agents by phase
  const phases = [
    { name: 'Analysis', agents: COGNIX_AGENTS.filter(a => a.phase === 'Analysis') },
    { name: 'Planning', agents: COGNIX_AGENTS.filter(a => a.phase === 'Planning') },
    { name: 'Design', agents: COGNIX_AGENTS.filter(a => a.phase === 'Design') },
    { name: 'Implementation', agents: COGNIX_AGENTS.filter(a => a.phase === 'Implementation') },
    { name: 'Quality', agents: COGNIX_AGENTS.filter(a => a.phase === 'Quality') },
    { name: 'Delivery', agents: COGNIX_AGENTS.filter(a => a.phase === 'Delivery') },
  ].filter(p => p.agents.length > 0);

  return (
    <section id="agents" className="py-24 relative bg-secondary/20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mb-16"
        >
          <p className="text-sm font-medium text-primary mb-3">Agent Architecture</p>
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight mb-4">
            14 specialized agents. One unified pipeline.
          </h2>
          <p className="text-muted-foreground text-lg">
            Each agent has a single responsibility, defined inputs and outputs, and no authority outside its scope. 
            This reduces hallucination risk and improves auditability.
          </p>
        </motion.div>

        {/* Pipeline Visualization */}
        <div className="space-y-8">
          {phases.map((phase, phaseIndex) => (
            <motion.div
              key={phase.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: phaseIndex * 0.1 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <span className="text-xs font-mono text-primary bg-primary/10 px-2 py-1 rounded">
                  {String(phaseIndex + 1).padStart(2, '0')}
                </span>
                <h3 className="text-sm font-medium text-foreground uppercase tracking-wider">
                  {phase.name}
                </h3>
                <div className="flex-1 h-px bg-border" />
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                {phase.agents.map((agent, agentIndex) => (
                  <motion.div
                    key={agent.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: agentIndex * 0.05 }}
                    className="group p-4 rounded-lg border border-border bg-card/50 hover:bg-card transition-all duration-200"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-md ${agent.bgColor} flex items-center justify-center shrink-0`}>
                        <agent.icon className={`w-4 h-4 ${agent.color}`} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          {agent.shortName}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                          {agent.purpose}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Key Principle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 p-6 rounded-xl border border-border bg-card/30"
        >
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex-1">
              <h4 className="text-lg font-medium text-foreground mb-2">
                AI assists, humans decide.
              </h4>
              <p className="text-sm text-muted-foreground">
                No agent can deploy to production alone. Architecture decisions require human approval. 
                Security policies are enforced by design, not by hope.
              </p>
            </div>
            <a 
              href="/whitepaper" 
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors whitespace-nowrap"
            >
              Read whitepaper
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EnterpriseAgents;
