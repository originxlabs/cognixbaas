import { motion } from 'framer-motion';
import { 
  Code2, 
  Shield, 
  GitBranch, 
  Layers, 
  Zap, 
  Users,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const features = [
  {
    icon: Layers,
    title: 'Modular Monolith Architecture',
    description: 'Clean separation of concerns with internal module boundaries. Migrate to microservices when you need to, not before.',
    details: [
      'Domain-driven module structure',
      'Clear API contracts between modules',
      'Single deployable unit',
    ],
  },
  {
    icon: Code2,
    title: 'Production-Ready Code',
    description: '.NET 8 backend with enterprise patterns. No scaffolds or prototypes—real, deployable code with tests.',
    details: [
      'Clean Architecture patterns',
      'FluentValidation for inputs',
      'Comprehensive test coverage',
    ],
  },
  {
    icon: Shield,
    title: 'Security by Default',
    description: 'JWT authentication, RBAC authorization, and security policies baked into every generated endpoint.',
    details: [
      'JWT + Refresh token auth',
      'Policy-based authorization',
      'Input sanitization',
    ],
  },
  {
    icon: GitBranch,
    title: 'GitHub as Source of Truth',
    description: 'Every change committed. Agent vs human changes labeled. Full history preserved. Bidirectional sync.',
    details: [
      'Automatic commits with context',
      'Branch-based workflows',
      'Rollback capability',
    ],
  },
  {
    icon: Zap,
    title: 'Sandbox-First Deployment',
    description: 'Isolated preview environments for every change. Test safely before touching production.',
    details: [
      'Instant preview URLs',
      'Fake payment providers',
      'One-click redeploy',
    ],
  },
  {
    icon: Users,
    title: 'Human-in-the-Loop',
    description: 'AI accelerates development. Humans approve architecture. No code reaches production without review.',
    details: [
      'Architecture approval gates',
      'Code review checkpoints',
      'Production deployment sign-off',
    ],
  },
];

const EnterpriseFeatures = () => {
  return (
    <section id="features" className="py-24 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mb-16"
        >
          <p className="text-sm font-medium text-primary mb-3">Platform</p>
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight mb-4">
            Everything you need for enterprise backend development.
          </h2>
          <p className="text-muted-foreground text-lg">
            Built on proven patterns. Secured by design. Controlled by humans.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group p-6 rounded-xl border border-border bg-card/30 hover:bg-card/60 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-lg bg-secondary/50 flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                <feature.icon className="w-5 h-5 text-foreground group-hover:text-primary transition-colors" />
              </div>
              
              <h3 className="text-lg font-medium text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {feature.description}
              </p>
              
              <ul className="space-y-2">
                {feature.details.map((detail) => (
                  <li key={detail} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                    {detail}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <Link 
            to="/docs" 
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            Explore all features
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default EnterpriseFeatures;
