import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Send, Check, Clock, Loader2, ChevronDown, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ApiTesterProps {
  isGenerating: boolean;
  generationStep: number;
}

interface TestResult {
  endpoint: string;
  method: string;
  status: number;
  time: number;
  response: object;
  requestBody?: object;
  headers?: Record<string, string>;
}

interface CustomHeader {
  key: string;
  value: string;
}

const sampleTests: TestResult[] = [
  {
    endpoint: '/api/products',
    method: 'GET',
    status: 200,
    time: 45,
    response: {
      data: [
        { id: 1, name: 'Premium Widget', price: 99.99, stock: 150 },
        { id: 2, name: 'Basic Widget', price: 29.99, stock: 500 },
        { id: 3, name: 'Pro Widget', price: 149.99, stock: 75 },
      ],
      pagination: { page: 1, total: 3, limit: 10 }
    },
    headers: { 'Content-Type': 'application/json' }
  },
  {
    endpoint: '/api/auth/login',
    method: 'POST',
    status: 200,
    time: 120,
    response: {
      accessToken: 'eyJhbGciOiJIUzI1NiIs...',
      refreshToken: 'dGhpcyBpcyBhIHJlZnJl...',
      expiresIn: 3600,
      user: { id: 1, email: 'user@example.com', role: 'admin' }
    },
    requestBody: { email: 'user@example.com', password: '••••••••' },
    headers: { 'Content-Type': 'application/json' }
  },
  {
    endpoint: '/api/orders',
    method: 'GET',
    status: 200,
    time: 78,
    response: {
      data: [
        { id: 'ORD-001', status: 'completed', total: 299.97, items: 3 },
        { id: 'ORD-002', status: 'processing', total: 149.99, items: 1 },
      ],
      pagination: { page: 1, total: 2, limit: 10 }
    },
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer eyJhbGci...' }
  },
  {
    endpoint: '/api/products',
    method: 'POST',
    status: 201,
    time: 95,
    response: {
      id: 4,
      name: 'Ultra Widget',
      price: 199.99,
      stock: 50,
      createdAt: '2024-01-15T10:30:00Z'
    },
    requestBody: { name: 'Ultra Widget', price: 199.99, stock: 50, categoryId: 1 },
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer eyJhbGci...' }
  },
];

const methodColors: Record<string, string> = {
  GET: 'bg-emerald-500/20 text-emerald-400',
  POST: 'bg-blue-500/20 text-blue-400',
  PUT: 'bg-amber-500/20 text-amber-400',
  DELETE: 'bg-red-500/20 text-red-400',
};

