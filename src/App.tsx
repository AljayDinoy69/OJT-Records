
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RoleBasedRoute from "./components/RoleBasedRoute";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Students from "./pages/Students";
import Supervisors from "./pages/Supervisors";
import Records from "./pages/Records";
import Evaluation from "./pages/Evaluation";
import Attendance from "./pages/Attendance";
import ProfileSettings from "./pages/ProfileSettings";
import Settings from "./pages/Settings";
import About from "./pages/About";
import Services from "./pages/Services";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          
          {/* Protected routes */}
          <Route path="/home" element={<RoleBasedRoute><Home /></RoleBasedRoute>} />
          <Route path="/students" element={<RoleBasedRoute><Students /></RoleBasedRoute>} />
          <Route path="/supervisors" element={<RoleBasedRoute><Supervisors /></RoleBasedRoute>} />
          <Route path="/records" element={<RoleBasedRoute><Records /></RoleBasedRoute>} />
          <Route path="/evaluation" element={<RoleBasedRoute><Evaluation /></RoleBasedRoute>} />
          <Route path="/attendance" element={<RoleBasedRoute><Attendance /></RoleBasedRoute>} />
          <Route path="/profile-settings" element={<RoleBasedRoute><ProfileSettings /></RoleBasedRoute>} />
          <Route path="/settings" element={<RoleBasedRoute><Settings /></RoleBasedRoute>} />
          
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
