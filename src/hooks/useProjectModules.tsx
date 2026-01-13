import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from './use-toast';

export interface ProjectModule {
  id: string;
  project_id: string;
  name: string;
  description: string | null;
  status: 'todo' | 'in_progress' | 'done' | 'blocked';
  endpoints_count: number;
  dependencies: string[] | null;
  created_at: string;
  updated_at: string;
}

export interface ProjectEndpoint {
  id: string;
  project_id: string;
  module: string;
  method: string;
  path: string;
  description: string | null;
  authenticated: boolean | null;
  created_at: string;
}

export const useProjectModules = (projectId: string | undefined) => {
  const { toast } = useToast();
  const [modules, setModules] = useState<ProjectModule[]>([]);
  const [endpoints, setEndpoints] = useState<ProjectEndpoint[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch modules for project
  const fetchModules = useCallback(async () => {
    if (!projectId) {
      setModules([]);
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from('project_modules')
      .select('*')
      .eq('project_id', projectId)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching modules:', error);
    } else {
      setModules(data as ProjectModule[]);
    }
  }, [projectId]);

  // Fetch endpoints for project
  const fetchEndpoints = useCallback(async () => {
    if (!projectId) {
      setEndpoints([]);
      return;
    }

    const { data, error } = await supabase
      .from('project_endpoints')
      .select('*')
      .eq('project_id', projectId)
      .order('module', { ascending: true });

    if (error) {
      console.error('Error fetching endpoints:', error);
    } else {
      setEndpoints(data as ProjectEndpoint[]);
    }
  }, [projectId]);

  // Create modules from entities
  const createModulesFromEntities = async (entities: string[], projectId: string) => {
    const moduleDescriptions: Record<string, string> = {
      User: 'User management, profiles, and account settings',
      Auth: 'Authentication, authorization, and session management',
      Product: 'Product catalog, inventory, and pricing',
      Order: 'Order processing, checkout, and fulfillment',
      Payment: 'Payment processing and transaction management',
      Cart: 'Shopping cart and wishlist management',
      Category: 'Product categorization and taxonomy',
      Review: 'Product reviews and ratings',
      Notification: 'Email, SMS, and push notifications',
      Webhook: 'Webhook handling and event dispatching',
      File: 'File upload and storage management',
      Report: 'Analytics and reporting',
    };

    const defaultEndpoints: Record<string, { method: string; path: string; description: string; authenticated: boolean }[]> = {
      User: [
        { method: 'GET', path: '/api/v1/users', description: 'List all users', authenticated: true },
        { method: 'GET', path: '/api/v1/users/{id}', description: 'Get user by ID', authenticated: true },
        { method: 'POST', path: '/api/v1/users', description: 'Create user', authenticated: true },
        { method: 'PUT', path: '/api/v1/users/{id}', description: 'Update user', authenticated: true },
        { method: 'DELETE', path: '/api/v1/users/{id}', description: 'Delete user', authenticated: true },
      ],
      Auth: [
        { method: 'POST', path: '/api/v1/auth/login', description: 'User login', authenticated: false },
        { method: 'POST', path: '/api/v1/auth/register', description: 'User registration', authenticated: false },
        { method: 'POST', path: '/api/v1/auth/refresh', description: 'Refresh access token', authenticated: true },
        { method: 'POST', path: '/api/v1/auth/logout', description: 'User logout', authenticated: true },
      ],
      Product: [
        { method: 'GET', path: '/api/v1/products', description: 'List all products', authenticated: false },
        { method: 'GET', path: '/api/v1/products/{id}', description: 'Get product by ID', authenticated: false },
        { method: 'POST', path: '/api/v1/products', description: 'Create product', authenticated: true },
        { method: 'PUT', path: '/api/v1/products/{id}', description: 'Update product', authenticated: true },
        { method: 'DELETE', path: '/api/v1/products/{id}', description: 'Delete product', authenticated: true },
      ],
      Order: [
        { method: 'GET', path: '/api/v1/orders', description: 'List orders', authenticated: true },
        { method: 'GET', path: '/api/v1/orders/{id}', description: 'Get order by ID', authenticated: true },
        { method: 'POST', path: '/api/v1/orders', description: 'Create order', authenticated: true },
        { method: 'PUT', path: '/api/v1/orders/{id}/status', description: 'Update order status', authenticated: true },
      ],
      Payment: [
        { method: 'POST', path: '/api/v1/payments/checkout', description: 'Process checkout', authenticated: true },
        { method: 'POST', path: '/api/v1/payments/webhook', description: 'Handle payment webhook', authenticated: false },
        { method: 'GET', path: '/api/v1/payments/{id}', description: 'Get payment status', authenticated: true },
      ],
      Cart: [
        { method: 'GET', path: '/api/v1/cart', description: 'Get current cart', authenticated: true },
        { method: 'POST', path: '/api/v1/cart/items', description: 'Add item to cart', authenticated: true },
        { method: 'DELETE', path: '/api/v1/cart/items/{id}', description: 'Remove item from cart', authenticated: true },
        { method: 'DELETE', path: '/api/v1/cart', description: 'Clear cart', authenticated: true },
      ],
    };

    // Always include Auth module
    const allEntities = entities.includes('Auth') ? entities : ['Auth', ...entities];

    // Create modules
    for (const entity of allEntities) {
      const description = moduleDescriptions[entity] || `${entity} management module`;
      const entityEndpoints = defaultEndpoints[entity] || [
        { method: 'GET', path: `/api/v1/${entity.toLowerCase()}s`, description: `List all ${entity.toLowerCase()}s`, authenticated: true },
        { method: 'GET', path: `/api/v1/${entity.toLowerCase()}s/{id}`, description: `Get ${entity.toLowerCase()} by ID`, authenticated: true },
        { method: 'POST', path: `/api/v1/${entity.toLowerCase()}s`, description: `Create ${entity.toLowerCase()}`, authenticated: true },
        { method: 'PUT', path: `/api/v1/${entity.toLowerCase()}s/{id}`, description: `Update ${entity.toLowerCase()}`, authenticated: true },
        { method: 'DELETE', path: `/api/v1/${entity.toLowerCase()}s/{id}`, description: `Delete ${entity.toLowerCase()}`, authenticated: true },
      ];

      // Determine dependencies
      let dependencies: string[] = [];
      if (entity === 'Order') dependencies = ['User', 'Product'];
      if (entity === 'Payment') dependencies = ['Order'];
      if (entity === 'Cart') dependencies = ['User', 'Product'];
      if (entity === 'Review') dependencies = ['User', 'Product'];

      // Insert module
      const { data: moduleData, error: moduleError } = await supabase
        .from('project_modules')
        .insert({
          project_id: projectId,
          name: entity,
          description,
          status: 'todo',
          endpoints_count: entityEndpoints.length,
          dependencies: dependencies.length > 0 ? dependencies : null,
        })
        .select()
        .single();

      if (moduleError) {
        console.error('Error creating module:', moduleError);
        continue;
      }

      // Insert endpoints
      for (const ep of entityEndpoints) {
        await supabase.from('project_endpoints').insert({
          project_id: projectId,
          module: entity,
          method: ep.method,
          path: ep.path,
          description: ep.description,
          authenticated: ep.authenticated,
        });
      }
    }

    await fetchModules();
    await fetchEndpoints();

    toast({
      title: 'Modules created',
      description: `${allEntities.length} modules with endpoints generated`,
    });
  };

  // Update module status
  const updateModuleStatus = async (moduleId: string, status: ProjectModule['status']) => {
    const { error } = await supabase
      .from('project_modules')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', moduleId);

    if (error) {
      toast({
        title: 'Error updating module',
        description: error.message,
        variant: 'destructive',
      });
      return false;
    }

    await fetchModules();
    return true;
  };

  // Initialize
  useEffect(() => {
    const init = async () => {
      setLoading(true);
      await fetchModules();
      await fetchEndpoints();
      setLoading(false);
    };

    init();
  }, [fetchModules, fetchEndpoints]);

  // Real-time subscription
  useEffect(() => {
    if (!projectId) return;

    const channel = supabase
      .channel(`project_modules_${projectId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'project_modules',
          filter: `project_id=eq.${projectId}`,
        },
        () => {
          fetchModules();
        }
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'project_endpoints',
          filter: `project_id=eq.${projectId}`,
        },
        () => {
          fetchEndpoints();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [projectId, fetchModules, fetchEndpoints]);

  return {
    modules,
    endpoints,
    loading,
    createModulesFromEntities,
    updateModuleStatus,
    refreshModules: fetchModules,
  };
};
