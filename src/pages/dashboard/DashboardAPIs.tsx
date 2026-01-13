import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Code2, 
  Lock, 
  Unlock,
  ChevronRight,
  Search,
  ExternalLink,
  Play,
  X
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useDashboardStore } from '@/stores/dashboardStore';
import { ApiTester } from '@/components/dashboard/ApiTester';

const methodColors = {
  GET: 'bg-green-500/10 text-green-500 border-green-500/30',
  POST: 'bg-blue-500/10 text-blue-500 border-blue-500/30',
  PUT: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/30',
  DELETE: 'bg-red-500/10 text-red-500 border-red-500/30',
  PATCH: 'bg-purple-500/10 text-purple-500 border-purple-500/30',
};

const DashboardAPIs = () => {
  const { endpoints, modules } = useDashboardStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedModule, setSelectedModule] = useState<string>('all');
  const [expandedEndpoint, setExpandedEndpoint] = useState<string | null>(null);
  const [testingEndpoint, setTestingEndpoint] = useState<any | null>(null);

  const filteredEndpoints = endpoints.filter((endpoint) => {
    const matchesSearch = 
      endpoint.path.toLowerCase().includes(searchTerm.toLowerCase()) ||
      endpoint.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesModule = selectedModule === 'all' || endpoint.module === selectedModule;
    return matchesSearch && matchesModule;
  });

  const moduleNames = ['all', ...Array.from(new Set(endpoints.map(e => e.module)))];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">API Documentation</h1>
          <p className="text-muted-foreground">Swagger / OpenAPI preview</p>
        </div>
        <Button variant="outline" className="gap-2">
          <ExternalLink className="w-4 h-4" />
          Open Swagger UI
        </Button>
      </div>

      {/* Filters */}
      <Card className="bg-card/50 border-border">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search endpoints..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-secondary/50 border-border"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
              {moduleNames.map((module) => (
                <Button
                  key={module}
                  variant={selectedModule === module ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedModule(module)}
                  className="whitespace-nowrap"
                >
                  {module === 'all' ? 'All Modules' : module}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* API Endpoints */}
      <Tabs defaultValue="list" className="space-y-4">
        <TabsList className="bg-secondary/50">
          <TabsTrigger value="list">Endpoint List</TabsTrigger>
          <TabsTrigger value="swagger">Swagger Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-3">
          {filteredEndpoints.map((endpoint, index) => (
            <motion.div
              key={endpoint.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card 
                className="bg-card/50 border-border hover:border-primary/30 transition-colors cursor-pointer"
                onClick={() => setExpandedEndpoint(
                  expandedEndpoint === endpoint.id ? null : endpoint.id
                )}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Badge 
                      variant="outline" 
                      className={`font-mono text-xs px-2 py-1 ${methodColors[endpoint.method]}`}
                    >
                      {endpoint.method}
                    </Badge>
                    <code className="text-sm font-mono text-foreground flex-1">
                      {endpoint.path}
                    </code>
                    <div className="flex items-center gap-2">
                      {endpoint.authenticated ? (
                        <Lock className="w-4 h-4 text-yellow-500" />
                      ) : (
                        <Unlock className="w-4 h-4 text-green-500" />
                      )}
                      <Badge variant="secondary" className="text-xs">
                        {endpoint.module}
                      </Badge>
                      <ChevronRight className={`w-4 h-4 text-muted-foreground transition-transform ${
                        expandedEndpoint === endpoint.id ? 'rotate-90' : ''
                      }`} />
                    </div>
                  </div>

                  {expandedEndpoint === endpoint.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-4 pt-4 border-t border-border"
                    >
                      <div className="space-y-3">
                        <div>
                          <span className="text-xs text-muted-foreground uppercase tracking-wider">Description</span>
                          <p className="text-sm text-foreground mt-1">{endpoint.description}</p>
                        </div>
                        <div>
                          <span className="text-xs text-muted-foreground uppercase tracking-wider">Authentication</span>
                          <p className="text-sm text-foreground mt-1">
                            {endpoint.authenticated ? 'Bearer Token (JWT)' : 'None required'}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="default"
                            className="gap-1.5"
                            onClick={(e) => {
                              e.stopPropagation();
                              setTestingEndpoint(endpoint);
                            }}
                          >
                            <Play className="w-3.5 h-3.5" />
                            Try it out
                          </Button>
                          <Button size="sm" variant="ghost">
                            View Schema
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}

          {filteredEndpoints.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              No endpoints match your search criteria
            </div>
          )}
        </TabsContent>

        <TabsContent value="swagger">
          <Card className="bg-card/50 border-border">
            <CardHeader className="pb-4 border-b border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Code2 className="w-5 h-5 text-primary" />
                  <div>
                    <CardTitle className="text-lg font-semibold">ACM-PAY API</CardTitle>
                    <p className="text-xs text-muted-foreground font-mono">OpenAPI 3.0.0</p>
                  </div>
                </div>
                <Badge variant="outline" className="font-mono">v1.0.0</Badge>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="bg-secondary/30 p-6 font-mono text-sm overflow-x-auto">
                <pre className="text-muted-foreground">
{`openapi: 3.0.0
info:
  title: ACM-PAY API
  version: 1.0.0
  description: E-commerce payment processing API

servers:
  - url: https://sandbox.api.cognix.dev/acm-pay/api/v1
    description: Sandbox

security:
  - bearerAuth: []

paths:
  /auth/login:
    post:
      summary: User login
      tags: [Auth]
      security: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                email:
                  type: string
                password:
                  type: string

  /users:
    get:
      summary: List all users
      tags: [Users]
      responses:
        200:
          description: List of users
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/User'

components:
  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT
  
  schemas:
    User:
      type: object
      properties:
        id:
          type: string
          format: uuid
        email:
          type: string
        createdAt:
          type: string
          format: date-time`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* API Tester Dialog */}
      <Dialog open={!!testingEndpoint} onOpenChange={() => setTestingEndpoint(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <Badge 
                variant="outline" 
                className={`font-mono ${testingEndpoint ? methodColors[testingEndpoint.method] : ''}`}
              >
                {testingEndpoint?.method}
              </Badge>
              <code className="text-sm">{testingEndpoint?.path}</code>
            </DialogTitle>
          </DialogHeader>
          {testingEndpoint && (
            <ApiTester endpoint={testingEndpoint} />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DashboardAPIs;
