import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileCode, Folder, FolderOpen, ChevronRight, ChevronDown } from 'lucide-react';

interface FileNode {
  name: string;
  type: 'file' | 'folder';
  children?: FileNode[];
  content?: string;
  language?: string;
}

interface CodePreviewProps {
  isGenerating: boolean;
  generationStep: number;
}

const projectStructure: FileNode[] = [
  {
    name: 'src',
    type: 'folder',
    children: [
      {
        name: 'controllers',
        type: 'folder',
        children: [
          { name: 'ProductController.cs', type: 'file', language: 'csharp', content: `[ApiController]
[Route("api/[controller]")]
public class ProductController : ControllerBase
{
    private readonly IProductService _productService;
    
    public ProductController(IProductService productService)
    {
        _productService = productService;
    }
    
    [HttpGet]
    public async Task<ActionResult<IEnumerable<ProductDto>>> 
        GetProducts([FromQuery] ProductFilter filter)
    {
        var products = await _productService
            .GetProductsAsync(filter);
        return Ok(products);
    }
    
    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<ProductDto>> 
        CreateProduct([FromBody] CreateProductDto dto)
    {
        var product = await _productService
            .CreateProductAsync(dto);
        return CreatedAtAction(
            nameof(GetProduct), 
            new { id = product.Id }, 
            product
        );
    }
}` },
          { name: 'OrderController.cs', type: 'file', language: 'csharp', content: `[ApiController]
[Route("api/[controller]")]
[Authorize]
public class OrderController : ControllerBase
{
    private readonly IOrderService _orderService;
    
    [HttpPost]
    public async Task<ActionResult<OrderDto>> 
        CreateOrder([FromBody] CreateOrderDto dto)
    {
        var userId = User.GetUserId();
        var order = await _orderService
            .CreateOrderAsync(userId, dto);
        return Created(order);
    }
    
    [HttpGet("{id}")]
    public async Task<ActionResult<OrderDto>> 
        GetOrder(Guid id)
    {
        var order = await _orderService
            .GetOrderAsync(id);
        return Ok(order);
    }
}` },
          { name: 'AuthController.cs', type: 'file', language: 'csharp', content: `[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;
    
    [HttpPost("register")]
    public async Task<ActionResult<AuthResponse>> 
        Register([FromBody] RegisterDto dto)
    {
        var result = await _authService
            .RegisterAsync(dto);
        return Ok(result);
    }
    
    [HttpPost("login")]
    public async Task<ActionResult<AuthResponse>> 
        Login([FromBody] LoginDto dto)
    {
        var result = await _authService
            .LoginAsync(dto);
        return Ok(result);
    }
}` },
        ],
      },
      {
        name: 'services',
        type: 'folder',
        children: [
          { name: 'ProductService.cs', type: 'file', language: 'csharp' },
          { name: 'OrderService.cs', type: 'file', language: 'csharp' },
          { name: 'AuthService.cs', type: 'file', language: 'csharp' },
        ],
      },
      {
        name: 'models',
        type: 'folder',
        children: [
          { name: 'Product.cs', type: 'file', language: 'csharp' },
          { name: 'Order.cs', type: 'file', language: 'csharp' },
          { name: 'User.cs', type: 'file', language: 'csharp' },
        ],
      },
      {
        name: 'data',
        type: 'folder',
        children: [
          { name: 'AppDbContext.cs', type: 'file', language: 'csharp', content: `public class AppDbContext : DbContext
{
    public AppDbContext(
        DbContextOptions<AppDbContext> options) 
        : base(options) { }
    
    public DbSet<Product> Products { get; set; }
    public DbSet<Order> Orders { get; set; }
    public DbSet<OrderItem> OrderItems { get; set; }
    public DbSet<User> Users { get; set; }
    public DbSet<Cart> Carts { get; set; }
    
    protected override void OnModelCreating(
        ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(
            Assembly.GetExecutingAssembly()
        );
    }
}` },
          { name: 'Migrations', type: 'folder', children: [] },
        ],
      },
    ],
  },
  { name: 'appsettings.json', type: 'file', language: 'json' },
  { name: 'Program.cs', type: 'file', language: 'csharp' },
  { name: 'Dockerfile', type: 'file', language: 'dockerfile' },
];

