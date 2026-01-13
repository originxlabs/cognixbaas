-- Fix overly permissive RLS policies by replacing 'FOR ALL' with specific policies

-- Drop the permissive policies
DROP POLICY IF EXISTS "Users can manage tasks in their projects" ON public.project_tasks;
DROP POLICY IF EXISTS "Users can manage activities in their projects" ON public.agent_activities;
DROP POLICY IF EXISTS "Users can manage modules in their projects" ON public.project_modules;
DROP POLICY IF EXISTS "Users can manage endpoints in their projects" ON public.project_endpoints;
DROP POLICY IF EXISTS "Users can manage their LLM providers" ON public.llm_providers;

-- Create specific policies for project_tasks
CREATE POLICY "Users can insert tasks in their projects" 
ON public.project_tasks FOR INSERT 
WITH CHECK (project_id IN (
  SELECT p.id FROM public.projects p 
  JOIN public.accounts a ON p.account_id = a.id 
  WHERE a.user_id = auth.uid()
));

CREATE POLICY "Users can update tasks in their projects" 
ON public.project_tasks FOR UPDATE 
USING (project_id IN (
  SELECT p.id FROM public.projects p 
  JOIN public.accounts a ON p.account_id = a.id 
  WHERE a.user_id = auth.uid()
));

CREATE POLICY "Users can delete tasks in their projects" 
ON public.project_tasks FOR DELETE 
USING (project_id IN (
  SELECT p.id FROM public.projects p 
  JOIN public.accounts a ON p.account_id = a.id 
  WHERE a.user_id = auth.uid()
));

-- Create specific policies for agent_activities
CREATE POLICY "Users can insert activities in their projects" 
ON public.agent_activities FOR INSERT 
WITH CHECK (project_id IN (
  SELECT p.id FROM public.projects p 
  JOIN public.accounts a ON p.account_id = a.id 
  WHERE a.user_id = auth.uid()
));

CREATE POLICY "Users can update activities in their projects" 
ON public.agent_activities FOR UPDATE 
USING (project_id IN (
  SELECT p.id FROM public.projects p 
  JOIN public.accounts a ON p.account_id = a.id 
  WHERE a.user_id = auth.uid()
));

CREATE POLICY "Users can delete activities in their projects" 
ON public.agent_activities FOR DELETE 
USING (project_id IN (
  SELECT p.id FROM public.projects p 
  JOIN public.accounts a ON p.account_id = a.id 
  WHERE a.user_id = auth.uid()
));

-- Create specific policies for project_modules
CREATE POLICY "Users can insert modules in their projects" 
ON public.project_modules FOR INSERT 
WITH CHECK (project_id IN (
  SELECT p.id FROM public.projects p 
  JOIN public.accounts a ON p.account_id = a.id 
  WHERE a.user_id = auth.uid()
));

CREATE POLICY "Users can update modules in their projects" 
ON public.project_modules FOR UPDATE 
USING (project_id IN (
  SELECT p.id FROM public.projects p 
  JOIN public.accounts a ON p.account_id = a.id 
  WHERE a.user_id = auth.uid()
));

CREATE POLICY "Users can delete modules in their projects" 
ON public.project_modules FOR DELETE 
USING (project_id IN (
  SELECT p.id FROM public.projects p 
  JOIN public.accounts a ON p.account_id = a.id 
  WHERE a.user_id = auth.uid()
));

-- Create specific policies for project_endpoints
CREATE POLICY "Users can insert endpoints in their projects" 
ON public.project_endpoints FOR INSERT 
WITH CHECK (project_id IN (
  SELECT p.id FROM public.projects p 
  JOIN public.accounts a ON p.account_id = a.id 
  WHERE a.user_id = auth.uid()
));

CREATE POLICY "Users can update endpoints in their projects" 
ON public.project_endpoints FOR UPDATE 
USING (project_id IN (
  SELECT p.id FROM public.projects p 
  JOIN public.accounts a ON p.account_id = a.id 
  WHERE a.user_id = auth.uid()
));

CREATE POLICY "Users can delete endpoints in their projects" 
ON public.project_endpoints FOR DELETE 
USING (project_id IN (
  SELECT p.id FROM public.projects p 
  JOIN public.accounts a ON p.account_id = a.id 
  WHERE a.user_id = auth.uid()
));

-- Create specific policies for llm_providers
CREATE POLICY "Users can insert their LLM providers" 
ON public.llm_providers FOR INSERT 
WITH CHECK (account_id IN (SELECT id FROM public.accounts WHERE user_id = auth.uid()));

CREATE POLICY "Users can update their LLM providers" 
ON public.llm_providers FOR UPDATE 
USING (account_id IN (SELECT id FROM public.accounts WHERE user_id = auth.uid()));

CREATE POLICY "Users can delete their LLM providers" 
ON public.llm_providers FOR DELETE 
USING (account_id IN (SELECT id FROM public.accounts WHERE user_id = auth.uid()));