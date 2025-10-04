import {StaticsCart} from "@/components/Dashboard/StaticsCart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  ClipboardList, 
  Calendar, 
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Plus
} from "lucide-react";

export default function Dashboard() { 
  const upcomingClasses = [
    { time: "09:00 AM", subject: "Mathematics", class: "Grade 10A", room: "Room 201" },
    { time: "11:00 AM", subject: "Physics", class: "Grade 11B", room: "Lab 1" },
    { time: "02:00 PM", subject: "Chemistry", class: "Grade 12A", room: "Lab 2" },
  ];

  const pendingTasks = [
    { task: "Grade Math Quiz - Grade 10A", due: "Today", priority: "high" },
    { task: "Prepare Physics Presentation", due: "Tomorrow", priority: "medium" },
    { task: "Submit Monthly Report", due: "2 days", priority: "low" },
  ];

  const recentActivities = [
    { activity: "Created new assignment: Algebra Problems", time: "2 hours ago" },
    { activity: "Graded Biology Test for Grade 11", time: "4 hours ago" },
    { activity: "Posted announcement to Grade 10A", time: "1 day ago" },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="ml-6">
          <h1 className="text-lg font-bold text-foreground">Welcome Dashboard</h1>
          <p className="text-gray-500 text-xs mt-1">
            Here's what's happening with your classes today
          </p>
        </div>
        <Button >
          <Plus className="w-4 h-4 mr-2" />
          Quick Action
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-4 gap-6">
        <StaticsCart
          title="Total Students"
          value={156}
          change="+12 this month"
          changeType="positive"
          icon={Users}
          color="primary"
        />
        <StaticsCart
          title="Active Assignments"
          value={8}
          change="2 due today"
          changeType="neutral"
          icon={ClipboardList}
          color="warning"
        />
        <StaticsCart
          title="Classes Today"
          value={5}
          change="Next in 30 min"
          changeType="neutral"
          icon={Calendar}
          color="info"
        />
        <StaticsCart
          title="Grade Average"
          value="87.5%"
          change="+2.3% from last month"
          changeType="positive"
          icon={TrendingUp}
          color="success"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Schedule */}
        <Card className="lg:col-span-2  bg-gradient-card shadow-md border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Clock className="w-5 h-5 text-primary " />
              Today's Schedule
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingClasses.map((cls, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <div className="text-sm font-medium text-primary">{cls.time}</div>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm text-foreground">{cls.subject}</h4>
                      <p className="text-xs text-gray-500">{cls.class} • {cls.room}</p>
                    </div>
                  </div>
                  <Button  >
                    Join Class
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pending Tasks */}
        <Card className="bg-gradient-card shadow-md border-0">
          <CardHeader>
            <CardTitle className="flex text-lg items-center gap-2">
              <CheckCircle className="w-5 h-5 text-success" />
              Pending Tasks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingTasks.map((task, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-secondary/30 rounded-lg">
                  <AlertCircle className={`w-4 h-4 mt-1 flex-shrink-0 ${
                    task.priority === 'high' ? 'text-destructive' :
                    task.priority === 'medium' ? 'text-warning' : 'text-muted-foreground'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground leading-tight">
                      {task.task}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs  text-gray-500">Due: {task.due}</span>
                      <Badge 
                        variant={task.priority === 'high' ? 'destructive' : 
                               task.priority === 'medium' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {task.priority}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities */}
      <Card className="bg-gradient-card shadow-card border-0">
        <CardHeader>
          <CardTitle className="text-lg">Recent Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start gap-3 p-3 hover:bg-secondary/30 rounded-lg transition-colors">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="text-sm font-medium text-foreground">{activity.activity}</p>
                  <p className="text-xs  text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}