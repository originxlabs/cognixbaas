import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import CognixLogo from './CognixLogo';
import { ThemeToggle } from './ThemeToggle';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Check auth status
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsLoggedIn(!!session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsLoggedIn(!!session);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      subscription.unsubscribe();
    };
  }, []);

  const navLinks = [
    { href: '/#features', label: 'Features' },
    { href: '/#agents', label: 'Agents' },
    { href: '/#technology', label: 'Technology' },
    { href: '/pricing', label: 'Pricing', isRoute: true },
    { href: '/blog', label: 'Blog', isRoute: true },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'glass py-2'
          : 'bg-transparent py-4'
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <CognixLogo size="sm" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            link.isRoute ? (
              <Link
                key={link.href}
                to={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 font-medium"
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 font-medium"
              >
                {link.label}
              </a>
            )
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-2">
          <ThemeToggle />
          <Button variant="ghost" size="sm" asChild>
            <Link to="/docs">Docs</Link>
          </Button>
          {isLoggedIn ? (
            <Button variant="glow" size="sm" asChild className="gap-2">
              <Link to="/dashboard">
                <Sparkles className="w-4 h-4" />
                Try Cognix
                <Badge variant="secondary" className="ml-1 text-[10px] px-1.5 py-0">MVP</Badge>
              </Link>
            </Button>
          ) : (
            <Button variant="glow" size="sm" asChild className="gap-2">
              <Link to="/onboarding">
                <Sparkles className="w-4 h-4" />
                Try Cognix
                <Badge variant="secondary" className="ml-1 text-[10px] px-1.5 py-0">MVP</Badge>
              </Link>
            </Button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            className="p-2 text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass mt-2 mx-4 rounded-xl p-4 animate-fade-up">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              link.isRoute ? (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-muted-foreground hover:text-foreground transition-colors py-2 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-muted-foreground hover:text-foreground transition-colors py-2 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              )
            ))}
            <Link
              to="/docs"
              className="text-muted-foreground hover:text-foreground transition-colors py-2 font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Documentation
            </Link>
            <Button variant="glow" className="mt-3 gap-2" asChild>
              <Link to={isLoggedIn ? "/dashboard" : "/onboarding"} onClick={() => setIsMobileMenuOpen(false)}>
                <Sparkles className="w-4 h-4" />
                Try Cognix
                <Badge variant="secondary" className="ml-1 text-[10px] px-1.5 py-0">MVP</Badge>
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
