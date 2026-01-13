-- Create accounts table for multi-tenant support
CREATE TABLE public.accounts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  plan TEXT NOT NULL DEFAULT 'free' CHECK (plan IN ('free', 'pro', 'enterprise')),
  max_projects INTEGER NOT NULL DEFAULT 2,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create projects table
CREATE TABLE public.projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  account_id UUID NOT NULL REFERENCES public.accounts(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  short_code TEXT NOT NULL,
  description TEXT,
  backend_type TEXT NOT NULL DEFAULT '.NET 8',
  database_type TEXT NOT NULL DEFAULT 'Supabase',
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'generating', 'ready', 'deployed')),
  version TEXT NOT NULL DEFAULT '1.0.0',
  sandbox_url TEXT,
  github_repo TEXT,
  github_branch TEXT DEFAULT 'main',
  github_connected BOOLEAN DEFAULT false,
  github_last_sync TIMESTAMP WITH TIME ZONE,
  prompt TEXT,
  entities TEXT[],
  auth_method TEXT DEFAULT 'JWT + Refresh Token',
  payments TEXT,
  multi_tenant BOOLEAN DEFAULT false,
  custom_features TEXT[],
  generation_step TEXT DEFAULT 'prompt',
  is_generating BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  last_run_at TIMESTAMP WITH TIME ZONE
);

-- Create project_tasks table
CREATE TABLE public.project_tasks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  task_code TEXT NOT NULL,
  title TEXT NOT NULL,
  module TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'todo' CHECK (status IN ('todo', 'in_progress', 'blocked', 'done')),
  assigned_agent TEXT,
  position INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create agent_activities table
CREATE TABLE public.agent_activities (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  agent_name TEXT NOT NULL,
  action TEXT NOT NULL,
  task_id UUID REFERENCES public.project_tasks(id) ON DELETE SET NULL,
  details TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create project_modules table
CREATE TABLE public.project_modules (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  endpoints_count INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'todo' CHECK (status IN ('todo', 'in_progress', 'blocked', 'done')),
  dependencies TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create project_endpoints table
CREATE TABLE public.project_endpoints (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  method TEXT NOT NULL CHECK (method IN ('GET', 'POST', 'PUT', 'DELETE', 'PATCH')),
  path TEXT NOT NULL,
  description TEXT,
  module TEXT NOT NULL,
  authenticated BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create llm_providers table
CREATE TABLE public.llm_providers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  account_id UUID NOT NULL REFERENCES public.accounts(id) ON DELETE CASCADE,
  provider TEXT NOT NULL CHECK (provider IN ('OpenAI', 'Azure OpenAI', 'Anthropic', 'Google')),
  api_key_encrypted TEXT,
  usage_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agent_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_endpoints ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.llm_providers ENABLE ROW LEVEL SECURITY;

-- RLS Policies for accounts
CREATE POLICY "Users can view their own accounts" 
ON public.accounts FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own accounts" 
ON public.accounts FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own accounts" 
ON public.accounts FOR UPDATE 
USING (auth.uid() = user_id);

-- RLS Policies for projects (via account ownership)
CREATE POLICY "Users can view projects in their accounts" 
ON public.projects FOR SELECT 
USING (account_id IN (SELECT id FROM public.accounts WHERE user_id = auth.uid()));

CREATE POLICY "Users can create projects in their accounts" 
ON public.projects FOR INSERT 
WITH CHECK (account_id IN (SELECT id FROM public.accounts WHERE user_id = auth.uid()));

CREATE POLICY "Users can update projects in their accounts" 
ON public.projects FOR UPDATE 
USING (account_id IN (SELECT id FROM public.accounts WHERE user_id = auth.uid()));

CREATE POLICY "Users can delete projects in their accounts" 
ON public.projects FOR DELETE 
USING (account_id IN (SELECT id FROM public.accounts WHERE user_id = auth.uid()));

-- RLS Policies for project_tasks
CREATE POLICY "Users can view tasks in their projects" 
ON public.project_tasks FOR SELECT 
USING (project_id IN (
  SELECT p.id FROM public.projects p 
  JOIN public.accounts a ON p.account_id = a.id 
  WHERE a.user_id = auth.uid()
));

CREATE POLICY "Users can manage tasks in their projects" 
ON public.project_tasks FOR ALL 
USING (project_id IN (
  SELECT p.id FROM public.projects p 
  JOIN public.accounts a ON p.account_id = a.id 
  WHERE a.user_id = auth.uid()
));

-- RLS Policies for agent_activities
CREATE POLICY "Users can view activities in their projects" 
ON public.agent_activities FOR SELECT 
USING (project_id IN (
  SELECT p.id FROM public.projects p 
  JOIN public.accounts a ON p.account_id = a.id 
  WHERE a.user_id = auth.uid()
));

CREATE POLICY "Users can manage activities in their projects" 
ON public.agent_activities FOR ALL 
USING (project_id IN (
  SELECT p.id FROM public.projects p 
  JOIN public.accounts a ON p.account_id = a.id 
  WHERE a.user_id = auth.uid()
));

-- RLS Policies for project_modules
CREATE POLICY "Users can view modules in their projects" 
ON public.project_modules FOR SELECT 
USING (project_id IN (
  SELECT p.id FROM public.projects p 
  JOIN public.accounts a ON p.account_id = a.id 
  WHERE a.user_id = auth.uid()
));

CREATE POLICY "Users can manage modules in their projects" 
ON public.project_modules FOR ALL 
USING (project_id IN (
  SELECT p.id FROM public.projects p 
  JOIN public.accounts a ON p.account_id = a.id 
  WHERE a.user_id = auth.uid()
));

-- RLS Policies for project_endpoints
CREATE POLICY "Users can view endpoints in their projects" 
ON public.project_endpoints FOR SELECT 
USING (project_id IN (
  SELECT p.id FROM public.projects p 
  JOIN public.accounts a ON p.account_id = a.id 
  WHERE a.user_id = auth.uid()
));

CREATE POLICY "Users can manage endpoints in their projects" 
ON public.project_endpoints FOR ALL 
USING (project_id IN (
  SELECT p.id FROM public.projects p 
  JOIN public.accounts a ON p.account_id = a.id 
  WHERE a.user_id = auth.uid()
));

-- RLS Policies for llm_providers
CREATE POLICY "Users can view their LLM providers" 
ON public.llm_providers FOR SELECT 
USING (account_id IN (SELECT id FROM public.accounts WHERE user_id = auth.uid()));

CREATE POLICY "Users can manage their LLM providers" 
ON public.llm_providers FOR ALL 
USING (account_id IN (SELECT id FROM public.accounts WHERE user_id = auth.uid()));

-- Create function for updated_at trigger
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for updated_at
CREATE TRIGGER update_accounts_updated_at
  BEFORE UPDATE ON public.accounts
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON public.projects
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_project_tasks_updated_at
  BEFORE UPDATE ON public.project_tasks
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_project_modules_updated_at
  BEFORE UPDATE ON public.project_modules
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_llm_providers_updated_at
  BEFORE UPDATE ON public.llm_providers
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Enable realtime for key tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.projects;
ALTER PUBLICATION supabase_realtime ADD TABLE public.project_tasks;
ALTER PUBLICATION supabase_realtime ADD TABLE public.agent_activities;