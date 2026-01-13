import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Play,
  Copy,
  Check,
  ChevronDown,
  Clock,
  Loader2,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { useToast } from '@/hooks/use-toast';

interface ApiEndpoint {
  id: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  path: string;
  description: string;
  authenticated: boolean;
}

interface ApiTesterProps {
  endpoint: ApiEndpoint;
  baseUrl?: string;
  onClose?: () => void;
}

const methodColors = {
  GET: 'bg-green-500/10 text-green-500 border-green-500/30',
  POST: 'bg-blue-500/10 text-blue-500 border-blue-500/30',
  PUT: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/30',
  DELETE: 'bg-red-500/10 text-red-500 border-red-500/30',
  PATCH: 'bg-purple-500/10 text-purple-500 border-purple-500/30',
};

const statusColors: Record<number, string> = {
  200: 'bg-green-500/10 text-green-500',
  201: 'bg-green-500/10 text-green-500',
  204: 'bg-green-500/10 text-green-500',
  400: 'bg-yellow-500/10 text-yellow-500',
  401: 'bg-red-500/10 text-red-500',
  403: 'bg-red-500/10 text-red-500',
  404: 'bg-yellow-500/10 text-yellow-500',
  500: 'bg-red-500/10 text-red-500',
};

interface TestResult {
  status: number;
  statusText: string;
  duration: number;
  headers: Record<string, string>;
  body: any;
}

