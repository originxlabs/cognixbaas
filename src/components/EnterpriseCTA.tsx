import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const EnterpriseCTA = () => {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="relative rounded-2xl border border-border bg-card/50 overflow-hidden"
        >
          {/* Subtle gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] to-transparent pointer-events-none" />
          
          <div className="relative p-8 md:p-12 lg:p-16 text-center">
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight mb-4">
              Ready to build your next backend?
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8">
              Join the private beta. Get early access to AI-assisted backend engineering 
              with human control at every step.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button 
                size="lg" 
                className="h-12 px-6 text-sm font-medium bg-foreground text-background hover:bg-foreground/90 gap-2"
                asChild
              >
                <Link to="/onboarding">
                  Request Access
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="h-12 px-6 text-sm font-medium border-border"
                asChild
              >
                <a href="#waitlist">
                  Join Waitlist
                </a>
              </Button>
            </div>

            <p className="text-xs text-muted-foreground mt-8">
              No credit card required · Free sandbox environments · Enterprise support available
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EnterpriseCTA;
