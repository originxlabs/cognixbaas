import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useToast } from './use-toast';

export interface Project {
  id: string;
  account_id: string;
  name: string;
  short_code: string;
  description: string | null;
  backend_type: string;
  database_type: string;
  status: 'draft' | 'generating' | 'ready' | 'deployed';
  version: string;
  sandbox_url: string | null;
  github_repo: string | null;
  github_branch: string | null;
  github_connected: boolean | null;
  github_last_sync: string | null;
  prompt: string | null;
  entities: string[] | null;
  auth_method: string | null;
  payments: string | null;
  multi_tenant: boolean | null;
  custom_features: string[] | null;
  generation_step: string | null;
  is_generating: boolean | null;
  created_at: string;
  updated_at: string;
  last_run_at: string | null;
}

export interface Account {
  id: string;
  user_id: string;
  name: string;
  plan: 'free' | 'pro' | 'enterprise';
  max_projects: number;
  created_at: string;
  updated_at: string;
}

export const useProjects = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [account, setAccount] = useState<Account | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch or create account
  const fetchAccount = useCallback(async () => {
    if (!user) return null;

    // Check if account exists
    const { data: existingAccount, error: fetchError } = await supabase
      .from('accounts')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle();

    if (fetchError && fetchError.code !== 'PGRST116') {
      console.error('Error fetching account:', fetchError);
      return null;
    }

    if (existingAccount) {
      setAccount(existingAccount as Account);
      return existingAccount;
    }

    // Create new account
    const { data: newAccount, error: createError } = await supabase
      .from('accounts')
      .insert({
        user_id: user.id,
        name: user.email?.split('@')[0] || 'My Account',
        plan: 'free',
        max_projects: 2,
      })
      .select()
      .single();

    if (createError) {
      console.error('Error creating account:', createError);
      return null;
    }

    setAccount(newAccount as Account);
    return newAccount;
  }, [user]);

  // Fetch projects
  const fetchProjects = useCallback(async () => {
    if (!user) return;
    setLoading(true);

    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching projects:', error);
    } else {
      setProjects(data as Project[]);
    }
    setLoading(false);
  }, [user]);

  // Create project
  const createProject = async (name: string, description?: string) => {
    if (!account) {
      toast({
        title: 'Error',
        description: 'No account found',
        variant: 'destructive',
      });
      return null;
    }

    // Check project limit for free accounts
    if (account.plan === 'free' && projects.length >= account.max_projects) {
      toast({
        title: 'Project limit reached',
        description: 'Upgrade to Pro for unlimited projects',
        variant: 'destructive',
      });
      return null;
    }

    const shortCode = name.substring(0, 3).toUpperCase() + '-' + Math.random().toString(36).substring(2, 5).toUpperCase();

    const { data, error } = await supabase
      .from('projects')
      .insert({
        account_id: account.id,
        name,
        short_code: shortCode,
        description,
      })
      .select()
      .single();

    if (error) {
      toast({
        title: 'Error creating project',
        description: error.message,
        variant: 'destructive',
      });
      return null;
    }

    toast({
      title: 'Project created!',
      description: `${name} is ready to configure`,
    });

    await fetchProjects();
    return data as Project;
  };

  // Update project
  const updateProject = async (id: string, updates: Partial<Project>) => {
    const { data, error } = await supabase
      .from('projects')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      toast({
        title: 'Error updating project',
        description: error.message,
        variant: 'destructive',
      });
      return null;
    }

    await fetchProjects();
    return data as Project;
  };

  // Delete project
  const deleteProject = async (id: string) => {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: 'Error deleting project',
        description: error.message,
        variant: 'destructive',
      });
      return false;
    }

    toast({
      title: 'Project deleted',
    });

    await fetchProjects();
    return true;
  };

  // Initialize
  useEffect(() => {
    const init = async () => {
      await fetchAccount();
      await fetchProjects();
    };
    
    if (user) {
      init();
    } else {
      setAccount(null);
      setProjects([]);
      setLoading(false);
    }
  }, [user, fetchAccount, fetchProjects]);

  // Real-time subscription
  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel('projects_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'projects',
        },
        () => {
          fetchProjects();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, fetchProjects]);

  return {
    account,
    projects,
    loading,
    createProject,
    updateProject,
    deleteProject,
    refreshProjects: fetchProjects,
  };
};
