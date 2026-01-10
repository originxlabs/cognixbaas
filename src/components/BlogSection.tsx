import { ArrowRight, Clock, BookOpen, Layers, Code, Shield, Database, Cpu, Workflow } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  icon: React.ElementType;
  featured?: boolean;
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Understanding Clean Architecture in Backend Systems',
    excerpt: 'Learn how Cognix implements Clean Architecture principles to create maintainable, testable, and scalable backend systems that stand the test of time.',
    category: 'Architecture',
    readTime: '8 min read',
    date: 'Coming Soon',
    icon: Layers,
    featured: true,
  },
  {
    id: '2',
    title: 'Multi-Agent AI: The Future of Code Generation',
    excerpt: 'Discover how multiple specialized AI agents work together to produce production-ready backend code with unprecedented accuracy.',
    category: 'AI Engineering',
    readTime: '6 min read',
    date: 'Coming Soon',
    icon: Cpu,
  },
  {
    id: '3',
    title: 'From Monolith to Microservices: A Practical Guide',
    excerpt: 'Step-by-step guide on how Cognix helps you transition from monolithic to microservices architecture seamlessly.',
    category: 'System Design',
    readTime: '12 min read',
    date: 'Coming Soon',
    icon: Workflow,
  },
  {
    id: '4',
    title: 'Secure by Design: Authentication Best Practices',
    excerpt: 'How Cognix implements industry-standard authentication patterns and why security should never be an afterthought.',
    category: 'Security',
    readTime: '7 min read',
    date: 'Coming Soon',
    icon: Shield,
  },
  {
    id: '5',
    title: 'PostgreSQL Schema Design for Scale',
    excerpt: 'Learn database modeling techniques that ensure your backend can handle millions of requests with optimal performance.',
    category: 'Database',
    readTime: '10 min read',
    date: 'Coming Soon',
    icon: Database,
  },
  {
    id: '6',
    title: 'Building REST APIs the Right Way',
    excerpt: 'Best practices for designing RESTful APIs that are intuitive, consistent, and developer-friendly from day one.',
    category: 'API Design',
    readTime: '9 min read',
    date: 'Coming Soon',
    icon: Code,
  },
];

const categoryColors: Record<string, string> = {
  'Architecture': 'bg-primary/10 text-primary border border-primary/20',
  'AI Engineering': 'bg-accent/10 text-accent border border-accent/20',
  'System Design': 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
  'Security': 'bg-rose-500/10 text-rose-400 border border-rose-500/20',
  'Database': 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
  'API Design': 'bg-sky-500/10 text-sky-400 border border-sky-500/20',
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

const BlogSection = () => {
  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  return (
    <section id="blog" className="py-32 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <div className="inline-flex items-center gap-2 bg-card/50 backdrop-blur-sm border border-border/50 px-4 py-2 rounded-full mb-6">
            <BookOpen className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground tracking-wide">
              Engineering Playbooks
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            <span className="text-foreground">Technical</span>
            <br />
            <span className="gradient-text">Insights & Guides</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Deep dives into backend architecture, AI-powered development, 
            and production-grade engineering practices.
          </p>
        </motion.div>

        {/* Featured Post */}
        {featuredPost && (
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-16"
          >
            <article className="group relative bg-card/30 backdrop-blur-sm border border-border/50 rounded-2xl overflow-hidden hover:border-primary/30 transition-all duration-500">
              <div className="grid lg:grid-cols-5 gap-0">
                {/* Image/Visual side */}
                <div className="lg:col-span-2 aspect-video lg:aspect-auto bg-gradient-to-br from-primary/10 via-card to-accent/10 flex items-center justify-center relative overflow-hidden min-h-[280px]">
                  {/* Decorative hexagon pattern */}
                  <div className="absolute inset-0 opacity-20">
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
                      <pattern id="hexPattern" x="0" y="0" width="20" height="17.32" patternUnits="userSpaceOnUse">
                        <polygon 
                          points="10,0 20,5 20,13 10,17.32 0,13 0,5" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="0.5"
                          className="text-primary"
                        />
                      </pattern>
                      <rect width="100%" height="100%" fill="url(#hexPattern)" />
                    </svg>
                  </div>
                  
                  <div className="relative text-center p-8">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                      <featuredPost.icon className="w-10 h-10 text-primary" />
                    </div>
                    <span className="text-sm text-muted-foreground font-mono tracking-wider">Featured Article</span>
                  </div>
                </div>
                
                {/* Content side */}
                <div className="lg:col-span-3 p-8 lg:p-10 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-5">
                    <span className={`px-3 py-1.5 rounded-full text-xs font-medium ${categoryColors[featuredPost.category]}`}>
                      {featuredPost.category}
                    </span>
                    <span className="text-xs text-muted-foreground font-medium">{featuredPost.date}</span>
                  </div>
                  
                  <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors leading-tight">
                    {featuredPost.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-8 leading-relaxed text-base">
                    {featuredPost.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      {featuredPost.readTime}
                    </div>
                    <Button variant="ghost" className="group/btn text-primary hover:text-primary hover:bg-primary/10">
                      Read Article
                      <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </div>
            </article>
          </motion.div>
        )}

        {/* Regular Posts Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
        >
          {regularPosts.map((post) => (
            <motion.article
              key={post.id}
              variants={itemVariants}
              className="group relative bg-card/30 backdrop-blur-sm border border-border/50 rounded-xl p-6 hover:border-primary/30 hover:bg-card/50 transition-all duration-300 flex flex-col"
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                <post.icon className="w-6 h-6 text-primary" />
              </div>

              {/* Category & Date */}
              <div className="flex items-center gap-3 mb-4">
                <span className={`px-2.5 py-1 rounded-full text-[11px] font-medium ${categoryColors[post.category]}`}>
                  {post.category}
                </span>
                <span className="text-[11px] text-muted-foreground">{post.date}</span>
              </div>
              
              {/* Title */}
              <h3 className="text-lg font-semibold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                {post.title}
              </h3>
              
              {/* Excerpt */}
              <p className="text-sm text-muted-foreground mb-5 line-clamp-3 flex-grow leading-relaxed">
                {post.excerpt}
              </p>
              
              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-border/50">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="w-3.5 h-3.5" />
                  {post.readTime}
                </div>
                <button className="text-xs text-primary font-medium hover:underline flex items-center gap-1 group/link">
                  Read more
                  <ArrowRight className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center"
        >
          <div className="inline-flex flex-col items-center bg-card/30 backdrop-blur-sm border border-border/50 rounded-2xl p-8 max-w-md">
            <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Blog Launching Soon</h3>
            <p className="text-muted-foreground text-sm mb-6 text-center">
              Our engineering playbooks launch alongside Cognix. Join the waitlist to get notified.
            </p>
            <Button variant="outline" className="border-primary/30 hover:bg-primary/10 hover:border-primary" asChild>
              <a href="#waitlist">
                Get Notified
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogSection;
