
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Calendar, 
  Ticket, 
  Award, 
  Users, 
  BarChart,
  Settings,
  LogOut,
  Mail
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    href: '/dashboard',
    end: true
  },
  {
    title: 'Events',
    icon: Calendar,
    href: '/dashboard/events',
  },
  {
    title: 'Tickets',
    icon: Ticket,
    href: '/dashboard/tickets',
  },
  {
    title: 'Awards',
    icon: Award,
    href: '/dashboard/awards',
  },
  {
    title: 'Team',
    icon: Users,
    href: '/dashboard/team',
  },
  {
    title: 'Analytics',
    icon: BarChart,
    href: '/dashboard/analytics',
  },
  {
    title: 'Email',
    icon: Mail,
    href: '/dashboard/email',
  },
  {
    title: 'Settings',
    icon: Settings,
    href: '/dashboard/settings',
  },
];

const DashboardSidebar = () => {
  const location = useLocation();
  
  return (
    <div className="h-full w-64 border-r bg-white flex flex-col">
      <div className="p-4 border-b">
        <Link to="/" className="flex items-center">
          <span className="text-xl font-bold text-primary">EventPulse</span>
        </Link>
      </div>
      
      <div className="flex-1 overflow-auto py-4 px-2">
        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = item.end 
              ? location.pathname === item.href
              : location.pathname.startsWith(item.href);
              
            return (
              <Link
                key={item.title}
                to={item.href}
                className={cn(
                  "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-gray-700 hover:bg-gray-100"
                )}
              >
                <item.icon className={cn("h-5 w-5 mr-2", isActive ? "text-primary" : "text-gray-500")} />
                {item.title}
              </Link>
            );
          })}
        </nav>
      </div>
      
      <div className="p-4 border-t mt-auto">
        <Link
          to="/logout"
          className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
        >
          <LogOut className="h-5 w-5 mr-2 text-gray-500" />
          Logout
        </Link>
      </div>
    </div>
  );
};

export default DashboardSidebar;
