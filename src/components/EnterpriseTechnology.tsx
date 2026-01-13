import { motion } from 'framer-motion';

const technologies = [
  { name: '.NET 8', category: 'Backend', description: 'Long-term support framework' },
  { name: 'PostgreSQL', category: 'Database', description: 'Enterprise-grade database' },
  { name: 'EF Core', category: 'ORM', description: 'Entity Framework Core' },
  { name: 'REST', category: 'API', description: 'OpenAPI 3.1 standard' },
  { name: 'JWT', category: 'Auth', description: 'Secure token authentication' },
  { name: 'FluentValidation', category: 'Validation', description: 'Strongly-typed rules' },
  { name: 'Serilog', category: 'Logging', description: 'Structured logging' },
  { name: 'xUnit', category: 'Testing', description: 'Unit test framework' },
];

const EnterpriseTechnology = () => {
  return (
    <section id="technology" className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-sm font-medium text-primary mb-3">Technology Stack</p>
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight mb-4">
              Enterprise defaults. Zero configuration.
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Every technology choice is deliberate. We use industry-standard, 
              battle-tested tools that enterprise teams already trust.
            </p>

            {/* Code sample */}
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-secondary/30">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                <span className="ml-2 text-xs text-muted-foreground font-mono">ProductsController.cs</span>
              </div>
              <div className="p-4 font-mono text-xs overflow-x-auto">
                <pre className="text-muted-foreground">
{`[ApiController]
[Route("api/v1/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly IProductService _service;

    [HttpGet]
    [Authorize(Policy = "ReadProducts")]
    public async Task<ActionResult<PagedResult<ProductDto>>> 
        GetProducts([FromQuery] ProductQuery query)
    {
        return Ok(await _service.GetAllAsync(query));
    }

    [HttpPost]
    [Authorize(Policy = "WriteProducts")]
    public async Task<ActionResult<ProductDto>> 
        CreateProduct([FromBody] CreateProductDto dto)
    {
        var product = await _service.CreateAsync(dto);
        return CreatedAtAction(
            nameof(GetProduct), 
            new { id = product.Id }, 
            product
        );
    }
}`}
                </pre>
              </div>
            </div>
          </motion.div>

          {/* Tech Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-2 gap-3"
          >
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="p-4 rounded-lg border border-border bg-card/30 hover:bg-card/60 transition-colors"
              >
                <div className="text-xs text-primary font-mono mb-1">{tech.category}</div>
                <div className="text-sm font-medium text-foreground">{tech.name}</div>
                <div className="text-xs text-muted-foreground mt-1">{tech.description}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EnterpriseTechnology;
