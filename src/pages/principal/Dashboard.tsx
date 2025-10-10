import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Contact, BookOpen, MessageSquare, FileText, DollarSign, Calendar } from 'lucide-react';
import { useUsersStore } from '@/store/useUsersStore';
import { useAuthStore } from '@/store/useAuthStore';
import { Stats } from '@/store/useUsersStore';

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
      color: 'text-yellow-600',
    },
    {
      title: 'Total Students',
      value: stats ? stats.totalStudents : 'Loading...',
      description: 'Active students',
      icon: Contact,
      color: 'text-blue-600',
    },
    {
      title: 'Total Classes',
      value: stats ? stats.classCount : 'Loading...',
      description: 'Active classes',
      icon: BookOpen,
      color: 'text-green-600',
    },
    {
      title: 'Pending Dues',
      value: stats ? `₹${stats.pendingDues}` : 'Loading...',
      description: 'Amount pending',
      icon: DollarSign,
      color: 'text-red-600',
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
  },
  {
    title: "Mark Attendance",
    description: "Record student attendance",
  },
  {
    title: "Generate Report",
    description: "Create student progress report",
  },
];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold ">Dashboard</h2>
        <p className="text-gray-500 text-xs">Welcome to your school management dashboard</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold">{stat.value}</div>
                <p className="text-xs text-gray-500">{stat.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Activities</CardTitle>
            <CardDescription className="text-xs text-gray-500">
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
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

       <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Actions</CardTitle>
          <CardDescription className="text-xs text-gray-500">
            Frequently used actions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {quickActions.map((action, index) => (
              <button
                key={index}
                className="w-full text-left p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
              >
                <p className="font-medium text-sm">{action.title}</p>
                <p className="text-gray-500 text-xs">{action.description}</p>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;