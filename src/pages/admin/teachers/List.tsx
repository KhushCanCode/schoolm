import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus, Eye, Edit, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const List = () => {
  const[ teachers,setTeachers] = useState([
    { id: 1, name: "Dr. Rajesh Kumar", subject: "Mathematics", experience: "10 years", contact: "9876543210", salary: "₹45,000" },
    { id: 2, name: "Ms. Sunita Sharma", subject: "English", experience: "8 years", contact: "9876543211", salary: "₹42,000" },
    { id: 3, name: "Mr. Vikram Singh", subject: "Science", experience: "12 years", contact: "9876543212", salary: "₹48,000" },
    { id: 4, name: "Mrs. Meera Patel", subject: "Social Studies", experience: "6 years", contact: "9876543213", salary: "₹40,000" },
    { id: 5, name: "Mr. Arjun Gupta", subject: "Physical Education", experience: "5 years", contact: "9876543214", salary: "₹35,000" },
  ]);

  const handleDelete = (id:number) => {
    if (!window.confirm("Are you sure you want to delete this teacher?")) return;

    setTeachers(prev => prev.filter(t => t.id !== id));
  }

  return (
    <div className="min-h-screen bg-background ">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-lg font-bold">Teachers Management</h1>
            <p className="text-gray-500 text-xs mt-2">Manage all teacher records and information</p>
          </div>
          <div className="flex gap-2 mx-9">
            <Link to="/admin/dashboard">
              <Button variant="outline" className="hover:bg-sidebar hover:text-white">Back to Dashboard</Button>
            </Link>
            <Link to ="/admin/teachers/register">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Teacher
            </Button>
            
            </Link>
          </div>
        </div>

        <Card >
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg">All Teachers</CardTitle>
              <div className="relative w-64">
                <Search className="h-4 w-4 absolute left-3 top-3 text-gray-500" />
                <Input placeholder="Search teachers..." className="pl-10" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Experience</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Salary</TableHead>
                  <TableHead className="px-9">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teachers.map((teacher) => (
                  <TableRow key={teacher.id}>
                    <TableCell className="font-medium text-xs">{teacher.name}</TableCell>
                    <TableCell  className="font-medium text-xs">{teacher.subject}</TableCell>
                    <TableCell  className="font-medium text-xs">{teacher.experience}</TableCell>
                    <TableCell  className="font-medium text-xs">{teacher.contact}</TableCell>
                    <TableCell  className="font-medium text-xs">{teacher.salary}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={()=>handleDelete(teacher.id)}>
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

export default List;