// Dashboard Types for Cognix MVP 1.0.0

export type TaskStatus = 'todo' | 'in_progress' | 'blocked' | 'done';

export interface Task {
  id: string;
  title: string;
  module: string;
  status: TaskStatus;
  assignedAgent?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Project {
  id: string;
  name: string;
  shortCode: string;
  description?: string;
  backendType: '.NET 8' | 'Node.js';
  database: 'Supabase' | 'Neon' | 'Custom';
  status: 'draft' | 'generating' | 'ready' | 'deployed';
  version: string;
  createdAt: Date;
  updatedAt: Date;
  lastRunAt?: Date;
  sandboxUrl?: string;
  githubRepo?: string;
}

export interface ProjectRequirements {
  prompt: string;
  entities: string[];
  authMethod: string;
  payments?: string;
  multiTenant: boolean;
  customFeatures: string[];
}

export interface Module {
  id: string;
  name: string;
  description: string;
  endpointsCount: number;
  status: TaskStatus;
  dependencies: string[];
}

export interface AgentActivity {
  id: string;
  agentName: string;
  action: string;
  taskId?: string;
  timestamp: Date;
  details?: string;
}

export interface ApiEndpoint {
  id: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  path: string;
  description: string;
  module: string;
  authenticated: boolean;
}

export interface DatabaseTable {
  name: string;
  columns: {
    name: string;
    type: string;
    nullable: boolean;
    primaryKey: boolean;
  }[];
  relationships: {
    table: string;
    type: 'one-to-one' | 'one-to-many' | 'many-to-many';
  }[];
}

export interface GitHubIntegration {
  connected: boolean;
  repository?: string;
  branch?: string;
  lastSyncAt?: Date;
  status: 'connected' | 'disconnected' | 'syncing' | 'error';
}

export interface SandboxDeployment {
  status: 'idle' | 'deploying' | 'running' | 'stopped' | 'error';
  url?: string;
  lastDeployedAt?: Date;
  logs: string[];
}

export interface LLMProvider {
  id: string;
  name: 'OpenAI' | 'Azure OpenAI' | 'Anthropic' | 'Google';
  apiKeySet: boolean;
  usageCount: number;
}

export type GenerationStep = 
  | 'prompt'
  | 'analysis'
  | 'tasks'
  | 'architecture'
  | 'apis'
  | 'database'
  | 'sandbox';
