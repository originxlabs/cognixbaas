import { create } from 'zustand';
import type { 
  Project, 
  Task, 
  Module, 
  AgentActivity, 
  ApiEndpoint,
  DatabaseTable,
  GitHubIntegration,
  SandboxDeployment,
  LLMProvider,
  ProjectRequirements,
  GenerationStep,
  TaskStatus
} from '@/components/dashboard/types';

interface DashboardState {
  // Projects
  projects: Project[];
  currentProject: Project | null;
  
  // Requirements
  requirements: ProjectRequirements | null;
  
  // Tasks & Kanban
  tasks: Task[];
  
  // Architecture
  modules: Module[];
  
  // Agent Activity
  agentActivities: AgentActivity[];
  
  // APIs
  endpoints: ApiEndpoint[];
  
  // Database
  tables: DatabaseTable[];
  
  // Integrations
  github: GitHubIntegration;
  sandbox: SandboxDeployment;
  llmProviders: LLMProvider[];
  
  // Generation State
  generationStep: GenerationStep;
  isGenerating: boolean;
  
  // Actions
  setCurrentProject: (project: Project | null) => void;
  addProject: (project: Project) => void;
  setRequirements: (requirements: ProjectRequirements) => void;
  addTask: (task: Task) => void;
  updateTaskStatus: (taskId: string, status: TaskStatus) => void;
  setGenerationStep: (step: GenerationStep) => void;
  setIsGenerating: (isGenerating: boolean) => void;
  addAgentActivity: (activity: AgentActivity) => void;
}

// Demo data for MVP
const demoProject: Project = {
  id: '1',
  name: 'ACM-PAY',
  shortCode: 'ACM',
  description: 'E-commerce payment processing API',
  backendType: '.NET 8',
  database: 'Supabase',
  status: 'generating',
  version: '1.0.0',
  createdAt: new Date('2024-01-10'),
  updatedAt: new Date(),
  lastRunAt: new Date(Date.now() - 5 * 60 * 1000),
};

const demoTasks: Task[] = [
  { id: 'REQ-001', title: 'Validate requirements', module: 'Core', status: 'done', createdAt: new Date(), updatedAt: new Date() },
  { id: 'ARCH-001', title: 'Define modules', module: 'Core', status: 'done', createdAt: new Date(), updatedAt: new Date() },
  { id: 'AUTH-001', title: 'JWT Authentication', module: 'Auth', status: 'in_progress', assignedAgent: 'Security Agent', createdAt: new Date(), updatedAt: new Date() },
  { id: 'DB-001', title: 'User schema', module: 'Users', status: 'todo', createdAt: new Date(), updatedAt: new Date() },
  { id: 'API-001', title: 'Orders endpoints', module: 'Orders', status: 'todo', createdAt: new Date(), updatedAt: new Date() },
  { id: 'PAY-001', title: 'Stripe integration', module: 'Payments', status: 'blocked', createdAt: new Date(), updatedAt: new Date() },
];

const demoModules: Module[] = [
  { id: '1', name: 'Users', description: 'User management and profiles', endpointsCount: 6, status: 'in_progress', dependencies: ['Auth'] },
  { id: '2', name: 'Auth', description: 'JWT authentication and authorization', endpointsCount: 4, status: 'in_progress', dependencies: [] },
  { id: '3', name: 'Orders', description: 'Order processing and management', endpointsCount: 8, status: 'todo', dependencies: ['Users', 'Products'] },
  { id: '4', name: 'Products', description: 'Product catalog and inventory', endpointsCount: 7, status: 'todo', dependencies: [] },
  { id: '5', name: 'Payments', description: 'Payment processing with Stripe', endpointsCount: 5, status: 'blocked', dependencies: ['Orders'] },
];

const demoEndpoints: ApiEndpoint[] = [
  { id: '1', method: 'POST', path: '/api/v1/auth/login', description: 'User login', module: 'Auth', authenticated: false },
  { id: '2', method: 'POST', path: '/api/v1/auth/register', description: 'User registration', module: 'Auth', authenticated: false },
  { id: '3', method: 'POST', path: '/api/v1/auth/refresh', description: 'Refresh token', module: 'Auth', authenticated: true },
  { id: '4', method: 'GET', path: '/api/v1/users', description: 'List all users', module: 'Users', authenticated: true },
  { id: '5', method: 'GET', path: '/api/v1/users/{id}', description: 'Get user by ID', module: 'Users', authenticated: true },
  { id: '6', method: 'PUT', path: '/api/v1/users/{id}', description: 'Update user', module: 'Users', authenticated: true },
  { id: '7', method: 'GET', path: '/api/v1/orders', description: 'List orders', module: 'Orders', authenticated: true },
  { id: '8', method: 'POST', path: '/api/v1/orders', description: 'Create order', module: 'Orders', authenticated: true },
  { id: '9', method: 'GET', path: '/api/v1/products', description: 'List products', module: 'Products', authenticated: false },
  { id: '10', method: 'POST', path: '/api/v1/payments/checkout', description: 'Process checkout', module: 'Payments', authenticated: true },
];

