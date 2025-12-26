import { useEffect, useState, useRef } from 'react';
import { 
  Brain, 
  GitBranch, 
  Database, 
  Code2, 
  Shield, 
  Cloud, 
  FileText, 
  TestTube2,
  Zap
} from 'lucide-react';

interface AgentNode {
  id: string;
  icon: typeof Brain;
  name: string;
  x: number;
  y: number;
  color: string;
}

interface Connection {
  from: string;
  to: string;
  active: boolean;
}

const agents: AgentNode[] = [
  { id: 'req', icon: Brain, name: 'Requirement Analyzer', x: 50, y: 15, color: '#22d3ee' },
  { id: 'arch', icon: GitBranch, name: 'Architecture Designer', x: 85, y: 30, color: '#a78bfa' },
  { id: 'db', icon: Database, name: 'Database Modeler', x: 85, y: 55, color: '#34d399' },
  { id: 'api', icon: Code2, name: 'API Generator', x: 50, y: 85, color: '#fb923c' },
  { id: 'sec', icon: Shield, name: 'Security Agent', x: 15, y: 55, color: '#f87171' },
  { id: 'deploy', icon: Cloud, name: 'Deployment Agent', x: 15, y: 30, color: '#38bdf8' },
];

const connections: Connection[] = [
  { from: 'req', to: 'arch', active: false },
  { from: 'req', to: 'deploy', active: false },
  { from: 'arch', to: 'db', active: false },
  { from: 'db', to: 'api', active: false },
  { from: 'api', to: 'sec', active: false },
  { from: 'sec', to: 'deploy', active: false },
  { from: 'arch', to: 'sec', active: false },
  { from: 'deploy', to: 'req', active: false },
];

