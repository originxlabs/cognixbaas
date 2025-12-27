import { ArrowRight, Clock, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  image?: string;
  featured?: boolean;
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Understanding Clean Architecture in Backend Systems',
    excerpt: 'Learn how Cognix implements Clean Architecture principles to create maintainable, testable, and scalable backend systems.',
    category: 'Architecture',
    readTime: '8 min read',
    date: 'Coming Soon',
    featured: true,
  },
  {
    id: '2',
    title: 'Multi-Agent AI: The Future of Code Generation',
    excerpt: 'Discover how multiple specialized AI agents work together to produce production-ready backend code.',
    category: 'AI',
    readTime: '6 min read',
    date: 'Coming Soon',
  },
  {
    id: '3',
    title: 'From Monolith to Microservices: A Practical Guide',
    excerpt: 'Step-by-step guide on how Cognix helps you transition from monolithic to microservices architecture.',
    category: 'Tutorial',
    readTime: '12 min read',
    date: 'Coming Soon',
  },
  {
    id: '4',
    title: 'Secure by Design: Authentication Best Practices',
    excerpt: 'How Cognix implements industry-standard authentication patterns and why security should never be an afterthought.',
    category: 'Security',
    readTime: '7 min read',
    date: 'Coming Soon',
  },
  {
    id: '5',
    title: 'PostgreSQL Schema Design for Scale',
    excerpt: 'Learn database modeling techniques that ensure your backend can handle millions of requests.',
    category: 'Database',
    readTime: '10 min read',
    date: 'Coming Soon',
  },
  {
    id: '6',
    title: 'Building REST APIs the Right Way',
    excerpt: 'Best practices for designing RESTful APIs that are intuitive, consistent, and developer-friendly.',
    category: 'API Design',
    readTime: '9 min read',
    date: 'Coming Soon',
  },
];

const categoryColors: Record<string, string> = {
  'Architecture': 'bg-violet-500/20 text-violet-400',
  'AI': 'bg-primary/20 text-primary',
  'Tutorial': 'bg-emerald-500/20 text-emerald-400',
  'Security': 'bg-red-400/20 text-red-400',
  'Database': 'bg-amber-500/20 text-amber-400',
  'API Design': 'bg-sky-400/20 text-sky-400',
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

const BlogSection = () => {
  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  return (
    <section id="blog" className="py-32 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6">
            <BookOpen className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">
              Learn & Explore
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
            <span className="text-foreground">Technical</span>
            <br />
            <span className="gradient-text">Insights & Tutorials</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Deep dives into backend architecture, AI-powered development, 
            and enterprise engineering practices.
          </p>
        </motion.div>

        {/* Featured Post */}
        {featuredPost && (
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-12"
          >
            <div className="glass rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300 group">
              <div className="grid md:grid-cols-2 gap-0">
                {/* Image placeholder */}
                <div className="aspect-video md:aspect-auto bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-hero-glow opacity-50" />
                  <div className="relative text-center p-8">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                      <BookOpen className="w-10 h-10 text-background" />
                    </div>
                    <span className="text-sm text-muted-foreground font-mono">Featured Article</span>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${categoryColors[featuredPost.category]}`}>
                      {featuredPost.category}
                    </span>
                    <span className="text-xs text-muted-foreground">{featuredPost.date}</span>
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                    {featuredPost.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      {featuredPost.readTime}
                    </div>
                    <Button variant="ghost" className="group/btn">
                      Read Article
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Regular Posts Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {regularPosts.map((post) => (
            <motion.article
              key={post.id}
              variants={itemVariants}
              className="glass rounded-2xl p-6 hover:border-primary/50 transition-all duration-300 group flex flex-col"
            >
              {/* Category & Date */}
              <div className="flex items-center gap-3 mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${categoryColors[post.category]}`}>
                  {post.category}
                </span>
                <span className="text-xs text-muted-foreground">{post.date}</span>
              </div>
              
              {/* Title */}
              <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                {post.title}
              </h3>
              
              {/* Excerpt */}
              <p className="text-sm text-muted-foreground mb-4 line-clamp-3 flex-grow">
                {post.excerpt}
              </p>
              
              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  {post.readTime}
                </div>
                <button className="text-xs text-primary font-medium hover:underline flex items-center gap-1">
                  Read more
                  <ArrowRight className="w-3 h-3" />
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
          <p className="text-muted-foreground mb-6">
            Our blog launches alongside Cognix. Join the waitlist to get notified.
          </p>
          <Button variant="outline" asChild>
            <a href="#waitlist">
              Get Notified
              <ArrowRight className="w-4 h-4" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogSection;
