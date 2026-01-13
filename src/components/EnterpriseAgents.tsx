import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import EnterpriseAgentPipeline from './agents/EnterpriseAgentPipeline';

const EnterpriseAgents = () => {
  return (
    <section id="agents" className="py-24 relative bg-secondary/20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mb-12"
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

        {/* Enterprise Agent Pipeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-card/50 backdrop-blur-sm rounded-2xl border border-border p-6 md:p-8"
        >
          <EnterpriseAgentPipeline autoPlay={true} />
        </motion.div>

        {/* Key Principle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 p-6 rounded-xl border border-border bg-card/30"
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
            <Link 
              to="/whitepaper" 
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors whitespace-nowrap"
            >
              Read whitepaper
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EnterpriseAgents;