const AgentWorkflowVisualization = () => {
  const [activeConnections, setActiveConnections] = useState<Set<string>>(new Set());
  const [activeAgent, setActiveAgent] = useState<string | null>(null);
  const [dataPackets, setDataPackets] = useState<{ id: number; from: string; to: string; progress: number }[]>([]);
  const animationRef = useRef<number>(0);
  const packetIdRef = useRef(0);

  useEffect(() => {
    let connectionIndex = 0;
    
    const animate = () => {
      const connection = connections[connectionIndex];
      const connectionKey = `${connection.from}-${connection.to}`;
      
      // Activate connection
      setActiveConnections(prev => new Set([...prev, connectionKey]));
      setActiveAgent(connection.from);
      
      // Create data packet
      const packetId = packetIdRef.current++;
      setDataPackets(prev => [...prev, { id: packetId, from: connection.from, to: connection.to, progress: 0 }]);
      
      // Animate packet
      let progress = 0;
      const packetInterval = setInterval(() => {
        progress += 0.05;
        setDataPackets(prev => 
          prev.map(p => p.id === packetId ? { ...p, progress: Math.min(progress, 1) } : p)
        );
        
        if (progress >= 1) {
          clearInterval(packetInterval);
          setActiveAgent(connection.to);
          
          // Remove packet after delay
          setTimeout(() => {
            setDataPackets(prev => prev.filter(p => p.id !== packetId));
          }, 300);
        }
      }, 50);
      
      // Deactivate after delay
      setTimeout(() => {
        setActiveConnections(prev => {
          const next = new Set(prev);
          next.delete(connectionKey);
          return next;
        });
      }, 1500);
      
      connectionIndex = (connectionIndex + 1) % connections.length;
    };
    
    animate();
    const interval = setInterval(animate, 2000);
    
    return () => {
      clearInterval(interval);
    };
  }, []);

  const getAgentPosition = (id: string) => {
    const agent = agents.find(a => a.id === id);
    return agent ? { x: agent.x, y: agent.y } : { x: 50, y: 50 };
  };

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">
              Live Agent Orchestration
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            <span className="gradient-text">Watch Agents Collaborate</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            See how our intelligent agents communicate and work together in real-time 
            to build your backend systems.
          </p>
        </div>

        {/* Visualization Container */}
        <div className="relative max-w-4xl mx-auto aspect-square md:aspect-[4/3] glass rounded-3xl p-8 overflow-hidden">
          {/* Background grid */}
          <div 
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--primary)) 1px, transparent 0)`,
              backgroundSize: '30px 30px'
            }}
          />
          
          {/* Center hub */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 md:w-28 md:h-28">
            <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-2xl animate-pulse-glow opacity-30 blur-xl" />
            <div className="relative w-full h-full glass rounded-2xl flex items-center justify-center border border-primary/30">
              <div className="text-center">
                <span className="text-xs md:text-sm font-bold gradient-text">Cognix</span>
                <span className="block text-[10px] text-muted-foreground">Core</span>
              </div>
            </div>
          </div>

          {/* SVG for connections */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <defs>
              <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(187 92% 55%)" stopOpacity="0.6" />
                <stop offset="50%" stopColor="hsl(262 83% 58%)" stopOpacity="1" />
                <stop offset="100%" stopColor="hsl(187 92% 55%)" stopOpacity="0.6" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {/* Connection lines */}
            {connections.map((conn, index) => {
              const from = getAgentPosition(conn.from);
              const to = getAgentPosition(conn.to);
              const isActive = activeConnections.has(`${conn.from}-${conn.to}`);
              
              return (
                <line
                  key={index}
                  x1={`${from.x}%`}
                  y1={`${from.y}%`}
                  x2={`${to.x}%`}
                  y2={`${to.y}%`}
                  stroke={isActive ? "url(#connectionGradient)" : "hsl(var(--border))"}
                  strokeWidth={isActive ? 3 : 1}
                  strokeOpacity={isActive ? 1 : 0.3}
                  filter={isActive ? "url(#glow)" : undefined}
                  className="transition-all duration-300"
                />
              );
            })}
            
            {/* Data packets */}
            {dataPackets.map((packet) => {
              const from = getAgentPosition(packet.from);
              const to = getAgentPosition(packet.to);
              const x = from.x + (to.x - from.x) * packet.progress;
              const y = from.y + (to.y - from.y) * packet.progress;
              
              return (
                <circle
                  key={packet.id}
                  cx={`${x}%`}
                  cy={`${y}%`}
                  r="6"
                  fill="hsl(187 92% 55%)"
                  filter="url(#glow)"
                  className="animate-pulse"
                />
              );
            })}
          </svg>

          {/* Agent nodes */}
          {agents.map((agent) => {
            const isActive = activeAgent === agent.id;
            const Icon = agent.icon;
            
            return (
              <div
                key={agent.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300"
                style={{ 
                  left: `${agent.x}%`, 
                  top: `${agent.y}%`,
                  transform: `translate(-50%, -50%) scale(${isActive ? 1.15 : 1})`,
                  zIndex: isActive ? 10 : 1
                }}
              >
                {/* Glow effect */}
                {isActive && (
                  <div 
                    className="absolute inset-0 rounded-xl blur-xl animate-pulse"
                    style={{ backgroundColor: agent.color, opacity: 0.4 }}
                  />
                )}
                
                {/* Node */}
                <div 
                  className={`relative w-14 h-14 md:w-20 md:h-20 rounded-xl flex flex-col items-center justify-center transition-all duration-300 ${
                    isActive ? 'glass border-2' : 'bg-card/80 border border-border'
                  }`}
                  style={{ borderColor: isActive ? agent.color : undefined }}
                >
                  <Icon 
                    className="w-5 h-5 md:w-7 md:h-7 mb-1 transition-colors"
                    style={{ color: isActive ? agent.color : 'hsl(var(--muted-foreground))' }}
                  />
                  <span className="text-[8px] md:text-[10px] text-center font-medium text-muted-foreground leading-tight px-1 hidden md:block">
                    {agent.name.split(' ')[0]}
                  </span>
                </div>
              </div>
            );
          })}

          {/* Status indicator */}
          <div className="absolute bottom-4 left-4 flex items-center gap-2 glass px-3 py-2 rounded-full">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-xs text-muted-foreground">Agents Active</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AgentWorkflowVisualization;
