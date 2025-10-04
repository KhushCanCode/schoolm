import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus, Building, Bed, Users, Home } from "lucide-react";
import { Link } from "react-router-dom";

const Hostel = () => {
  const hostelRecords = [
    { id: 1, name: "Rahul Sharma", class: "10A", room: "A-101", block: "A Block", fees: "₹8,000", status: "Occupied" },
    { id: 2, name: "Amit Kumar", class: "9A", room: "B-205", block: "B Block", fees: "₹8,000", status: "Occupied" },
    { id: 3, name: "Ravi Gupta", class: "12B", room: "A-305", block: "A Block", fees: "₹8,500", status: "Occupied" },
    { id: 4, name: "", class: "", room: "C-101", block: "C Block", fees: "₹7,500", status: "Vacant" },
    { id: 5, name: "Vikram Singh", class: "11A", room: "B-102", block: "B Block", fees: "₹8,000", status: "Occupied" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-lg font-bold text-foreground">Hostel Management</h1>
            <p className="text-muted-foreground text-xs mt-2">Manage hostel rooms and student accommodation</p>
          </div>
          <div className="flex gap-2">
            <Link to="/admin/dashboard">
              <Button variant="outline" className="hover:bg-navbar hover:text-accent">Back to Dashboard</Button>
            </Link>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Allocate Room
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="w-[250px]">
            <CardHeader className="text-center">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Rooms</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 ml-14">
                <Home className="h-4 w-4 text-blue-600" />
                <div className="text-lg font-bold text-foreground">120</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-sm font-medium text-muted-foreground">Occupied Rooms</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 ml-14 -my-4">
                <Users className="h-4 w-4 text-green-600" />
                <div className="text-lg font-bold text-foreground">98</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-sm font-medium text-muted-foreground">Vacant Rooms</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 ml-14 -my-3">
                <Bed className="h-4 w-4 text-orange-600" />
                <div className="text-lg  font-bold text-foreground">22</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-sm font-medium text-muted-foreground">Occupancy Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 ml-14">
                <Building className="h-4 w-4 text-purple-600" />
                <div className="text-lg ml-14 -my-4 font-bold text-foreground">81.7%</div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card >
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg">Hostel Room Allocation</CardTitle>
              <div className="relative w-64">
                <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                <Input placeholder="Search rooms..." className="pl-10" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Room No.</TableHead>
                  <TableHead>Block</TableHead>
                  <TableHead>Student Name</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Monthly Fees</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {hostelRecords.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell className="font-medium text-xs">{record.room}</TableCell>
                    <TableCell className="text-xs">{record.block}</TableCell>
                    <TableCell className="text-xs">{record.name || '-'}</TableCell>
                    <TableCell className="text-xs">{record.class || '-'}</TableCell>
                    <TableCell className="text-xs">{record.fees}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        record.status === 'Occupied' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {record.status}
                      </span>
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

export default Hostel;