import { 
  Brain, 
  GitBranch, 
  Database, 
  Code2, 
  Shield, 
  Cloud, 
  FileText, 
  TestTube2,
  Sparkles 
} from 'lucide-react';

const agents = [
  {
    icon: Brain,
    name: 'Requirement Analyzer',
    description: 'Understands natural language requirements and converts them into structured backend specifications.',
    color: 'from-cyan-400 to-cyan-600',
  },
  {
    icon: GitBranch,
    name: 'Architecture Designer',
    description: 'Designs clean architecture patterns, DDD structures, and scalable system blueprints.',
    color: 'from-violet-400 to-violet-600',
  },
  {
    icon: Database,
    name: 'Database Modeler',
    description: 'Creates enterprise-grade schemas, migrations, and optimized data relationships.',
    color: 'from-emerald-400 to-emerald-600',
  },
  {
    icon: Code2,
    name: 'API Generator',
    description: 'Generates production-ready API endpoints, services, repositories, and OpenAPI specs.',
    color: 'from-orange-400 to-orange-600',
  },
  {
    icon: Shield,
    name: 'Security Agent',
    description: 'Implements authentication, RBAC, secure tokens, and industry-standard security practices.',
    color: 'from-red-400 to-red-600',
  },
  {
    icon: Cloud,
    name: 'Deployment Agent',
    description: 'Handles cloud deployment, CI/CD pipelines, and infrastructure provisioning.',
    color: 'from-sky-400 to-sky-600',
  },
  {
    icon: FileText,
    name: 'Documentation Agent',
    description: 'Auto-generates comprehensive API documentation, guides, and code comments.',
    color: 'from-pink-400 to-pink-600',
  },
  {
    icon: TestTube2,
    name: 'Testing Agent',
    description: 'Creates unit tests, integration tests, and validates API functionality.',
    color: 'from-amber-400 to-amber-600',
  },
];

const AgentsSection = () => {
  return (
    <section id="agents" className="py-32 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-hero-glow opacity-30" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">
              Multi-Agent Architecture
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
            <span className="text-foreground">8 Intelligent Agents,</span>
            <br />
            <span className="gradient-text">One Unified Mission</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Each agent specializes in a critical aspect of backend development, 
            working independently yet collaboratively to deliver production-ready systems.
          </p>
        </div>

        {/* Agents Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {agents.map((agent, index) => (
            <div
              key={agent.name}
              className="group glass rounded-2xl p-6 hover:border-primary/50 transition-all duration-500 hover:-translate-y-2"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Icon */}
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${agent.color} p-3 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <agent.icon className="w-full h-full text-background" />
              </div>
              
              {/* Content */}
              <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                {agent.name}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {agent.description}
              </p>
            </div>
          ))}
        </div>

        {/* Multi-LLM Support */}
        <div className="mt-20 text-center">
          <div className="glass rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-xl font-bold text-foreground mb-4">
              Model-Agnostic Intelligence
            </h3>
            <p className="text-muted-foreground mb-6">
              Cognix leverages multiple LLM providers for optimal performance across different tasks.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {['OpenAI', 'Claude', 'DeepSeek', 'Llama', 'Mistral', 'Gemini'].map((model) => (
                <span
                  key={model}
                  className="px-4 py-2 bg-secondary/80 rounded-lg text-sm font-mono text-muted-foreground border border-border hover:border-primary/50 hover:text-primary transition-all cursor-default"
                >
                  {model}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AgentsSection;
