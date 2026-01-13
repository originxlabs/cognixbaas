import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Target, Eye, Users, Lightbulb } from 'lucide-react';
import EnterpriseHeader from '@/components/EnterpriseHeader';
import EnterpriseFooter from '@/components/EnterpriseFooter';
import CognixLogo from '@/components/CognixLogo';

const About = () => {
  return (
    <>
      <Helmet>
        <title>About - Cognix by CropXon | AI-Powered Backend Platform</title>
        <meta 
          name="description" 
          content="Learn about Cognix, the AI-powered backend-as-a-service platform built by CropXon Innovations." 
        />
      </Helmet>

      <div className="min-h-screen bg-background text-foreground">
        <EnterpriseHeader />
        
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

            {/* Hero */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-4xl mx-auto mb-16"
            >
              <CognixLogo size="xl" showText={false} className="justify-center mb-6" />
              <h1 className="text-4xl md:text-5xl font-black mb-4">
                <span className="text-foreground">About</span>{' '}
                <span className="gradient-text">Cognix</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Reimagining backend development with intelligent AI agents. Built by CropXon Innovations 
                to empower developers worldwide.
              </p>
            </motion.div>

            {/* Mission & Vision */}
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="glass rounded-2xl p-8"
              >
                <Target className="w-10 h-10 text-primary mb-4" />
                <h2 className="text-xl font-bold text-foreground mb-4">Our Mission</h2>
                <p className="text-muted-foreground">
                  To democratize backend development by making enterprise-grade infrastructure 
                  accessible to every developer, regardless of their backend expertise.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="glass rounded-2xl p-8"
              >
                <Eye className="w-10 h-10 text-primary mb-4" />
                <h2 className="text-xl font-bold text-foreground mb-4">Our Vision</h2>
                <p className="text-muted-foreground">
                  A world where great ideas aren't limited by backend complexity. Where developers 
                  can focus on innovation while AI handles the infrastructure.
                </p>
              </motion.div>
            </div>

            {/* Values */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="max-w-4xl mx-auto mb-16"
            >
              <h2 className="text-2xl font-bold text-center text-foreground mb-8">Our Values</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { icon: Lightbulb, title: 'Innovation', desc: 'Pushing boundaries of what\'s possible' },
                  { icon: Users, title: 'Developer-First', desc: 'Built by developers, for developers' },
                  { icon: Target, title: 'Excellence', desc: 'Enterprise-grade quality in everything' },
                  { icon: Eye, title: 'Transparency', desc: 'Open, honest, and straightforward' },
                ].map((value, index) => (
                  <div key={value.title} className="glass rounded-xl p-6 text-center">
                    <value.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                    <h3 className="font-bold text-foreground mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">{value.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* CropXon */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="glass rounded-2xl p-8 max-w-3xl mx-auto text-center"
            >
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Built by CropXon Innovations
              </h2>
              <p className="text-muted-foreground mb-6">
                CropXon Innovations Pvt Ltd is a technology company focused on building 
                intelligent developer tools and AI-powered platforms. Cognix is our flagship 
                product, representing our vision for the future of software development.
              </p>
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} CropXon Innovations Pvt Ltd. All rights reserved.
              </p>
            </motion.div>
          </div>
        </main>

        <EnterpriseFooter />
      </div>
    </>
  );
};

export default About;
