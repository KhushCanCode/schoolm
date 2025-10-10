import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  School,
  MapPin,
  Phone,
  Mail,
  Globe,
  Calendar,
  Users,
  Award,
  Building,
  Clock,
  Edit,
  Save,
  Camera
} from "lucide-react";

export const SchoolInfo = () => {
  const [isEditing, setIsEditing] = useState(false);

  const schoolData = {
    name: "EduManager High School",
    establishedYear: "1995",
    motto: "Excellence in Education, Character in Life",
    address: "123 Education Street, Knowledge City, State - 12345",
    phone: "+1 (555) 123-4567",
    email: "info@edumanagerschool.edu",
    website: "www.edumanagerschool.edu",
    principalName: "Dr. Margaret Wilson",
    totalStudents: 1248,
    totalTeachers: 78,
    totalStaff: 45,
    affiliation: "State Education Board",
    accreditation: "NAAC Grade A+",
    schoolType: "Co-Educational",
    mediumOfInstruction: "English"
  };

  const facilities = [
    { name: "Science Laboratories", count: 6, description: "Well-equipped physics, chemistry, and biology labs" },
    { name: "Computer Labs", count: 3, description: "Modern computer labs with latest technology" },
    { name: "Library", count: 1, description: "Central library with 15,000+ books and digital resources" },
    { name: "Sports Complex", count: 1, description: "Multi-sport complex with indoor and outdoor facilities" },
    { name: "Auditorium", count: 1, description: "500-seat auditorium for events and assemblies" },
    { name: "Transport Buses", count: 12, description: "Safe and reliable transportation service" }
  ];

  const achievements = [
    { title: "Best School Award 2023", description: "State Education Excellence Award", year: "2023" },
    { title: "100% Pass Rate", description: "Grade 12 Board Examinations", year: "2023" },
    { title: "Sports Championship", description: "Inter-School Athletic Meet Winners", year: "2023" },
    { title: "Science Fair Winners", description: "Regional Science Exhibition", year: "2022" }
  ];

  const timings = [
    { day: "Monday - Friday", morning: "6:00 AM - 2:30 PM", office: "6:00 AM - 4:00 PM" },
    { day: "Saturday", morning: "6:00 AM - 12:00 PM", office: "6:00 AM - 1:00 PM" },
    { day: "Sunday", morning: "Closed", office: "Closed" }
  ];

  return (
    <div className="space-y-6  ">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-lg font-bold">School Information</h2>
          <p className="text-gray-500 text-xs">Complete school profile and institutional details</p>
        </div>
        <Button 
          onClick={() => setIsEditing(!isEditing)}
          variant={isEditing ? "default" : "outline"}
          className={isEditing ? "bg-gradient-primary hover:opacity-90" : ""}
        >
          {isEditing ? (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </>
          ) : (
            <>
              <Edit className="mr-2 h-4 w-4" />
              Edit Info
            </>
          )}
        </Button>
      </div>

      {/* School Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-[1030px]">
        <Card className="bg-gradient-card shadow-soft">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500">Total Students</p>
                <p className="text-lg font-bold ">{schoolData.totalStudents}</p>
              </div>
              <Users className="h-6 w-6 " />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-card shadow-soft">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500">Teaching Staff</p>
                <p className="text-lg font-bold text-success">{schoolData.totalTeachers}</p>
              </div>
              <School className="h-6 w-6 text-success" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-card shadow-soft">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500">Support Staff</p>
                <p className="text-lg font-bold text-warning">{schoolData.totalStaff}</p>
              </div>
              <Building className="h-6 w-6 text-warning" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-card shadow-soft">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500">Established</p>
                <p className="text-lg font-bold">{schoolData.establishedYear}</p>
              </div>
              <Calendar className="h-6 w-6 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
          <TabsTrigger value="facilities">Facilities</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="timings">Timings</TabsTrigger>
        </TabsList>

        {/* Basic Info Tab */}
        <TabsContent value="basic" className="space-y-4">
          <Card className="bg-gradient-card shadow-soft">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-primary/10 rounded-lg flex items-center justify-center">
                  <School className="h-10 w-10 text-primary" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-lg">{schoolData.name}</CardTitle>
                  <CardDescription className="text-xs  ">"{schoolData.motto}"</CardDescription>
                </div>
                {isEditing && (
                  <Button variant="ghost" size="sm">
                    <Camera className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-medium text-gray-500">School Name</label>
                    {isEditing ? (
                      <Input defaultValue={schoolData.name} className="mt-1" />
                    ) : (
                      <p className="text-xs font-medium">{schoolData.name}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500">School Motto</label>
                    {isEditing ? (
                      <Input defaultValue={schoolData.motto} className="mt-1" />
                    ) : (
                      <p className="text-xs ">"{schoolData.motto}"</p>
                    )}
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500">Principal</label>
                    {isEditing ? (
                      <Input defaultValue={schoolData.principalName} className="mt-1" />
                    ) : (
                      <p className="text-xs">{schoolData.principalName}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500">Established Year</label>
                    {isEditing ? (
                      <Input defaultValue={schoolData.establishedYear} className="mt-1" />
                    ) : (
                      <p className="text-xs">{schoolData.establishedYear}</p>
                    )}
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-medium text-gray-500">Affiliation</label>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="default">{schoolData.affiliation}</Badge>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500">Accreditation</label>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary">{schoolData.accreditation}</Badge>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500">School Type</label>
                    <p className="text-xs">{schoolData.schoolType}</p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500">Medium of Instruction</label>
                    <p className="text-xs">{schoolData.mediumOfInstruction}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Contact Tab */}
        <TabsContent value="contact" className="space-y-4">
          <Card className="bg-gradient-card shadow-soft">
            <CardHeader>
              <CardTitle className="text-lg">Contact Information</CardTitle>
              <CardDescription className="text-xs text-gray-500">School's official contact details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-1" />
                  <div className="flex-1">
                    <label className="text-xs font-medium text-gray-500">Address</label>
                    {isEditing ? (
                      <Textarea defaultValue={schoolData.address} className="mt-1" rows={3} />
                    ) : (
                      <p className="text-xs text-gray-500">{schoolData.address}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <div className="flex-1">
                    <label className="text-xs font-medium text-gray-500">Phone</label>
                    {isEditing ? (
                      <Input defaultValue={schoolData.phone} className="mt-1" />
                    ) : (
                      <p className="text-xs text-gray-500">{schoolData.phone}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <div className="flex-1">
                    <label className="text-xs font-medium text-gray-500">Email</label>
                    {isEditing ? (
                      <Input defaultValue={schoolData.email} className="mt-1" />
                    ) : (
                      <p className="text-xs text-gray-500">{schoolData.email}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="h-5 w-5 text-primary" />
                  <div className="flex-1">
                    <label className="text-xs font-medium text-gray-500">Website</label>
                    {isEditing ? (
                      <Input defaultValue={schoolData.website} className="mt-1" />
                    ) : (
                      <p className="text-xs text-gray-500">{schoolData.website}</p>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Facilities Tab */}
        <TabsContent value="facilities" className="space-y-4">
          <Card className="bg-gradient-card shadow-soft">
            <CardHeader>
              <CardTitle className="text-lg">School Facilities</CardTitle>
              <CardDescription className="text-xs text-gray-500">Infrastructure and amenities available</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {facilities.map((facility, index) => (
                  <Card key={index} className="border">
                    <CardContent className="pt-4">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-xs text-gray-500">{facility.name}</h4>
                        <Badge variant="outline">{facility.count}</Badge>
                      </div>
                      <p className="text-xs text-gray-500">{facility.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Achievements Tab */}
        <TabsContent value="achievements" className="space-y-4">
          <Card className="bg-gradient-card shadow-soft">
            <CardHeader>
              <CardTitle className="text-lg">School Achievements</CardTitle>
              <CardDescription className="text-xs text-gray-500">Awards and recognitions received</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 rounded-lg bg-accent/30">
                    <Award className="h-6 w-6 text-warning mt-1" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium text-xs text-gray-500">{achievement.title}</h4>
                        <Badge variant="secondary">{achievement.year}</Badge>
                      </div>
                      <p className="text-xs text-gray-500">{achievement.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Timings Tab */}
        <TabsContent value="timings" className="space-y-4">
          <Card className="bg-gradient-card shadow-soft">
            <CardHeader>
              <CardTitle className="text-lg">School Timings</CardTitle>
              <CardDescription className="text-xs text-gray-500">Operating hours and schedules</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {timings.map((timing, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-accent/20">
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-primary" />
                      <span className="font-medium text-xs">{timing.day}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-xs">Classes: {timing.morning}</p>
                      <p className="text-xs text-gray-500">Office: {timing.office}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};