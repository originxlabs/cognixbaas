import { motion } from 'framer-motion';
import { 
  Database, 
  Table, 
  Key,
  Link2,
  Columns,
  Settings2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useDashboardStore } from '@/stores/dashboardStore';
import { DatabaseConnectionConfig } from '@/components/dashboard/DatabaseConnectionConfig';
import { useProjectContext } from '@/contexts/ProjectContext';
import { useParams } from 'react-router-dom';

const DashboardDatabase = () => {
  const { tables, currentProject } = useDashboardStore();
  const { currentProject: contextProject } = useProjectContext();
  const { projectId } = useParams();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Database</h1>
          <p className="text-muted-foreground">PostgreSQL schema via {currentProject?.database || 'Supabase'}</p>
        </div>
      </div>

      {/* Database Tabs */}
      <Tabs defaultValue="schema" className="space-y-6">
        <TabsList className="bg-secondary/50">
          <TabsTrigger value="schema" className="gap-2">
            <Table className="w-4 h-4" />
            Schema
          </TabsTrigger>
          <TabsTrigger value="connection" className="gap-2">
            <Settings2 className="w-4 h-4" />
            Connection
          </TabsTrigger>
        </TabsList>

        <TabsContent value="schema" className="space-y-6">
          {/* Database Info */}
          <Card className="bg-card/50 border-border">
            <CardContent className="p-4">
              <div className="grid md:grid-cols-4 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Database className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Database</p>
                    <p className="font-mono text-sm text-foreground">PostgreSQL 15</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                    <Table className="w-5 h-5 text-green-500" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Tables</p>
                    <p className="font-mono text-sm text-foreground">{tables.length}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Link2 className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Relationships</p>
                    <p className="font-mono text-sm text-foreground">
                      {tables.reduce((acc, t) => acc + t.relationships.length, 0)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                    <Key className="w-5 h-5 text-yellow-500" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">RLS</p>
                    <p className="font-mono text-sm text-foreground">Enabled</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tables */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground">Tables</h2>
            
            {tables.map((table, index) => (
              <motion.div
                key={table.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-card/50 border-border">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Table className="w-5 h-5 text-primary" />
                        <CardTitle className="text-lg font-mono">{table.name}</CardTitle>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {table.columns.length} columns
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {/* Columns Table */}
                    <div className="overflow-x-auto mb-4">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="text-left py-2 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Column</th>
                            <th className="text-left py-2 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Type</th>
                            <th className="text-left py-2 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Nullable</th>
                            <th className="text-left py-2 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Key</th>
                          </tr>
                        </thead>
                        <tbody>
                          {table.columns.map((column) => (
                            <tr key={column.name} className="border-b border-border/50">
                              <td className="py-2 px-3">
                                <code className="text-sm font-mono text-foreground">{column.name}</code>
                              </td>
                              <td className="py-2 px-3">
                                <Badge variant="outline" className="font-mono text-xs">
                                  {column.type}
                                </Badge>
                              </td>
                              <td className="py-2 px-3 text-sm text-muted-foreground">
                                {column.nullable ? 'Yes' : 'No'}
                              </td>
                              <td className="py-2 px-3">
                                {column.primaryKey && (
                                  <Badge className="bg-yellow-500/10 text-yellow-500 border-yellow-500/30 text-xs">
                                    <Key className="w-3 h-3 mr-1" />
                                    PK
                                  </Badge>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Relationships */}
                    {table.relationships.length > 0 && (
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Relationships</p>
                        <div className="flex flex-wrap gap-2">
                          {table.relationships.map((rel, i) => (
                            <Badge key={i} variant="outline" className="gap-1.5 font-mono text-xs">
                              <Link2 className="w-3 h-3" />
                              {rel.table}
                              <span className="text-muted-foreground">({rel.type})</span>
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* ERD Placeholder */}
          <Card className="bg-card/50 border-border">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold">Entity Relationship Diagram</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center py-12 bg-secondary/30 rounded-lg border border-dashed border-border">
                <div className="text-center">
                  <Columns className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground">Visual ERD coming in Phase 2</p>
                  <p className="text-xs text-muted-foreground mt-1">Relationships are defined in the table view above</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="connection" className="space-y-6">
          <DatabaseConnectionConfig
            projectId={projectId || ''}
            currentProvider="supabase"
            isConnected={true}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardDatabase;
