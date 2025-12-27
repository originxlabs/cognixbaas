import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, CheckCircle, Loader2, Code, Database, Shield, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Step {
  id: number;
  agent: string;
  agentIcon: React.ElementType;
  title: string;
  description: string;
  code: string;
  language: string;
  duration: number;
}

const steps: Step[] = [
  {
    id: 1,
    agent: 'Requirement Analyzer',
    agentIcon: Code,
    title: 'Understanding Your Request',
    description: 'Parsing natural language and extracting backend requirements...',
    code: `// Input received:
"Build an e-commerce API with user auth, 
 product catalog, and order management"

// Extracted requirements:
{
  "entities": ["User", "Product", "Order", "Cart"],
  "auth": "JWT with refresh tokens",
  "endpoints": 12,
  "relationships": ["User -> Order", "Order -> Product"]
}`,
    language: 'json',
    duration: 3000,
  },
  {
    id: 2,
    agent: 'Architecture Designer',
    agentIcon: Database,
    title: 'Designing Clean Architecture',
    description: 'Creating enterprise-grade structure with DDD patterns...',
    code: `// Project Structure Generated:
src/
├── Application/
│   ├── Commands/
│   │   ├── CreateOrderCommand.cs
│   │   └── CreateProductCommand.cs
│   ├── Queries/
│   │   ├── GetProductsQuery.cs
│   │   └── GetOrdersQuery.cs
│   └── DTOs/
├── Domain/
│   ├── Entities/
│   │   ├── User.cs
│   │   ├── Product.cs
│   │   └── Order.cs
│   └── Repositories/
├── Infrastructure/
│   └── Persistence/
└── API/
    └── Controllers/`,
    language: 'text',
    duration: 3500,
  },
  {
    id: 3,
    agent: 'API Generator',
    agentIcon: Code,
    title: 'Generating API Endpoints',
    description: 'Creating production-ready controllers and services...',
    code: `[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly IMediator _mediator;

    public ProductsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    [ProducesResponseType(typeof(List<ProductDto>), 200)]
    public async Task<IActionResult> GetProducts(
        [FromQuery] GetProductsQuery query)
    {
        var result = await _mediator.Send(query);
        return Ok(result);
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> CreateProduct(
        [FromBody] CreateProductCommand command)
    {
        var result = await _mediator.Send(command);
        return CreatedAtAction(nameof(GetProduct), 
            new { id = result.Id }, result);
    }
}`,
    language: 'csharp',
    duration: 4000,
  },
  {
    id: 4,
    agent: 'Security Agent',
    agentIcon: Shield,
    title: 'Implementing Authentication',
    description: 'Adding JWT authentication and role-based access control...',
    code: `// JWT Configuration
services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = config["Jwt:Issuer"],
            ValidAudience = config["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(config["Jwt:Secret"]))
        };
    });

// Role-based Authorization
services.AddAuthorization(options =>
{
    options.AddPolicy("AdminOnly", policy =>
        policy.RequireRole("Admin"));
    options.AddPolicy("CanManageProducts", policy =>
        policy.RequireClaim("Permission", "ManageProducts"));
});`,
    language: 'csharp',
    duration: 3500,
  },
  {
    id: 5,
    agent: 'Deployment Agent',
    agentIcon: Rocket,
    title: 'Deploying to Cloud',
    description: 'Building container and deploying to Railway...',
    code: `# Building Docker image...
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80

# Publishing application...
RUN dotnet publish -c Release -o /app/publish

# Deployment complete!
✓ Container built successfully
✓ Health checks passed
✓ SSL certificate configured
✓ Database migrations applied

🚀 Your API is live at:
   https://ecommerce-api.railway.app

📚 Swagger documentation:
   https://ecommerce-api.railway.app/swagger`,
    language: 'dockerfile',
    duration: 3000,
  },
];

