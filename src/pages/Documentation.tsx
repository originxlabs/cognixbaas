import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, Book, Code, Rocket, Copy, Check, Terminal, Database, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CognixLogo from "@/components/CognixLogo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ScrollReveal } from "@/components/ScrollReveal";
import { cn } from "@/lib/utils";

const CodeBlock = ({ code, language = "typescript" }: { code: string; language?: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group rounded-lg overflow-hidden border border-border bg-card">
      <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-muted/30">
        <span className="text-xs text-muted-foreground font-mono">{language}</span>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={handleCopy}
        >
          {copied ? <Check className="h-3.5 w-3.5 text-primary" /> : <Copy className="h-3.5 w-3.5" />}
        </Button>
      </div>
      <pre className="p-4 overflow-x-auto">
        <code className="text-sm font-mono text-foreground">{code}</code>
      </pre>
    </div>
  );
};

const SidebarLink = ({ 
  icon: Icon, 
  children, 
  active = false,
  onClick 
}: { 
  icon: React.ElementType; 
  children: React.ReactNode; 
  active?: boolean;
  onClick?: () => void;
}) => (
  <button
    onClick={onClick}
    className={cn(
      "flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm transition-colors text-left",
      active 
        ? "bg-primary/10 text-primary font-medium" 
        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
    )}
  >
    <Icon className="h-4 w-4" />
    {children}
  </button>
);

