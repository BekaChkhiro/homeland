import React from "react";
import { BarChart3, Users, Home, Settings, Monitor } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

interface AdminMenuItem {
  id: string;
  path: string;
  label: string;
  icon: React.ReactNode;
}

export const AdminSidebarMenu: React.FC = () => {
  const location = useLocation();
  
  const menuItems: AdminMenuItem[] = [
    { id: "overview", path: "/admin/overview", label: "მიმოხილვა", icon: <BarChart3 className="h-5 w-5 mr-2" /> },
    { id: "listings", path: "/admin/listings", label: "განცხადებები", icon: <Home className="h-5 w-5 mr-2" /> },
    { id: "users", path: "/admin/users", label: "მომხმარებლები", icon: <Users className="h-5 w-5 mr-2" /> },
    { id: "advertisements", path: "/admin/advertisements", label: "რეკლამები", icon: <Monitor className="h-5 w-5 mr-2" /> },
    { id: "settings", path: "/admin/settings", label: "პარამეტრები", icon: <Settings className="h-5 w-5 mr-2" /> },
  ];

  return (
    <div className="p-1">
      {menuItems.map((item) => (
        <Link
          key={item.id}
          to={item.path}
          className={cn(
            "flex items-center w-full px-3 py-2 text-sm rounded-md transition-colors",
            location.pathname === item.path
              ? "bg-primary/10 text-primary font-medium"
              : "hover:bg-gray-100"
          )}
        >
          {item.icon}
          {item.label}
        </Link>
      ))}
    </div>
  );
};