const ApiTester = ({ isGenerating, generationStep }: ApiTesterProps) => {
  const [currentTestIndex, setCurrentTestIndex] = useState(-1);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedResult, setSelectedResult] = useState<TestResult | null>(null);
  const [activeRequestTab, setActiveRequestTab] = useState('body');
  
  // Custom request state
  const [customBody, setCustomBody] = useState('{\n  "name": "New Product",\n  "price": 49.99,\n  "stock": 100\n}');
  const [customHeaders, setCustomHeaders] = useState<CustomHeader[]>([
    { key: 'Content-Type', value: 'application/json' },
    { key: 'Authorization', value: 'Bearer eyJhbGciOiJIUzI1NiIs...' },
  ]);
  const [showRequestPanel, setShowRequestPanel] = useState(false);

  const runTests = () => {
    if (isRunning) return;
    setIsRunning(true);
    setTestResults([]);
    setCurrentTestIndex(0);
  };

  const addHeader = () => {
    setCustomHeaders([...customHeaders, { key: '', value: '' }]);
  };

  const removeHeader = (index: number) => {
    setCustomHeaders(customHeaders.filter((_, i) => i !== index));
  };

  const updateHeader = (index: number, field: 'key' | 'value', value: string) => {
    const updated = [...customHeaders];
    updated[index][field] = value;
    setCustomHeaders(updated);
  };

  useEffect(() => {
    if (currentTestIndex >= 0 && currentTestIndex < sampleTests.length && isRunning) {
      const timer = setTimeout(() => {
        setTestResults((prev) => [...prev, sampleTests[currentTestIndex]]);
        if (currentTestIndex === 0) {
          setSelectedResult(sampleTests[currentTestIndex]);
        }
        setCurrentTestIndex((prev) => prev + 1);
      }, 800);
      return () => clearTimeout(timer);
    } else if (currentTestIndex >= sampleTests.length) {
      setIsRunning(false);
    }
  }, [currentTestIndex, isRunning]);

  // Auto-run tests when generation is complete
  useEffect(() => {
    if (generationStep >= 5 && testResults.length === 0) {
      const timer = setTimeout(runTests, 500);
      return () => clearTimeout(timer);
    }
  }, [generationStep]);

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-secondary/30 border-b border-border">
        <div className="flex items-center gap-2">
          <Play className="w-4 h-4 text-primary" />
          <span className="text-sm font-semibold text-foreground">API Tester</span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => setShowRequestPanel(!showRequestPanel)}
            size="sm"
            variant="ghost"
            className="h-7 text-xs gap-1.5"
          >
            Custom Request
            <ChevronDown className={`w-3 h-3 transition-transform ${showRequestPanel ? 'rotate-180' : ''}`} />
          </Button>
          <Button
            onClick={runTests}
            disabled={isRunning || generationStep < 5}
            size="sm"
            variant="outline"
            className="h-7 text-xs gap-1.5"
          >
            {isRunning ? (
              <>
                <Loader2 className="w-3 h-3 animate-spin" />
                Running...
              </>
            ) : (
              <>
                <Send className="w-3 h-3" />
                Run All Tests
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Custom Request Panel */}
      <AnimatePresence>
        {showRequestPanel && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-b border-border overflow-hidden"
          >
            <div className="p-3 bg-secondary/20">
              <Tabs value={activeRequestTab} onValueChange={setActiveRequestTab}>
                <TabsList className="h-7 mb-2">
                  <TabsTrigger value="body" className="text-xs h-6 px-2">Request Body</TabsTrigger>
                  <TabsTrigger value="headers" className="text-xs h-6 px-2">Headers ({customHeaders.length})</TabsTrigger>
                </TabsList>
                
                <TabsContent value="body" className="mt-0">
                  <Textarea
                    value={customBody}
                    onChange={(e) => setCustomBody(e.target.value)}
                    placeholder="Enter JSON request body..."
                    className="font-mono text-xs h-24 resize-none bg-background"
                  />
                </TabsContent>
                
                <TabsContent value="headers" className="mt-0 space-y-2">
                  <div className="max-h-24 overflow-y-auto space-y-1.5">
                    {customHeaders.map((header, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <Input
                          value={header.key}
                          onChange={(e) => updateHeader(idx, 'key', e.target.value)}
                          placeholder="Header name"
                          className="h-7 text-xs font-mono flex-1"
                        />
                        <Input
                          value={header.value}
                          onChange={(e) => updateHeader(idx, 'value', e.target.value)}
                          placeholder="Header value"
                          className="h-7 text-xs font-mono flex-[2]"
                        />
                        <Button
                          onClick={() => removeHeader(idx)}
                          size="sm"
                          variant="ghost"
                          className="h-7 w-7 p-0 text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  <Button
                    onClick={addHeader}
                    size="sm"
                    variant="outline"
                    className="h-7 text-xs gap-1"
                  >
                    <Plus className="w-3 h-3" />
                    Add Header
                  </Button>
                </TabsContent>
              </Tabs>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-1 flex overflow-hidden">
        {/* Test List */}
        <div className="w-56 border-r border-border overflow-y-auto">
          <div className="p-2 space-y-1">
            {sampleTests.map((test, idx) => {
              const isCompleted = idx < testResults.length;
              const isRunningThis = idx === currentTestIndex && isRunning;
              
              return (
                <motion.div
                  key={test.endpoint + test.method + idx}
                  onClick={() => isCompleted && setSelectedResult(test)}
                  className={`p-2 rounded cursor-pointer transition-colors ${
                    selectedResult === test
                      ? 'bg-primary/20'
                      : 'hover:bg-secondary/50'
                  } ${!isCompleted && !isRunningThis ? 'opacity-50' : ''}`}
                >
                  <div className="flex items-center gap-2">
                    {isRunningThis ? (
                      <Loader2 className="w-3 h-3 animate-spin text-primary" />
                    ) : isCompleted ? (
                      <Check className="w-3 h-3 text-emerald-400" />
                    ) : (
                      <div className="w-3 h-3 rounded-full border border-muted-foreground/30" />
                    )}
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${methodColors[test.method]}`}>
                      {test.method}
                    </span>
                  </div>
                  <div className="text-xs font-mono text-muted-foreground mt-1 truncate">
                    {test.endpoint}
                  </div>
                  {isCompleted && (
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-[10px] ${test.status < 300 ? 'text-emerald-400' : 'text-red-400'}`}>
                        {test.status}
                      </span>
                      <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                        <Clock className="w-2.5 h-2.5" />
                        {test.time}ms
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Response Panel */}
        <div className="flex-1 overflow-hidden flex flex-col">
          <AnimatePresence mode="wait">
            {selectedResult ? (
              <motion.div
                key={selectedResult.endpoint + selectedResult.method}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full flex flex-col"
              >
                {/* Response Header */}
                <div className="flex items-center gap-4 px-4 py-2 bg-secondary/20 border-b border-border">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-muted-foreground">Status:</span>
                    <span className={`text-xs font-bold ${selectedResult.status < 300 ? 'text-emerald-400' : 'text-red-400'}`}>
                      {selectedResult.status} {selectedResult.status === 200 ? 'OK' : selectedResult.status === 201 ? 'Created' : 'Error'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-muted-foreground">Time:</span>
                    <span className="text-xs text-foreground">{selectedResult.time}ms</span>
                  </div>
                </div>

                {/* Request/Response Tabs */}
                <Tabs defaultValue="response" className="flex-1 flex flex-col overflow-hidden">
                  <div className="px-4 pt-2 border-b border-border">
                    <TabsList className="h-7">
                      <TabsTrigger value="response" className="text-xs h-6 px-2">Response</TabsTrigger>
                      {selectedResult.requestBody && (
                        <TabsTrigger value="request" className="text-xs h-6 px-2">Request Body</TabsTrigger>
                      )}
                      <TabsTrigger value="reqHeaders" className="text-xs h-6 px-2">Headers</TabsTrigger>
                    </TabsList>
                  </div>
                  
                  <TabsContent value="response" className="flex-1 overflow-auto p-4 mt-0">
                    <pre className="text-xs font-mono text-muted-foreground whitespace-pre-wrap">
                      {JSON.stringify(selectedResult.response, null, 2)}
                    </pre>
                  </TabsContent>
                  
                  {selectedResult.requestBody && (
                    <TabsContent value="request" className="flex-1 overflow-auto p-4 mt-0">
                      <pre className="text-xs font-mono text-muted-foreground whitespace-pre-wrap">
                        {JSON.stringify(selectedResult.requestBody, null, 2)}
                      </pre>
                    </TabsContent>
                  )}
                  
                  <TabsContent value="reqHeaders" className="flex-1 overflow-auto p-4 mt-0">
                    <div className="space-y-1">
                      {selectedResult.headers && Object.entries(selectedResult.headers).map(([key, value]) => (
                        <div key={key} className="flex gap-2 text-xs font-mono">
                          <span className="text-primary">{key}:</span>
                          <span className="text-muted-foreground">{value}</span>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </motion.div>
            ) : (
              <div className="h-full flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <Play className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p className="text-sm">
                    {generationStep < 5 ? 'Waiting for API generation...' : 'Run tests to see responses'}
                  </p>
                </div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ApiTester;
