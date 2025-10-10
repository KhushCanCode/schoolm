import { useState } from "react";
import {
  Home,
  Users,
  GraduationCap,
  BookOpen,
  Calendar,
  MessageSquare,
  FileText,
  Settings,
  BarChart3,
  CreditCard,
  UserCheck,
  Clock,
  School,
  Car,
  Utensils,
  Stethoscope,
  Trophy,
  Camera,
  Globe,
  Calculator,
  PieChart,
  Receipt,
  Wallet,
  ChevronDown,
  ChevronRight,
  User,
  BookA,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Link } from "react-router-dom";

interface MenuItem {
  title: string;
  icon: React.ElementType;
  href: string;
  submenu?: MenuItem[];
}

interface RoleMenus {
  [key: string]: MenuItem[];
}

const roleMenus: RoleMenus = {
  principal: [
    {
      title: "Dashboard",
      icon: Home,
      href: "/principal/dashboard",
    },
    {
      title: "Student ",
      icon: User,
      href: "/principal/students",
      submenu: [
        { title: "Register", icon: Users, href: "/principal/students/register" },
        { title: "List", icon: UserCheck, href: "/principal/students/list" },
        {
          title: "Attendance",
          icon: Trophy,
          href: "/principal/students/attendance",
        },
        { title: "Records", icon: Users, href: "/principal/students/records" },
      ],
    },
    {
      title: "Teachers",
      icon: GraduationCap,
      href: "/principal/teachers",
      submenu: [
        { title: "Register", icon: Users, href: "/principal/teachers/register" },
        { title: "List", icon: Users, href: "/principal/teachers/list" },
        {
          title: "Assign Subjects",
          icon: CreditCard,
          href: "/principal/teachers/subject",
        },
      ],
    },

    {
      title: "Classes",
      icon: BookOpen,
      href: "/principal/classes/class",
      submenu: [
        { title: "List", icon: School, href: "/principal/classes/list" },
        { title: "Subjects", icon: BookOpen, href: "/principal/classes/subjects" },
        {
          title: "Timetable",
          icon: BookOpen,
          href: "/principal/classes/timetable",
        },
      ],
    },
    {
      title: "Exam",
      icon: Users,
      href: "/principal/exam",
    },

    {
      title: "Library",
      icon: BookOpen,
      href: "/principal/library",
    },
    {
      title: "Transport",
      icon: Car,
      href: "/principal/transport",
    },
    {
      title: "Hostel",
      icon: Home,
      href: "/principal/hostel",
    },
    {
      title: "Communication",
      icon: MessageSquare,
      href: "/principal/communication",
      
       
    
    },
    {
      title: "Reports",
      icon: BarChart3,
      href: "/principal/reports",
      submenu: [
        {
          title: "Student ",
          icon: GraduationCap,
          href: "/principal/reports/student",
        },
        { title: "Fees", icon: PieChart, href: "/principal/reports/fee" },
        { title: "Attendance", icon: Clock, href: "/principal/reports/attendance" },
        { title: "Exams", icon: Clock, href: "/principal/reports/exams" },
      ],
    },
    {
      title: "Settings",
      icon: Settings,
      href: "/principal/settings",
      submenu: [
        {
          title: "User Management",
          icon: Settings,
          href: "/principal/settings/user-management",
        },
        { title: "Roles", icon: CreditCard, href: "/principal/settings/roles" },
        {
          title: "School info",
          icon: MessageSquare,
          href: "/principal/settings/school-info",
        },
      ],
    },
  ],
  teacher: [
    {
      title: "Dashboard",
      icon: Home,
      href: "/teacher/dashboard",
      
    },
    {
      title: "My Profile",
      icon: GraduationCap,
      href: "/teacher/my-profile",
    },
    {
      title: "My Classes",
      icon: Clock,
      href: "/teacher/my-classes",
    },
    {
      title: "Student Attendance",
      icon: Clock,
      href: "/teacher/student-attendance",
    },
    {
      title: "Exam",
      icon: BookOpen,
      href: "/teacher/exam",
      submenu: [
        { title: "Schedule", icon: Settings, href: "/teacher/exam/schedule" },
        {
          title: "Marks Entry",
          icon: CreditCard,
          href: "/teacher/exam/marks-entry",
        },
      ],
    },
    {
      title: "Assignments",
      icon: FileText,
      href: "/teacher/assignments",
    },
    {
      title: "Reports",
      icon: BarChart3,
      href: "/teacher/reports",
    },
    {
      title: "Communication",
      icon: MessageSquare,
      href: "/teacher/communication",
      
    },
  ],
  student: [
    {
      title: "Dashboard",
      icon: Home,
      href: "/student/dashboard",
      
    },
    {
      title: "My Profile",
      icon: User,
      href: "/student/profile",
    },
    {
      title: "Attendance",
      icon: FileText,
      href: "/student/attendance",
    },
    {
      title: "Exams",
      icon: BarChart3,
      href: "/student/exams",
      submenu: [
       
        { title: "Results", icon: CreditCard, href: "/student/exams/result" },
        {
          title: "Reports Cards",
          icon: CreditCard,
          href: "/student/exams/reports-cards",
        },
      ],
    },
    {
      title: "Fees",
      icon: CreditCard,
      href: "/student/fees",
      submenu: [
        { title: "Dues", icon: Settings, href: "/student/fees/due" },
        {
          title: "Payments History",
          icon: CreditCard,
          href: "/student/fees/payments-history",
        },
      ],
    },
    {
      title: "Library",
      icon: BookOpen,
      href: "/student/library",
    },
    {
      title: "Messages",
      icon: MessageSquare,
      href: "/student/messages",
    },
  ],
  parent: [
    {
      title: "Dashboard",
      icon: Home,
      href: "/parent/dashboard",
    },
    {
      title: "Student Profile",
      icon: GraduationCap,
      href: "/parent/children",
      submenu: [
        {
          title: "Academic",
          icon: Settings,
          href: "/parent/children/academic",
        },
        {
          title: "Personal Info",
          icon: CreditCard,
          href: "/parent/children-personal-info",
        },
      ],
    },
    {
      title: "Attendance",
      icon: BarChart3,
      href: "/parent/attendance",
    },
    {
      title: "Exams",
      icon: Clock,
      href: "/parent/exams",
      submenu: [
        { title: "Results", icon: Settings, href: "/parent/exams/results" },
        { title: "Report Cards", icon: CreditCard, href: "/parent/exams/reports-cards" },
      ],
    },
    {
      title: "Fees",
      icon: CreditCard,
      href: "/parent/fees",
      submenu: [
        { title: "Dues", icon: Settings, href: "/parent/fees/dues" },
        {
          title: "Payments Receipts",
          icon: CreditCard,
          href: "/parent/fees/payments-receipts",
        },
      ],
    },
    {
      title: "Notices",
      icon: MessageSquare,
      href: "/parent/notices",
    },
  ],
  accountant: [
    {
      title: "Dashboard",
      icon: Home,
      href: "/accountant/dashboard",
    },
    {
      title: " Fees",
      icon: CreditCard,
      href: "/accountant/fees",
    },
    
    {
      title: "Fees Structure",
      icon: Receipt,
      href: "/accountant/fees-structure",
    },
    {
      title: "Monthly Dues",
      icon: Receipt,
      href: "/accountant/monthly-dues",
    },
    {
      title: "Payments",
      icon: Receipt,
      href: "/accountant/payments",
    },
    {
      title: "Extra Services",
      icon: Receipt,
      href: "/accountant/extra-services",
    },

    {
      title: "Reports",
      icon: BarChart3,
      href: "/accountant/reports",
      submenu: [
        {
          title: "Fee Reports",
          icon: Receipt,
          href: "/accountant/report/fee",
        },
        {
          title: "Dues Pending",
          icon: CreditCard,
          href: "/accountant/report/dues-pending",
        },
        {
          title: "Transactions",
          icon: Wallet,
          href: "/accountant/report/transactions",
        },
      ],
    },
  ],
};

