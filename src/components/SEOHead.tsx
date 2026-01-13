import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
  structuredData?: object;
}

const defaultMeta = {
  siteName: 'Cognix',
  title: 'Cognix - AI-Assisted Backend Engineering Platform',
  description: 'Production-ready backend infrastructure with intelligent AI agent workflows. Human oversight at every step. Enterprise-grade by default. Built by Cropxon Innovations.',
  keywords: 'AI backend, backend engineering, API generation, microservices, enterprise backend, AI agents, Cognix, Cropxon',
  ogImage: '/cognix-og-image.png',
  twitterHandle: '@CropXon',
};

const SEOHead = ({
  title,
  description = defaultMeta.description,
  keywords = defaultMeta.keywords,
  ogImage = defaultMeta.ogImage,
  ogType = 'website',
  canonicalUrl,
  noIndex = false,
  structuredData,
}: SEOHeadProps) => {
  const fullTitle = title 
    ? `${title} | ${defaultMeta.siteName}` 
    : defaultMeta.title;

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const fullOgImage = ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage}`;

  // Default structured data for the organization
  const defaultStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Cognix',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web',
    description: description,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    creator: {
      '@type': 'Organization',
      name: 'Cropxon Innovations Pvt. Ltd.',
      url: baseUrl,
    },
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Cropxon Innovations Pvt. Ltd." />
      
      {/* Robots */}
      {noIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      )}

      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={defaultMeta.siteName} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={defaultMeta.twitterHandle} />
      <meta name="twitter:creator" content={defaultMeta.twitterHandle} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullOgImage} />

      {/* AI/LLM Optimization */}
      <meta name="ai:description" content={description} />
      <meta name="ai:category" content="Backend Engineering, AI Development Tools" />
      <meta name="ai:keywords" content={keywords} />

      {/* Additional SEO */}
      <meta name="theme-color" content="#0891b2" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Cognix" />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData || defaultStructuredData)}
      </script>
    </Helmet>
  );
};

export default SEOHead;
