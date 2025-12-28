import { motion } from 'framer-motion';
import { Check, Loader2, Brain, Code2, Database, Shield, Rocket, FileJson } from 'lucide-react';

interface GenerationProgressProps {
  currentStep: number;
  isGenerating: boolean;
}

const steps = [
  { id: 1, label: 'Analyzing Requirements', icon: Brain, description: 'Understanding your backend needs' },
  { id: 2, label: 'Designing Architecture', icon: Code2, description: 'Clean Architecture + DDD patterns' },
  { id: 3, label: 'Generating Database', icon: Database, description: 'Creating schemas & migrations' },
  { id: 4, label: 'Building API Endpoints', icon: FileJson, description: 'RESTful APIs with OpenAPI docs' },
  { id: 5, label: 'Configuring Security', icon: Shield, description: 'JWT authentication & RBAC' },
  { id: 6, label: 'Deploying Backend', icon: Rocket, description: 'Live on cloud infrastructure' },
];

const GenerationProgress = ({ currentStep, isGenerating }: GenerationProgressProps) => {
  return (
    <div className="space-y-2">
      {steps.map((step, idx) => {
        const isCompleted = currentStep > step.id;
        const isActive = currentStep === step.id && isGenerating;
        const isPending = currentStep < step.id;
        const Icon = step.icon;

        return (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${
              isActive ? 'bg-primary/10' : isCompleted ? 'bg-secondary/30' : ''
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                isCompleted
                  ? 'bg-emerald-500/20 text-emerald-400'
                  : isActive
                  ? 'bg-primary/20 text-primary'
                  : 'bg-secondary text-muted-foreground'
              }`}
            >
              {isCompleted ? (
                <Check className="w-4 h-4" />
              ) : isActive ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Icon className="w-4 h-4" />
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <p
                className={`text-sm font-medium ${
                  isCompleted || isActive ? 'text-foreground' : 'text-muted-foreground'
                }`}
              >
                {step.label}
              </p>
              <p className="text-xs text-muted-foreground truncate">{step.description}</p>
            </div>

            {isCompleted && (
              <span className="text-[10px] text-emerald-400 font-medium">Done</span>
            )}
            {isActive && (
              <span className="text-[10px] text-primary font-medium animate-pulse">Processing...</span>
            )}
          </motion.div>
        );
      })}
    </div>
  );
};

export default GenerationProgress;
