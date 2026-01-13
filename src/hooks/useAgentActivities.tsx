import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from './use-toast';

export interface AgentActivity {
  id: string;
  project_id: string;
  agent_name: string;
  action: string;
  task_id: string | null;
  details: string | null;
  created_at: string;
}

export const useAgentActivities = (projectId: string | null) => {
  const { toast } = useToast();
  const [activities, setActivities] = useState<AgentActivity[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch activities
  const fetchActivities = useCallback(async () => {
    if (!projectId) {
      setActivities([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const { data, error } = await supabase
      .from('agent_activities')
      .select('*')
      .eq('project_id', projectId)
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) {
      console.error('Error fetching activities:', error);
    } else {
      setActivities(data as AgentActivity[]);
    }
    setLoading(false);
  }, [projectId]);

  // Add activity
  const addActivity = async (activityData: {
    agent_name: string;
    action: string;
    task_id?: string;
    details?: string;
  }) => {
    if (!projectId) return null;

    const { data, error } = await supabase
      .from('agent_activities')
      .insert({
        project_id: projectId,
        ...activityData,
      })
      .select()
      .single();

    if (error) {
      toast({
        title: 'Error adding activity',
        description: error.message,
        variant: 'destructive',
      });
      return null;
    }

    await fetchActivities();
    return data as AgentActivity;
  };

  // Initialize and subscribe to real-time updates
  useEffect(() => {
    fetchActivities();

    if (!projectId) return;

    const channel = supabase
      .channel(`activities_${projectId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'agent_activities',
          filter: `project_id=eq.${projectId}`,
        },
        (payload) => {
          setActivities(prev => [payload.new as AgentActivity, ...prev.slice(0, 49)]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [projectId, fetchActivities]);

  return {
    activities,
    loading,
    addActivity,
    refreshActivities: fetchActivities,
  };
};
