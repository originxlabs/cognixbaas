import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Circle, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  ChevronRight,
  Bot
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useDashboardStore } from '@/stores/dashboardStore';
import type { TaskStatus, Task } from '@/components/dashboard/types';

const statusConfig = {
  todo: { 
    label: 'To Do', 
    icon: Circle, 
    color: 'text-muted-foreground',
    bg: 'bg-muted/50'
  },
  in_progress: { 
    label: 'In Progress', 
    icon: Clock, 
    color: 'text-primary',
    bg: 'bg-primary/10'
  },
  done: { 
    label: 'Done', 
    icon: CheckCircle2, 
    color: 'text-green-500',
    bg: 'bg-green-500/10'
  },
  blocked: { 
    label: 'Blocked', 
    icon: AlertCircle, 
    color: 'text-destructive',
    bg: 'bg-destructive/10'
  },
};

const columns: TaskStatus[] = ['todo', 'in_progress', 'blocked', 'done'];

const TaskCard = ({ task }: { task: Task }) => {
  const config = statusConfig[task.status];
  const Icon = config.icon;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border rounded-lg p-3 hover:border-primary/30 transition-colors cursor-pointer"
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <Badge variant="outline" className="font-mono text-xs">
          {task.id}
        </Badge>
        <Icon className={`w-4 h-4 ${config.color}`} />
      </div>
      <p className="text-sm font-medium text-foreground mb-2">{task.title}</p>
      <div className="flex items-center justify-between">
        <Badge variant="secondary" className="text-xs">
          {task.module}
        </Badge>
        {task.assignedAgent && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Bot className="w-3 h-3" />
            <span className="truncate max-w-[80px]">{task.assignedAgent}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

const DashboardTasks = () => {
  const { tasks } = useDashboardStore();
  const [expandedTask, setExpandedTask] = useState<string | null>(null);

  const getTasksByStatus = (status: TaskStatus) => {
    return tasks.filter(t => t.status === status);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Task Board</h1>
        <p className="text-muted-foreground">Track generation progress across all modules</p>
      </div>

      {/* Timeline */}
      <Card className="bg-card/50 border-border">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {['Prompt', 'Analysis', 'Tasks', 'Architecture', 'APIs', 'Sandbox'].map((step, index) => (
              <div key={step} className="flex items-center">
                <div className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap ${
                  index < 4 ? 'bg-green-500/10 text-green-500' :
                  index === 4 ? 'bg-primary/10 text-primary' :
                  'bg-muted text-muted-foreground'
                }`}>
                  {step}
                </div>
                {index < 5 && (
                  <ChevronRight className={`w-4 h-4 mx-1 ${
                    index < 4 ? 'text-green-500' : 'text-muted-foreground'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {columns.map((status) => {
          const config = statusConfig[status];
          const columnTasks = getTasksByStatus(status);
          
          return (
            <div key={status} className="flex flex-col">
              {/* Column Header */}
              <div className={`flex items-center gap-2 px-3 py-2 rounded-lg mb-3 ${config.bg}`}>
                <config.icon className={`w-4 h-4 ${config.color}`} />
                <span className={`text-sm font-medium ${config.color}`}>
                  {config.label}
                </span>
                <Badge variant="secondary" className="ml-auto text-xs">
                  {columnTasks.length}
                </Badge>
              </div>

              {/* Tasks */}
              <div className="space-y-2 flex-1">
                {columnTasks.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
                {columnTasks.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground text-sm">
                    No tasks
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Task Table */}
      <Card className="bg-card/50 border-border">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold">All Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">ID</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Task</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Module</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Agent</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => {
                  const config = statusConfig[task.status];
                  return (
                    <tr key={task.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                      <td className="py-3 px-4">
                        <code className="text-xs font-mono text-muted-foreground">{task.id}</code>
                      </td>
                      <td className="py-3 px-4 text-sm text-foreground">{task.title}</td>
                      <td className="py-3 px-4">
                        <Badge variant="secondary" className="text-xs">{task.module}</Badge>
                      </td>
                      <td className="py-3 px-4">
                        <div className={`flex items-center gap-1.5 ${config.color}`}>
                          <config.icon className="w-3.5 h-3.5" />
                          <span className="text-xs font-medium">{config.label}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-xs text-muted-foreground">
                        {task.assignedAgent || '—'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardTasks;