interface SchoolSidebarProps {
  currentRole: string;
}

export function SchoolSidebar({ currentRole }: SchoolSidebarProps) {
  const [openGroups, setOpenGroups] = useState<string[]>([]);
  const currentMenus = roleMenus[currentRole] || [];

  const toggleGroup = (title: string) => {
    setOpenGroups((prev) =>
      prev.includes(title) ? prev.filter((g) => g !== title) : [...prev, title]
    );
  };

  const renderMenuItem = (item: MenuItem) => {
    if (item.submenu) {
      const isOpen = openGroups.includes(item.title);

      return (
        <Collapsible
          key={item.title}
          open={isOpen}
          onOpenChange={() => toggleGroup(item.title)}
        >
          <SidebarMenuItem>
            <CollapsibleTrigger className=" hover:w-full" asChild>
              <SidebarMenuButton className="w-full ">
                <item.icon className="h-4 w-4" />
                <span>{item.title}</span>
                {isOpen ? (
                  <ChevronDown className="ml-auto h-4 w-4 block" />
                ) : (
                  <ChevronRight className="ml-auto h-4 w-4 block" />
                )}
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                {item.submenu.map((subItem) => (
                  <SidebarMenuSubItem key={subItem.href}>
                    <SidebarMenuSubButton asChild>
                      <Link to={subItem.href}>
                        <subItem.icon className="h-4 w-4" />
                        <span>{subItem.title}</span>
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                ))}
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>
      );
    }

    return (
      <SidebarMenuItem key={item.href}>
        <SidebarMenuButton asChild>
          <Link to={item.href}>
            <item.icon className="h-4 w-4" />
            <span>{item.title}</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  };

  return (
    <Sidebar className="border-r ">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-lg font-semibold mb-4">
            {currentRole.charAt(0).toUpperCase() + currentRole.slice(1)} Panel
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>{currentMenus.map(renderMenuItem)}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
