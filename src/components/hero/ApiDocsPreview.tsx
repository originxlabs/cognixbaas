import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileJson, ChevronRight, ChevronDown, Lock, Unlock } from 'lucide-react';

interface Endpoint {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  path: string;
  summary: string;
  auth: boolean;
  tag: string;
}

interface ApiDocsPreviewProps {
  isGenerating: boolean;
  generationStep: number;
}

const endpoints: Endpoint[] = [
  { method: 'POST', path: '/api/auth/register', summary: 'Register a new user', auth: false, tag: 'Authentication' },
  { method: 'POST', path: '/api/auth/login', summary: 'Authenticate user', auth: false, tag: 'Authentication' },
  { method: 'POST', path: '/api/auth/refresh', summary: 'Refresh access token', auth: true, tag: 'Authentication' },
  { method: 'GET', path: '/api/products', summary: 'Get all products', auth: false, tag: 'Products' },
  { method: 'GET', path: '/api/products/{id}', summary: 'Get product by ID', auth: false, tag: 'Products' },
  { method: 'POST', path: '/api/products', summary: 'Create new product', auth: true, tag: 'Products' },
  { method: 'PUT', path: '/api/products/{id}', summary: 'Update product', auth: true, tag: 'Products' },
  { method: 'DELETE', path: '/api/products/{id}', summary: 'Delete product', auth: true, tag: 'Products' },
  { method: 'GET', path: '/api/orders', summary: 'Get user orders', auth: true, tag: 'Orders' },
  { method: 'POST', path: '/api/orders', summary: 'Create new order', auth: true, tag: 'Orders' },
  { method: 'GET', path: '/api/orders/{id}', summary: 'Get order details', auth: true, tag: 'Orders' },
  { method: 'PATCH', path: '/api/orders/{id}/status', summary: 'Update order status', auth: true, tag: 'Orders' },
  { method: 'GET', path: '/api/cart', summary: 'Get user cart', auth: true, tag: 'Cart' },
  { method: 'POST', path: '/api/cart/items', summary: 'Add item to cart', auth: true, tag: 'Cart' },
  { method: 'DELETE', path: '/api/cart/items/{id}', summary: 'Remove cart item', auth: true, tag: 'Cart' },
];

const methodColors: Record<string, string> = {
  GET: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  POST: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  PUT: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  DELETE: 'bg-red-500/20 text-red-400 border-red-500/30',
  PATCH: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
};

const ApiDocsPreview = ({ isGenerating, generationStep }: ApiDocsPreviewProps) => {
  const [visibleEndpoints, setVisibleEndpoints] = useState<number>(0);
  const [expandedTags, setExpandedTags] = useState<Set<string>>(new Set(['Authentication', 'Products']));
  const [selectedEndpoint, setSelectedEndpoint] = useState<Endpoint | null>(null);

  useEffect(() => {
    if (isGenerating && generationStep >= 3) {
      const interval = setInterval(() => {
        setVisibleEndpoints((prev) => Math.min(prev + 1, endpoints.length));
      }, 200);
      return () => clearInterval(interval);
    } else if (generationStep >= 5) {
      setVisibleEndpoints(endpoints.length);
    }
  }, [isGenerating, generationStep]);

  const toggleTag = (tag: string) => {
    setExpandedTags((prev) => {
      const next = new Set(prev);
      if (next.has(tag)) {
        next.delete(tag);
      } else {
        next.add(tag);
      }
      return next;
    });
  };

  const groupedEndpoints = endpoints.reduce((acc, endpoint, index) => {
    if (index >= visibleEndpoints) return acc;
    if (!acc[endpoint.tag]) acc[endpoint.tag] = [];
    acc[endpoint.tag].push(endpoint);
    return acc;
  }, {} as Record<string, Endpoint[]>);

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-secondary/30 border-b border-border">
        <div className="flex items-center gap-2">
          <FileJson className="w-4 h-4 text-primary" />
          <span className="text-sm font-semibold text-foreground">OpenAPI Specification</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs px-2 py-0.5 rounded bg-primary/20 text-primary">v3.0</span>
          <span className="text-xs text-muted-foreground">{visibleEndpoints} endpoints</span>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Endpoints List */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-3 space-y-2">
            {Object.entries(groupedEndpoints).map(([tag, tagEndpoints]) => (
              <div key={tag} className="rounded-lg bg-secondary/20 overflow-hidden">
                <button
                  onClick={() => toggleTag(tag)}
                  className="w-full flex items-center gap-2 px-3 py-2 hover:bg-secondary/40 transition-colors"
                >
                  {expandedTags.has(tag) ? (
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  )}
                  <span className="text-sm font-medium text-foreground">{tag}</span>
                  <span className="text-xs text-muted-foreground">({tagEndpoints.length})</span>
                </button>
                
                <AnimatePresence>
                  {expandedTags.has(tag) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="border-t border-border/50"
                    >
                      {tagEndpoints.map((endpoint, idx) => (
                        <motion.div
                          key={endpoint.path + endpoint.method}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          onClick={() => setSelectedEndpoint(endpoint)}
                          className={`flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-secondary/40 transition-colors ${
                            selectedEndpoint?.path === endpoint.path && selectedEndpoint?.method === endpoint.method
                              ? 'bg-primary/10'
                              : ''
                          }`}
                        >
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${methodColors[endpoint.method]}`}>
                            {endpoint.method}
                          </span>
                          <span className="text-xs font-mono text-muted-foreground flex-1 truncate">
                            {endpoint.path}
                          </span>
                          {endpoint.auth ? (
                            <Lock className="w-3 h-3 text-amber-400" />
                          ) : (
                            <Unlock className="w-3 h-3 text-muted-foreground/50" />
                          )}
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
            
            {isGenerating && visibleEndpoints < endpoints.length && (
              <div className="flex items-center gap-2 px-3 py-2 text-muted-foreground">
                <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                <span className="text-xs">Generating API endpoints...</span>
              </div>
            )}
          </div>
        </div>

        {/* Endpoint Details */}
        <AnimatePresence>
          {selectedEndpoint && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 280, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className="border-l border-border bg-secondary/10 overflow-hidden"
            >
              <div className="p-4 space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xs font-bold px-2 py-1 rounded border ${methodColors[selectedEndpoint.method]}`}>
                      {selectedEndpoint.method}
                    </span>
                  </div>
                  <code className="text-xs text-foreground font-mono break-all">
                    {selectedEndpoint.path}
                  </code>
                </div>
                
                <div>
                  <h4 className="text-xs font-semibold text-muted-foreground mb-1">Summary</h4>
                  <p className="text-sm text-foreground">{selectedEndpoint.summary}</p>
                </div>
                
                <div>
                  <h4 className="text-xs font-semibold text-muted-foreground mb-1">Authorization</h4>
                  <div className="flex items-center gap-2">
                    {selectedEndpoint.auth ? (
                      <>
                        <Lock className="w-4 h-4 text-amber-400" />
                        <span className="text-xs text-foreground">Bearer Token Required</span>
                      </>
                    ) : (
                      <>
                        <Unlock className="w-4 h-4 text-emerald-400" />
                        <span className="text-xs text-foreground">No authentication</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ApiDocsPreview;
