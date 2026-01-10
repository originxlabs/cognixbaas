import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Privacy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy - Cognix</title>
        <meta name="description" content="Privacy Policy for Cognix by CropXon Innovations." />
      </Helmet>

      <div className="min-h-screen bg-background text-foreground">
        <Header />
        
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
              <h1 className="text-4xl font-black mb-8">Privacy Policy</h1>
              
              <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
                <p className="text-sm">Last updated: January 2024</p>

                <section className="space-y-4">
                  <h2 className="text-xl font-bold text-foreground">1. Information We Collect</h2>
                  <p>
                    We collect information you provide directly to us, such as when you create an account, 
                    join our waitlist, or contact us for support. This may include your name, email address, 
                    and any other information you choose to provide.
                  </p>
                </section>

                <section className="space-y-4">
                  <h2 className="text-xl font-bold text-foreground">2. How We Use Your Information</h2>
                  <p>We use the information we collect to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Provide, maintain, and improve our services</li>
                    <li>Send you technical notices and support messages</li>
                    <li>Respond to your comments and questions</li>
                    <li>Send promotional communications (with your consent)</li>
                  </ul>
                </section>

                <section className="space-y-4">
                  <h2 className="text-xl font-bold text-foreground">3. Data Security</h2>
                  <p>
                    We take reasonable measures to help protect your personal information from loss, 
                    theft, misuse, unauthorized access, disclosure, alteration, and destruction.
                  </p>
                </section>

                <section className="space-y-4">
                  <h2 className="text-xl font-bold text-foreground">4. Contact Us</h2>
                  <p>
                    If you have any questions about this Privacy Policy, please contact us at{' '}
                    <a href="mailto:privacy@cognix.dev" className="text-primary hover:underline">
                      privacy@cognix.dev
                    </a>
                  </p>
                </section>
              </div>
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Privacy;
