import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CognixLogo from './CognixLogo';
import { ThemeToggle } from './ThemeToggle';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';

const EnterpriseHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    
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

  const productLinks = [
    { title: 'Overview', description: 'AI-assisted backend engineering platform', href: '/product' },
    { title: 'Architecture', description: 'Modular Monolith design patterns', href: '/architecture' },
    { title: 'Agent Pipeline', description: '14 specialized engineering agents', href: '/#agents' },
    { title: 'Security', description: 'Enterprise-grade security defaults', href: '/security' },
  ];

  const developerLinks = [
    { title: 'Documentation', description: 'Comprehensive guides and references', href: '/docs' },
    { title: 'API Reference', description: 'OpenAPI 3.1 specifications', href: '/docs' },
    { title: 'Whitepaper', description: 'Technical architecture deep-dive', href: '/whitepaper' },
  ];

  const useCaseLinks = [
    { title: 'Enterprise', description: 'Large-scale backend systems', href: '/#enterprise' },
    { title: 'Startups', description: 'Rapid MVP development', href: '/#features' },
    { title: 'Teams', description: 'Collaborative backend engineering', href: '/#technology' },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-background/80 backdrop-blur-xl border-b border-border/50 py-3'
          : 'bg-transparent py-4'
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <CognixLogo size="sm" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          <NavigationMenu>
            <NavigationMenuList className="gap-0">
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-sm font-medium text-muted-foreground hover:text-foreground data-[state=open]:text-foreground h-9 px-3">
                  Product
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-1 p-2">
                    {productLinks.map((link) => (
                      <li key={link.title}>
                        <NavigationMenuLink asChild>
                          <a
                            href={link.href}
                            className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-secondary/50"
                          >
                            <div className="text-sm font-medium text-foreground">{link.title}</div>
                            <p className="text-xs text-muted-foreground mt-1">{link.description}</p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-sm font-medium text-muted-foreground hover:text-foreground data-[state=open]:text-foreground h-9 px-3">
                  Developers
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[320px] gap-1 p-2">
                    {developerLinks.map((link) => (
                      <li key={link.title}>
                        <NavigationMenuLink asChild>
                          <Link
                            to={link.href}
                            className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-secondary/50"
                          >
                            <div className="text-sm font-medium text-foreground">{link.title}</div>
                            <p className="text-xs text-muted-foreground mt-1">{link.description}</p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-sm font-medium text-muted-foreground hover:text-foreground data-[state=open]:text-foreground h-9 px-3">
                  Use Cases
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[320px] gap-1 p-2">
                    {useCaseLinks.map((link) => (
                      <li key={link.title}>
                        <NavigationMenuLink asChild>
                          <a
                            href={link.href}
                            className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-secondary/50"
                          >
                            <div className="text-sm font-medium text-foreground">{link.title}</div>
                            <p className="text-xs text-muted-foreground mt-1">{link.description}</p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link 
                  to="/pricing" 
                  className="inline-flex items-center justify-center text-sm font-medium text-muted-foreground hover:text-foreground h-9 px-3 transition-colors"
                >
                  Pricing
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link 
                  to="/docs" 
                  className="inline-flex items-center justify-center text-sm font-medium text-muted-foreground hover:text-foreground h-9 px-3 transition-colors"
                >
                  Docs
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <ThemeToggle />
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-muted-foreground hover:text-foreground h-9 px-3 text-sm font-medium"
            asChild
          >
            <Link to="/auth">Sign In</Link>
          </Button>
          <Button 
            size="sm" 
            className="h-9 px-4 text-sm font-medium bg-foreground text-background hover:bg-foreground/90"
            asChild
          >
            <Link to={isLoggedIn ? "/dashboard" : "/onboarding"}>
              Request Access
            </Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            className="p-2 text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-background/95 backdrop-blur-xl border-t border-border mt-3">
          <nav className="container mx-auto px-4 py-4 space-y-1">
            <div className="space-y-1 pb-3 border-b border-border">
              <p className="text-xs font-medium text-muted-foreground px-3 py-2">Product</p>
              {productLinks.map((link) => (
                <a
                  key={link.title}
                  href={link.href}
                  className="block px-3 py-2 text-sm text-foreground hover:bg-secondary/50 rounded-md"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.title}
                </a>
              ))}
            </div>
            <div className="space-y-1 pb-3 border-b border-border">
              <p className="text-xs font-medium text-muted-foreground px-3 py-2">Developers</p>
              {developerLinks.map((link) => (
                <Link
                  key={link.title}
                  to={link.href}
                  className="block px-3 py-2 text-sm text-foreground hover:bg-secondary/50 rounded-md"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.title}
                </Link>
              ))}
            </div>
            <div className="pt-3 space-y-2">
              <Button variant="ghost" className="w-full justify-start h-10" asChild>
                <Link to="/auth" onClick={() => setIsMobileMenuOpen(false)}>Sign In</Link>
              </Button>
              <Button className="w-full h-10 bg-foreground text-background hover:bg-foreground/90" asChild>
                <Link to={isLoggedIn ? "/dashboard" : "/onboarding"} onClick={() => setIsMobileMenuOpen(false)}>
                  Request Access
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default EnterpriseHeader;
