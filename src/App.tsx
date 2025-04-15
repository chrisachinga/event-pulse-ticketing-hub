
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/theme/ThemeProvider";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Events from "./pages/Events";
import NotFound from "./pages/NotFound";
import EventDetails from "./pages/EventDetails";
import TicketPurchase from "./pages/TicketPurchase";
import TicketDetails from "./pages/TicketDetails";
import TicketDownload from "./pages/TicketDownload";
import EventManagement from "./pages/admin/EventManagement";
import CheckIn from "./pages/admin/CheckIn";
import EventAnalytics from "./pages/admin/EventAnalytics";
import VotingPage from "./pages/VotingPage";
import Awards from "./pages/Awards";
import AwardDetails from "./pages/AwardDetails";
import Organizers from "./pages/Organizers";
import OrganizerDetails from "./pages/OrganizerDetails";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/:id" element={<EventDetails />} />
            <Route path="/events/:id/tickets" element={<TicketPurchase />} />
            <Route path="/tickets/:id" element={<TicketDetails />} />
            <Route path="/tickets/:id/download" element={<TicketDownload />} />
            <Route path="/vote/:id" element={<VotingPage />} />
            <Route path="/admin/events" element={<EventManagement />} />
            <Route path="/admin/events/:id/check-in" element={<CheckIn />} />
            <Route path="/admin/events/:id/analytics" element={<EventAnalytics />} />
            <Route path="/awards" element={<Awards />} />
            <Route path="/awards/:id" element={<AwardDetails />} />
            <Route path="/organizers" element={<Organizers />} />
            <Route path="/organizers/:id" element={<OrganizerDetails />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
