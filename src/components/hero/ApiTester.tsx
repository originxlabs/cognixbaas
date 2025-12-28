import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Send, Check, Clock, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
    }
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
    }
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
    }
  },
];

const methodColors: Record<string, string> = {
  GET: 'bg-emerald-500/20 text-emerald-400',
  POST: 'bg-blue-500/20 text-blue-400',
};

const ApiTester = ({ isGenerating, generationStep }: ApiTesterProps) => {
  const [currentTestIndex, setCurrentTestIndex] = useState(-1);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedResult, setSelectedResult] = useState<TestResult | null>(null);

  const runTests = () => {
    if (isRunning) return;
    setIsRunning(true);
    setTestResults([]);
    setCurrentTestIndex(0);
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

      <div className="flex-1 flex overflow-hidden">
        {/* Test List */}
        <div className="w-56 border-r border-border overflow-y-auto">
          <div className="p-2 space-y-1">
            {sampleTests.map((test, idx) => {
              const isCompleted = idx < testResults.length;
              const isRunningThis = idx === currentTestIndex && isRunning;
              
              return (
                <motion.div
                  key={test.endpoint + test.method}
                  onClick={() => isCompleted && setSelectedResult(test)}
                  className={`p-2 rounded cursor-pointer transition-colors ${
                    selectedResult?.endpoint === test.endpoint
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
                      <span className="text-[10px] text-emerald-400">{test.status}</span>
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
        <div className="flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            {selectedResult ? (
              <motion.div
                key={selectedResult.endpoint}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full flex flex-col"
              >
                {/* Response Header */}
                <div className="flex items-center gap-4 px-4 py-2 bg-secondary/20 border-b border-border">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-muted-foreground">Status:</span>
                    <span className="text-xs font-bold text-emerald-400">{selectedResult.status} OK</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-muted-foreground">Time:</span>
                    <span className="text-xs text-foreground">{selectedResult.time}ms</span>
                  </div>
                </div>

                {/* Response Body */}
                <div className="flex-1 overflow-auto p-4">
                  <pre className="text-xs font-mono text-muted-foreground whitespace-pre-wrap">
                    {JSON.stringify(selectedResult.response, null, 2)}
                  </pre>
                </div>
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
