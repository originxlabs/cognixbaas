import { GraduationCap, BookOpen, TrendingUp, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const LearningSection = () => {
  const benefits = [
    {
      icon: BookOpen,
      title: 'Explains Design Decisions',
      description: 'Understand why each architectural choice was made. Learn the reasoning behind Clean Architecture, DDD patterns, and security implementations.',
    },
    {
      icon: TrendingUp,
      title: 'Grow Into Senior Engineers',
      description: "Cognix doesn't just build—it teaches. Watch how production-grade systems are structured and learn best practices along the way.",
    },
    {
      icon: Users,
      title: 'For Every Skill Level',
      description: "Whether you're a CS student, junior developer, or seasoned architect, Cognix adapts to accelerate your learning and productivity.",
    },
  ];

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left - Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6">
                <GraduationCap className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-muted-foreground">
                  Learn & Grow
                </span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-black mb-6">
                <span className="text-foreground">Your AI</span>
                <br />
                <span className="gradient-text">Backend Mentor</span>
              </h2>
              
              <p className="text-lg text-muted-foreground mb-10">
                Cognix is more than a tool—it's a learning platform that helps developers 
                understand backend architecture while building production systems.
              </p>

              <div className="space-y-6">
                {benefits.map((benefit, index) => (
                  <motion.div 
                    key={benefit.title} 
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center shrink-0">
                      <benefit.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground mb-1">{benefit.title}</h3>
                      <p className="text-sm text-muted-foreground">{benefit.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right - Visual */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="glass rounded-2xl p-8"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3 pb-4 border-b border-border">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-primary font-bold text-sm">AI</span>
                  </div>
                  <span className="font-medium text-foreground">Cognix Explains</span>
                </div>
                
                <div className="space-y-4 text-sm">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    className="p-4 bg-secondary/50 rounded-lg border-l-4 border-primary"
                  >
                    <p className="text-muted-foreground mb-2">
                      <span className="text-primary font-bold">Why Clean Architecture?</span>
                    </p>
                    <p className="text-foreground">
                      I chose Clean Architecture because it separates concerns into distinct layers. 
                      This makes your codebase testable, maintainable, and independent of frameworks or databases.
                    </p>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                    className="p-4 bg-secondary/50 rounded-lg border-l-4 border-accent"
                  >
                    <p className="text-muted-foreground mb-2">
                      <span className="text-accent font-bold">Repository Pattern Benefit</span>
                    </p>
                    <p className="text-foreground">
                      By abstracting data access, you can easily switch from PostgreSQL to MongoDB 
                      without changing your business logic—a key enterprise requirement.
                    </p>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.5 }}
                    className="p-4 bg-secondary/50 rounded-lg border-l-4 border-emerald-400"
                  >
                    <p className="text-muted-foreground mb-2">
                      <span className="text-emerald-400 font-bold">Security First</span>
                    </p>
                    <p className="text-foreground">
                      JWT tokens with refresh rotation prevent token theft. Combined with RBAC, 
                      you have enterprise-grade access control out of the box.
                    </p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LearningSection;
