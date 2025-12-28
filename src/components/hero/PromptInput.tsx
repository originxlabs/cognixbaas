import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Sparkles, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PromptInputProps {
  onSubmit: (prompt: string) => void;
  isGenerating: boolean;
}

const examplePrompts = [
  "Build an e-commerce API with products, orders, cart, and user authentication",
  "Create a task management backend with teams, projects, and real-time updates",
  "Generate a social media API with posts, comments, likes, and followers",
  "Build a booking system API with availability, reservations, and payments",
];

const PromptInput = ({ onSubmit, isGenerating }: PromptInputProps) => {
  const [prompt, setPrompt] = useState('');
  const [typingIndex, setTypingIndex] = useState(0);
  const [currentExampleIndex, setCurrentExampleIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (!isTyping) return;
    
    const currentExample = examplePrompts[currentExampleIndex];
    
    if (typingIndex < currentExample.length) {
      const timeout = setTimeout(() => {
        setPrompt(currentExample.slice(0, typingIndex + 1));
        setTypingIndex(typingIndex + 1);
      }, 40);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setTypingIndex(0);
        setCurrentExampleIndex((prev) => (prev + 1) % examplePrompts.length);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [typingIndex, currentExampleIndex, isTyping]);

  const handleFocus = () => {
    setIsTyping(false);
    setPrompt('');
  };

  const handleSubmit = () => {
    if (prompt.trim() && !isGenerating) {
      onSubmit(prompt);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative"
    >
      <div className="glass rounded-xl p-1 glow-subtle">
        <div className="bg-card rounded-lg overflow-hidden">
          {/* Header */}
          <div className="flex items-center gap-2 px-4 py-2 bg-secondary/30 border-b border-border">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-xs font-medium text-muted-foreground">
              Describe your backend in plain English
            </span>
          </div>
          
          {/* Input Area */}
          <div className="p-4">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onFocus={handleFocus}
              placeholder="e.g., Build an API for..."
              className="w-full h-24 bg-transparent text-foreground text-sm resize-none focus:outline-none placeholder:text-muted-foreground/50"
            />
            
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/50">
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">
                  {isTyping ? 'Auto-typing example...' : 'Ready to generate'}
                </span>
              </div>
              
              <Button
                onClick={handleSubmit}
                disabled={!prompt.trim() || isGenerating}
                size="sm"
                variant="hero"
                className="gap-2"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Generate Backend
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PromptInput;