const InteractiveCodeDemo = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [displayedCode, setDisplayedCode] = useState('');

  useEffect(() => {
    if (!isPlaying) return;

    const step = steps[currentStep];
    let charIndex = 0;
    const codeChars = step.code.split('');
    
    setDisplayedCode('');
    setCompletedSteps(prev => prev.filter(s => s < currentStep));

    const typeInterval = setInterval(() => {
      if (charIndex < codeChars.length) {
        setDisplayedCode(step.code.substring(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(typeInterval);
        setCompletedSteps(prev => [...prev, currentStep]);
        
        // Move to next step after a delay
        setTimeout(() => {
          if (currentStep < steps.length - 1) {
            setCurrentStep(prev => prev + 1);
          } else {
            setIsPlaying(false);
          }
        }, 1000);
      }
    }, 15);

    return () => clearInterval(typeInterval);
  }, [currentStep, isPlaying]);

  const handlePlay = () => {
    if (currentStep >= steps.length - 1 && completedSteps.includes(steps.length - 1)) {
      handleReset();
    }
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStep(0);
    setCompletedSteps([]);
    setDisplayedCode('');
  };

  const handleStepClick = (index: number) => {
    setIsPlaying(false);
    setCurrentStep(index);
    setDisplayedCode(steps[index].code);
    setCompletedSteps(Array.from({ length: index + 1 }, (_, i) => i));
  };

  const currentStepData = steps[currentStep];

  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
            <span className="text-foreground">See Cognix</span>
            <br />
            <span className="gradient-text">In Action</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Watch how multiple AI agents collaborate to build your backend in real-time.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-6xl mx-auto"
        >
          <div className="glass rounded-2xl overflow-hidden">
            {/* Header with controls */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-secondary/30">
              <div className="flex items-center gap-4">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-destructive/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <div className="w-3 h-3 rounded-full bg-green-500/60" />
                </div>
                <span className="text-sm text-muted-foreground font-mono">
                  cognix-demo.sh
                </span>
              </div>
              <div className="flex items-center gap-2">
                {!isPlaying ? (
                  <Button variant="ghost" size="sm" onClick={handlePlay}>
                    <Play className="w-4 h-4 mr-2" />
                    {completedSteps.includes(steps.length - 1) ? 'Replay' : 'Play'}
                  </Button>
                ) : (
                  <Button variant="ghost" size="sm" onClick={handlePause}>
                    <Pause className="w-4 h-4 mr-2" />
                    Pause
                  </Button>
                )}
                <Button variant="ghost" size="sm" onClick={handleReset}>
                  <RotateCcw className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="grid lg:grid-cols-[280px_1fr]">
              {/* Steps sidebar */}
              <div className="border-r border-border bg-card/50 p-4">
                <div className="space-y-2">
                  {steps.map((step, index) => {
                    const isCompleted = completedSteps.includes(index);
                    const isCurrent = currentStep === index;
                    const Icon = step.agentIcon;

                    return (
                      <button
                        key={step.id}
                        onClick={() => handleStepClick(index)}
                        className={`w-full text-left p-3 rounded-lg transition-all ${
                          isCurrent
                            ? 'bg-primary/10 border border-primary/50'
                            : isCompleted
                            ? 'bg-secondary/50 border border-border'
                            : 'hover:bg-secondary/30 border border-transparent'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            isCompleted
                              ? 'bg-green-500/20'
                              : isCurrent
                              ? 'bg-primary/20'
                              : 'bg-muted'
                          }`}>
                            {isCompleted ? (
                              <CheckCircle className="w-4 h-4 text-green-400" />
                            ) : isCurrent && isPlaying ? (
                              <Loader2 className="w-4 h-4 text-primary animate-spin" />
                            ) : (
                              <Icon className={`w-4 h-4 ${isCurrent ? 'text-primary' : 'text-muted-foreground'}`} />
                            )}
                          </div>
                          <div>
                            <div className={`text-xs font-medium ${
                              isCurrent ? 'text-primary' : 'text-muted-foreground'
                            }`}>
                              {step.agent}
                            </div>
                            <div className={`text-sm ${
                              isCurrent ? 'text-foreground' : 'text-muted-foreground'
                            }`}>
                              {step.title}
                            </div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Code display */}
              <div className="p-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Current step info */}
                    <div className="mb-4 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                        <currentStepData.agentIcon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-bold text-foreground">{currentStepData.title}</h3>
                        <p className="text-sm text-muted-foreground">{currentStepData.description}</p>
                      </div>
                    </div>

                    {/* Code block */}
                    <div className="bg-card rounded-lg border border-border overflow-hidden">
                      <div className="px-4 py-2 border-b border-border bg-muted/30 flex items-center justify-between">
                        <span className="text-xs text-muted-foreground font-mono">{currentStepData.language}</span>
                        <span className="text-xs text-muted-foreground">Step {currentStep + 1} of {steps.length}</span>
                      </div>
                      <pre className="p-4 overflow-x-auto min-h-[400px] max-h-[500px]">
                        <code className="text-sm font-mono text-foreground whitespace-pre-wrap">
                          {displayedCode || currentStepData.code}
                          {isPlaying && displayedCode.length < currentStepData.code.length && (
                            <span className="inline-block w-2 h-5 bg-primary animate-pulse ml-0.5" />
                          )}
                        </code>
                      </pre>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Progress bar */}
            <div className="px-6 py-4 border-t border-border bg-secondary/20">
              <div className="flex items-center gap-2">
                {steps.map((_, index) => (
                  <div
                    key={index}
                    className={`h-1.5 flex-1 rounded-full transition-all ${
                      completedSteps.includes(index)
                        ? 'bg-primary'
                        : currentStep === index && isPlaying
                        ? 'bg-primary/50'
                        : 'bg-muted'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default InteractiveCodeDemo;
