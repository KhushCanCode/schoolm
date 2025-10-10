import { Search, User, Menu, Star, User2, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { SidebarTrigger } from "@/components/ui/sidebar";

import { useAuthStore } from "@/store/useAuthStore";
import { useNavigate } from "react-router-dom";

interface SchoolNavbarProps {
  currentRole: string;
  onRoleChange: (role: string) => void;
}

export function SchoolNavbar({ currentRole, onRoleChange }: SchoolNavbarProps) {

  const { authUser, logout } = useAuthStore();
  const navigate = useNavigate();

  const roles = [
    { id: "principal", label: "Principal", color: "bg-red-500" },
    { id: "teacher", label: "Teacher", color: "bg-blue-500" },
    { id: "student", label: "Student", color: "bg-green-500" },
    { id: "parent", label: "Parent", color: "bg-purple-500" },
    { id: "accountant", label: "Accountant", color: "bg-orange-500" },
  ];
  const currentRoleData = roles.find((role) => role.id === authUser.role);

  //Logout Function
   const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 w-full   bg-navbar text-navbar-foreground -ml-1">
      <div className="flex h-16 items-center justify-between  px-4">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="md:hidden" />
        </div>

        <div className="flex items-center gap-2 flex-1 max-w-md mx-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <Input placeholder="Search..." className="pl-9  text-gray-500" />
          </div>
        </div>

        <div className="flex items-center gap-6 ">
          {/* Role Show */}
          <Button
            variant="outline"
            size="sm"
            className="gap-2 text-gray-500 hover:text-gray-500 cursor-default"
          >
            <div className={`h-2 w-2 rounded-full ${currentRoleData?.color}`} />
            <span className="hidden sm:inline">{currentRoleData?.label}</span>
          </Button>

          <Bell className="size-5 " />

          {/* User Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-8 w-8   rounded-full text-gray-500 hover:text-gray-500"
              >
                <Avatar className="h-8 w-8 bg-accent">
                  <AvatarFallback>
                    <User className="h-4 w-4 " />
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
             <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel>{authUser.username}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile Settings</DropdownMenuItem>
              <DropdownMenuItem className="text-red-600" onClick={handleLogout}>
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
