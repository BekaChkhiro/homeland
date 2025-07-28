import React from "react";
import { Heart, Home, User, Plus, DollarSign } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

interface MenuItem {
  id: string;
  path: string;
  label: string;
  icon: React.ReactNode;
}

export const SidebarMenu: React.FC = () => {
  const location = useLocation();
  
  console.log("Menu - Current location:", location.pathname);
  const menuItems: MenuItem[] = [
    { id: "add-property", path: "/dashboard/add-property", label: "განცხადების დამატება", icon: <Plus className="h-5 w-5 mr-2" /> },
    { id: "my-properties", path: "/dashboard/my-properties", label: "ჩემი განცხადებები", icon: <Home className="h-5 w-5 mr-2" /> },
    { id: "favorites", path: "/dashboard/favorites", label: "ფავორიტები", icon: <Heart className="h-5 w-5 mr-2" /> },
    { id: "profile", path: "/dashboard/profile", label: "პროფილი", icon: <User className="h-5 w-5 mr-2" /> },
    { id: "balance", path: "/dashboard/balance", label: "შევსება", icon: <DollarSign className="h-5 w-5 mr-2" /> },
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
