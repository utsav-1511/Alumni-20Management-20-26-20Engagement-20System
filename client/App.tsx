import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Landing from "./pages/Landing";
import Directory from "./pages/Directory";
import Events from "./pages/Events";
import Forum from "./pages/Forum";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import NotFound from "./pages/NotFound";
import AlumniLayout from "@/components/layout/AlumniLayout";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />

          <Route element={<AlumniLayout />}>
            <Route path="dashboard" element={<Index />} />
            <Route path="directory" element={<Directory />} />
            <Route path="events" element={<Events />} />
            <Route path="forum" element={<Forum />} />
            <Route path="settings" element={<Settings />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

const container = document.getElementById("root")!;
// Reuse an existing root if HMR or repeated imports occur to avoid calling createRoot twice.
if (!(window as any).__REACT_ROOT__) {
  (window as any).__REACT_ROOT__ = createRoot(container);
}
(window as any).__REACT_ROOT__.render(<App />);