const Documentation = () => {
  const [activeSection, setActiveSection] = useState("getting-started");

  return (
    <>
      <Helmet>
        <title>Documentation - Cognix | API Reference & Guides</title>
        <meta
          name="description"
          content="Comprehensive documentation for Cognix. Learn how to build, deploy, and scale backends with our AI-powered platform."
        />
      </Helmet>

      <div className="min-h-screen bg-background text-foreground">
        {/* Header */}
        <header className="sticky top-0 z-50 glass border-b border-border/50">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft className="h-4 w-4" />
                <span className="text-sm">Back</span>
              </Link>
              <CognixLogo size="sm" showText={false} />
              <span className="text-lg font-semibold">Documentation</span>
            </div>
            <ThemeToggle />
          </div>
        </header>

        <div className="container mx-auto px-4 py-8 flex gap-8">
          {/* Sidebar */}
          <aside className="hidden lg:block w-64 shrink-0">
            <nav className="sticky top-24 space-y-1">
              <SidebarLink 
                icon={Rocket} 
                active={activeSection === "getting-started"}
                onClick={() => setActiveSection("getting-started")}
              >
                Getting Started
              </SidebarLink>
              <SidebarLink 
                icon={Terminal} 
                active={activeSection === "api-reference"}
                onClick={() => setActiveSection("api-reference")}
              >
                API Reference
              </SidebarLink>
              <SidebarLink 
                icon={Code} 
                active={activeSection === "code-examples"}
                onClick={() => setActiveSection("code-examples")}
              >
                Code Examples
              </SidebarLink>
              <SidebarLink 
                icon={Database} 
                active={activeSection === "database"}
                onClick={() => setActiveSection("database")}
              >
                Database
              </SidebarLink>
              <SidebarLink 
                icon={Shield} 
                active={activeSection === "authentication"}
                onClick={() => setActiveSection("authentication")}
              >
                Authentication
              </SidebarLink>
              <SidebarLink 
                icon={Zap} 
                active={activeSection === "deployment"}
                onClick={() => setActiveSection("deployment")}
              >
                Deployment
              </SidebarLink>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 max-w-4xl">
            <Tabs value={activeSection} onValueChange={setActiveSection} className="lg:hidden mb-8">
              <TabsList className="w-full glass">
                <TabsTrigger value="getting-started" className="flex-1">
                  <Rocket className="h-4 w-4 mr-2" />
                  Start
                </TabsTrigger>
                <TabsTrigger value="api-reference" className="flex-1">
                  <Terminal className="h-4 w-4 mr-2" />
                  API
                </TabsTrigger>
                <TabsTrigger value="code-examples" className="flex-1">
                  <Code className="h-4 w-4 mr-2" />
                  Examples
                </TabsTrigger>
              </TabsList>
            </Tabs>

            {activeSection === "getting-started" && (
              <ScrollReveal>
                <div className="space-y-8">
                  <div>
                    <h1 className="text-3xl font-bold mb-4">Getting Started with Cognix</h1>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      Learn how to build production-ready backends in minutes using Cognix's AI-powered platform.
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="glass rounded-xl p-6">
                      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <span className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary text-sm font-bold">1</span>
                        Describe Your Backend
                      </h2>
                      <p className="text-muted-foreground mb-4">
                        Start by describing your backend requirements in plain English. Cognix understands natural language and converts it into structured backend tasks.
                      </p>
                      <CodeBlock
                        language="prompt"
                        code={`Create a REST API for an e-commerce platform with:
- User authentication (JWT)
- Product catalog with categories
- Shopping cart functionality
- Order management with payment integration
- Admin dashboard endpoints`}
                      />
                    </div>

                    <div className="glass rounded-xl p-6">
                      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <span className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary text-sm font-bold">2</span>
                        Review Architecture
                      </h2>
                      <p className="text-muted-foreground mb-4">
                        Cognix's Architecture Designer Agent creates an enterprise-grade structure following Clean Architecture and DDD principles.
                      </p>
                      <CodeBlock
                        language="structure"
                        code={`src/
├── Application/
│   ├── Commands/
│   ├── Queries/
│   └── DTOs/
├── Domain/
│   ├── Entities/
│   ├── ValueObjects/
│   └── Repositories/
├── Infrastructure/
│   ├── Persistence/
│   └── ExternalServices/
└── API/
    ├── Controllers/
    └── Middleware/`}
                      />
                    </div>

                    <div className="glass rounded-xl p-6">
                      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <span className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary text-sm font-bold">3</span>
                        Deploy & Test
                      </h2>
                      <p className="text-muted-foreground mb-4">
                        Get a live API URL instantly. Test using Swagger, Postman, or integrate with your frontend.
                      </p>
                      <CodeBlock
                        language="bash"
                        code={`# Your deployed API endpoint
https://api.cognix.dev/your-project-id

# Test with curl
curl -X GET https://api.cognix.dev/your-project-id/products \\
  -H "Authorization: Bearer YOUR_TOKEN"`}
                      />
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            )}

            {activeSection === "api-reference" && (
              <ScrollReveal>
                <div className="space-y-8">
                  <div>
                    <h1 className="text-3xl font-bold mb-4">API Reference</h1>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      Complete API documentation for Cognix-generated backends.
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="glass rounded-xl p-6">
                      <h2 className="text-xl font-semibold mb-4">Authentication Endpoints</h2>
                      
                      <div className="space-y-4">
                        <div className="border border-border rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="px-2 py-0.5 bg-primary/20 text-primary text-xs font-mono rounded">POST</span>
                            <code className="text-sm font-mono">/api/auth/register</code>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">Register a new user account</p>
                          <CodeBlock
                            language="json"
                            code={`{
  "email": "user@example.com",
  "password": "securePassword123",
  "name": "John Doe"
}`}
                          />
                        </div>

                        <div className="border border-border rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="px-2 py-0.5 bg-primary/20 text-primary text-xs font-mono rounded">POST</span>
                            <code className="text-sm font-mono">/api/auth/login</code>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">Authenticate and receive JWT token</p>
                          <CodeBlock
                            language="json"
                            code={`{
  "email": "user@example.com",
  "password": "securePassword123"
}

// Response
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "refreshToken": "dGhpcyBpcyBhIHJl...",
  "expiresIn": 3600
}`}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="glass rounded-xl p-6">
                      <h2 className="text-xl font-semibold mb-4">Resource Endpoints</h2>
                      
                      <div className="space-y-4">
                        <div className="border border-border rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="px-2 py-0.5 bg-accent/20 text-accent text-xs font-mono rounded">GET</span>
                            <code className="text-sm font-mono">/api/resources</code>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">List all resources with pagination</p>
                          <CodeBlock
                            language="bash"
                            code={`curl -X GET "https://api.example.com/resources?page=1&limit=10" \\
  -H "Authorization: Bearer YOUR_TOKEN"`}
                          />
                        </div>

                        <div className="border border-border rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="px-2 py-0.5 bg-primary/20 text-primary text-xs font-mono rounded">POST</span>
                            <code className="text-sm font-mono">/api/resources</code>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">Create a new resource</p>
                          <CodeBlock
                            language="json"
                            code={`{
  "name": "New Resource",
  "description": "Resource description",
  "metadata": {
    "key": "value"
  }
}`}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            )}

            {activeSection === "code-examples" && (
              <ScrollReveal>
                <div className="space-y-8">
                  <div>
                    <h1 className="text-3xl font-bold mb-4">Code Examples</h1>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      Real-world examples of Cognix-generated backends in different languages.
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="glass rounded-xl p-6">
                      <h2 className="text-xl font-semibold mb-4">.NET Controller Example</h2>
                      <CodeBlock
                        language="csharp"
                        code={`[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly IMediator _mediator;

    public ProductsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    [ProducesResponseType(typeof(PagedResult<ProductDto>), 200)]
    public async Task<IActionResult> GetProducts(
        [FromQuery] GetProductsQuery query)
    {
        var result = await _mediator.Send(query);
        return Ok(result);
    }

    [HttpPost]
    [Authorize(Roles = "Admin")]
    [ProducesResponseType(typeof(ProductDto), 201)]
    public async Task<IActionResult> CreateProduct(
        [FromBody] CreateProductCommand command)
    {
        var result = await _mediator.Send(command);
        return CreatedAtAction(
            nameof(GetProduct), 
            new { id = result.Id }, 
            result);
    }
}`}
                      />
                    </div>

                    <div className="glass rounded-xl p-6">
                      <h2 className="text-xl font-semibold mb-4">Go Service Example</h2>
                      <CodeBlock
                        language="go"
                        code={`package service

type ProductService struct {
    repo   ProductRepository
    cache  CacheService
    logger *zap.Logger
}

func NewProductService(
    repo ProductRepository, 
    cache CacheService,
    logger *zap.Logger,
) *ProductService {
    return &ProductService{
        repo:   repo,
        cache:  cache,
        logger: logger,
    }
}

func (s *ProductService) GetProducts(
    ctx context.Context, 
    filter ProductFilter,
) ([]Product, error) {
    cacheKey := fmt.Sprintf("products:%v", filter)
    
    if cached, err := s.cache.Get(ctx, cacheKey); err == nil {
        return cached.([]Product), nil
    }
    
    products, err := s.repo.FindAll(ctx, filter)
    if err != nil {
        s.logger.Error("failed to fetch products", 
            zap.Error(err))
        return nil, err
    }
    
    s.cache.Set(ctx, cacheKey, products, time.Hour)
    return products, nil
}`}
                      />
                    </div>

                    <div className="glass rounded-xl p-6">
                      <h2 className="text-xl font-semibold mb-4">Python FastAPI Example</h2>
                      <CodeBlock
                        language="python"
                        code={`from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

router = APIRouter(prefix="/products", tags=["products"])

@router.get("/", response_model=List[ProductResponse])
async def get_products(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Retrieve products with pagination.
    """
    products = crud.get_products(db, skip=skip, limit=limit)
    return products

@router.post("/", response_model=ProductResponse, status_code=201)
async def create_product(
    product: ProductCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin)
):
    """
    Create a new product. Admin only.
    """
    return crud.create_product(db=db, product=product)`}
                      />
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            )}

            {activeSection === "database" && (
              <ScrollReveal>
                <div className="space-y-8">
                  <div>
                    <h1 className="text-3xl font-bold mb-4">Database Integration</h1>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      Configure and manage your database connections with Cognix.
                    </p>
                  </div>

                  <div className="glass rounded-xl p-6">
                    <h2 className="text-xl font-semibold mb-4">PostgreSQL Configuration</h2>
                    <CodeBlock
                      language="yaml"
                      code={`database:
  provider: postgresql
  host: \${DATABASE_HOST}
  port: 5432
  name: cognix_db
  ssl: true
  pool:
    min: 2
    max: 10
    idle_timeout: 30000
  
migrations:
  auto_run: true
  directory: ./migrations`}
                    />
                  </div>

                  <div className="glass rounded-xl p-6">
                    <h2 className="text-xl font-semibold mb-4">Entity Example</h2>
                    <CodeBlock
                      language="csharp"
                      code={`public class Product : BaseEntity
{
    public string Name { get; private set; }
    public string Description { get; private set; }
    public Money Price { get; private set; }
    public Guid CategoryId { get; private set; }
    public Category Category { get; private set; }
    
    private readonly List<ProductVariant> _variants = new();
    public IReadOnlyCollection<ProductVariant> Variants => _variants;
    
    public static Product Create(
        string name, 
        string description, 
        Money price, 
        Guid categoryId)
    {
        Guard.Against.NullOrEmpty(name, nameof(name));
        Guard.Against.Negative(price.Amount, nameof(price));
        
        return new Product
        {
            Id = Guid.NewGuid(),
            Name = name,
            Description = description,
            Price = price,
            CategoryId = categoryId,
            CreatedAt = DateTime.UtcNow
        };
    }
}`}
                    />
                  </div>
                </div>
              </ScrollReveal>
            )}

            {activeSection === "authentication" && (
              <ScrollReveal>
                <div className="space-y-8">
                  <div>
                    <h1 className="text-3xl font-bold mb-4">Authentication & Security</h1>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      Enterprise-grade authentication with JWT, OAuth, and role-based access control.
                    </p>
                  </div>

                  <div className="glass rounded-xl p-6">
                    <h2 className="text-xl font-semibold mb-4">JWT Configuration</h2>
                    <CodeBlock
                      language="json"
                      code={`{
  "jwt": {
    "secret": "\${JWT_SECRET}",
    "issuer": "cognix-api",
    "audience": "cognix-client",
    "accessTokenExpiry": "15m",
    "refreshTokenExpiry": "7d"
  },
  "security": {
    "passwordMinLength": 8,
    "requireUppercase": true,
    "requireNumber": true,
    "maxLoginAttempts": 5,
    "lockoutDuration": "15m"
  }
}`}
                    />
                  </div>

                  <div className="glass rounded-xl p-6">
                    <h2 className="text-xl font-semibold mb-4">Role-Based Access Control</h2>
                    <CodeBlock
                      language="csharp"
                      code={`[Authorize(Policy = "AdminOnly")]
[HttpDelete("{id}")]
public async Task<IActionResult> DeleteProduct(Guid id)
{
    await _mediator.Send(new DeleteProductCommand(id));
    return NoContent();
}

// Policy configuration
services.AddAuthorization(options =>
{
    options.AddPolicy("AdminOnly", policy =>
        policy.RequireRole("Admin"));
    
    options.AddPolicy("CanManageProducts", policy =>
        policy.RequireAssertion(context =>
            context.User.IsInRole("Admin") ||
            context.User.HasClaim("Permission", "ManageProducts")));
});`}
                    />
                  </div>
                </div>
              </ScrollReveal>
            )}

            {activeSection === "deployment" && (
              <ScrollReveal>
                <div className="space-y-8">
                  <div>
                    <h1 className="text-3xl font-bold mb-4">Deployment</h1>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      Deploy your backend to production with one click.
                    </p>
                  </div>

                  <div className="glass rounded-xl p-6">
                    <h2 className="text-xl font-semibold mb-4">Railway Deployment</h2>
                    <CodeBlock
                      language="yaml"
                      code={`# railway.toml
[build]
  builder = "dockerfile"
  dockerfilePath = "Dockerfile"

[deploy]
  healthcheckPath = "/health"
  healthcheckTimeout = 300
  restartPolicyType = "on_failure"
  restartPolicyMaxRetries = 3

[env]
  ASPNETCORE_ENVIRONMENT = "Production"
  DATABASE_URL = "\${DATABASE_URL}"
  REDIS_URL = "\${REDIS_URL}"`}
                    />
                  </div>

                  <div className="glass rounded-xl p-6">
                    <h2 className="text-xl font-semibold mb-4">Docker Configuration</h2>
                    <CodeBlock
                      language="dockerfile"
                      code={`FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["API/API.csproj", "API/"]
RUN dotnet restore "API/API.csproj"
COPY . .
RUN dotnet build "API/API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "API/API.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "API.dll"]`}
                    />
                  </div>
                </div>
              </ScrollReveal>
            )}
          </main>
        </div>
      </div>
    </>
  );
};

export default Documentation;
