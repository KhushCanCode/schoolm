import { Outlet } from "react-router-dom";
import { SchoolNavbar } from "./SchoolNavbar";
import { SchoolSidebar } from "./SchoolSidebar";
import { Sidebar, SidebarProvider } from "./ui/sidebar";
import { useAuthStore } from "../store/useAuthStore";

export default function Layout() {
  const { authUser, isCheckingAuth } = useAuthStore();

  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-medium">Checking authentication...</p>
      </div>
    );
  }

  if (!authUser) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-medium text-red-500">
          Not authenticated. Please login.
        </p>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen   font-[JetBrains Mono] w-full">
        {/* Sidebar based on authenticated user's role */}
        <Sidebar>
          <SchoolSidebar currentRole={authUser.role} />
        </Sidebar>

        <div className="flex-1 flex flex-col">
          <SchoolNavbar
            currentRole={authUser.role}
            onRoleChange={() => {}} 
          />
          <div className="p-6  bg-background h-full ">
            <Outlet />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
