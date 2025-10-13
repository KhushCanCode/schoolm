import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus, Eye, Edit, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { useUsersStore, TeacherForm } from "@/store/useUsersStore";
import { Head } from "react-day-picker";
import Heading from "@/components/common/Heading";

const List = () => {
  const school_id = useAuthStore((state) => state.authUser.school_id);
  const getAllTeachers = useUsersStore((state) => state.getAllTeachers);

  const [teachers, setTeachers] = useState<TeacherForm[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    const fetchTeachers = async () => {
      setLoading(true);
      try {
        const data = await getAllTeachers(school_id);
        if (data) {
          setTeachers(Array.isArray(data) ? data : [data]);
        } else {
          setTeachers([]);
        }
      } catch (error: any) {
        console.error("Failed to fetch users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, [getAllTeachers, school_id]);

  // const handleDelete = (id:number) => {
  //   if (!window.confirm("Are you sure you want to delete this teacher?")) return;
  //   setTeachers(prev => prev.filter(t => t.id !== id));
  // }

  const filteredTeachers = teachers.filter(
    u =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.id
  );

  return (
    <div className="min-h-screen   ">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <Heading title="Teachers Management" description="Manage all teacher records and information"/>
          
          <div className="flex gap-2 ">
            <Link to="/principal/dashboard">
              <Button variant="outline" className="">Back to Dashboard</Button>
            </Link>
            <Link to ="/principal/teachers/register">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Teacher
            </Button>
            
            </Link>
          </div>
        </div>

         {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{teachers.length}</div>
              <div className="text-sm text-slate-500">Total Teachers</div>
            </CardContent>
          </Card>
          <Card className="w-[250px]">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {teachers.filter(u => u.status === "active").length}
              </div>
              <div className="text-sm text-slate-500">Active Teachers</div>
            </CardContent>
          </Card>
        </div>

        <Card >
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg">All Teachers</CardTitle>
              <div className="relative w-64">
                <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-slate-500" />
                </span>
                <Input
                  placeholder="Search teachers..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {loading?(
              <p className="text-sm">Loading...</p>
            ): filteredTeachers.length === 0 ? (
              <p>No teachers found.</p>
            ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>EmpID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Gender</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teachers.map((teacher) => (
                  <TableRow key={teacher.id}>
                    <TableCell className="font-medium text-xs">EMP00{teacher.id}</TableCell>
                    <TableCell  className="font-medium text-xs">{teacher.name}</TableCell>
                    <TableCell  className="font-medium text-xs">{teacher.gender}</TableCell>
                    <TableCell  className="font-medium text-xs">{teacher.email}</TableCell>
                    <TableCell  className="font-medium text-xs">{teacher.phone}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          teacher.status === "active"
                            ? "bg-accent  text-primary "
                            : "bg-muted text-gray-600"
                        }`}
                      >
                        {teacher.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2 justify-center">
                        <Button asChild variant="ghost" size="sm">
                          <Link to={`/principal/teachers/list/details/${teacher.id}`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default List;