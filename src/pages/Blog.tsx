import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, User, Tag, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

const blogPosts = [
  {
    id: 1,
    title: 'Introducing Cognix: AI-Powered Backend Generation',
    excerpt: 'Learn how Cognix is revolutionizing backend development with intelligent multi-agent workflows that turn natural language into production-ready APIs.',
    category: 'Product',
    author: 'CropXon Team',
    date: '2024-01-15',
    readTime: '5 min read',
    featured: true,
  },
  {
    id: 2,
    title: 'The Future of Backend-as-a-Service',
    excerpt: 'Explore how AI is transforming the way developers build and deploy backend systems, from concept to production in minutes.',
    category: 'Industry',
    author: 'Engineering Team',
    date: '2024-01-12',
    readTime: '8 min read',
    featured: false,
  },
  {
    id: 3,
    title: 'Multi-Agent Architecture: How Cognix Works',
    excerpt: 'A deep dive into the 8 specialized AI agents that power Cognix and how they collaborate to deliver enterprise-grade backends.',
    category: 'Technical',
    author: 'Architecture Team',
    date: '2024-01-10',
    readTime: '12 min read',
    featured: false,
  },
  {
    id: 4,
    title: 'Clean Architecture with AI: Best Practices',
    excerpt: 'Discover how Cognix applies Domain-Driven Design and Clean Architecture principles automatically to every generated backend.',
    category: 'Technical',
    author: 'Engineering Team',
    date: '2024-01-08',
    readTime: '10 min read',
    featured: false,
  },
  {
    id: 5,
    title: 'Enterprise Security in AI-Generated Code',
    excerpt: 'How Cognix ensures security best practices, authentication, and RBAC are baked into every line of generated code.',
    category: 'Security',
    author: 'Security Team',
    date: '2024-01-05',
    readTime: '7 min read',
    featured: false,
  },
  {
    id: 6,
    title: 'From Idea to API: A Step-by-Step Guide',
    excerpt: 'Walk through the complete journey of building a production backend with Cognix, from natural language prompt to deployed API.',
    category: 'Tutorial',
    author: 'DevRel Team',
    date: '2024-01-03',
    readTime: '15 min read',
    featured: false,
  },
];

const categories = ['All', 'Product', 'Technical', 'Industry', 'Security', 'Tutorial'];

const Blog = () => {
  return (
    <>
      <Helmet>
        <title>Blog - Cognix | AI-Powered Backend Development Insights</title>
        <meta 
          name="description" 
          content="Stay updated with the latest insights on AI-powered backend development, multi-agent architectures, and enterprise-grade API generation." 
        />
      </Helmet>

      <div className="min-h-screen bg-background text-foreground">
        <Header />
        
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            {/* Back Link */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-8"
            >
              <Link 
                to="/" 
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Link>
            </motion.div>

            {/* Header */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl mb-12"
            >
              <h1 className="text-4xl md:text-5xl font-black mb-4">
                <span className="text-foreground">Cognix</span>{' '}
                <span className="gradient-text">Blog</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Insights, tutorials, and updates on AI-powered backend development.
              </p>
            </motion.div>

            {/* Categories */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex flex-wrap gap-2 mb-10"
            >
              {categories.map((category) => (
                <button
                  key={category}
                  className="px-4 py-2 rounded-full text-sm font-medium bg-secondary text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  {category}
                </button>
              ))}
            </motion.div>

            {/* Featured Post */}
            {blogPosts.filter(p => p.featured).map((post) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="glass rounded-2xl p-8 mb-10 group hover:border-primary/50 transition-all"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-xs font-medium">
                    Featured
                  </span>
                  <span className="px-3 py-1 bg-secondary text-muted-foreground rounded-full text-xs font-medium">
                    {post.category}
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                  {post.title}
                </h2>
                <p className="text-muted-foreground mb-6 max-w-2xl">
                  {post.excerpt}
                </p>
                <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-6">
                  <span className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {post.author}
                  </span>
                  <span className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {post.readTime}
                  </span>
                </div>
                <Button variant="glow" className="group/btn">
                  Read Article
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            ))}

            {/* Blog Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogPosts.filter(p => !p.featured).map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * (index + 3) }}
                  className="glass rounded-xl p-6 group hover:border-primary/50 transition-all hover:-translate-y-1"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Tag className="w-3 h-3 text-primary" />
                    <span className="text-xs font-medium text-primary">
                      {post.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{post.date}</span>
                    <span>{post.readTime}</span>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Blog;
