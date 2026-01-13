import { Helmet } from 'react-helmet-async';
import SEOHead from '@/components/SEOHead';
import EnterpriseHeader from '@/components/EnterpriseHeader';
import EnterpriseHero from '@/components/EnterpriseHero';
import EnterpriseFeatures from '@/components/EnterpriseFeatures';
import EnterpriseAgents from '@/components/EnterpriseAgents';
import EnterpriseTechnology from '@/components/EnterpriseTechnology';
import EnterpriseCTA from '@/components/EnterpriseCTA';
import WaitlistSection from '@/components/WaitlistSection';
import EnterpriseFooter from '@/components/EnterpriseFooter';

const Index = () => {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Cognix',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web',
    description: 'AI-assisted backend engineering platform. Production-ready infrastructure with intelligent agent workflows.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      description: 'Free tier available',
    },
    creator: {
      '@type': 'Organization',
      name: 'Cropxon Innovations Pvt. Ltd.',
      url: 'https://cognix.dev',
    },
    featureList: [
      'AI-assisted backend engineering',
      'Intelligent agent workflows',
      'Human oversight and control',
      'Enterprise-grade security',
      'Modular monolith architecture',
      'Automatic API documentation',
    ],
  };

  return (
    <>
      <SEOHead 
        title="AI-Assisted Backend Engineering | Built for Real Systems"
        description="AI-assisted backend engineering platform. Production-ready infrastructure with intelligent agent workflows. Human oversight at every step. By Cropxon."
        keywords="backend engineering, AI backend, API generator, enterprise architecture, modular monolith, Cropxon, Cognix"
        canonicalUrl="https://cognix.dev"
        structuredData={structuredData}
      />

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
