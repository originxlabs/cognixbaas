import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/hooks/useAuth";
import { ProjectProvider } from "@/contexts/ProjectContext";
import Index from "./pages/Index";
import Documentation from "./pages/Documentation";
import Blog from "./pages/Blog";
import Pricing from "./pages/Pricing";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Auth from "./pages/Auth";
import Onboarding from "./pages/Onboarding";
import Whitepaper from "./pages/Whitepaper";
import NotFound from "./pages/NotFound";
import DashboardLayoutNew from "./components/dashboard/DashboardLayoutNew";
import DashboardProjects from "./pages/dashboard/DashboardProjects";
import DashboardSettings from "./pages/dashboard/DashboardSettings";
import DashboardProjectOverview from "./pages/dashboard/DashboardProjectOverview";
import DashboardPromptConfig from "./pages/dashboard/DashboardPromptConfig";
import DashboardTasksKanban from "./pages/dashboard/DashboardTasksKanban";
import DashboardArchitecture from "./pages/dashboard/DashboardArchitecture";
import DashboardAPIs from "./pages/dashboard/DashboardAPIs";
import DashboardDatabase from "./pages/dashboard/DashboardDatabase";
import DashboardAgentsLive from "./pages/dashboard/DashboardAgentsLive";
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
            <AuthProvider>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/docs" element={<Documentation />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/onboarding" element={<Onboarding />} />
                <Route path="/whitepaper" element={<Whitepaper />} />
                {/* Dashboard Routes with Project Context */}
                <Route path="/dashboard/*" element={
                  <ProjectProvider>
                    <Routes>
                      <Route element={<DashboardLayoutNew />}>
                        <Route index element={<DashboardProjects />} />
                        <Route path="settings" element={<DashboardSettings />} />
                        
                        {/* Project-specific routes */}
                        <Route path="project/:projectId" element={<DashboardProjectOverview />} />
                        <Route path="project/:projectId/prompt" element={<DashboardPromptConfig />} />
                        <Route path="project/:projectId/tasks" element={<DashboardTasksKanban />} />
                        <Route path="project/:projectId/architecture" element={<DashboardArchitecture />} />
                        <Route path="project/:projectId/apis" element={<DashboardAPIs />} />
                        <Route path="project/:projectId/database" element={<DashboardDatabase />} />
                        <Route path="project/:projectId/agents" element={<DashboardAgentsLive />} />
                        <Route path="project/:projectId/github" element={<DashboardGitHub />} />
                        <Route path="project/:projectId/sandbox" element={<DashboardSandbox />} />
                        <Route path="project/:projectId/llm" element={<DashboardLLM />} />
                      </Route>
                    </Routes>
                  </ProjectProvider>
                } />
                
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AuthProvider>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
