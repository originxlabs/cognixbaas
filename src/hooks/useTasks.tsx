import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from './use-toast';

export type TaskStatus = 'todo' | 'in_progress' | 'blocked' | 'done';

export interface Task {
  id: string;
  project_id: string;
  task_code: string;
  title: string;
  module: string;
  status: TaskStatus;
  assigned_agent: string | null;
  position: number;
  created_at: string;
  updated_at: string;
}

export const useTasks = (projectId: string | null) => {
  const { toast } = useToast();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch tasks
  const fetchTasks = useCallback(async () => {
    if (!projectId) {
      setTasks([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const { data, error } = await supabase
      .from('project_tasks')
      .select('*')
      .eq('project_id', projectId)
      .order('position', { ascending: true });

    if (error) {
      console.error('Error fetching tasks:', error);
    } else {
      setTasks(data as Task[]);
    }
    setLoading(false);
  }, [projectId]);

  // Create task
  const createTask = async (taskData: {
    task_code: string;
    title: string;
    module: string;
    status?: TaskStatus;
    assigned_agent?: string;
  }) => {
    if (!projectId) return null;

    const maxPosition = Math.max(...tasks.map(t => t.position), -1);

    const { data, error } = await supabase
      .from('project_tasks')
      .insert({
        project_id: projectId,
        ...taskData,
        position: maxPosition + 1,
      })
      .select()
      .single();

    if (error) {
      toast({
        title: 'Error creating task',
        description: error.message,
        variant: 'destructive',
      });
      return null;
    }

    await fetchTasks();
    return data as Task;
  };

  // Update task
  const updateTask = async (taskId: string, updates: Partial<Task>) => {
    const { data, error } = await supabase
      .from('project_tasks')
      .update(updates)
      .eq('id', taskId)
      .select()
      .single();

    if (error) {
      toast({
        title: 'Error updating task',
        description: error.message,
        variant: 'destructive',
      });
      return null;
    }

    await fetchTasks();
    return data as Task;
  };

  // Update task status (for drag and drop)
  const updateTaskStatus = async (taskId: string, newStatus: TaskStatus, newPosition?: number) => {
    const updates: Partial<Task> = { status: newStatus };
    if (newPosition !== undefined) {
      updates.position = newPosition;
    }

    // Optimistic update
    setTasks(prev => prev.map(t => 
      t.id === taskId ? { ...t, ...updates } : t
    ));

    const { error } = await supabase
      .from('project_tasks')
      .update(updates)
      .eq('id', taskId);

    if (error) {
      toast({
        title: 'Error updating task',
        description: error.message,
        variant: 'destructive',
      });
      await fetchTasks(); // Revert on error
    }
  };

  // Delete task
  const deleteTask = async (taskId: string) => {
    const { error } = await supabase
      .from('project_tasks')
      .delete()
      .eq('id', taskId);

    if (error) {
      toast({
        title: 'Error deleting task',
        description: error.message,
        variant: 'destructive',
      });
      return false;
    }

    await fetchTasks();
    return true;
  };

  // Initialize and subscribe to real-time updates
  useEffect(() => {
    fetchTasks();

    if (!projectId) return;

    const channel = supabase
      .channel(`tasks_${projectId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'project_tasks',
          filter: `project_id=eq.${projectId}`,
        },
        () => {
          fetchTasks();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [projectId, fetchTasks]);

  const getTasksByStatus = (status: TaskStatus) => {
    return tasks.filter(t => t.status === status).sort((a, b) => a.position - b.position);
  };

  return {
    tasks,
    loading,
    createTask,
    updateTask,
    updateTaskStatus,
    deleteTask,
    getTasksByStatus,
    refreshTasks: fetchTasks,
  };
};
