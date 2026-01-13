import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/hooks/useAuth";
import { ProjectProvider } from "@/contexts/ProjectContext";
import { AnimatePresence } from "framer-motion";
import SplashScreen from "@/components/SplashScreen";
import ErrorBoundary from "@/components/ErrorBoundary";
import PageTransition from "@/components/PageTransition";
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
import Product from "./pages/Product";
import Architecture from "./pages/Architecture";
import Security from "./pages/Security";
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

// Animated Routes wrapper for page transitions
const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Index /></PageTransition>} />
        <Route path="/product" element={<PageTransition><Product /></PageTransition>} />
        <Route path="/architecture" element={<PageTransition><Architecture /></PageTransition>} />
        <Route path="/security" element={<PageTransition><Security /></PageTransition>} />
        <Route path="/docs" element={<PageTransition><Documentation /></PageTransition>} />
        <Route path="/blog" element={<PageTransition><Blog /></PageTransition>} />
        <Route path="/pricing" element={<PageTransition><Pricing /></PageTransition>} />
        <Route path="/about" element={<PageTransition><About /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
        <Route path="/privacy" element={<PageTransition><Privacy /></PageTransition>} />
        <Route path="/terms" element={<PageTransition><Terms /></PageTransition>} />
        <Route path="/auth" element={<PageTransition><Auth /></PageTransition>} />
        <Route path="/onboarding" element={<PageTransition><Onboarding /></PageTransition>} />
        <Route path="/whitepaper" element={<PageTransition><Whitepaper /></PageTransition>} />
        
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
        
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Always show splash on page load/refresh for brand experience
    // You can change this to session-based if needed
    const timer = setTimeout(() => {
      // Splash will auto-complete via its own timer
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="light" storageKey="cognix-theme">
          <ErrorBoundary>
            <TooltipProvider>
              <AnimatePresence mode="wait">
                {showSplash && (
                  <SplashScreen onComplete={handleSplashComplete} />
                )}
              </AnimatePresence>
              
              {!showSplash && (
                <>
                  <Toaster />
                  <Sonner />
                  <BrowserRouter>
                    <AuthProvider>
                      <AnimatedRoutes />
                    </AuthProvider>
                  </BrowserRouter>
                </>
              )}
            </TooltipProvider>
          </ErrorBoundary>
        </ThemeProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
