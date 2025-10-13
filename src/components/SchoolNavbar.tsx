import { Search, User, Menu, Star, User2, Bell, Sun, SunDim } from "lucide-react";
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
    <header className="sticky top-0 z-50 w-full   bg-sidebar-primary text-sidebar-primary-foreground -ml-1">
      <div className="flex h-16 items-center justify-end gap-2 px-4">

        <div className="flex items-center gap-4">
          <SidebarTrigger className="md:hidden" />
        </div>

        <div className="flex items-center gap-2  flex-1 max-w-md mx-4">
          <div className="relative flex-1 ">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input placeholder="Search..." className="pl-9 h-9 bg-foreground border-muted-foreground" />
          </div>
        </div>


          {/* User Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              
              <div className="w-8">
                 <Avatar className="h-6 text-gray-400 cursor-pointer w-6 bg-accent">
                  <AvatarFallback>
                    <User className="h-4 w-4 " />
                  </AvatarFallback>
                </Avatar>
              </div>
               

            </DropdownMenuTrigger>
             <DropdownMenuContent className="w-56 " align="end" forceMount>
              <DropdownMenuLabel>{authUser.username}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile Settings</DropdownMenuItem>
              <DropdownMenuItem className="text-red-600" onClick={handleLogout}>
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

            <div className="border-l mr-2 h-5 border-gray-700">

            </div>

            <div className="">
              <SunDim className="size-5 " />
            </div>
          

      </div>
    </header>
  );
}
