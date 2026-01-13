import { Link } from 'react-router-dom';
import CognixLogo from './CognixLogo';

const EnterpriseFooter = () => {
  const links = {
    product: [
      { label: 'Overview', href: '/#features' },
      { label: 'Architecture', href: '/#technology' },
      { label: 'Agents', href: '/#agents' },
      { label: 'Security', href: '/#enterprise' },
      { label: 'Pricing', href: '/pricing', isRoute: true },
    ],
    developers: [
      { label: 'Documentation', href: '/docs', isRoute: true },
      { label: 'API Reference', href: '/docs', isRoute: true },
      { label: 'Whitepaper', href: '/whitepaper', isRoute: true },
      { label: 'GitHub', href: '#' },
    ],
    company: [
      { label: 'About', href: '/about', isRoute: true },
      { label: 'Blog', href: '/blog', isRoute: true },
      { label: 'Contact', href: '/contact', isRoute: true },
    ],
    legal: [
      { label: 'Privacy', href: '/privacy', isRoute: true },
      { label: 'Terms', href: '/terms', isRoute: true },
    ],
  };

  return (
    <footer className="border-t border-border bg-card/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-6 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center mb-4">
              <CognixLogo size="sm" />
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              AI-assisted backend engineering platform. 
              Built for real systems, controlled by humans.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-4">Product</h4>
            <ul className="space-y-2.5">
              {links.product.map((link) => (
                <li key={link.label}>
                  {link.isRoute ? (
                    <Link to={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {link.label}
                    </Link>
                  ) : (
                    <a href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-medium text-foreground mb-4">Developers</h4>
            <ul className="space-y-2.5">
              {links.developers.map((link) => (
                <li key={link.label}>
                  {link.isRoute ? (
                    <Link to={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {link.label}
                    </Link>
                  ) : (
                    <a href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-medium text-foreground mb-4">Company</h4>
            <ul className="space-y-2.5">
              {links.company.map((link) => (
                <li key={link.label}>
                  {link.isRoute ? (
                    <Link to={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {link.label}
                    </Link>
                  ) : (
                    <a href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-medium text-foreground mb-4">Legal</h4>
            <ul className="space-y-2.5">
              {links.legal.map((link) => (
                <li key={link.label}>
                  {link.isRoute ? (
                    <Link to={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {link.label}
                    </Link>
                  ) : (
                    <a href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Cropxon Innovations Pvt. Ltd. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Powered by Cropxon Innovations Pvt. Ltd.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default EnterpriseFooter;
