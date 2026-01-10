import { Shield, Eye, Scale, Lock, FileCheck, Server } from 'lucide-react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

const EnterpriseSection = () => {
  const features = [
    {
      icon: Shield,
      title: 'Reliability',
      description: 'Built for 99.99% uptime with automatic failover and redundancy.',
    },
    {
      icon: Eye,
      title: 'Observability',
      description: 'Full visibility into your systems with logs, metrics, and distributed tracing.',
    },
    {
      icon: Scale,
      title: 'Scalability',
      description: 'From prototype to millions of users. Auto-scaling infrastructure that grows with you.',
    },
    {
      icon: Lock,
      title: 'Security',
      description: 'Zero-trust architecture, encryption at rest and in transit, regular security audits.',
    },
    {
      icon: FileCheck,
      title: 'Compliance-Ready',
      description: 'Architecture designed with SOC2, GDPR, and HIPAA requirements in mind.',
    },
    {
      icon: Server,
      title: 'Multi-Tenant',
      description: 'Enterprise-ready multi-tenancy with data isolation and tenant-specific configurations.',
    },
  ];

  return (
    <section id="enterprise" className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-hero-glow opacity-20" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">
              Enterprise Grade
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
            <span className="text-foreground">Built for</span>
            <br />
            <span className="gradient-text">Global Scale</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            No exaggerated claims—just solid engineering excellence designed for 
            the world's most demanding use cases.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="glass rounded-2xl p-8 hover:border-primary/50 transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-6 group-hover:from-primary/30 group-hover:to-accent/30 transition-colors">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Statement */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20 text-center"
        >
          <p className="text-xl text-muted-foreground italic max-w-2xl mx-auto">
            "Designed with enterprise use cases in mind. 
            Every architectural decision prioritizes long-term maintainability and security."
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default EnterpriseSection;
