import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  ClipboardCheck,
  Calendar,
  Award,
  BarChart3,
  Plus,
  Search,
  Download,
  Eye,
  Edit,
  FileText
} from "lucide-react";

export const Exam = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const upcomingExams = [
    {
      id: "EX001",
      title: "Mid-Term Mathematics",
      grade: "Grade 10",
      subject: "Mathematics",
      date: "2024-03-20",
      time: "09:00 AM",
      duration: "2 hours",
      room: "Hall A",
      status: "Scheduled"
    },
    {
      id: "EX002",
      title: "Physics Unit Test",
      grade: "Grade 11",
      subject: "Physics", 
      date: "2024-03-22",
      time: "11:00 AM",
      duration: "1.5 hours",
      room: "Room 301",
      status: "Scheduled"
    },
    {
      id: "EX003",
      title: "English Literature Exam",
      grade: "Grade 9",
      subject: "English",
      date: "2024-03-25",
      time: "10:00 AM",
      duration: "2.5 hours",
      room: "Hall B",
      status: "Scheduled"
    }
  ];

  const examResults = [
    {
      examId: "EX004",
      title: "Chemistry Mid-Term",
      grade: "Grade 12",
      totalStudents: 28,
      avgScore: 78.5,
      passRate: 89,
      status: "Results Published",
      date: "2024-03-10"
    },
    {
      examId: "EX005",
      title: "History Quiz",
      grade: "Grade 8",
      totalStudents: 32,
      avgScore: 82.3,
      passRate: 94,
      status: "Results Published",
      date: "2024-03-08"
    },
    {
      examId: "EX006",
      title: "Biology Unit Test",
      grade: "Grade 11",
      totalStudents: 25,
      avgScore: 75.8,
      passRate: 84,
      status: "Under Review",
      date: "2024-03-12"
    }
  ];

  const studentResults = [
    {
      studentId: "ST001",
      name: "John Smith",
      rollNo: "101",
      grade: "10-A",
      subject: "Mathematics",
      marks: 85,
      grade_obtained: "A",
      status: "Pass"
    },
    {
      studentId: "ST002",
      name: "Emma Johnson", 
      rollNo: "205",
      grade: "9-B",
      subject: "English",
      marks: 92,
      grade_obtained: "A+",
      status: "Pass"
    },
    {
      studentId: "ST003",
      name: "Alex Wilson",
      rollNo: "087", 
      grade: "11-A",
      subject: "Physics",
      marks: 78,
      grade_obtained: "B+",
      status: "Pass"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start ">
        <div>
          <h2 className="text-lg font-bold">Exams Management</h2>
          <p className="text-gray-500 text-xs">Schedule exams, manage results, and generate reports</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Results
          </Button>
          <Button >
            <Plus className=" h-4 w-4" />
            Schedule Exam
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-card shadow-soft">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Upcoming Exams</p>
                <p className="text-xl font-bold text-center">7</p>
              </div>
              <Calendar className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-card shadow-soft">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 ">Completed Exams</p>
                <p className="text-xl font-bold text-center">15</p>
              </div>
              <ClipboardCheck className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-card shadow-soft">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Average Score</p>
                <p className="text-xl font-bold text-center">82.5%</p>
              </div>
              <BarChart3 className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-card shadow-soft">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Pass Rate</p>
                <p className="text-xl font-bold">89%</p>
              </div>
              <Award className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="schedule" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="schedule">Exam Schedule</TabsTrigger>
          <TabsTrigger value="results">Results Overview</TabsTrigger>
          <TabsTrigger value="students">Student Results</TabsTrigger>
          <TabsTrigger value="reports">Report Cards</TabsTrigger>
        </TabsList>

        {/* Exam Schedule Tab */}
        <TabsContent value="schedule" className="space-y-4">
          <Card className="bg-gradient-card shadow-soft">
            <CardHeader>
              <CardTitle className="text-lg">Upcoming Exams</CardTitle>
              <CardDescription className="text-xs">Scheduled examinations for all grades</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Exam Title</TableHead>
                      <TableHead>Grade</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Room</TableHead>
                      <TableHead className="px-9">Status</TableHead>
                      <TableHead className="text-right px-9">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {upcomingExams.map((exam) => (
                      <TableRow key={exam.id}>
                        <TableCell className="font-medium text-xs">{exam.title}</TableCell>
                        <TableCell className="text-xs">{exam.grade}</TableCell>
                        <TableCell  className="text-xs">{exam.subject}</TableCell>
                        <TableCell  className="text-xs">{exam.date}</TableCell>
                        <TableCell  className="text-xs">{exam.time}</TableCell>
                        <TableCell  className="text-xs">{exam.duration}</TableCell>
                        <TableCell  className="text-xs">{exam.room}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">{exam.status}</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex gap-2 justify-end">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
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
        </TabsContent>

        {/* Results Overview Tab */}
        <TabsContent value="results" className="space-y-4">
          <Card className="bg-gradient-card shadow-soft">
            <CardHeader>
              <CardTitle className="text-lg">Exam Results Overview</CardTitle>
              <CardDescription className="text-xs text-gray-500">Summary of completed examinations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Exam Title</TableHead>
                      <TableHead>Grade</TableHead>
                      <TableHead>Students</TableHead>
                      <TableHead>Average Score</TableHead>
                      <TableHead>Pass Rate</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {examResults.map((result) => (
                      <TableRow key={result.examId}>
                        <TableCell className="font-medium text-xs">{result.title}</TableCell>
                        <TableCell className="font-medium text-xs">{result.grade}</TableCell>
                        <TableCell className="font-medium text-xs">{result.totalStudents}</TableCell>
                        <TableCell className="font-medium text-xs">{result.avgScore}%</TableCell>
                        <TableCell>
                          <Badge variant={result.passRate >= 80 ? "default" : "destructive"}>
                            {result.passRate}%
                          </Badge>
                        </TableCell>
                        <TableCell>{result.date}</TableCell>
                        <TableCell>
                          <Badge 
                            variant={result.status === "Results Published" ? "default" : "secondary"}
                          >
                            {result.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            <FileText className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Student Results Tab */}
        <TabsContent value="students" className="space-y-4">
          <Card className="bg-gradient-card shadow-soft">
            <CardHeader>
              <CardTitle className="text-lg">Individual Student Results</CardTitle>
              <CardDescription  className="text-xs text-gray-500">Detailed marks and grades for each student</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                  <Input
                    placeholder="Search by student name or roll number..."
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student Name</TableHead>
                      <TableHead>Roll No.</TableHead>
                      <TableHead>Grade</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Marks</TableHead>
                      <TableHead>Grade</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {studentResults.map((student) => (
                      <TableRow key={student.studentId}>
                        <TableCell className="font-medium text-xs">{student.name}</TableCell>
                        <TableCell className="font-medium text-xs">{student.rollNo}</TableCell>
                        <TableCell className="font-medium text-xs">{student.grade}</TableCell>
                        <TableCell className="font-medium text-xs">{student.subject}</TableCell>
                        <TableCell className="font-medium text-xs">{student.marks}</TableCell>
                        <TableCell>
                          <Badge variant="default">{student.grade_obtained}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={student.status === "Pass" ? "default" : "destructive"}
                          >
                            {student.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            <FileText className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Report Cards Tab */}
        <TabsContent value="reports" className="space-y-4">
          <Card className="bg-gradient-card shadow-soft">
            <CardHeader>
              <CardTitle className="text-lg">Generate Report Cards</CardTitle>
              <CardDescription  className="text-xs text-gray-500">Create and manage student report cards</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <FileText className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Report Card Generation</h3>
                <p className="text-gray-500 text-sm mb-4">
                  Generate comprehensive report cards for individual students or entire grades.
                </p>
                <div className="flex gap-3 justify-center">
                  <Button >
                    Generate Individual Report
                  </Button>
                  <Button variant="outline">
                    Generate Batch Reports
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};