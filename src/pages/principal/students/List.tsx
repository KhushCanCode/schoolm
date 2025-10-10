import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Eye, Edit, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";
import { useUsersStore } from "@/store/useUsersStore";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Student {
  id: number;
  rollNo: string;
  candidateName: string;
  class: string;
  section: string;
  email: string;
  phone: string;
  address: string;
  status: "active" | "inactive";
  fatherName: string;
  admissionDate: string;
}

interface School {
  id: string;
  name: string;
}

const StudentList = () => {
     const { authUser } = useAuthStore();
     const schoolId = authUser.schoolId;

  const { toast } = useToast();
  const [students, setStudents] = useState<Student[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const getStudentDetails = useUsersStore((state) => state.getStudentDetails);

  // ========================= FETCHING STUDENTS =========================
  useEffect(() => {
    const fetchStudents = async () => {
      if (!schoolId) return;
      const result = await getStudentDetails(schoolId);
      console.log(result)
      if (result) setStudents(result as any);
      else setStudents([]);
    };
    fetchStudents();
  }, [schoolId]);

  // ========================= FILTERING =========================
  const filteredStudents = students.filter(
    (student) =>
      student.candidateName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.class?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ========================= DELETE =========================
  const handleDelete = (id: number) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;
    setStudents((prev) => prev.filter((s) => s.id !== id));
  };

  // ========================= RENDER =========================
  return (
    <div className="min-h-screen bg-background ">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-lg font-bold ">Student List</h1>
            <p className="text-gray-500 text-xs">Manage and view all students</p>
          </div>
          <Link to="/admin/students/register">
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add New Student
            </Button>
          </Link>
        </div>

        {/* Search and Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="grid md:col-span-2 gap-4 ">
            <div className="relative ">
              <Search className="absolute left-3   text-gray-500 h-4 w-4" />
              <Input
                placeholder="Search students by name, roll number, or class..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

          </div>

          {/* Stats */}
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{students.length}</div>
                <div className="text-sm text-gray-500">Total Students</div>
              </div>
            </CardContent>
          </Card>

          <Card className="w-[250px]">
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {students.filter((s) => s.status === "active").length}
                </div>
                <div className="text-sm text-gray-500">Active Students</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Students Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              All Students ({filteredStudents.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b text-sm">
                    <th className="text-left p-4 font-medium text-gray-500">Roll No.</th>
                    <th className="text-left p-4 font-medium text-gray-500">Name / Email</th>
                    <th className="text-left p-4 font-medium text-gray-500">Class</th>
                    <th className="text-left p-4 font-medium text-gray-500">Contact / Address</th>
                    <th className="text-left p-4 font-medium text-gray-500">Father's Name</th>
                    <th className="text-left p-4 font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student) => (
                    <tr key={student.id} className="border-b text-sm hover:bg-muted/50">
                      <td className="p-4">
                        <span className="font-medium">{student.rollNo}</span>
                      </td>
                      <td className="p-4">
                        <div>
                          <div className=" text-sm">{student.candidateName}</div>
                          <div className=" text-gray-500">{student.email}</div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className=" text-sm">
                          {student.class} - {student.section}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="text-sm">
                          <div>{student.phone}</div>
                          <div className="text-gray-500 truncate max-w-32">{student.address}</div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="text-sm">{student.fatherName}</div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <Link to={`/admin/students/records/${student.id}`}>
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </Link>
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
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentList;
