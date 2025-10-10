import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Users,
  UserCheck,
  UserX,
  Shield,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  Mail,
  Phone,
  Calendar,
  MoreHorizontal
} from "lucide-react";

export const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const users = [
    {
      id: "USR001",
      name: "Dr. Sarah Johnson",
      email: "sarah.johnson@school.edu",
      phone: "+1 (555) 123-4567",
      role: "Teacher",
      department: "Mathematics",
      status: "Active",
      joinDate: "2020-08-15",
      avatar: "",
      permissions: ["View Students", "Grade Management", "Attendance"]
    },
    {
      id: "USR002", 
      name: "John Smith",
      email: "john.smith@parent.com",
      phone: "+1 (555) 234-5678",
      role: "Parent",
      department: "N/A",
      status: "Active",
      joinDate: "2023-01-10",
      avatar: "",
      permissions: ["View Child Progress", "Fee Payments"]
    },
    {
      id: "USR003",
      name: "Michael Brown",
      email: "michael.brown@school.edu", 
      phone: "+1 (555) 345-6789",
      role: "Administrator",
      department: "Administration",
      status: "Active",
      joinDate: "2019-03-22",
      avatar: "",
      permissions: ["Full Access", "User Management", "System Settings"]
    },
    {
      id: "USR004",
      name: "Emily Davis",
      email: "emily.davis@school.edu",
      phone: "+1 (555) 456-7890", 
      role: "Teacher",
      department: "Science",
      status: "Active",
      joinDate: "2021-09-01",
      avatar: "",
      permissions: ["View Students", "Grade Management", "Lab Access"]
    },
    {
      id: "USR005",
      name: "Robert Wilson",
      email: "robert.wilson@school.edu",
      phone: "+1 (555) 567-8901",
      role: "Support Staff",
      department: "Maintenance",
      status: "Inactive",
      joinDate: "2018-05-12",
      avatar: "",
      permissions: ["Facility Access", "Equipment Management"]
    }
  ];

  const roleStats = [
    { role: "Teachers", count: 78, color: "text-primary" },
    { role: "Parents", count: 1156, color: "text-success" },
    { role: "Administrators", count: 12, color: "text-warning" },
    { role: "Support Staff", count: 45, color: "text-secondary" }
  ];

  const permissions = [
    "View Students", "Grade Management", "Attendance", "Fee Payments", 
    "Full Access", "User Management", "System Settings", "Lab Access",
    "Facility Access", "Equipment Management", "View Child Progress"
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.role.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === "all") return matchesSearch;
    return matchesSearch && user.role.toLowerCase() === activeTab.toLowerCase();
  });

  const getRoleColor = (role: string) => {
    switch (role) {
      case "Teacher": return "default";
      case "Parent": return "secondary";
      case "Administrator": return "destructive";
      case "Support Staff": return "outline";
      default: return "outline";
    }
  };

  return (
    <div className="space-y-6 ">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-lg font-bold text-foreground">User Management</h2>
          <p className="text-muted-foreground text-xs">Manage users, roles, and permissions</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter Users
          </Button>
          <Button className="bg-gradient-primary hover:opacity-90">
            <Plus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </div>
      </div>

      {/* User Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-card shadow-soft">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground">Total Users</p>
                <p className="text-lg font-bold">1,291</p>
              </div>
              <Users className="h-6 w-6 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-card shadow-soft">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground">Active Users</p>
                <p className="text-lg font-bold text-success">1,247</p>
              </div>
              <UserCheck className="h-6 w-6 text-success" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-card shadow-soft">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground">Inactive Users</p>
                <p className="text-lg font-bold text-destructive">44</p>
              </div>
              <UserX className="h-6 w-6 text-destructive" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-card shadow-soft">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground">Admins</p>
                <p className="text-lg font-bold text-warning">12</p>
              </div>
              <Shield className="h-6 w-6 text-warning" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Role Distribution */}
      <Card className="bg-gradient-card shadow-soft">
        <CardHeader>
          <CardTitle className="text-lg">User Distribution by Role</CardTitle>
          <CardDescription className="text-xs">Breakdown of users across different roles</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {roleStats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className={`text-lg font-bold ${stat.color}`}>{stat.count}</p>
                <p className="text-xs text-muted-foreground">{stat.role}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Search and Filter */}
      <Card className="bg-gradient-card shadow-soft">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search users by name, email, or role..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button 
                variant={activeTab === "all" ? "default" : "outline"} 
                size="sm"
                onClick={() => setActiveTab("all")}
              >
                All
              </Button>
              <Button 
                variant={activeTab === "teacher" ? "default" : "outline"} 
                size="sm"
                onClick={() => setActiveTab("teacher")}
              >
                Teachers
              </Button>
              <Button 
                variant={activeTab === "parent" ? "default" : "outline"} 
                size="sm"
                onClick={() => setActiveTab("parent")}
              >
                Parents
              </Button>
              <Button 
                variant={activeTab === "administrator" ? "default" : "outline"} 
                size="sm"
                onClick={() => setActiveTab("administrator")}
              >
                Admins
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card className="bg-gradient-card shadow-soft">
        <CardHeader>
          <CardTitle className="text-lg">Users List</CardTitle>
          <CardDescription className="text-xs">Manage all system users and their permissions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right px-9">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user.avatar} />
                          <AvatarFallback>
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">{user.name}</p>
                          <p className="text-xs text-muted-foreground">{user.id}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getRoleColor(user.role)}>
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">{user.department}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-xs">
                          <Mail className="h-3 w-3" />
                          <span className="truncate max-w-[120px]">{user.email}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs">
                          <Phone className="h-3 w-3" />
                          <span>{user.phone}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm">
                        <Calendar className="h-3 w-3" />
                        {user.joinDate}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={user.status === "Active" ? "default" : "secondary"}
                      >
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-1 justify-end">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Permissions Management */}
      <Card className="bg-gradient-card shadow-soft">
        <CardHeader>
          <CardTitle className="text-lg">Permission Templates</CardTitle>
          <CardDescription className="text-xs">Pre-defined permission sets for different user roles</CardDescription>
        </CardHeader>
        <CardContent >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="border">
              <CardContent className="pt-4">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="h-5 w-5 text-primary" />
                  <h4 className="font-medium">Teacher Access</h4>
                </div>
                <div className="space-y-1">
                  <Badge variant="outline" className="text-xs mr-1 mb-1">Grade Management</Badge>
                  <Badge variant="outline" className="text-xs mr-1 mb-1">View Students</Badge>
                  <Badge variant="outline" className="text-xs mr-1 mb-1">Attendance</Badge>
                </div>
                <Button  className="w-full mt-6">
                  Edit Template
                </Button>
              </CardContent>
            </Card>
            
            <Card className="border">
              <CardContent className="pt-4">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="h-5 w-5 text-success" />
                  <h4 className="font-medium">Parent Access</h4>
                </div>
                <div className="space-y-1">
                  <Badge variant="outline" className="text-xs mr-1 mb-1">View Child Progress</Badge>
                  <Badge variant="outline" className="text-xs mr-1 mb-1">Fee Payments</Badge>
                </div>
                <Button className="w-full mt-12">
                  Edit Template
                </Button>
              </CardContent>
            </Card>
            
            <Card className="border">
              <CardContent className="pt-4">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="h-5 w-5 text-warning" />
                  <h4 className="font-medium">Admin Access</h4>
                </div>
                <div className="space-y-1">
                  <Badge variant="outline" className="text-xs mr-1 mb-1">Full Access</Badge>
                  <Badge variant="outline" className="text-xs mr-1 mb-1">User Management</Badge>
                  <Badge variant="outline" className="text-xs mr-1 mb-1">System Settings</Badge>
                </div>
                <Button  className="w-full mt-6">
                  Edit Template
                </Button>
              </CardContent>
            </Card>
            
            <Card className="border">
              <CardContent className="pt-4">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="h-5 w-5 text-secondary" />
                  <h4 className="font-medium">Staff Access</h4>
                </div>
                <div className="space-y-1">
                  <Badge variant="outline" className="text-xs mr-1 mb-1">Facility Access</Badge>
                  <Badge variant="outline" className="text-xs mr-1 mb-1">Equipment Mgmt</Badge>
                </div>
                <Button className="mt-12 w-full">
                  Edit Template
                </Button>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};