export const ApiTester = ({ endpoint, baseUrl = 'https://sandbox.api.cognix.dev' }: ApiTesterProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<TestResult | null>(null);
  const [activeTab, setActiveTab] = useState<'params' | 'headers' | 'body'>('params');
  const [showHeaders, setShowHeaders] = useState(false);
  const [copied, setCopied] = useState(false);

  // Request state
  const [authToken, setAuthToken] = useState('');
  const [pathParams, setPathParams] = useState<Record<string, string>>({});
  const [queryParams, setQueryParams] = useState<{ key: string; value: string }[]>([
    { key: '', value: '' },
  ]);
  const [headers, setHeaders] = useState<{ key: string; value: string }[]>([
    { key: 'Content-Type', value: 'application/json' },
  ]);
  const [requestBody, setRequestBody] = useState('{\n  \n}');

  // Extract path parameters from endpoint path
  const pathParamMatches = endpoint.path.match(/\{([^}]+)\}/g) || [];
  const pathParamsKeys = pathParamMatches.map((p) => p.replace(/[{}]/g, ''));

  const buildUrl = () => {
    let url = `${baseUrl}${endpoint.path}`;
    
    // Replace path parameters
    pathParamsKeys.forEach((key) => {
      url = url.replace(`{${key}}`, pathParams[key] || `:${key}`);
    });

    // Add query parameters
    const validQueryParams = queryParams.filter((p) => p.key && p.value);
    if (validQueryParams.length > 0) {
      const searchParams = new URLSearchParams();
      validQueryParams.forEach((p) => searchParams.append(p.key, p.value));
      url += `?${searchParams.toString()}`;
    }

    return url;
  };

  const handleTest = async () => {
    setIsLoading(true);
    setResult(null);

    const startTime = Date.now();

    // Simulate API call with mock response
    await new Promise((resolve) => setTimeout(resolve, 800 + Math.random() * 400));

    const duration = Date.now() - startTime;

    // Generate mock response based on method
    const mockResponses: Record<string, any> = {
      GET: {
        data: [
          { id: '1', name: 'Sample Item 1', createdAt: new Date().toISOString() },
          { id: '2', name: 'Sample Item 2', createdAt: new Date().toISOString() },
        ],
        pagination: { page: 1, limit: 10, total: 2 },
      },
      POST: {
        id: crypto.randomUUID(),
        message: 'Resource created successfully',
        createdAt: new Date().toISOString(),
      },
      PUT: {
        id: pathParams.id || '1',
        message: 'Resource updated successfully',
        updatedAt: new Date().toISOString(),
      },
      DELETE: {
        message: 'Resource deleted successfully',
      },
      PATCH: {
        id: pathParams.id || '1',
        message: 'Resource patched successfully',
        updatedAt: new Date().toISOString(),
      },
    };

    const status = endpoint.authenticated && !authToken ? 401 : 200;

    setResult({
      status,
      statusText: status === 200 ? 'OK' : status === 401 ? 'Unauthorized' : 'Error',
      duration,
      headers: {
        'content-type': 'application/json',
        'x-request-id': crypto.randomUUID(),
        'x-ratelimit-remaining': '99',
        'x-ratelimit-limit': '100',
      },
      body:
        status === 401
          ? { error: 'Unauthorized', message: 'Bearer token required' }
          : mockResponses[endpoint.method],
    });

    setIsLoading(false);
  };

  const handleCopy = () => {
    const curlCommand = `curl -X ${endpoint.method} '${buildUrl()}' \\
  -H 'Content-Type: application/json'${
    authToken ? ` \\
  -H 'Authorization: Bearer ${authToken}'` : ''
  }${
    ['POST', 'PUT', 'PATCH'].includes(endpoint.method)
      ? ` \\
  -d '${requestBody}'`
      : ''
  }`;

    navigator.clipboard.writeText(curlCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({ title: 'Copied to clipboard', description: 'cURL command copied' });
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Badge variant="outline" className={`font-mono ${methodColors[endpoint.method]}`}>
              {endpoint.method}
            </Badge>
            <code className="text-sm font-mono text-foreground">{endpoint.path}</code>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleCopy} className="gap-1.5">
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              cURL
            </Button>
            <Button onClick={handleTest} disabled={isLoading} size="sm" className="gap-1.5">
              {isLoading ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Play className="w-3.5 h-3.5" />
              )}
              Send
            </Button>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mt-2">{endpoint.description}</p>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* URL Preview */}
        <div className="p-3 bg-secondary/30 rounded-lg font-mono text-sm break-all">
          {buildUrl()}
        </div>

        {/* Request Configuration */}
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
          <TabsList className="bg-secondary/50">
            <TabsTrigger value="params">Parameters</TabsTrigger>
            <TabsTrigger value="headers">Headers</TabsTrigger>
            {['POST', 'PUT', 'PATCH'].includes(endpoint.method) && (
              <TabsTrigger value="body">Body</TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="params" className="space-y-4 mt-4">
            {/* Auth Token */}
            {endpoint.authenticated && (
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  Authorization
                  <Badge variant="secondary" className="text-xs">Required</Badge>
                </Label>
                <Input
                  value={authToken}
                  onChange={(e) => setAuthToken(e.target.value)}
                  placeholder="Bearer token..."
                  className="font-mono text-sm bg-secondary/50"
                />
              </div>
            )}

            {/* Path Parameters */}
            {pathParamsKeys.length > 0 && (
              <div className="space-y-3">
                <Label>Path Parameters</Label>
                {pathParamsKeys.map((key) => (
                  <div key={key} className="flex items-center gap-3">
                    <code className="text-sm text-muted-foreground w-24">{`{${key}}`}</code>
                    <Input
                      value={pathParams[key] || ''}
                      onChange={(e) => setPathParams({ ...pathParams, [key]: e.target.value })}
                      placeholder={key}
                      className="font-mono text-sm bg-secondary/50"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Query Parameters */}
            <div className="space-y-3">
              <Label>Query Parameters</Label>
              {queryParams.map((param, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    value={param.key}
                    onChange={(e) => {
                      const updated = [...queryParams];
                      updated[index].key = e.target.value;
                      setQueryParams(updated);
                    }}
                    placeholder="key"
                    className="font-mono text-sm bg-secondary/50"
                  />
                  <Input
                    value={param.value}
                    onChange={(e) => {
                      const updated = [...queryParams];
                      updated[index].value = e.target.value;
                      setQueryParams(updated);
                    }}
                    placeholder="value"
                    className="font-mono text-sm bg-secondary/50"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9"
                    onClick={() => {
                      if (queryParams.length > 1) {
                        setQueryParams(queryParams.filter((_, i) => i !== index));
                      }
                    }}
                  >
                    ×
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setQueryParams([...queryParams, { key: '', value: '' }])}
              >
                + Add Parameter
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="headers" className="space-y-3 mt-4">
            {headers.map((header, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  value={header.key}
                  onChange={(e) => {
                    const updated = [...headers];
                    updated[index].key = e.target.value;
                    setHeaders(updated);
                  }}
                  placeholder="Header name"
                  className="font-mono text-sm bg-secondary/50"
                />
                <Input
                  value={header.value}
                  onChange={(e) => {
                    const updated = [...headers];
                    updated[index].value = e.target.value;
                    setHeaders(updated);
                  }}
                  placeholder="Value"
                  className="font-mono text-sm bg-secondary/50"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9"
                  onClick={() => setHeaders(headers.filter((_, i) => i !== index))}
                >
                  ×
                </Button>
              </div>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setHeaders([...headers, { key: '', value: '' }])}
            >
              + Add Header
            </Button>
          </TabsContent>

          <TabsContent value="body" className="mt-4">
            <Textarea
              value={requestBody}
              onChange={(e) => setRequestBody(e.target.value)}
              className="font-mono text-sm bg-secondary/50 min-h-[200px]"
              placeholder='{\n  "key": "value"\n}'
            />
          </TabsContent>
        </Tabs>

        {/* Response */}
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Badge className={statusColors[result.status] || 'bg-muted'}>
                  {result.status} {result.statusText}
                </Badge>
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {result.duration}ms
                </span>
              </div>
              {result.status >= 200 && result.status < 300 ? (
                <CheckCircle2 className="w-5 h-5 text-green-500" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-500" />
              )}
            </div>

            <Collapsible open={showHeaders} onOpenChange={setShowHeaders}>
              <CollapsibleTrigger asChild>
                <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${showHeaders ? 'rotate-180' : ''}`}
                  />
                  Response Headers
                </button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="mt-2 p-3 bg-secondary/30 rounded-lg font-mono text-xs space-y-1">
                  {Object.entries(result.headers).map(([key, value]) => (
                    <p key={key}>
                      <span className="text-muted-foreground">{key}:</span>{' '}
                      <span className="text-foreground">{value}</span>
                    </p>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>

            <div>
              <p className="text-sm text-muted-foreground mb-2">Response Body</p>
              <pre className="p-4 bg-secondary/30 rounded-lg font-mono text-sm overflow-x-auto">
                {JSON.stringify(result.body, null, 2)}
              </pre>
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
};

export default ApiTester;
