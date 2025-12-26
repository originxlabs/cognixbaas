import { useState } from 'react';
import { ArrowRight, Sparkles, CheckCircle, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const WaitlistSection = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    toast.success('Welcome to the Cognix waitlist!');
  };

  const benefits = [
    'Early access before public launch',
    'Free credits for initial usage',
    'Exclusive founder pricing',
    'Direct access to the engineering team',
  ];

  return (
    <section id="waitlist" className="py-32 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-8">
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-sm font-medium text-muted-foreground">
              Limited Early Access
            </span>
          </div>

          {/* Headline */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
            <span className="text-foreground">Be First to Experience</span>
            <br />
            <span className="gradient-text">The Future of Backend</span>
          </h2>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
            Join the waitlist for exclusive early access. Get free credits 
            and special founder pricing when we launch.
          </p>

          {/* Form */}
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="max-w-xl mx-auto mb-12">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-grow">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full h-14 pl-12 pr-4 bg-card border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    disabled={isSubmitting}
                  />
                </div>
                <Button
                  type="submit"
                  variant="hero"
                  size="lg"
                  className="h-14 px-8"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="animate-pulse">Joining...</span>
                  ) : (
                    <>
                      Join Waitlist
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          ) : (
            <div className="glass rounded-2xl p-8 max-w-xl mx-auto mb-12">
              <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-foreground mb-2">You're on the list!</h3>
              <p className="text-muted-foreground">
                We'll notify you when Cognix is ready for early access.
              </p>
            </div>
          )}

          {/* Benefits */}
          <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {benefits.map((benefit) => (
              <div
                key={benefit}
                className="flex items-center gap-3 glass rounded-xl p-4"
              >
                <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                <span className="text-sm text-foreground">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WaitlistSection;
