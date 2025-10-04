import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, BookOpen, AlertCircle, TrendingUp, Users } from "lucide-react";

export default function StudentDashboard() {
  const stats = [
    { title: "Attendance", value: "87%", icon: Clock, color: "text-green-600" },
    { title: "Assignments", value: "12", icon: BookOpen, color: "text-blue-600" },
    { title: "Pending Tasks", value: "3", icon: AlertCircle, color: "text-orange-600" },
    { title: "Grade Average", value: "8.7", icon: TrendingUp, color: "text-purple-600" },
  ];

  const recentActivities = [
    { title: "Math Assignment Submitted", time: "2 hours ago", type: "success" },
    { title: "Physics Lab Report Due", time: "Tomorrow", type: "warning" },
    { title: "Computer Science Quiz Completed", time: "Yesterday", type: "success" },
    { title: "Literature Essay Due", time: "3 days", type: "warning" },
  ];

  const upcomingClasses = [
    { subject: "Mathematics", time: "09:00 AM", room: "Room 101" },
    { subject: "Physics", time: "11:00 AM", room: "Lab A" },
    { subject: "Computer Science", time: "02:00 PM", room: "Room 205" },
    { subject: "Literature", time: "04:00 PM", room: "Room 301" },
  ];

  return (
    <div className="space-y-6 ">
      <div>
        <h1 className="text-lg font-bold ">Dashboard</h1>
        <p className="text-gray-500 text-xs">Welcome back! Here's your academic overview</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <AlertCircle className="h-5 w-5" />
              Recent Activities
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium">{activity.title}</p>
                  <p className=" text-gray-500 text-xs">{activity.time}</p>
                </div>
                <Badge variant={activity.type === 'success' ? 'secondary' : 'destructive'}>
                  {activity.type === 'success' ? 'Completed' : 'Pending'}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex text-lg items-center gap-2">
              <Calendar className="h-5 w-5" />
              Today's Classes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingClasses.map((class_, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium text-xs">{class_.subject}</p>
                  <p className=" text-gray-500 text-xs">{class_.room}</p>
                </div>
                <Badge variant="outline">{class_.time}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 border rounded-lg text-center cursor-pointer hover:bg-muted/50 transition-colors">
              <BookOpen className="h-8 w-8 mx-auto mb-2 text-primary" />
              <p className="text-xs font-medium">View Assignments</p>
            </div>
            <div className="p-4 border rounded-lg text-center cursor-pointer hover:bg-muted/50 transition-colors">
              <Calendar className="h-8 w-8 mx-auto mb-2 text-primary" />
              <p className="text-xs font-medium">Check Attendance</p>
            </div>
            <div className="p-4 border rounded-lg text-center cursor-pointer hover:bg-muted/50 transition-colors">
              <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
              <p className="text-xs font-medium">Join Study Group</p>
            </div>
            <div className="p-4 border rounded-lg text-center cursor-pointer hover:bg-muted/50 transition-colors">
              <AlertCircle className="h-8 w-8 mx-auto mb-2 text-primary" />
              <p className="text-xs font-medium">View Notices</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}