import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Mail, Phone, MapPin, Calendar, Edit, Trash2, BookOpen, User } from "lucide-react";

const TeacherProfile = () => {
  const { id } = useParams();

  // Mock teacher data - replace with actual API call
  const teacher = {
    id: id,
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@school.edu",
    phone: "+1 234 567 8900",
    address: "456 Oak Avenue, City, State 12345",
    dateOfBirth: "1985-07-22",
    joinDate: "2020-08-15",
    department: "Mathematics",
    subjects: ["Algebra", "Geometry", "Calculus"],
    qualification: "PhD in Mathematics",
    experience: "8 years",
    status: "Active",
    avatar: "/placeholder.svg"
  };

  return (
    <div className="space-y-6 my-12 ml-12">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
           <div>
            <h1 className="text-lg font-bold ">Teacher Profile</h1>
            <p className="text-gray-500 text-xs">View and manage teacher information</p>
          </div>
          <Link to="/teacher/dashboard">
            <Button >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
         
          
        </div>
        <div className="flex space-x-2 mx-9">
          <Link to={`/teachers/edit/${id}`}>
            <Button >
              <Edit className="w-4 h-4 " />
              Edit
            </Button>
          </Link>
          <Button variant="destructive" className="text-white">
            <Trash2 className="w-4 h-4 " />
            Delete
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Teacher Basic Info */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Teacher Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center">
              <User className="w-24 h-24 bg-primary text-accent rounded-full object-cover border-4 border-border"/>
             
              <h3 className="mt-4 text-lg font-semibold">{teacher.name}</h3>
              <Badge variant={teacher.status === "Active" ? "default" : "secondary"}>
                {teacher.status}
              </Badge>
            </div>

            <div className="space-y-3 text-gray-600">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 " />
                <span className="text-xs">{teacher.email}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 " />
                <span className="text-xs">{teacher.phone}</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 " />
                <span className="text-xs">{teacher.address}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="w-4 h-4 " />
                <span className="text-xs">Born: {teacher.dateOfBirth}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Professional Information */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Professional Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-md font-medium ">Department</label>
                <p className="text-sm font-semibold text-gray-500">{teacher.department}</p>
              </div>
              <div>
                <label className="text-md font-medium ">Experience</label>
                <p className="text-sm text-gray-500 font-semibold">{teacher.experience}</p>
              </div>
              <div>
                <label className="text-md font-medium text-muted-foreground">Join Date</label>
                <p className="text-sm text-gray-500 font-semibold">{teacher.joinDate}</p>
              </div>
              <div>
                <label className="text-md font-medium text-muted-foreground">Qualification</label>
                <p className="text-sm text-gray-500 font-semibold">{teacher.qualification}</p>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-border">
              <h4 className="text-md font-semibold mb-4 flex items-center">
                <BookOpen className="w-5 h-5 mr-2" />
                Subjects Teaching
              </h4>
              <div className="flex flex-wrap gap-2">
                {teacher.subjects.map((subject, index) => (
                  <Badge key={index} variant="secondary">
                    {subject}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Classes & Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-[1043px]">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Current Classes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-secondary/20 rounded-lg">
                <div>
                  <p className="font-medium text-sm">Class 10A - Algebra</p>
                  <p className="text-xs text-gray-500">Monday, Wednesday, Friday - 9:00 AM</p>
                </div>
                <Badge variant="default">25 Students</Badge>
              </div>
              <div className="flex justify-between items-center p-3 bg-secondary/20 rounded-lg">
                <div >
                  <p className="font-medium text-sm" >Class 9B - Geometry</p>
                  <p className="text-xs text-gray-500 ">Tuesday, Thursday - 10:30 AM</p>
                </div>
                <Badge variant="default">28 Students</Badge>
              </div>
              <div className="flex justify-between items-center p-3 bg-secondary/20 rounded-lg">
                <div>
                  <p className="font-medium text-sm">Class 11A - Calculus</p>
                  <p className="text-xs text-gray-500">Monday, Wednesday - 2:00 PM</p>
                </div>
                <Badge variant="default">22 Students</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg ">Performance Overview</CardTitle>
          </CardHeader>
          <CardContent> 
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Total Students</span>
                <span className="font-semibold">75</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Average Class Performance</span>
                <Badge variant="default">85%</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Classes per Week</span>
                <span className="font-semibold">12</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Attendance Rate</span>
                <Badge variant="default">96%</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TeacherProfile;