import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MonitorPlay, RefreshCw, Wifi, ShoppingCart, Package, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LiveDataPreviewProps {
  isGenerating: boolean;
  generationStep: number;
}

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  image: string;
}

interface Order {
  id: string;
  customer: string;
  total: number;
  status: 'pending' | 'processing' | 'completed';
  time: string;
}

const mockProducts: Product[] = [
  { id: 1, name: 'Premium Widget', price: 99.99, stock: 150, image: '📦' },
  { id: 2, name: 'Basic Widget', price: 29.99, stock: 500, image: '📦' },
  { id: 3, name: 'Pro Widget', price: 149.99, stock: 75, image: '📦' },
  { id: 4, name: 'Ultra Widget', price: 199.99, stock: 25, image: '📦' },
];

const mockOrders: Order[] = [
  { id: 'ORD-001', customer: 'John D.', total: 299.97, status: 'completed', time: '2 min ago' },
  { id: 'ORD-002', customer: 'Sarah M.', total: 149.99, status: 'processing', time: '5 min ago' },
  { id: 'ORD-003', customer: 'Mike R.', total: 59.98, status: 'pending', time: '8 min ago' },
];

const statusColors = {
  pending: 'bg-amber-500/20 text-amber-400',
  processing: 'bg-blue-500/20 text-blue-400',
  completed: 'bg-emerald-500/20 text-emerald-400',
};

const LiveDataPreview = ({ isGenerating, generationStep }: LiveDataPreviewProps) => {
  const [isConnected, setIsConnected] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [stats, setStats] = useState({ products: 0, orders: 0, users: 0 });
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    if (generationStep >= 6) {
      setTimeout(() => setIsConnected(true), 300);
      
      // Animate products appearing
      mockProducts.forEach((product, idx) => {
        setTimeout(() => {
          setProducts((prev) => [...prev, product]);
        }, 500 + idx * 200);
      });

      // Animate orders appearing
      mockOrders.forEach((order, idx) => {
        setTimeout(() => {
          setOrders((prev) => [...prev, order]);
        }, 1500 + idx * 300);
      });

      // Animate stats
      const animateStats = () => {
        let p = 0, o = 0, u = 0;
        const interval = setInterval(() => {
          p = Math.min(p + Math.ceil(Math.random() * 50), 247);
          o = Math.min(o + Math.ceil(Math.random() * 20), 89);
          u = Math.min(u + Math.ceil(Math.random() * 30), 156);
          setStats({ products: p, orders: o, users: u });
          if (p >= 247 && o >= 89 && u >= 156) clearInterval(interval);
        }, 100);
      };
      setTimeout(animateStats, 2000);
    }
  }, [generationStep]);

  const refresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-secondary/30 border-b border-border">
        <div className="flex items-center gap-2">
          <MonitorPlay className="w-4 h-4 text-primary" />
          <span className="text-sm font-semibold text-foreground">Live UI Preview</span>
        </div>
        <div className="flex items-center gap-2">
          <div className={`flex items-center gap-1.5 ${isConnected ? 'text-emerald-400' : 'text-muted-foreground'}`}>
            <Wifi className={`w-3 h-3 ${isConnected ? 'animate-pulse' : ''}`} />
            <span className="text-xs">{isConnected ? 'Live' : 'Connecting...'}</span>
          </div>
          <Button
            onClick={refresh}
            disabled={!isConnected}
            size="sm"
            variant="ghost"
            className="h-7 w-7 p-0"
          >
            <RefreshCw className={`w-3 h-3 ${isRefreshing ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-auto bg-background/50 p-4">
        {!isConnected ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              <p className="text-sm">Connecting to API...</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-3">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass rounded-lg p-3"
              >
                <div className="flex items-center gap-2 mb-1">
                  <Package className="w-4 h-4 text-primary" />
                  <span className="text-xs text-muted-foreground">Products</span>
                </div>
                <span className="text-xl font-bold text-foreground">{stats.products}</span>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="glass rounded-lg p-3"
              >
                <div className="flex items-center gap-2 mb-1">
                  <ShoppingCart className="w-4 h-4 text-accent" />
                  <span className="text-xs text-muted-foreground">Orders</span>
                </div>
                <span className="text-xl font-bold text-foreground">{stats.orders}</span>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="glass rounded-lg p-3"
              >
                <div className="flex items-center gap-2 mb-1">
                  <Users className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs text-muted-foreground">Users</span>
                </div>
                <span className="text-xl font-bold text-foreground">{stats.users}</span>
              </motion.div>
            </div>

            {/* Products Grid */}
            <div>
              <h3 className="text-xs font-semibold text-muted-foreground mb-2">Products from API</h3>
              <div className="grid grid-cols-2 gap-2">
                <AnimatePresence>
                  {products.map((product, idx) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.1 }}
                      className="glass rounded-lg p-2"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{product.image}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-foreground truncate">{product.name}</p>
                          <p className="text-xs text-primary font-semibold">${product.price}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Recent Orders */}
            <div>
              <h3 className="text-xs font-semibold text-muted-foreground mb-2">Recent Orders (Live)</h3>
              <div className="space-y-1.5">
                <AnimatePresence>
                  {orders.map((order, idx) => (
                    <motion.div
                      key={order.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-center justify-between glass rounded-lg px-3 py-2"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-muted-foreground">{order.id}</span>
                        <span className="text-xs text-foreground">{order.customer}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-foreground">${order.total}</span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded ${statusColors[order.status]}`}>
                          {order.status}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveDataPreview;
