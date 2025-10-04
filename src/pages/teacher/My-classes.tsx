import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Users, 
  Calendar, 
  Clock, 
  MapPin, 
  Plus,
  Eye,
  Edit,
  BookOpen
} from "lucide-react";

export default function MyClasses() {
  const classes = [
    {
      id: 1,
      name: "Grade 10A - Mathematics",
      subject: "Mathematics",
      grade: "10A",
      students: 28,
      schedule: "Mon, Wed, Fri - 9:00 AM",
      room: "Room 201",
      nextClass: "Today at 9:00 AM",
      progress: 75,
      color: "primary"
    },
    {
      id: 2,
      name: "Grade 11B - Physics",
      subject: "Physics", 
      grade: "11B",
      students: 24,
      schedule: "Tue, Thu - 11:00 AM",
      room: "Lab 1",
      nextClass: "Tomorrow at 11:00 AM",
      progress: 60,
      color: "success"
    },
    {
      id: 3,
      name: "Grade 12A - Chemistry",
      subject: "Chemistry",
      grade: "12A", 
      students: 22,
      schedule: "Mon, Wed - 2:00 PM",
      room: "Lab 2",
      nextClass: "Today at 2:00 PM",
      progress: 85,
      color: "warning"
    },
    {
      id: 4,
      name: "Grade 9C - General Science",
      subject: "General Science",
      grade: "9C",
      students: 30,
      schedule: "Tue, Fri - 10:00 AM", 
      room: "Room 105",
      nextClass: "Friday at 10:00 AM",
      progress: 45,
      color: "info"
    }
  ];

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "text-success";
    if (progress >= 60) return "text-warning";
    return "text-muted-foreground";
  };

  const getColorClasses = (color: string) => {
    const colors = {
      primary: "border-primary bg-primary/5",
      success: "border-success bg-success/5", 
      warning: "border-warning bg-warning/5",
      info: "border-info bg-info/5"
    };
    return colors[color as keyof typeof colors] || colors.primary;
  };

  return (
    <div className="space-y-6 animate-fade-in px-16 py-9 ">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-lg font-bold ">My Classes</h1>
          <p className="text-gray-500 text-xs mt-1">
            Manage your assigned classes and student groups
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 " />
          Add Class
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-card shadow-md border-0  w-[250px]">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <BookOpen className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground">Total Classes</p>
                <p className="text-lg font-bold text-foreground">{classes.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-md border-0">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-success/10 rounded-lg">
                <Users className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground">Total Students</p>
                <p className="text-lg font-bold text-foreground">
                  {classes.reduce((sum, cls) => sum + cls.students, 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-md border-0">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-warning/10 rounded-lg">
                <Calendar className="w-5 h-5 text-warning" />
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground">Classes Today</p>
                <p className="text-lg font-bold text-foreground">3</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-md border-0">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-info/10 rounded-lg">
                <Clock className="w-5 h-5 text-info" />
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground">Next Class</p>
                <p className="text-xs font-bold text-foreground">30 minutes</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Classes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map((classItem) => (
          <Card 
            key={classItem.id} 
            className={`bg-gradient-card shadow-md hover:shadow-hover transition-all duration-300 border-l-4 ${getColorClasses(classItem.color)}`}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-md font-semibold text-foreground">
                    {classItem.subject}
                  </CardTitle>
                  <p className="text-xs text-gray-500">{classItem.grade}</p>
                </div>
                <Badge variant="secondary" className="text-xs">
                  Active
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Student Count */}
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs  font-medium">{classItem.students} students</span>
              </div>

              {/* Schedule */}
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{classItem.schedule}</span>
              </div>

              {/* Room */}
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{classItem.room}</span>
              </div>

              {/* Progress */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Course Progress</span>
                  <span className={`font-medium ${getProgressColor(classItem.progress)}`}>
                    {classItem.progress}%
                  </span>
                </div>
                <div className="w-full bg-secondary/30 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-500 ${
                      classItem.progress >= 80 ? 'bg-success' :
                      classItem.progress >= 60 ? 'bg-warning' : 'bg-muted-foreground'
                    }`}
                    style={{ width: `${classItem.progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Next Class */}
              <div className="pt-2 border-t border-border">
                <p className="text-xs text-muted-foreground mb-2">Next Class:</p>
                <p className="text-xs font-medium text-foreground">{classItem.nextClass}</p>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button >
                  <Eye className="w-4 h-4" />
                  View
                </Button>
                <Button >
                  <Edit className="w-4 h-4" />
                  Manage
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Class Activities */}
      <Card className="bg-gradient-card shadow-card border-0">
        <CardHeader>
          <CardTitle className="text-lg">Recent Class Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { activity: "Assignment submitted by Grade 10A", time: "2 hours ago", class: "Mathematics" },
              { activity: "New quiz created for Grade 11B", time: "4 hours ago", class: "Physics" },
              { activity: "Attendance marked for Grade 12A", time: "1 day ago", class: "Chemistry" },
            ].map((activity, index) => (
              <div key={index} className="flex items-center gap-4 p-3 bg-secondary/30 rounded-lg">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="text-xs bg-primary/10 text-primary">
                    {activity.class[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-xs font-medium text-foreground">{activity.activity}</p>
                  <p className="text-xs text-muted-foreground">{activity.time} • {activity.class}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}