import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, FileJson, Play, Database, MonitorPlay, Sparkles } from 'lucide-react';
import PromptInput from './PromptInput';
import CodePreview from './CodePreview';
import ApiDocsPreview from './ApiDocsPreview';
import ApiTester from './ApiTester';
import DatabasePreview from './DatabasePreview';
import LiveDataPreview from './LiveDataPreview';
import GenerationProgress from './GenerationProgress';

type TabId = 'code' | 'api' | 'test' | 'database' | 'preview';

interface Tab {
  id: TabId;
  label: string;
  icon: React.ElementType;
}

const tabs: Tab[] = [
  { id: 'code', label: 'Code', icon: Code2 },
  { id: 'api', label: 'API Docs', icon: FileJson },
  { id: 'test', label: 'Test API', icon: Play },
  { id: 'database', label: 'Database', icon: Database },
  { id: 'preview', label: 'Live Preview', icon: MonitorPlay },
];

const LivePreviewDashboard = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState(0);
  const [activeTab, setActiveTab] = useState<TabId>('code');
  const [hasStarted, setHasStarted] = useState(false);

  const handleSubmit = useCallback((prompt: string) => {
    console.log('Generating backend for:', prompt);
    setIsGenerating(true);
    setHasStarted(true);
    setGenerationStep(1);
  }, []);

  // Simulate generation progress
  useEffect(() => {
    if (isGenerating && generationStep > 0 && generationStep < 7) {
      const timer = setTimeout(() => {
        setGenerationStep((prev) => prev + 1);
        
        // Switch tabs based on progress
        if (generationStep === 2) setActiveTab('database');
        if (generationStep === 3) setActiveTab('api');
        if (generationStep === 4) setActiveTab('test');
        if (generationStep === 5) setActiveTab('preview');
      }, 1500);
      return () => clearTimeout(timer);
    } else if (generationStep >= 7) {
      setIsGenerating(false);
    }
  }, [isGenerating, generationStep]);

  // Auto-start demo after 3 seconds
  useEffect(() => {
    if (!hasStarted) {
      const timer = setTimeout(() => {
        handleSubmit('Build an e-commerce API with products, orders, cart, and user authentication');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [hasStarted, handleSubmit]);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'code':
        return <CodePreview isGenerating={isGenerating} generationStep={generationStep} />;
      case 'api':
        return <ApiDocsPreview isGenerating={isGenerating} generationStep={generationStep} />;
      case 'test':
        return <ApiTester isGenerating={isGenerating} generationStep={generationStep} />;
      case 'database':
        return <DatabasePreview isGenerating={isGenerating} generationStep={generationStep} />;
      case 'preview':
        return <LiveDataPreview isGenerating={isGenerating} generationStep={generationStep} />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="glass rounded-2xl overflow-hidden glow-subtle"
    >
      <div className="flex flex-col lg:flex-row h-[600px]">
        {/* Left Panel - Prompt & Progress */}
        <div className="w-full lg:w-80 border-b lg:border-b-0 lg:border-r border-border flex flex-col">
          {/* Header */}
          <div className="flex items-center gap-2 px-4 py-3 bg-secondary/30 border-b border-border">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-foreground">Cognix Generator</span>
          </div>

          {/* Prompt Input */}
          <div className="p-4 border-b border-border">
            <PromptInput onSubmit={handleSubmit} isGenerating={isGenerating} />
          </div>

          {/* Generation Progress */}
          <div className="flex-1 overflow-auto p-4">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Generation Progress
            </h3>
            <GenerationProgress currentStep={generationStep} isGenerating={isGenerating} />
          </div>
        </div>

        {/* Right Panel - Preview Tabs */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Tab Navigation */}
          <div className="flex items-center gap-1 px-2 py-2 bg-secondary/30 border-b border-border overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              const isAvailable = 
                tab.id === 'code' ? generationStep >= 1 :
                tab.id === 'database' ? generationStep >= 2 :
                tab.id === 'api' ? generationStep >= 3 :
                tab.id === 'test' ? generationStep >= 5 :
                generationStep >= 6;

              return (
                <button
                  key={tab.id}
                  onClick={() => isAvailable && setActiveTab(tab.id)}
                  disabled={!isAvailable}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap ${
                    isActive
                      ? 'bg-primary/20 text-primary'
                      : isAvailable
                      ? 'text-muted-foreground hover:bg-secondary/50 hover:text-foreground'
                      : 'text-muted-foreground/40 cursor-not-allowed'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {tab.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-primary/10 rounded-md -z-10"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-hidden bg-card">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="h-full"
              >
                {renderTabContent()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LivePreviewDashboard;
