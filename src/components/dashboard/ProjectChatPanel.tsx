import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageSquare,
  Send,
  X,
  Maximize2,
  Minimize2,
  Loader2,
  Bot,
  User,
  Sparkles,
  RefreshCw,
  History,
  Lightbulb,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { COGNIX_AGENTS } from '@/config/agents';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  agentId?: string;
}

interface ProjectChatPanelProps {
  projectId: string;
  projectName: string;
  currentPrompt?: string;
  onPromptUpdate?: (newPrompt: string) => void;
  className?: string;
}

const suggestionPrompts = [
  "Add pagination to all list endpoints",
  "Include soft delete for all entities",
  "Add audit logging for all mutations",
  "Implement caching with Redis",
  "Add rate limiting per user",
  "Include webhook support for events",
];

export const ProjectChatPanel = ({
  projectId,
  projectName,
  currentPrompt,
  onPromptUpdate,
  className,
}: ProjectChatPanelProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [activeTab, setActiveTab] = useState<'chat' | 'history' | 'suggestions'>('chat');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isProcessing) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsProcessing(true);

    // Simulate agent processing
    const requirementAnalyzer = COGNIX_AGENTS.find((a) => a.id === 'requirement-analyzer');

    setTimeout(() => {
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `I've analyzed your request: "${userMessage.content}"\n\nThis will require updates to:\n• API endpoints structure\n• Database schema modifications\n• Updated module dependencies\n\nWould you like me to regenerate the affected modules, or should I create a new task in your Kanban board?`,
        timestamp: new Date(),
        agentId: 'requirement-analyzer',
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsProcessing(false);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
    setActiveTab('chat');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center"
          >
            <MessageSquare className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`fixed z-50 ${
              isExpanded
                ? 'inset-4 md:inset-8'
                : 'bottom-6 right-6 w-[400px] h-[600px]'
            } flex flex-col bg-card border border-border rounded-xl shadow-2xl overflow-hidden ${className}`}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-card">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-sm">Project Assistant</h3>
                  <p className="text-xs text-muted-foreground">{projectName}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  {isExpanded ? (
                    <Minimize2 className="w-4 h-4" />
                  ) : (
                    <Maximize2 className="w-4 h-4" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="flex-1 flex flex-col">
              <TabsList className="mx-4 mt-3 bg-secondary/50">
                <TabsTrigger value="chat" className="flex-1 gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5" />
                  Chat
                </TabsTrigger>
                <TabsTrigger value="suggestions" className="flex-1 gap-1.5">
                  <Lightbulb className="w-3.5 h-3.5" />
                  Ideas
                </TabsTrigger>
                <TabsTrigger value="history" className="flex-1 gap-1.5">
                  <History className="w-3.5 h-3.5" />
                  History
                </TabsTrigger>
              </TabsList>

              <TabsContent value="chat" className="flex-1 flex flex-col p-0 m-0">
                {/* Messages */}
                <ScrollArea className="flex-1 px-4 py-3">
                  {messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center py-8">
                      <div className="w-12 h-12 rounded-full bg-secondary/50 flex items-center justify-center mb-4">
                        <Bot className="w-6 h-6 text-muted-foreground" />
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        Ask me to modify your backend
                      </p>
                      <p className="text-xs text-muted-foreground">
                        I can update requirements, add features, or regenerate modules
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {messages.map((message) => {
                        const agent = message.agentId
                          ? COGNIX_AGENTS.find((a) => a.id === message.agentId)
                          : null;

                        return (
                          <div
                            key={message.id}
                            className={`flex gap-3 ${
                              message.role === 'user' ? 'justify-end' : 'justify-start'
                            }`}
                          >
                            {message.role === 'assistant' && (
                              <div
                                className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                                  agent?.bgColor || 'bg-primary/10'
                                }`}
                              >
                                {agent?.icon ? (
                                  <agent.icon className={`w-4 h-4 ${agent.color}`} />
                                ) : (
                                  <Bot className="w-4 h-4 text-primary" />
                                )}
                              </div>
                            )}
                            <div
                              className={`max-w-[80%] rounded-lg px-3 py-2 ${
                                message.role === 'user'
                                  ? 'bg-primary text-primary-foreground'
                                  : 'bg-secondary/50 text-foreground'
                              }`}
                            >
                              {agent && (
                                <p className={`text-xs ${agent.color} mb-1`}>
                                  {agent.shortName}
                                </p>
                              )}
                              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                              <p className="text-xs opacity-60 mt-1">
                                {message.timestamp.toLocaleTimeString([], {
                                  hour: '2-digit',
                                  minute: '2-digit',
                                })}
                              </p>
                            </div>
                            {message.role === 'user' && (
                              <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                                <User className="w-4 h-4 text-muted-foreground" />
                              </div>
                            )}
                          </div>
                        );
                      })}
                      {isProcessing && (
                        <div className="flex gap-3">
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Loader2 className="w-4 h-4 text-primary animate-spin" />
                          </div>
                          <div className="bg-secondary/50 rounded-lg px-3 py-2">
                            <p className="text-sm text-muted-foreground">Analyzing...</p>
                          </div>
                        </div>
                      )}
                      <div ref={messagesEndRef} />
                    </div>
                  )}
                </ScrollArea>

                {/* Input */}
                <div className="p-4 border-t border-border">
                  <div className="flex gap-2">
                    <Textarea
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Describe changes to your backend..."
                      className="min-h-[44px] max-h-[120px] resize-none bg-secondary/50"
                      rows={1}
                    />
                    <Button
                      onClick={handleSend}
                      disabled={!input.trim() || isProcessing}
                      size="icon"
                      className="h-11 w-11 flex-shrink-0"
                    >
                      {isProcessing ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Send className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="suggestions" className="flex-1 p-4">
                <ScrollArea className="h-full">
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">
                      Common Enhancements
                    </p>
                    {suggestionPrompts.map((suggestion, i) => (
                      <button
                        key={i}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="w-full text-left p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 border border-border hover:border-primary/30 transition-colors"
                      >
                        <p className="text-sm text-foreground">{suggestion}</p>
                      </button>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="history" className="flex-1 p-4">
                <ScrollArea className="h-full">
                  <div className="space-y-3">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">
                      Prompt History
                    </p>
                    {currentPrompt && (
                      <Card className="bg-secondary/30 border-border">
                        <CardContent className="p-3">
                          <div className="flex items-center justify-between mb-2">
                            <Badge variant="outline" className="text-xs">
                              Current
                            </Badge>
                            <Button variant="ghost" size="sm" className="h-7 text-xs gap-1">
                              <RefreshCw className="w-3 h-3" />
                              Regenerate
                            </Button>
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-3">
                            {currentPrompt}
                          </p>
                        </CardContent>
                      </Card>
                    )}
                    {!currentPrompt && (
                      <div className="text-center py-8 text-muted-foreground text-sm">
                        No prompt history yet
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProjectChatPanel;
