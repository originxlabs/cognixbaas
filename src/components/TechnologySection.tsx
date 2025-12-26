import { Server, Database, Cloud, GitBranch, Layers } from 'lucide-react';

const TechnologySection = () => {
  const languages = [
    { name: '.NET', isPrimary: true },
    { name: 'Go', isPrimary: false },
    { name: 'Python', isPrimary: false },
    { name: 'Java', isPrimary: false },
  ];

  const architectures = [
    { name: 'Monolithic', phase: 'Initial' },
    { name: 'SOA', phase: 'Current' },
    { name: 'Microservices', phase: 'Current' },
    { name: 'Event-Driven', phase: 'Coming' },
  ];

  const databases = ['PostgreSQL', 'Neon', 'Supabase'];
  
  const clouds = [
    { name: 'Railway', status: 'Live' },
    { name: 'AWS', status: 'Planned' },
    { name: 'Azure', status: 'Planned' },
    { name: 'GCP', status: 'Planned' },
  ];

  return (
    <section id="technology" className="py-32 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
            <span className="text-foreground">Built on</span>
            <br />
            <span className="gradient-text">Battle-Tested Technology</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Enterprise-grade stack designed for scale, security, and performance.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Languages */}
          <div className="glass rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Server className="w-5 h-5 text-background" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Backend Languages</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {languages.map((lang) => (
                <div
                  key={lang.name}
                  className={`p-4 rounded-xl border transition-all ${
                    lang.isPrimary
                      ? 'bg-primary/10 border-primary/50'
                      : 'bg-secondary/50 border-border hover:border-primary/30'
                  }`}
                >
                  <span className="font-mono font-bold text-foreground">{lang.name}</span>
                  {lang.isPrimary && (
                    <span className="ml-2 text-xs text-primary font-medium">Primary</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Architecture */}
          <div className="glass rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent to-primary flex items-center justify-center">
                <Layers className="w-5 h-5 text-background" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Architecture Styles</h3>
            </div>
            <div className="space-y-3">
              {architectures.map((arch) => (
                <div
                  key={arch.name}
                  className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 border border-border"
                >
                  <span className="font-medium text-foreground">{arch.name}</span>
                  <span className={`text-xs px-2 py-1 rounded ${
                    arch.phase === 'Live' || arch.phase === 'Current'
                      ? 'bg-green-500/20 text-green-400'
                      : arch.phase === 'Initial'
                      ? 'bg-primary/20 text-primary'
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {arch.phase}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Databases */}
          <div className="glass rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
                <Database className="w-5 h-5 text-background" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Database Support</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {databases.map((db) => (
                <span
                  key={db}
                  className="px-4 py-2 bg-secondary/80 rounded-lg font-mono text-sm text-foreground border border-border hover:border-primary/50 transition-colors"
                >
                  {db}
                </span>
              ))}
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Enterprise-grade schema design. Scalable to millions of requests.
            </p>
          </div>

          {/* Cloud & Deployment */}
          <div className="glass rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center">
                <Cloud className="w-5 h-5 text-background" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Cloud & Deployment</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {clouds.map((cloud) => (
                <div
                  key={cloud.name}
                  className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 border border-border"
                >
                  <span className="font-medium text-foreground">{cloud.name}</span>
                  <span className={`text-xs ${
                    cloud.status === 'Live' ? 'text-green-400' : 'text-muted-foreground'
                  }`}>
                    {cloud.status === 'Live' && '●'} {cloud.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Repository Strategy */}
        <div className="mt-12 max-w-2xl mx-auto">
          <div className="glass rounded-2xl p-8 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <GitBranch className="w-6 h-6 text-primary" />
              <h3 className="text-lg font-bold text-foreground">Repository Strategy</h3>
            </div>
            <div className="flex justify-center gap-4">
              <div className="px-6 py-3 bg-primary/10 rounded-lg border border-primary/50">
                <span className="font-mono text-primary font-bold">Monorepo</span>
                <span className="text-xs text-muted-foreground block">Initial</span>
              </div>
              <div className="flex items-center text-muted-foreground">→</div>
              <div className="px-6 py-3 bg-secondary/50 rounded-lg border border-border">
                <span className="font-mono text-foreground font-bold">Polyrepo</span>
                <span className="text-xs text-muted-foreground block">Later</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnologySection;
