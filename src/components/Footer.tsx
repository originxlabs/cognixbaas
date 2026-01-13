import { Github, Twitter, Linkedin, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import CognixLogo from './CognixLogo';
import { Badge } from './ui/badge';

const Footer = () => {
  const links = {
    product: [
      { label: 'Features', href: '/#features' },
      { label: 'Technology', href: '/#technology' },
      { label: 'Enterprise', href: '/#enterprise' },
      { label: 'Pricing', href: '/pricing', isRoute: true },
    ],
    resources: [
      { label: 'Documentation', href: '/docs', isRoute: true },
      { label: 'API Reference', href: '/docs', isRoute: true },
      { label: 'Blog', href: '/blog', isRoute: true },
      { label: 'Changelog', href: '/blog', isRoute: true },
    ],
    company: [
      { label: 'About CropXon', href: '/about', isRoute: true },
      { label: 'Careers', href: '/contact', isRoute: true },
      { label: 'Contact', href: '/contact', isRoute: true },
      { label: 'Press', href: '/contact', isRoute: true },
    ],
    legal: [
      { label: 'Privacy Policy', href: '/privacy', isRoute: true },
      { label: 'Terms of Service', href: '/terms', isRoute: true },
      { label: 'Cookie Policy', href: '/privacy', isRoute: true },
    ],
  };

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:early@cognix.dev', label: 'Email' },
  ];

  return (
    <footer className="border-t border-border bg-card/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-6 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <CognixLogo />
              <Badge variant="outline" className="font-mono text-xs">
                MVP 1.0.0
              </Badge>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4 max-w-sm">
              Reimagining backend development with intelligent systems. 
              Building the future where great backends write themselves.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-secondary/80 transition-colors"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold text-foreground mb-3 text-sm">Product</h4>
            <ul className="space-y-2">
              {links.product.map((link) => (
                <li key={link.label}>
                  {link.isRoute ? (
                    <Link
                      to={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-foreground mb-3 text-sm">Resources</h4>
            <ul className="space-y-2">
              {links.resources.map((link) => (
                <li key={link.label}>
                  {link.isRoute ? (
                    <Link
                      to={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-foreground mb-3 text-sm">Company</h4>
            <ul className="space-y-2">
              {links.company.map((link) => (
                <li key={link.label}>
                  {link.isRoute ? (
                    <Link
                      to={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-foreground mb-3 text-sm">Legal</h4>
            <ul className="space-y-2">
              {links.legal.map((link) => (
                <li key={link.label}>
                  {link.isRoute ? (
                    <Link
                      to={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-border flex flex-col md:flex-row justify-between items-center gap-3">
          <div className="flex items-center gap-3">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} CropXon Innovations Pvt Ltd. All rights reserved.
            </p>
            <Badge variant="secondary" className="font-mono text-[10px]">
              MVP 1.0.0
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground">
            Early access: <a href="mailto:early@cognix.dev" className="text-primary hover:underline">early@cognix.dev</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
