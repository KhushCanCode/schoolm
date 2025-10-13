import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Plus, Eye, Edit, Trash2 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "react-router-dom";
import Heading from "@/components/common/Heading";
import { Skeleton } from "@/components/ui/skeleton"; // ✅ Import Skeleton

interface Student {
  id: number;
  rollNo: string;
  candidateName: string;
  class: string;
  section: string;
  email: string;
  phone: string;
  address: string;
  fatherName: string;
  status: "active" | "inactive";
}

const StudentList = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true); // ✅ loading state

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setStudents([
        {
          id: 1,
          rollNo: "101",
          candidateName: "Aarav Sharma",
          class: "10",
          section: "A",
          email: "aarav.sharma@example.com",
          phone: "9876543210",
          address: "123, Green Park, Delhi",
          fatherName: "Rajesh Sharma",
          status: "active",
        },
        {
          id: 2,
          rollNo: "102",
          candidateName: "Priya Mehta",
          class: "9",
          section: "B",
          email: "priya.mehta@example.com",
          phone: "9876543211",
          address: "456, Sector 14, Gurugram",
          fatherName: "Amit Mehta",
          status: "inactive",
        },
        {
          id: 3,
          rollNo: "103",
          candidateName: "Rohan Verma",
          class: "10",
          section: "C",
          email: "rohan.verma@example.com",
          phone: "9876543212",
          address: "22, Patel Nagar, Rohtak",
          fatherName: "Suresh Verma",
          status: "active",
        },
      ]);
      setLoading(false);
    }, );
    return () => clearTimeout(timer);
  }, []);

  const handleDelete = (id: number) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;
    setStudents((prev) => prev.filter((s) => s.id !== id));
  };

  const filteredStudents = students.filter(
    (student) =>
      student.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.class.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <Heading title="Students Management" description="Manage all student records and information" />

          <div className="flex gap-2">
            <Link to="/principal/dashboard">
              <Button variant="outline">Back to Dashboard</Button>
            </Link>
            <Link to="/principal/students/register">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Student
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        
            <>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-primary">{students.length}</div>
                  <div className="text-sm text-slate-500">Total Students</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {students.filter((s) => s.status === "active").length}
                  </div>
                  <div className="text-sm text-slate-500">Active Students</div>
                </CardContent>
              </Card>
            </>
        </div>

        {/* Table */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg">All Students</CardTitle>
              <div className="relative w-64">
                <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-slate-500" />
                </span>
                <Input
                  placeholder="Search students..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Roll No.</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Father's Name</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead className="text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.map((student) => (
                    <TableRow key={student.id} className="font-medium text-xs">
                      <TableCell>{student.rollNo}</TableCell>
                      <TableCell>{student.candidateName}</TableCell>
                      <TableCell>{`${student.class} - ${student.section}`}</TableCell>
                      <TableCell>{student.email}</TableCell>
                      <TableCell>{student.phone}</TableCell>
                      <TableCell>{student.fatherName}</TableCell>
                      <TableCell className="text-center">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            student.status === "active"
                              ? "bg-accent text-primary"
                              : "bg-muted text-slate-500"
                          }`}
                        >
                          {student.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex justify-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(student.id)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentList;
