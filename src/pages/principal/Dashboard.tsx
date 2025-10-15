import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Contact, BookOpen, MessageSquare, FileText, DollarSign, Calendar, IndianRupee, Pen, PenBox, PenLineIcon, BookCheck, ClipboardList } from 'lucide-react';
import { useUsersStore } from '@/store/useUsersStore';
import { useAuthStore } from '@/store/useAuthStore';
import { Stats } from '@/store/useUsersStore';
import { Skeleton } from "@/components/ui/skeleton";
import Heading from '@/components/common/Heading';


const AdminDashboard = () => {

const getStats = useUsersStore((state) => state.getStats);
const authUser = useAuthStore((state) => state.authUser);
const [stats, setStats] = useState<Stats | null>(null);

 
//Fetching stats -> getStats contoller is in useUsersStore
useEffect(() => {
  const fetchStats = async () => {
    const data = await getStats(authUser.school_id);
    if (data) setStats(data);
  };
  fetchStats();
}, [getStats]);


const statCards = [
      {
      title: 'Total Users',
      value: stats ? stats.totalUsers : 'Loading...',
      description: 'Active users',
      icon: Users,
      color: 'text-primary',
    },
    {
      title: 'Total Students',
      value: stats ? stats.totalStudents : 'Loading...',
      description: 'Active students',
      icon: Contact,
      color: 'text-green-500',
    },
    {
      title: 'Total Classes',
      value: stats ? stats.classCount : 'Loading...',
      description: 'Active classes',
      icon: BookOpen,
      color: 'text-yellow-500',
    },
    {
      title: 'Pending Dues',
      value: stats ? `₹${stats.pendingDues}` : 'Loading...',
      description: 'Amount pending',
      icon: IndianRupee,
      color: 'text-red-500',
    },
    
  ];

  const recentActivities = [
  { title: "New student admission", time: "2 hours ago", color: "bg-blue-600" },
  { title: "Fee payment received", time: "4 hours ago", color: "bg-green-600" },
  { title: "New notice published", time: "6 hours ago", color: "bg-orange-600" },
];


const quickActions = [
  {
    title: "Create New Notice",
    description: "Send announcement to students",
    icon: PenBox
  },
  {
    title: "Mark Attendance",
    description: "Record student attendance",
    icon: BookCheck
  },
  {
    title: "Generate Report",
    description: "Create student progress report",
    icon: ClipboardList
  },
];

  return (
    <div className="space-y-4 md:space-y-6 mx-auto max-w-7xl">
      <Heading 
          title="Dashboard" 
          description="Welcome to your school management dashboard" 
        />


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          const isLoading = !stats;

          return (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 ">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-16" />
                    <Skeleton className="h-3 w-24 " />
                  </div>
                ) : (
                  <>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p className="text-xs text-slate-500">{stat.description}</p>
                  </>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>


      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Activities</CardTitle>
            <CardDescription className="text-xs text-slate-500">
              Latest updates from your school
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className={`w-2 h-2 rounded-full ${activity.color}`}></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.title}</p>
                    <p className="text-xs text-slate-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

       <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
              <CardDescription className="text-xs text-slate-500">
                Frequently used actions
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="space-y-3">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <button
                      key={index}
                      className="w-full flex items-center gap-3 text-left p-3 border border-border border-dashed rounded-lg hover:bg-muted/80 transition-colors"
                    >
                      {/* Icon with background */}
                      <div className="bg-primary text-white p-2 rounded-md flex items-center justify-center">
                        <Icon className="h-4 w-4" />
                      </div>

                      {/* Text Section */}
                      <div>
                        <p className="font-medium text-sm">{action.title}</p>
                        <p className="text-slate-500 text-xs">{action.description}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

      </div>
    </div>
  );
};

export default AdminDashboard;




