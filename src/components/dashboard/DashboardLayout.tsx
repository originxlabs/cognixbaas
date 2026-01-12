import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  FileText,
  Layers,
  ListTodo,
  Code2,
  Database,
  Github,
  Rocket,
  Settings,
  ChevronLeft,
  ChevronRight,
  Bot,
  Key,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import CognixLogo from '@/components/CognixLogo';
import { ThemeToggle } from '@/components/ThemeToggle';
import DashboardTopBar from './DashboardTopBar';

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  path: string;
}

const navItems: NavItem[] = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard, path: '/dashboard' },
  { id: 'prompt', label: 'Prompt', icon: FileText, path: '/dashboard/prompt' },
  { id: 'architecture', label: 'Architecture', icon: Layers, path: '/dashboard/architecture' },
  { id: 'tasks', label: 'Tasks', icon: ListTodo, path: '/dashboard/tasks' },
  { id: 'apis', label: 'APIs', icon: Code2, path: '/dashboard/apis' },
  { id: 'database', label: 'Database', icon: Database, path: '/dashboard/database' },
  { id: 'agents', label: 'Agents', icon: Bot, path: '/dashboard/agents' },
  { id: 'github', label: 'GitHub', icon: Github, path: '/dashboard/github' },
  { id: 'sandbox', label: 'Sandbox', icon: Rocket, path: '/dashboard/sandbox' },
  { id: 'llm', label: 'LLM Keys', icon: Key, path: '/dashboard/llm' },
  { id: 'settings', label: 'Settings', icon: Settings, path: '/dashboard/settings' },
];

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: collapsed ? 72 : 240 }}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
        className="flex flex-col border-r border-border bg-card/50"
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-14 px-4 border-b border-border">
        <Link to="/" className="flex items-center gap-2">
            <CognixLogo size="sm" showText={false} />
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-semibold text-foreground"
              >
                Cognix
              </motion.span>
            )}
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-2">
          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                    active
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                  )}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="truncate"
                    >
                      {item.label}
                    </motion.span>
                  )}
                  {active && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute left-0 w-0.5 h-6 bg-primary rounded-r"
                    />
                  )}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Collapse Button */}
        <div className="p-2 border-t border-border">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCollapsed(!collapsed)}
            className="w-full justify-center"
          >
            {collapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </Button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Bar */}
        <DashboardTopBar />

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
