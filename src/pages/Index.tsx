import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AgentsSection from '@/components/AgentsSection';
import FeaturesSection from '@/components/FeaturesSection';
import TechnologySection from '@/components/TechnologySection';
import LearningSection from '@/components/LearningSection';
import EnterpriseSection from '@/components/EnterpriseSection';
import CountdownSection from '@/components/CountdownSection';
import WaitlistSection from '@/components/WaitlistSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Cognix - AI-Powered Backend-as-a-Service | Build Backends at the Speed of Thought</title>
        <meta 
          name="description" 
          content="Design, generate, deploy, and scale production-ready backend systems with intelligent multi-agent workflows. From idea to live API in minutes. By CropXon." 
        />
        <meta name="keywords" content="backend as a service, AI backend, API generator, microservices, enterprise architecture, multi-agent AI, CropXon" />
        <link rel="canonical" href="https://cognix.dev" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Cognix - AI-Powered Backend-as-a-Service" />
        <meta property="og:description" content="Build backends at the speed of thought with intelligent multi-agent workflows." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://cognix.dev" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Cognix - AI-Powered Backend-as-a-Service" />
        <meta name="twitter:description" content="Build backends at the speed of thought with intelligent multi-agent workflows." />
      </Helmet>

      <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
        <Header />
        <main>
          <HeroSection />
          <FeaturesSection />
          <AgentsSection />
          <TechnologySection />
          <LearningSection />
          <EnterpriseSection />
          <CountdownSection />
          <WaitlistSection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
