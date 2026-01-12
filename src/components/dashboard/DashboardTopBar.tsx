import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Plus, Circle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useDashboardStore } from '@/stores/dashboardStore';

const DashboardTopBar = () => {
  const { currentProject, projects } = useDashboardStore();

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

  return (
    <header className="h-14 border-b border-border bg-card/30 flex items-center justify-between px-6">
      {/* Left - Project Selector */}
      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="gap-2 font-semibold">
              <span className="text-foreground">
                {currentProject?.name || 'Select Project'}
              </span>
              {currentProject && (
                <span className="text-muted-foreground font-mono text-xs">
                  {currentProject.shortCode}
                </span>
              )}
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-64">
            {projects.map((project) => (
              <DropdownMenuItem key={project.id} className="flex items-center justify-between">
                <span>{project.name}</span>
                <span className="text-xs text-muted-foreground font-mono">{project.shortCode}</span>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 text-primary">
              <Plus className="w-4 h-4" />
              New Project
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

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
        {currentProject?.lastRunAt && (
          <span className="text-xs text-muted-foreground">
            Last Run: {formatTimeAgo(currentProject.lastRunAt)}
          </span>
        )}
        <ThemeToggle />
      </div>
    </header>
  );
};

function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  
  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} min ago`;
  
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}d ago`;
}

export default DashboardTopBar;
