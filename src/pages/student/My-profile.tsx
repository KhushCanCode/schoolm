import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Mail, Phone, MapPin, Calendar, BookOpen, Award } from "lucide-react";

export default function StudentProfile() {
  return (
    <div className="p-6 space-y-6 ml-12 my-4">
      <div>
        <h1 className="text-lg font-bold ">Student Profile</h1>
        <p className="text-gray-500 text-xs">Manage your personal information and academic details</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader className="text-center pb-2">
            <Avatar className="w-24 h-24 mx-auto">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>AS</AvatarFallback>
            </Avatar>
            <CardTitle className="mt-4 text-lg">Arjun Sharma</CardTitle>
            <p className="text-xs text-gray-500">Student ID: STU2024001</p>
            <Badge variant="secondary" className="w-fit mx-auto mt-2">Computer Science</Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full" variant="outline">
              Edit Profile
            </Button>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex text-lg items-center gap-2">
              <User className="h-5 w-5" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-xs font-medium">Email</p>
                  <p className="text-xs text-gray-500">arjun.sharma@college.edu</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-xs font-medium">Phone</p>
                  <p className="text-xs text-gray-500">+91 98765 43210</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-xs font-medium">Address</p>
                  <p className="text-xs text-gray-500">123 College Street, Delhi</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-xs font-medium">Date of Birth</p>
                  <p className="text-xs text-gray-500">15 March 2002</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex text-lg items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Academic Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-medium">Course</p>
                <p className="text-xs text-gray-500">Bachelor of Computer Science</p>
              </div>
              <div>
                <p className="text-xs font-medium">Semester</p>
                <p className="text-xs text-gray-500">6th Semester</p>
              </div>
              <div>
                <p className="text-xs font-medium">Admission Year</p>
                <p className="text-xs text-gray-500">2022</p>
              </div>
              <div>
                <p className="text-xs font-medium">Current CGPA</p>
                <p className="text-xs text-gray-500">8.7/10.0</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex text-lg items-center gap-2">
              <Award className="h-5 w-5" />
              Achievements
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <Badge variant="outline" className="w-full justify-start">
                Dean's List 2023
              </Badge>
              <Badge variant="outline" className="w-full justify-start">
                Best Project Award
              </Badge>
              <Badge variant="outline" className="w-full justify-start">
                Academic Excellence
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}