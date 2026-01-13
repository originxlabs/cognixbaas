import { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useParams, useNavigate } from 'react-router-dom';
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
  FolderOpen,
  LogOut,
  Plus,
  ChevronDown,
  Circle,
  Loader2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import CognixLogo from '@/components/CognixLogo';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useAuth } from '@/hooks/useAuth';
import { useProjectContext } from '@/contexts/ProjectContext';
import { ProjectChatPanel } from '@/components/dashboard/ProjectChatPanel';

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  path: string;
  requiresProject?: boolean;
}

const accountNavItems: NavItem[] = [
  { id: 'projects', label: 'Projects', icon: FolderOpen, path: '/dashboard' },
  { id: 'settings', label: 'Settings', icon: Settings, path: '/dashboard/settings' },
];

const projectNavItems: NavItem[] = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard, path: '', requiresProject: true },
  { id: 'prompt', label: 'Prompt', icon: FileText, path: '/prompt', requiresProject: true },
  { id: 'architecture', label: 'Architecture', icon: Layers, path: '/architecture', requiresProject: true },
  { id: 'tasks', label: 'Tasks', icon: ListTodo, path: '/tasks', requiresProject: true },
  { id: 'apis', label: 'APIs', icon: Code2, path: '/apis', requiresProject: true },
  { id: 'database', label: 'Database', icon: Database, path: '/database', requiresProject: true },
  { id: 'agents', label: 'Agents', icon: Bot, path: '/agents', requiresProject: true },
  { id: 'github', label: 'GitHub', icon: Github, path: '/github', requiresProject: true },
  { id: 'sandbox', label: 'Sandbox', icon: Rocket, path: '/sandbox', requiresProject: true },
  { id: 'llm', label: 'LLM Keys', icon: Key, path: '/llm', requiresProject: true },
];

const DashboardLayoutNew = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { projectId } = useParams();
  const { user, loading: authLoading, signOut } = useAuth();
  const { account, projects, currentProject, setCurrentProjectId, loading: projectsLoading } = useProjectContext();

  // Set current project from URL
  useEffect(() => {
    if (projectId && projectId !== currentProject?.id) {
      setCurrentProjectId(projectId);
    }
  }, [projectId]);

  const isActive = (path: string, requiresProject?: boolean) => {
    if (requiresProject && projectId) {
      const fullPath = `/dashboard/project/${projectId}${path}`;
      if (path === '') {
        return location.pathname === fullPath || location.pathname === `/dashboard/project/${projectId}`;
      }
      return location.pathname.startsWith(fullPath);
    }
    if (path === '/dashboard') {
      return location.pathname === '/dashboard';
    }
    return location.pathname.startsWith(path);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready':
        return 'bg-green-500';
      case 'generating':
        return 'bg-yellow-500 animate-pulse';
      case 'deployed':
        return 'bg-primary';
      default:
        return 'bg-muted-foreground';
    }
  };

  if (authLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    navigate('/auth');
    return null;
  }

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: collapsed ? 72 : 260 }}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
        className="flex flex-col border-r border-border bg-card/50"
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-14 px-4 border-b border-border">
          <Link to="/" className="flex items-center gap-2">
            <CognixLogo size="sm" showText={!collapsed} />
          </Link>
        </div>

        {/* Account Navigation */}
        <nav className="py-4 px-2 border-b border-border">
          <div className="space-y-1">
            {accountNavItems.map((item) => {
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
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Project Navigation (only when project is selected) */}
        {projectId && (
          <nav className="flex-1 overflow-y-auto py-4 px-2">
            {!collapsed && (
              <p className="px-3 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Project
              </p>
            )}
            <div className="space-y-1">
              {projectNavItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path, item.requiresProject);
                const fullPath = `/dashboard/project/${projectId}${item.path}`;
                
                return (
                  <Link
                    key={item.id}
                    to={fullPath}
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
                  </Link>
                );
              })}
            </div>
          </nav>
        )}

        {/* Spacer when no project */}
        {!projectId && <div className="flex-1" />}

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
        <header className="h-14 border-b border-border bg-card/30 flex items-center justify-between px-6">
          {/* Left - Project Selector */}
          <div className="flex items-center gap-4">
            {projectId ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="gap-2 font-semibold">
                    <span className="text-foreground">
                      {currentProject?.name || 'Loading...'}
                    </span>
                    {currentProject && (
                      <span className="text-muted-foreground font-mono text-xs">
                        {currentProject.short_code}
                      </span>
                    )}
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-64">
                  {projects.map((project) => (
                    <DropdownMenuItem 
                      key={project.id} 
                      className="flex items-center justify-between"
                      onClick={() => navigate(`/dashboard/project/${project.id}`)}
                    >
                      <span>{project.name}</span>
                      <span className="text-xs text-muted-foreground font-mono">{project.short_code}</span>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    className="gap-2 text-primary"
                    onClick={() => navigate('/dashboard')}
                  >
                    <FolderOpen className="w-4 h-4" />
                    View All Projects
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <FolderOpen className="w-5 h-5 text-primary" />
                <span className="font-semibold text-foreground">All Projects</span>
              </div>
            )}

            {currentProject && (
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="gap-1.5 font-mono text-xs">
                  <Circle className={`w-2 h-2 ${getStatusColor(currentProject.status)}`} />
                  SANDBOX
                </Badge>
                <span className="text-xs text-muted-foreground">
                  v{currentProject.version}
                </span>
              </div>
            )}
          </div>

          {/* Right - Actions */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground">
              {user.email}
            </span>
            <ThemeToggle />
            <Button variant="ghost" size="sm" onClick={signOut}>
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>

      {/* Project Chat Panel - Only show when a project is selected */}
      {projectId && currentProject && (
        <ProjectChatPanel
          projectId={projectId}
          projectName={currentProject.name}
          currentPrompt={currentProject.prompt || undefined}
        />
      )}
    </div>
  );
};

export default DashboardLayoutNew;
