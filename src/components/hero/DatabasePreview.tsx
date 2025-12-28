import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Table, Key, Link2, Columns } from 'lucide-react';

interface Column {
  name: string;
  type: string;
  isPrimary?: boolean;
  isForeign?: boolean;
  nullable?: boolean;
}

interface TableSchema {
  name: string;
  columns: Column[];
}

interface DatabasePreviewProps {
  isGenerating: boolean;
  generationStep: number;
}

const tables: TableSchema[] = [
  {
    name: 'users',
    columns: [
      { name: 'id', type: 'UUID', isPrimary: true },
      { name: 'email', type: 'VARCHAR(255)' },
      { name: 'password_hash', type: 'VARCHAR(255)' },
      { name: 'role', type: 'VARCHAR(50)' },
      { name: 'created_at', type: 'TIMESTAMP' },
      { name: 'updated_at', type: 'TIMESTAMP' },
    ],
  },
  {
    name: 'products',
    columns: [
      { name: 'id', type: 'UUID', isPrimary: true },
      { name: 'name', type: 'VARCHAR(255)' },
      { name: 'description', type: 'TEXT', nullable: true },
      { name: 'price', type: 'DECIMAL(10,2)' },
      { name: 'stock', type: 'INTEGER' },
      { name: 'category_id', type: 'UUID', isForeign: true },
      { name: 'created_at', type: 'TIMESTAMP' },
    ],
  },
  {
    name: 'orders',
    columns: [
      { name: 'id', type: 'UUID', isPrimary: true },
      { name: 'user_id', type: 'UUID', isForeign: true },
      { name: 'status', type: 'VARCHAR(50)' },
      { name: 'total', type: 'DECIMAL(10,2)' },
      { name: 'created_at', type: 'TIMESTAMP' },
      { name: 'updated_at', type: 'TIMESTAMP' },
    ],
  },
  {
    name: 'order_items',
    columns: [
      { name: 'id', type: 'UUID', isPrimary: true },
      { name: 'order_id', type: 'UUID', isForeign: true },
      { name: 'product_id', type: 'UUID', isForeign: true },
      { name: 'quantity', type: 'INTEGER' },
      { name: 'unit_price', type: 'DECIMAL(10,2)' },
    ],
  },
  {
    name: 'cart_items',
    columns: [
      { name: 'id', type: 'UUID', isPrimary: true },
      { name: 'user_id', type: 'UUID', isForeign: true },
      { name: 'product_id', type: 'UUID', isForeign: true },
      { name: 'quantity', type: 'INTEGER' },
    ],
  },
];

const DatabasePreview = ({ isGenerating, generationStep }: DatabasePreviewProps) => {
  const [visibleTables, setVisibleTables] = useState<number>(0);
  const [selectedTable, setSelectedTable] = useState<TableSchema | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (generationStep >= 2) {
      const interval = setInterval(() => {
        setVisibleTables((prev) => {
          if (prev < tables.length) return prev + 1;
          clearInterval(interval);
          return prev;
        });
      }, 400);
      return () => clearInterval(interval);
    }
  }, [generationStep]);

  useEffect(() => {
    if (visibleTables > 0 && !selectedTable) {
      setSelectedTable(tables[0]);
    }
    if (visibleTables === tables.length) {
      setTimeout(() => setIsConnected(true), 500);
    }
  }, [visibleTables, selectedTable]);

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-secondary/30 border-b border-border">
        <div className="flex items-center gap-2">
          <Database className="w-4 h-4 text-primary" />
          <span className="text-sm font-semibold text-foreground">Neon PostgreSQL</span>
        </div>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-emerald-400 animate-pulse' : 'bg-muted-foreground'}`} />
          <span className="text-xs text-muted-foreground">
            {isConnected ? 'Connected' : 'Connecting...'}
          </span>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Tables List */}
        <div className="w-44 border-r border-border overflow-y-auto bg-secondary/10">
          <div className="p-2 space-y-1">
            <div className="px-2 py-1 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
              Tables ({visibleTables})
            </div>
            {tables.slice(0, visibleTables).map((table, idx) => (
              <motion.div
                key={table.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => setSelectedTable(table)}
                className={`flex items-center gap-2 px-2 py-1.5 rounded cursor-pointer transition-colors ${
                  selectedTable?.name === table.name
                    ? 'bg-primary/20 text-primary'
                    : 'text-muted-foreground hover:bg-secondary/50 hover:text-foreground'
                }`}
              >
                <Table className="w-3.5 h-3.5" />
                <span className="text-xs font-mono">{table.name}</span>
              </motion.div>
            ))}
            {isGenerating && visibleTables < tables.length && (
              <div className="flex items-center gap-2 px-2 py-1.5 text-muted-foreground">
                <div className="w-3 h-3 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                <span className="text-[10px]">Creating tables...</span>
              </div>
            )}
          </div>
        </div>

        {/* Table Details */}
        <div className="flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            {selectedTable ? (
              <motion.div
                key={selectedTable.name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full flex flex-col"
              >
                {/* Table Header */}
                <div className="flex items-center gap-2 px-4 py-2 bg-secondary/20 border-b border-border">
                  <Table className="w-4 h-4 text-accent" />
                  <span className="text-sm font-semibold text-foreground">{selectedTable.name}</span>
                  <span className="text-xs text-muted-foreground">
                    ({selectedTable.columns.length} columns)
                  </span>
                </div>

                {/* Columns */}
                <div className="flex-1 overflow-auto">
                  <table className="w-full">
                    <thead className="bg-secondary/30 sticky top-0">
                      <tr>
                        <th className="px-4 py-2 text-left text-[10px] font-semibold text-muted-foreground uppercase">
                          Column
                        </th>
                        <th className="px-4 py-2 text-left text-[10px] font-semibold text-muted-foreground uppercase">
                          Type
                        </th>
                        <th className="px-4 py-2 text-left text-[10px] font-semibold text-muted-foreground uppercase">
                          Constraints
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedTable.columns.map((column, idx) => (
                        <motion.tr
                          key={column.name}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: idx * 0.05 }}
                          className="border-b border-border/50 hover:bg-secondary/20"
                        >
                          <td className="px-4 py-2">
                            <div className="flex items-center gap-2">
                              {column.isPrimary && <Key className="w-3 h-3 text-amber-400" />}
                              {column.isForeign && <Link2 className="w-3 h-3 text-blue-400" />}
                              {!column.isPrimary && !column.isForeign && <Columns className="w-3 h-3 text-muted-foreground" />}
                              <span className="text-xs font-mono text-foreground">{column.name}</span>
                            </div>
                          </td>
                          <td className="px-4 py-2">
                            <span className="text-xs font-mono text-primary">{column.type}</span>
                          </td>
                          <td className="px-4 py-2">
                            <div className="flex items-center gap-1">
                              {column.isPrimary && (
                                <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400">
                                  PK
                                </span>
                              )}
                              {column.isForeign && (
                                <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400">
                                  FK
                                </span>
                              )}
                              {column.nullable && (
                                <span className="text-[10px] px-1.5 py-0.5 rounded bg-secondary text-muted-foreground">
                                  NULL
                                </span>
                              )}
                              {!column.nullable && !column.isPrimary && !column.isForeign && (
                                <span className="text-[10px] px-1.5 py-0.5 rounded bg-secondary text-muted-foreground">
                                  NOT NULL
                                </span>
                              )}
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            ) : (
              <div className="h-full flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <Database className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p className="text-sm">Select a table to view schema</p>
                </div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default DatabasePreview;