const FileTree = ({ 
  node, 
  depth = 0, 
  onSelect, 
  selectedFile,
  visibleNodes 
}: { 
  node: FileNode; 
  depth?: number; 
  onSelect: (node: FileNode) => void;
  selectedFile: string | null;
  visibleNodes: Set<string>;
}) => {
  const [isOpen, setIsOpen] = useState(depth < 2);
  const isVisible = visibleNodes.has(node.name);
  
  if (!isVisible) return null;

  if (node.type === 'folder') {
    return (
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div
          className="flex items-center gap-1 py-1 px-2 hover:bg-secondary/50 rounded cursor-pointer text-muted-foreground hover:text-foreground transition-colors"
          style={{ paddingLeft: `${depth * 12 + 8}px` }}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <ChevronDown className="w-3 h-3" />
          ) : (
            <ChevronRight className="w-3 h-3" />
          )}
          {isOpen ? (
            <FolderOpen className="w-4 h-4 text-accent" />
          ) : (
            <Folder className="w-4 h-4 text-accent" />
          )}
          <span className="text-xs font-medium">{node.name}</span>
        </div>
        <AnimatePresence>
          {isOpen && node.children && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {node.children.map((child) => (
                <FileTree
                  key={child.name}
                  node={child}
                  depth={depth + 1}
                  onSelect={onSelect}
                  selectedFile={selectedFile}
                  visibleNodes={visibleNodes}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex items-center gap-2 py-1 px-2 hover:bg-secondary/50 rounded cursor-pointer transition-colors ${
        selectedFile === node.name ? 'bg-primary/20 text-primary' : 'text-muted-foreground hover:text-foreground'
      }`}
      style={{ paddingLeft: `${depth * 12 + 8}px` }}
      onClick={() => onSelect(node)}
    >
      <FileCode className="w-4 h-4" />
      <span className="text-xs">{node.name}</span>
    </motion.div>
  );
};

const CodePreview = ({ isGenerating, generationStep }: CodePreviewProps) => {
  const [selectedFile, setSelectedFile] = useState<FileNode | null>(null);
  const [typedContent, setTypedContent] = useState('');
  const [visibleNodes, setVisibleNodes] = useState<Set<string>>(new Set());

  // Progressively reveal files based on generation step
  useEffect(() => {
    const allNodes = ['src', 'controllers', 'ProductController.cs', 'OrderController.cs', 
      'AuthController.cs', 'services', 'ProductService.cs', 'OrderService.cs', 
      'AuthService.cs', 'models', 'Product.cs', 'Order.cs', 'User.cs', 
      'data', 'AppDbContext.cs', 'Migrations', 'appsettings.json', 'Program.cs', 'Dockerfile'];
    
    const step = Math.min(generationStep, allNodes.length);
    setVisibleNodes(new Set(allNodes.slice(0, step * 2)));
  }, [generationStep]);

  // Auto-select first file with content
  useEffect(() => {
    if (generationStep >= 2 && !selectedFile) {
      const controller = projectStructure[0].children?.[0].children?.[0];
      if (controller) setSelectedFile(controller);
    }
  }, [generationStep, selectedFile]);

  // Typing animation for file content
  useEffect(() => {
    if (!selectedFile?.content) {
      setTypedContent('');
      return;
    }

    let index = 0;
    const content = selectedFile.content;
    setTypedContent('');

    const interval = setInterval(() => {
      if (index < content.length) {
        setTypedContent(content.slice(0, index + 3));
        index += 3;
      } else {
        clearInterval(interval);
      }
    }, 10);

    return () => clearInterval(interval);
  }, [selectedFile]);

  return (
    <div className="h-full flex">
      {/* File Explorer */}
      <div className="w-48 border-r border-border bg-secondary/20 overflow-y-auto">
        <div className="p-2 border-b border-border">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Explorer
          </span>
        </div>
        <div className="py-1">
          {projectStructure.map((node) => (
            <FileTree
              key={node.name}
              node={node}
              onSelect={setSelectedFile}
              selectedFile={selectedFile?.name || null}
              visibleNodes={visibleNodes}
            />
          ))}
        </div>
      </div>

      {/* Code Editor */}
      <div className="flex-1 overflow-hidden">
        {selectedFile ? (
          <div className="h-full flex flex-col">
            <div className="flex items-center gap-2 px-4 py-2 bg-secondary/30 border-b border-border">
              <FileCode className="w-4 h-4 text-primary" />
              <span className="text-xs font-medium text-foreground">{selectedFile.name}</span>
            </div>
            <div className="flex-1 overflow-auto p-4 font-mono text-xs">
              <pre className="text-muted-foreground whitespace-pre-wrap">
                {typedContent}
                {isGenerating && (
                  <span className="text-primary animate-pulse">█</span>
                )}
              </pre>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <FileCode className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p className="text-sm">Select a file to view code</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CodePreview;
