
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  FileText,
  Home,
  Pill,
  Users,
  Menu,
  X,
  Briefcase,
  LogIn
} from "lucide-react";

type SidebarProps = {
  collapsed: boolean;
  toggleSidebar: () => void;
};

const Sidebar = ({ collapsed, toggleSidebar }: SidebarProps) => {
  const location = useLocation();
  const navItems = [
    { name: "Dashboard", icon: <Home className="h-5 w-5" />, path: "/" },
    { name: "Patients", icon: <Users className="h-5 w-5" />, path: "/patients" },
    { name: "Medical History", icon: <FileText className="h-5 w-5" />, path: "/medical-history" },
    { name: "Medications", icon: <Pill className="h-5 w-5" />, path: "/medications" },
    { name: "Appointments", icon: <Calendar className="h-5 w-5" />, path: "/appointments" },
    { name: "Careers", icon: <Briefcase className="h-5 w-5" />, path: "/careers" },
    { name: "Login / Register", icon: <LogIn className="h-5 w-5" />, path: "/auth" },
  ];

  return (
    <div
      className={`${
        collapsed ? "w-16" : "w-64"
      } bg-white h-screen fixed left-0 top-0 shadow-lg transition-all duration-300 z-30`}
    >
      <div className="flex justify-between items-center p-4 border-b">
        {!collapsed && (
          <h2 className="text-xl font-bold text-medical-secondary">MedTrack</h2>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleSidebar}
          className="text-gray-500 hover:text-medical-primary"
        >
          {collapsed ? <Menu /> : <X />}
        </Button>
      </div>

      <nav className="mt-6 px-2">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center px-4 py-3 mb-2 rounded-md transition-all ${
              location.pathname === item.path
                ? "bg-medical-light text-medical-primary font-medium"
                : "text-gray-700 hover:bg-medical-light hover:text-medical-primary"
            }`}
          >
            <span className="mr-3">{item.icon}</span>
            {!collapsed && <span>{item.name}</span>}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
