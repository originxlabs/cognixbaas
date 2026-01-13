import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, ArrowLeft, Search, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import CognixLogo from "@/components/CognixLogo";
import { Helmet } from "react-helmet-async";

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>Page Not Found | Cognix</title>
        <meta name="description" content="The page you're looking for doesn't exist. Return to Cognix homepage." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4 relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--foreground)) 1px, transparent 0)`,
              backgroundSize: '48px 48px'
            }}
          />
        </div>

        {/* Gradient orb */}
        <div 
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-30 pointer-events-none"
          style={{
            background: 'radial-gradient(circle, hsl(var(--primary) / 0.1) 0%, transparent 70%)'
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 text-center max-w-lg"
        >
          {/* Logo */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex justify-center mb-8"
          >
            <CognixLogo size="lg" />
          </motion.div>

          {/* 404 Text */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-6"
          >
            <span className="text-8xl md:text-9xl font-bold text-primary/20">404</span>
          </motion.div>

          {/* Error Message */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-2xl md:text-3xl font-semibold text-foreground mb-3"
          >
            Page Not Found
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-muted-foreground mb-8 leading-relaxed"
          >
            The page you're looking for doesn't exist or has been moved. 
            Let's get you back on track.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-3 justify-center mb-10"
          >
            <Button asChild size="lg" className="gap-2">
              <Link to="/">
                <Home className="w-4 h-4" />
                Back to Home
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2">
              <Link to="/docs">
                <Search className="w-4 h-4" />
                Browse Docs
              </Link>
            </Button>
          </motion.div>

          {/* Helpful Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="border-t border-border pt-6"
          >
            <p className="text-sm text-muted-foreground mb-4">
              Popular destinations:
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { label: 'Product', href: '/product' },
                { label: 'Pricing', href: '/pricing' },
                { label: 'Documentation', href: '/docs' },
                { label: 'Contact', href: '/contact' },
              ].map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors px-3 py-1 rounded-md hover:bg-secondary/50"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="absolute bottom-6 text-center"
        >
          <p className="text-xs text-muted-foreground/60">
            © {new Date().getFullYear()} Cropxon Innovations Pvt. Ltd.
          </p>
        </motion.div>
      </div>
    </>
  );
};

export default NotFound;
