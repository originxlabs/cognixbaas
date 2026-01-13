import { Helmet } from 'react-helmet-async';
import EnterpriseHeader from '@/components/EnterpriseHeader';
import EnterpriseHero from '@/components/EnterpriseHero';
import EnterpriseFeatures from '@/components/EnterpriseFeatures';
import EnterpriseAgents from '@/components/EnterpriseAgents';
import EnterpriseTechnology from '@/components/EnterpriseTechnology';
import EnterpriseCTA from '@/components/EnterpriseCTA';
import WaitlistSection from '@/components/WaitlistSection';
import EnterpriseFooter from '@/components/EnterpriseFooter';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Cognix - AI-Assisted Backend Engineering | Built for Real Systems</title>
        <meta 
          name="description" 
          content="AI-assisted backend engineering platform. Production-ready infrastructure with intelligent agent workflows. Human oversight at every step. By Cropxon." 
        />
        <meta name="keywords" content="backend engineering, AI backend, API generator, enterprise architecture, modular monolith, Cropxon" />
        <link rel="canonical" href="https://cognix.dev" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Cognix - AI-Assisted Backend Engineering" />
        <meta property="og:description" content="Production-ready backend infrastructure with intelligent agent workflows. Human oversight at every step." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://cognix.dev" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Cognix - AI-Assisted Backend Engineering" />
        <meta name="twitter:description" content="Production-ready backend infrastructure with intelligent agent workflows. Human oversight at every step." />
      </Helmet>

      <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
        <EnterpriseHeader />
        <main>
          <EnterpriseHero />
          <EnterpriseFeatures />
          <EnterpriseAgents />
          <EnterpriseTechnology />
          <EnterpriseCTA />
          <WaitlistSection />
        </main>
        <EnterpriseFooter />
      </div>
    </>
  );
};

export default Index;