const demoTables: DatabaseTable[] = [
  {
    name: 'users',
    columns: [
      { name: 'id', type: 'uuid', nullable: false, primaryKey: true },
      { name: 'email', type: 'varchar(255)', nullable: false, primaryKey: false },
      { name: 'password_hash', type: 'varchar(255)', nullable: false, primaryKey: false },
      { name: 'created_at', type: 'timestamp', nullable: false, primaryKey: false },
    ],
    relationships: [{ table: 'orders', type: 'one-to-many' }],
  },
  {
    name: 'orders',
    columns: [
      { name: 'id', type: 'uuid', nullable: false, primaryKey: true },
      { name: 'user_id', type: 'uuid', nullable: false, primaryKey: false },
      { name: 'status', type: 'varchar(50)', nullable: false, primaryKey: false },
      { name: 'total', type: 'decimal(10,2)', nullable: false, primaryKey: false },
    ],
    relationships: [
      { table: 'users', type: 'one-to-one' },
      { table: 'order_items', type: 'one-to-many' },
    ],
  },
  {
    name: 'products',
    columns: [
      { name: 'id', type: 'uuid', nullable: false, primaryKey: true },
      { name: 'name', type: 'varchar(255)', nullable: false, primaryKey: false },
      { name: 'price', type: 'decimal(10,2)', nullable: false, primaryKey: false },
      { name: 'stock', type: 'integer', nullable: false, primaryKey: false },
    ],
    relationships: [],
  },
];

const demoAgentActivities: AgentActivity[] = [
  { id: '1', agentName: 'Architect Agent', action: 'Defined modular monolith structure', timestamp: new Date(Date.now() - 10 * 60 * 1000) },
  { id: '2', agentName: 'Security Agent', action: 'Added JWT policies to Auth module', taskId: 'AUTH-001', timestamp: new Date(Date.now() - 8 * 60 * 1000) },
  { id: '3', agentName: 'API Agent', action: 'Created UsersController with CRUD endpoints', timestamp: new Date(Date.now() - 6 * 60 * 1000) },
  { id: '4', agentName: 'Database Agent', action: 'Generated User entity and migrations', timestamp: new Date(Date.now() - 4 * 60 * 1000) },
  { id: '5', agentName: 'Docs Agent', action: 'Generated OpenAPI specification', timestamp: new Date(Date.now() - 2 * 60 * 1000) },
];

export const useDashboardStore = create<DashboardState>((set) => ({
  // Initial state with demo data
  projects: [demoProject],
  currentProject: demoProject,
  requirements: {
    prompt: 'Build an e-commerce API with products, orders, cart, and user authentication. Include Stripe for payments.',
    entities: ['User', 'Order', 'Product', 'Cart', 'Payment'],
    authMethod: 'JWT + Refresh Token',
    payments: 'Stripe',
    multiTenant: true,
    customFeatures: ['Webhook handling', 'Email notifications'],
  },
  tasks: demoTasks,
  modules: demoModules,
  agentActivities: demoAgentActivities,
  endpoints: demoEndpoints,
  tables: demoTables,
  github: {
    connected: true,
    repository: 'acme/acm-pay-api',
    branch: 'main',
    lastSyncAt: new Date(Date.now() - 3 * 60 * 1000),
    status: 'connected',
  },
  sandbox: {
    status: 'running',
    url: 'https://sandbox.api.cognix.dev/acm-pay',
    lastDeployedAt: new Date(Date.now() - 15 * 60 * 1000),
    logs: [
      '[INFO] Container starting...',
      '[INFO] Database connection established',
      '[INFO] Migrations applied successfully',
      '[INFO] API listening on port 5000',
    ],
  },
  llmProviders: [
    { id: '1', name: 'OpenAI', apiKeySet: true, usageCount: 245 },
    { id: '2', name: 'Anthropic', apiKeySet: false, usageCount: 0 },
    { id: '3', name: 'Azure OpenAI', apiKeySet: false, usageCount: 0 },
  ],
  generationStep: 'apis',
  isGenerating: true,

  // Actions
  setCurrentProject: (project) => set({ currentProject: project }),
  addProject: (project) => set((state) => ({ projects: [...state.projects, project] })),
  setRequirements: (requirements) => set({ requirements }),
  addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
  updateTaskStatus: (taskId, status) => set((state) => ({
    tasks: state.tasks.map((t) => (t.id === taskId ? { ...t, status, updatedAt: new Date() } : t)),
  })),
  setGenerationStep: (step) => set({ generationStep: step }),
  setIsGenerating: (isGenerating) => set({ isGenerating }),
  addAgentActivity: (activity) => set((state) => ({
    agentActivities: [activity, ...state.agentActivities],
  })),
}));
