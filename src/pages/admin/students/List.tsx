import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Eye, Edit, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

interface Student {
  id: number;
  rollNumber: string;
  name: string;
  class: string;
  section: string;
  email: string;
  phone: string;
  address: string;
  status: 'active' | 'inactive';
  admissionDate: string;
}

const StudentList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [students,setStudents] = useState([
    {
      id: 1,
      rollNumber: "2024001",
      name: "Aarav Sharma",
      class: "10th",
      section: "A",
      email: "aarav@email.com",
      phone: "9876543210",
      address: "123 Main St, Delhi",
      status: "active",
      admissionDate: "2024-01-15"
    },
    {
      id: 2,
      rollNumber: "2024002", 
      name: "Priya Patel",
      class: "10th",
      section: "A",
      email: "priya@email.com",
      phone: "9876543211",
      address: "456 Park Ave, Mumbai",
      status: "active",
      admissionDate: "2024-01-16"
    },
    {
      id: 3,
      rollNumber: "2024003",
      name: "Rohit Kumar",
      class: "9th",
      section: "B", 
      email: "rohit@email.com",
      phone: "9876543212",
      address: "789 Garden St, Bangalore",
      status: "inactive",
      admissionDate: "2024-01-17"
    },
    {
      id: 4,
      rollNumber: "2024004",
      name: "Sneha Singh",
      class: "11th",
      section: "A",
      email: "sneha@email.com", 
      phone: "9876543213",
      address: "321 Hill View, Chennai",
      status: "active",
      admissionDate: "2024-01-18"
    },
    {
      id: 5,
      rollNumber: "2024005",
      name: "Arjun Reddy",
      class: "12th",
      section: "C",
      email: "arjun@email.com",
      phone: "9876543214", 
      address: "654 Lake Side, Hyderabad",
      status: "active",
      admissionDate: "2024-01-19"
    }
  ]);

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.class.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id:number) => {
    if(!window.confirm("Are you sure you want to delete this student?")) 
      return;
    setStudents(prev => prev.filter(s => s.id !== id));
  }

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
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
              <Input
                placeholder="Search students by name, roll number, or class..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
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
                  {students.filter(s => s.status === 'active').length}
                </div>
                <div className="text-sm text-gray-500">Active Students</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Students Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">All Students ({filteredStudents.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b text-sm">
                    <th className="text-left p-4 font-medium text-gray-500">Roll No.</th>
                    <th className="text-left p-4 font-medium text-gray-500">Name</th>
                    <th className="text-left p-4 font-medium text-gray-500">Class</th>
                    <th className="text-left p-4 font-medium text-gray-500">Contact</th>
                    <th className="text-left p-4 font-medium text-gray-500">Status</th>
                    <th className="text-left p-4 font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student) => (
                    <tr key={student.id} className="border-b hover:bg-muted/50">
                      <td className="p-4">
                        <span className="font-mono text-xs">{student.rollNumber}</span>
                      </td>
                      <td className="p-4">
                        <div>
                          <div className="font-medium text-sm">{student.name}</div>
                          <div className="text-xs text-gray-500">{student.email}</div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="font-medium text-sm">{student.class} - {student.section}</span>
                      </td>
                      <td className="p-4">
                        <div className="text-sm">
                          <div>{student.phone}</div>
                          <div className="text-gray-500 truncate max-w-32">{student.address}</div>
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge variant={student.status === 'active' ? 'default' : 'secondary'}>
                          {student.status}
                        </Badge>
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
                          <Button variant="ghost" size="sm" onClick={()=>handleDelete(student.id)}>
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