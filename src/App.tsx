
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
import CreateEditEvent from "./pages/admin/CreateEditEvent";
import EventAccounting from "./pages/admin/EventAccounting";
import Notifications from "./pages/admin/Notifications";
import MessageCenter from "./pages/admin/MessageCenter";
import CheckIn from "./pages/admin/CheckIn";
import EventAnalytics from "./pages/admin/EventAnalytics";
import VotingPage from "./pages/VotingPage";
import Awards from "./pages/Awards";
import AwardDetails from "./pages/AwardDetails";
import Organizers from "./pages/Organizers";
import OrganizerDetails from "./pages/OrganizerDetails";
import Pricing from "./pages/Pricing";
import TicketSearch from "./pages/TicketSearch";
import ProtectedRoute from "./components/protected/ProtectedRoute";
import DashboardEvents from "./pages/dashboard/DashboardEvents";
import DashboardTickets from "./pages/dashboard/DashboardTickets";
import DashboardAwards from "./pages/dashboard/DashboardAwards";
import DashboardTeam from "./pages/dashboard/DashboardTeam";
import DashboardAnalytics from "./pages/dashboard/DashboardAnalytics";
import DashboardEmail from "./pages/dashboard/DashboardEmail";
import DashboardSettings from "./pages/dashboard/DashboardSettings";
import CreateEvent from "./pages/CreateEvent";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

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
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/create-event" element={<CreateEvent />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/events" 
              element={
                <ProtectedRoute>
                  <DashboardEvents />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/tickets" 
              element={
                <ProtectedRoute>
                  <DashboardTickets />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/awards" 
              element={
                <ProtectedRoute>
                  <DashboardAwards />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/team" 
              element={
                <ProtectedRoute>
                  <DashboardTeam />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/analytics" 
              element={
                <ProtectedRoute>
                  <DashboardAnalytics />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/email" 
              element={
                <ProtectedRoute>
                  <DashboardEmail />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/settings" 
              element={
                <ProtectedRoute>
                  <DashboardSettings />
                </ProtectedRoute>
              } 
            />
            <Route path="/events" element={<Events />} />
            <Route path="/events/:id" element={<EventDetails />} />
            <Route path="/events/:id/tickets" element={<TicketPurchase />} />
            <Route path="/tickets/:id" element={<TicketDetails />} />
            <Route path="/tickets/:id/download" element={<TicketDownload />} />
            <Route path="/tickets/search" element={<TicketSearch />} />
            <Route path="/vote/:id" element={<VotingPage />} />
            <Route 
              path="/admin/events" 
              element={
                <ProtectedRoute requireAdmin={true}>
                  <EventManagement />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/events/create" 
              element={
                <ProtectedRoute requireAdmin={true}>
                  <CreateEditEvent />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/events/:id/edit" 
              element={
                <ProtectedRoute requireAdmin={true}>
                  <CreateEditEvent />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/events/:id/accounting" 
              element={
                <ProtectedRoute requireAdmin={true}>
                  <EventAccounting />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/events/:id/messages" 
              element={
                <ProtectedRoute requireAdmin={true}>
                  <MessageCenter />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/notifications" 
              element={
                <ProtectedRoute requireAdmin={true}>
                  <Notifications />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/events/:id/check-in" 
              element={
                <ProtectedRoute requireAdmin={true}>
                  <CheckIn />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/events/:id/analytics" 
              element={
                <ProtectedRoute requireAdmin={true}>
                  <EventAnalytics />
                </ProtectedRoute>
              } 
            />
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
