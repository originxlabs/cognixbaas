import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CognixLogo from './CognixLogo';
import { ThemeToggle } from './ThemeToggle';
import { cn } from '@/lib/utils';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
        <Link to="/" className="flex items-center gap-2.5">
          <CognixLogo size="sm" showText={false} />
          <div className="flex flex-col">
            <span className="text-base font-bold tracking-wide gradient-text">COGNIX</span>
            <span className="text-[8px] text-muted-foreground font-semibold tracking-widest uppercase -mt-0.5">by CROPXON</span>
          </div>
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
          <Button variant="glow" size="sm" asChild>
            <a href="/#waitlist">Join Waitlist</a>
          </Button>
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
            <Button variant="glow" className="mt-3" asChild>
              <a href="/#waitlist">Join Waitlist</a>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
