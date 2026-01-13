import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, Zap, Building2, Rocket } from 'lucide-react';
import EnterpriseHeader from '@/components/EnterpriseHeader';
import EnterpriseFooter from '@/components/EnterpriseFooter';
import { Button } from '@/components/ui/button';

const plans = [
  {
    name: 'Starter',
    description: 'Perfect for side projects and experimentation',
    price: 'Free',
    period: 'forever',
    icon: Rocket,
    features: [
      '3 backend projects',
      '1,000 API calls/month',
      'Community support',
      'Basic documentation',
      'Shared infrastructure',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Pro',
    description: 'For professional developers and growing teams',
    price: '$49',
    period: '/month',
    icon: Zap,
    features: [
      'Unlimited projects',
      '100,000 API calls/month',
      'Priority support',
      'Custom domains',
      'Advanced analytics',
      'Team collaboration',
      'CI/CD integration',
    ],
    cta: 'Start Free Trial',
    popular: true,
  },
  {
    name: 'Enterprise',
    description: 'For organizations with advanced needs',
    price: 'Custom',
    period: '',
    icon: Building2,
    features: [
      'Unlimited everything',
      'Dedicated infrastructure',
      '24/7 premium support',
      'SLA guarantee',
      'Custom integrations',
      'On-premise deployment',
      'Security audit',
      'Custom contracts',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
];

const Pricing = () => {
  return (
    <>
      <Helmet>
        <title>Pricing - Cognix | AI-Powered Backend-as-a-Service</title>
        <meta 
          name="description" 
          content="Choose the perfect plan for your backend development needs. From free starter to enterprise-grade solutions." 
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

            {/* Header */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <h1 className="text-4xl md:text-5xl font-black mb-4">
                <span className="text-foreground">Simple,</span>{' '}
                <span className="gradient-text">Transparent Pricing</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Start free, scale as you grow. No hidden fees, no surprises.
              </p>
            </motion.div>

            {/* Pricing Grid */}
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {plans.map((plan, index) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className={`glass rounded-2xl p-8 relative ${
                    plan.popular ? 'border-primary ring-2 ring-primary/20' : ''
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="px-4 py-1 bg-primary text-primary-foreground rounded-full text-xs font-bold">
                        Most Popular
                      </span>
                    </div>
                  )}
                  
                  <div className="mb-6">
                    <plan.icon className="w-10 h-10 text-primary mb-4" />
                    <h3 className="text-xl font-bold text-foreground mb-2">{plan.name}</h3>
                    <p className="text-sm text-muted-foreground">{plan.description}</p>
                  </div>

                  <div className="mb-6">
                    <span className="text-4xl font-black text-foreground">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3 text-sm">
                        <Check className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    variant={plan.popular ? 'glow' : 'outline'} 
                    className="w-full"
                  >
                    {plan.cta}
                  </Button>
                </motion.div>
              ))}
            </div>

            {/* FAQ Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-20 max-w-3xl mx-auto"
            >
              <h2 className="text-2xl font-bold text-center text-foreground mb-8">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {[
                  {
                    q: 'Can I switch plans anytime?',
                    a: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.',
                  },
                  {
                    q: 'What happens if I exceed my API limits?',
                    a: 'We\'ll notify you when you\'re approaching your limit. You can upgrade or purchase additional capacity.',
                  },
                  {
                    q: 'Is there a free trial for Pro?',
                    a: 'Yes, Pro comes with a 14-day free trial. No credit card required to start.',
                  },
                ].map((faq) => (
                  <div key={faq.q} className="glass rounded-xl p-6">
                    <h4 className="font-semibold text-foreground mb-2">{faq.q}</h4>
                    <p className="text-sm text-muted-foreground">{faq.a}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </main>

        <EnterpriseFooter />
      </div>
    </>
  );
};

export default Pricing;
