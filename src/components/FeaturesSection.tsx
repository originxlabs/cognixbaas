import { 
  MessageSquare, 
  Blocks, 
  Code, 
  Rocket, 
  Activity,
  Plug,
  Lock,
  Settings
} from 'lucide-react';

const features = [
  {
    icon: MessageSquare,
    title: 'Describe in Plain English',
    description: 'Simply explain what you need. Cognix understands requirements and converts them into structured backend specifications automatically.',
    visual: (
      <div className="font-mono text-xs space-y-1 text-muted-foreground">
        <div className="text-primary">"Build an e-commerce API with..."</div>
        <div className="pl-4">• User authentication</div>
        <div className="pl-4">• Product catalog</div>
        <div className="pl-4">• Order management</div>
        <div className="pl-4">• Payment integration</div>
      </div>
    ),
  },
  {
    icon: Blocks,
    title: 'Auto-Design Architecture',
    description: 'Get enterprise-grade architecture instantly. Clean Architecture, DDD, security best practices, and scalability patterns—all designed by AI.',
    visual: (
      <div className="flex items-center justify-center gap-2 text-xs">
        <div className="px-2 py-1 bg-primary/20 rounded text-primary">Controllers</div>
        <span className="text-muted-foreground">→</span>
        <div className="px-2 py-1 bg-accent/20 rounded text-accent">Services</div>
        <span className="text-muted-foreground">→</span>
        <div className="px-2 py-1 bg-emerald-500/20 rounded text-emerald-400">Repository</div>
      </div>
    ),
  },
  {
    icon: Code,
    title: 'Generate Real Code',
    description: 'Production-ready APIs, services, repositories, database migrations, and OpenAPI specifications. No prototypes—real, deployable code.',
    visual: (
      <div className="font-mono text-xs space-y-1">
        <div className="text-muted-foreground">// Generated endpoint</div>
        <div><span className="text-primary">@Get</span>(<span className="text-emerald-400">"/products"</span>)</div>
        <div><span className="text-accent">async</span> getProducts() &#123;</div>
        <div className="pl-4 text-muted-foreground">return this.service.findAll();</div>
        <div>&#125;</div>
      </div>
    ),
  },
  {
    icon: Rocket,
    title: 'Live API Deployment',
    description: 'Get a real, secure API URL instantly. Test via Swagger, Postman, or any API tool. No infrastructure headaches.',
    visual: (
      <div className="text-xs space-y-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-green-400">Live</span>
        </div>
        <div className="font-mono text-primary text-xs truncate">
          https://api.myapp.cognix.dev
        </div>
      </div>
    ),
  },
  {
    icon: Activity,
    title: 'Real-Time Generation',
    description: 'Watch your backend come to life. See files generate, schemas form, and services connect in real-time animated visualizations.',
    visual: (
      <div className="space-y-1">
        <div className="h-1.5 bg-primary/30 rounded-full overflow-hidden">
          <div className="h-full w-3/4 bg-primary rounded-full animate-pulse" />
        </div>
        <div className="h-1.5 bg-accent/30 rounded-full overflow-hidden">
          <div className="h-full w-1/2 bg-accent rounded-full animate-pulse delay-100" />
        </div>
        <div className="h-1.5 bg-emerald-500/30 rounded-full overflow-hidden">
          <div className="h-full w-full bg-emerald-500 rounded-full animate-pulse delay-200" />
        </div>
      </div>
    ),
  },
  {
    icon: Plug,
    title: 'Seamless UI Integration',
    description: 'Connect Cognix backends to any frontend. Works with Lovable, Rork, React, Flutter, Angular, or any no-code builder.',
    visual: (
      <div className="flex flex-wrap gap-2 text-xs">
        {['Lovable', 'Rork', 'React', 'Flutter', 'Angular'].map((tech) => (
          <span key={tech} className="px-2 py-1 bg-secondary rounded text-muted-foreground">
            {tech}
          </span>
        ))}
      </div>
    ),
  },
  {
    icon: Lock,
    title: 'Enterprise Security',
    description: 'Industry-standard authentication, role-based access control, secure tokens, and security best practices baked in by default.',
    visual: (
      <div className="flex items-center gap-2 text-xs">
        <Lock className="w-4 h-4 text-green-400" />
        <span className="text-green-400">JWT</span>
        <span className="text-muted-foreground">+</span>
        <span className="text-accent">RBAC</span>
        <span className="text-muted-foreground">+</span>
        <span className="text-primary">OAuth2</span>
      </div>
    ),
  },
  {
    icon: Settings,
    title: 'Configurable Connectors',
    description: 'Configure databases, cloud providers, and external services yourself. Full control over your infrastructure choices.',
    visual: (
      <div className="grid grid-cols-3 gap-1 text-xs">
        <span className="px-1 py-0.5 bg-secondary rounded text-center text-muted-foreground">PostgreSQL</span>
        <span className="px-1 py-0.5 bg-secondary rounded text-center text-muted-foreground">Railway</span>
        <span className="px-1 py-0.5 bg-secondary rounded text-center text-muted-foreground">AWS</span>
      </div>
    ),
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-32 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
            <span className="text-foreground">Everything You Need,</span>
            <br />
            <span className="gradient-text">Nothing You Don't</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            From natural language to production API—Cognix handles every step of backend development.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group glass rounded-2xl p-6 hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 flex flex-col"
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4 group-hover:from-primary/30 group-hover:to-accent/30 transition-colors">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              
              {/* Content */}
              <h3 className="text-lg font-bold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-grow">
                {feature.description}
              </p>
              
              {/* Visual */}
              <div className="p-3 bg-secondary/50 rounded-lg border border-border">
                {feature.visual}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
