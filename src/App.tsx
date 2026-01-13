import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "@/components/ThemeProvider";
import Index from "./pages/Index";
import Documentation from "./pages/Documentation";
import Blog from "./pages/Blog";
import Pricing from "./pages/Pricing";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import DashboardOverview from "./pages/dashboard/DashboardOverview";
import DashboardPrompt from "./pages/dashboard/DashboardPrompt";
import DashboardTasks from "./pages/dashboard/DashboardTasks";
import DashboardArchitecture from "./pages/dashboard/DashboardArchitecture";
import DashboardAPIs from "./pages/dashboard/DashboardAPIs";
import DashboardDatabase from "./pages/dashboard/DashboardDatabase";
import DashboardAgents from "./pages/dashboard/DashboardAgents";
import DashboardGitHub from "./pages/dashboard/DashboardGitHub";
import DashboardSandbox from "./pages/dashboard/DashboardSandbox";
import DashboardLLM from "./pages/dashboard/DashboardLLM";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="cognix-theme">
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/docs" element={<Documentation />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              
              {/* Dashboard Routes */}
              <Route path="/dashboard" element={<DashboardLayout />}>
                <Route index element={<DashboardOverview />} />
                <Route path="prompt" element={<DashboardPrompt />} />
                <Route path="tasks" element={<DashboardTasks />} />
                <Route path="architecture" element={<DashboardArchitecture />} />
                <Route path="apis" element={<DashboardAPIs />} />
                <Route path="database" element={<DashboardDatabase />} />
                <Route path="agents" element={<DashboardAgents />} />
                <Route path="github" element={<DashboardGitHub />} />
                <Route path="sandbox" element={<DashboardSandbox />} />
                <Route path="llm" element={<DashboardLLM />} />
                <Route path="settings" element={<DashboardOverview />} />
              </Route>
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
