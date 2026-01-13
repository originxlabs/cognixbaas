import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import EnterpriseHeader from '@/components/EnterpriseHeader';
import EnterpriseFooter from '@/components/EnterpriseFooter';

const Terms = () => {
  return (
    <>
      <Helmet>
        <title>Terms of Service - Cognix</title>
        <meta name="description" content="Terms of Service for Cognix by CropXon Innovations." />
      </Helmet>

      <div className="min-h-screen bg-background text-foreground">
        <EnterpriseHeader />
        
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 max-w-3xl">
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

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-4xl font-black mb-8">Terms of Service</h1>
              
              <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
                <p className="text-sm">Last updated: January 2024</p>

                <section className="space-y-4">
                  <h2 className="text-xl font-bold text-foreground">1. Acceptance of Terms</h2>
                  <p>
                    By accessing or using Cognix, you agree to be bound by these Terms of Service 
                    and all applicable laws and regulations. If you do not agree with any of these 
                    terms, you are prohibited from using this service.
                  </p>
                </section>

                <section className="space-y-4">
                  <h2 className="text-xl font-bold text-foreground">2. Use License</h2>
                  <p>
                    Permission is granted to temporarily use Cognix for personal or commercial 
                    purposes, subject to the restrictions outlined in these terms.
                  </p>
                </section>

                <section className="space-y-4">
                  <h2 className="text-xl font-bold text-foreground">3. Service Description</h2>
                  <p>
                    Cognix is an AI-powered backend-as-a-service platform that generates production-ready 
                    backend systems from natural language descriptions. The service is provided "as is" 
                    and we reserve the right to modify or discontinue features at any time.
                  </p>
                </section>

                <section className="space-y-4">
                  <h2 className="text-xl font-bold text-foreground">4. User Responsibilities</h2>
                  <p>You are responsible for:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Maintaining the security of your account</li>
                    <li>All activities that occur under your account</li>
                    <li>Ensuring your use complies with applicable laws</li>
                    <li>Not using the service for any unlawful purposes</li>
                  </ul>
                </section>

                <section className="space-y-4">
                  <h2 className="text-xl font-bold text-foreground">5. Contact</h2>
                  <p>
                    For any questions regarding these terms, please contact us at{' '}
                    <a href="mailto:legal@cognix.dev" className="text-primary hover:underline">
                      legal@cognix.dev
                    </a>
                  </p>
                </section>
              </div>
            </motion.div>
          </div>
        </main>

        <EnterpriseFooter />
      </div>
    </>
  );
};

export default Terms;
